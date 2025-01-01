<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BidController;

Route::get('/', function () {
    return inertia('Home');
});

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
});

Route::middleware(['auth'])->group(function () {
    Route::get('/sell-car', [CarController::class, 'create'])->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
    Route::get('/cars/{car}/bids', [BidController::class, 'getBids']);
    Route::post('/cars/{car}/bids', [BidController::class, 'store']);
    Route::post('/bids/{bid}/accept', [BidController::class, 'accept']);
    Route::post('/bids/{bid}/reject', [BidController::class, 'reject']);
});

Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');
Route::get('/car/lists', [CarController::class, 'index'])->name('cars.index');