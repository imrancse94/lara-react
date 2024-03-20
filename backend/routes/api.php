<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RegistrationController;
use App\Http\Middleware\ApiMiddleware;
use Illuminate\Support\Facades\Route;

Route::group(
    ['prefix' => 'auth'],
    function () {
       
        Route::post('register', [RegistrationController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('refresh-token', [AuthController::class, 'refreshToken']);

        Route::middleware([ApiMiddleware::class])->group(function () {
            Route::get('dashboard', [DashboardController::class, 'dashboard']);
            Route::get('auth-info', [AuthController::class, 'getAuthUser']);
        });
    }
);
