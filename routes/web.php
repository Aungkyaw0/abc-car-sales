<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return inertia('AboutUs');
});

Route::get('/contact', function () {
    return inertia('ContactUs');
});
// Authentication Routes
Route::middleware('guest')->group(function () {
    // Registration Routes
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

// Protected Routes (Add this for later use)
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Add Dashboard Routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/users', [DashboardController::class, 'users'])->name('dashboard.users');
    Route::get('/dashboard/cars', [DashboardController::class, 'cars'])->name('dashboard.cars');
    Route::get('/dashboard/analytics', [DashboardController::class, 'analytics'])->name('dashboard.analytics');
    Route::get('/dashboard/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/sell-car', [CarController::class, 'create'])->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
    Route::get('/cars/{car}/bids', [BidController::class, 'getBids']);
    Route::post('/cars/{car}/bids', [BidController::class, 'store']);
    Route::post('/bids/{bid}/accept', [BidController::class, 'accept']);
    Route::post('/bids/{bid}/reject', [BidController::class, 'reject']);
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::put('/dashboard/cars/{car}', [CarController::class, 'update'])
        ->name('dashboard.cars.update');
        Route::delete('/dashboard/cars/{car}', [CarController::class, 'destroy'])
        ->name('cars.destroy');
});

Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');
Route::get('/car/lists', [CarController::class, 'index'])->name('cars.index');

Route::middleware('auth')->group(function () {
    // Dashboard Routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Car Management Routes
    Route::prefix('dashboard/cars')->group(function () {
        Route::get('/my-listings', [CarController::class, 'myListings'])->name('dashboard.cars.my-listings');
        Route::get('/sold', [CarController::class, 'soldCars'])->name('dashboard.cars.sold');
        Route::get('/add-new-car', [CarController::class, 'create'])->name('dashboard.cars.add-new-car');
    });
    
    // Existing Bid Routes
    Route::get('/dashboard/bids', [BidController::class, 'index'])->name('dashboard.bids');
});
