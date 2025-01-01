<?php

use App\Http\Controllers\Api\BidController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/cars/{car}/bids', [BidController::class, 'getBids']);
}); 