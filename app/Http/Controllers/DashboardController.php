<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Bid;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            
            // Get user's active listings
            $activeListings = Car::where('user_id', $user->id)
                ->where('status', 'active')
                ->count();
            
            // Get user's total bids
            $totalBids = Bid::where('user_id', $user->id)->count();
            
            // Get user's sold cars
            $soldCars = Car::where('user_id', $user->id)
                ->where('status', 'sold')
                ->count();

            $stats = [
                'myActiveListings' => $activeListings,
                'listingsChange' => $this->calculatePercentageChange(Car::class, $user->id),
                'myTotalBids' => $totalBids,
                'bidsChange' => $this->calculatePercentageChange(Bid::class, $user->id),
                'soldCars' => $soldCars,
                'soldCarsChange' => 0,
            ];

            // Get user's recent listings
            $myListings = Car::with(['images'])
                ->where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get();

            // Get user's recent bids
            $myBids = Bid::with(['car.images'])
                ->where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get();

            // Get bid activity for chart
            $bidActivity = Bid::where('user_id', $user->id)
                ->select(
                    DB::raw('DATE(created_at) as date'),
                    DB::raw('COUNT(*) as count')
                )
                ->groupBy('date')
                ->orderBy('date', 'DESC')
                ->limit(30)
                ->get();

            return Inertia::render('Dashboard/Index', [
                'stats' => $stats,
                'bidActivity' => $bidActivity,
                'myListings' => $myListings,
                'myBids' => $myBids
            ]);
        } catch (\Exception $e) {
            Log::error('Dashboard Error: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while loading the dashboard: ' . $e->getMessage());
        }
    }

    private function calculatePercentageChange($model, $userId)
    {
        $currentCount = $model::where('user_id', $userId)
            ->whereMonth('created_at', Carbon::now()->month)
            ->count();
        
        $previousCount = $model::where('user_id', $userId)
            ->whereMonth('created_at', Carbon::now()->subMonth()->month)
            ->count();

        return $previousCount > 0 
            ? round((($currentCount - $previousCount) / $previousCount) * 100, 2)
            : 100;
    }
} 