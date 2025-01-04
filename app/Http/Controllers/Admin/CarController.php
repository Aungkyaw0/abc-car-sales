<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with(['user', 'images'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Cars/Index', [
            'cars' => $cars
        ]);
    }

    public function destroy(Car $car)
    {
        // Delete associated images from storage
        foreach ($car->images as $image) {
            Storage::delete('public/' . $image->image_path);
        }

        $car->delete();

        return redirect()->back()->with('success', 'Car listing deleted successfully');
    }

    public function edit(Car $car)
    {
        $car->load(['images', 'features']);
        
        return Inertia::render('Admin/Cars/Edit', [
            'car' => $car
        ]);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'make' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'condition' => 'required|string',
            'transmission' => 'required|string',
            'fuel_type' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:active,sold,pending',
            'features' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $car->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('cars', 'public');
                $car->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('admin.cars.index')->with('success', 'Car updated successfully');
    }
} 