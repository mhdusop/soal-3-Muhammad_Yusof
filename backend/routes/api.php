<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Product\ProductController;
use App\Http\Controllers\Api\Auth\AuthController;

// Auth
Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Route::group(['middleware' => ['jwt']], function () {
// });

// Products
Route::prefix('v1')->group(function () {
    Route::get('/get/products', [ProductController::class, 'index']);
    Route::get('/get/product/{id}', [ProductController::class, 'show']);
    Route::post('/create/product', [ProductController::class, 'store']);
    Route::put('/update/product/{id}', [ProductController::class, 'update']);
    Route::delete('/delete/product/{id}', [ProductController::class, 'destroy']);
});
