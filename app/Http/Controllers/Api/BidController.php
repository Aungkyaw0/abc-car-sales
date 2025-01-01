<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function getBids(Car $car)
    {
        return response()->json(
            $car->bids()
                ->with('user:id,name')
                ->latest()
                ->get()
                ->map(function ($bid) {
                    return [
                        'id' => $bid->id,
                        'amount' => $bid->amount,
                        'note' => $bid->note,
                        'status' => $bid->status,
                        'user' => [
                            'id' => $bid->user->id,
                            'name' => $bid->user->name
                        ],
                        'created_at' => $bid->created_at
                    ];
                })
        );
    }
} 