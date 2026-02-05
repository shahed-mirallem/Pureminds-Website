<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ContentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Content API routes
Route::get('/content', [ContentController::class, 'index']);
Route::post('/contact', [ContentController::class, 'contact']);
