<?php

use App\Http\Middleware\ApiMiddleware;
use App\Utils\ApiStatusCode;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // 
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->renderable(function (TokenInvalidException $e) {
            return response()->json([
                'data'=>[],
                'message' => 'Token is Invalid',
                'status_code'=>ApiStatusCode::INVALID_TOKEN
            ], 200);
        });

        $exceptions->renderable(function (TokenExpiredException $e) {
            return response()->json([
                'data'=>[],
                'message' => 'Token expired',
                'status_code'=>ApiStatusCode::TOKEN_EXPIRED
            ], 200);
        });

        $exceptions->renderable(function (JWTException $e) {
            return response()->json([
                'data'=>[],
                'message' => 'Token not parsed',
                'status_code'=>ApiStatusCode::TOKEN_PARSE_ERROR
            ], 200);
        });

        $exceptions->renderable(function (UnauthorizedException $e) {
            return response()->json([
                'data'=>[],
                'message' => 'Unauthenticated',
                'status_code'=>ApiStatusCode::UNAUTHENTICATE
            ], 200);
        });

        $exceptions->renderable(function (AuthenticationException $e) {
            return response()->json([
                'data'=>[],
                'message' => 'Unauthenticated',
                'status_code'=>ApiStatusCode::UNAUTHENTICATE
            ], 200);
        });

    })->create();
