<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class BidController extends Controller
{
    use AuthorizesRequests;

    public function getBids(Car $car)
    {
        return response()->json($car->bids()
            ->with('user:id,name')
            ->latest()
            ->get());
    }

    public function store(Request $request, Car $car)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string|max:500'
        ]);

        $bid = $car->bids()->create([
            'user_id' => Auth::id(),
            'amount' => $validated['amount'],
            'note' => $validated['note'],
            'status' => 'pending'
        ]);

        return back()->with('success', 'Bid placed successfully!');
    }

    public function accept(Bid $bid)
    {
        $this->authorize('update', $bid->car);
        
        DB::transaction(function () use ($bid) {
            // Mark the car as sold
            $bid->car->markAsSold();
            
            // Accept the current bid
            $bid->update(['status' => 'accepted']);
            
            // Reject all other pending bids
            $bid->car->bids()
                ->where('id', '!=', $bid->id)
                ->where('status', 'pending')
                ->update(['status' => 'rejected']);
                
            // // Notify other bidders
            // $bid->car->bids()
            //     ->where('id', '!=', $bid->id)
            //     ->where('user_id', '!=', $bid->user_id)
            //     ->get()
            //     ->each(function ($otherBid) use ($bid) {
            //         $otherBid->user->notify(new BidRejectedNotification($bid->car));
            //     });
                
            // Notify winning bidder
            // $bid->user->notify(new BidAcceptedNotification($bid->car));
        });

        return back()->with('success', 'Bid accepted and car marked as sold!');
    }

    public function reject(Bid $bid)
    {
        $this->authorize('update', $bid->car);
        $bid->update(['status' => 'rejected']);
        return back()->with('success', 'Bid was rejected successfully!');
    }

    public function index()
    {
        $user = auth()->user();
        
        // Get bids placed by the user
        $bidsPlaced = Bid::with(['car.images', 'car.user'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        // Get bids received on user's cars
        $bidsReceived = Bid::with(['car.images', 'user'])
            ->whereHas('car', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Bids/Index', [
            'bidsPlaced' => $bidsPlaced,
            'bidsReceived' => $bidsReceived
        ]);
    }
} 