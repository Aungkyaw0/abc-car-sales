<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Feature;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    use AuthorizesRequests;

    public function create()
    {
        return Inertia::render('Cars/Create');
    }

    public function myListings()
    {
        $cars = Car::with(['images'])
            ->where('user_id', auth()->id())
            ->where('status', 'active')
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/Cars/MyListings', [
            'cars' => $cars
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'condition' => 'required|string|in:new,used',
            'transmission' => 'required|string|in:automatic,manual',
            'fuel_type' => 'required|string|in:petrol,diesel,electric,hybrid',
            'description' => 'required|string',
            'images' => 'max:4',
            'images.*' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:2048',
                function ($attribute, $value, $fail) {
                    if (!in_array($value->getMimeType(), [
                        'image/jpeg',
                        'image/png',
                        'image/jpg',
                        'image/gif'
                    ])) {
                        $fail('The file must be a valid image (JPG, JPEG, PNG, GIF).');
                    }
                },
            ],
            'features' => 'array'
        ]);

        $car = Car::create([
            'user_id' => auth()->id(),
            'status' => 'active',
            ...$validated
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('car-images', 'public');
                $car->images()->create([
                    'image_path' => $path,
                    'is_primary' => $index === 0
                ]);
            }
        }

        // Handle features
        if (!empty($validated['features'])) {
            foreach ($validated['features'] as $featureString) {
                [$category, $name] = explode(':', $featureString);
                
                $feature = Feature::firstOrCreate([
                    'name' => $name,
                    'category' => $category
                ]);

                $car->features()->attach($feature->id);
            }
        }

        return redirect()->route('cars.show', ['car' => $car->id])
            ->with('success', 'Car listed successfully!');
    }

    public function show(Car $car)
    {
        $car->load(['user', 'images', 'features']);
        
        // Group features by category
        $groupedFeatures = $car->features->groupBy('category')->toArray();
        
        return Inertia::render('Cars/Show', [
            'car' => $car,
            'seller' => [
                'name' => $car->user->name,
                'email' => $car->user->email,
                'joined' => $car->user->created_at->format('M Y'),
            ],
            'features' => $groupedFeatures,
            'similarCars' => Car::where('id', '!=', $car->id)
                ->where(function($query) use ($car) {
                    $query->where('make', $car->make);
                })->with(['images', 'features'])->limit(3)->get()
        ]);
    }

    public function index(Request $request)
    {
        $query = Car::query()
            ->with(['images', 'user'])
            ->where('status', 'active');

        // Get models for selected make
        $models = collect();
        if ($request->filled('make')) {
            $models = Car::where('make', $request->make)
                ->distinct()
                ->pluck('model');
        }

        // Filter by make - Move this before other filters
        if ($request->filled('make')) {
            $query->where('make', $request->make);
        }

        // Search by title, make, or model
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('make', 'like', '%' . $request->search . '%')
                    ->orWhere('model', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by model
        if ($request->model) {
            $query->where('model', $request->model);
        }

        // Filter by price range
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by year range
        if ($request->min_year) {
            $query->where('year', '>=', $request->min_year);
        }
        if ($request->max_year) {
            $query->where('year', '<=', $request->max_year);
        }

        $cars = $query->latest()->paginate(9)->withQueryString();
        
        // Add debug logging
        Log::info('Filter request:', [
            'make' => $request->make,
            'query' => $query->toSql(),
            'bindings' => $query->getBindings()
        ]);

        return Inertia::render('Cars/Index', [
            'cars' => $cars,
            'filters' => $request->only([
                'search', 'make', 'model', 
                'min_price', 'max_price', 
                'min_year', 'max_year'
            ]),
            'makes' => Car::distinct()->pluck('make'),
            'models' => $models,
            'debug' => [
                'currentMake' => $request->make,
                'totalCars' => $cars->total()
            ]
        ]);
    }

    public function soldCars()
    {
        $cars = Car::with(['images', 'acceptedBid.user'])
            ->where('user_id', auth()->id())
            ->where('status', 'sold')
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/Cars/SoldCars', [
            'cars' => $cars
        ]);
    }

    public function update(Request $request, Car $car)
    {
        $this->authorize('update', $car);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'condition' => 'required|in:new,used',
            'transmission' => 'required|in:automatic,manual',
            'fuel_type' => 'required|in:petrol,diesel,electric,hybrid',
            'description' => 'required|string',
            'features' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $car->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('cars', 'public');
                $car->images()->create([
                    'image_path' => $path,
                    'is_primary' => false
                ]);
            }
        }

        if (isset($validated['features'])) {
            $car->features()->sync($validated['features']);
        }

        return back()->with('success', 'Car details updated successfully!');
    }

    public function destroy(Car $car)
    {
        $this->authorize('delete', $car);

        try {
            DB::beginTransaction();

            // Delete related bids
            $car->bids()->delete();
            
            // Delete feature relationships
            $car->features()->detach();
            
            // Delete images from storage and database
            foreach ($car->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }
            $car->images()->delete();
            
            // Finally delete the car
            $car->delete();

            DB::commit();

            return redirect()->back()->with('flash', [
                'type' => 'success',
                'message' => 'Car listing deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Failed to delete car listing. Please try again.'
            ]);
        }
    }
} 