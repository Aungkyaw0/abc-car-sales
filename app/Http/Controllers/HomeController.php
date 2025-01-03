<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController
{
    public function index()
    {
        $featuredCars = Car::with(['images'])
            ->where('status', 'active')
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'featuredCars' => $featuredCars
        ]);
    }
} 