<?php

namespace App\Http\Middleware;

use App\Traits\ApiResponseTrait;
use App\Utils\ApiStatusCode;
use App\Utils\JwtManager;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiMiddleware
{
    use ApiResponseTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isValidToken = JwtManager::verifyToken();

        if ($isValidToken) {
            return $next($request);
        }

        return $this->sendResponse([], __('Unauthenticate'), ApiStatusCode::UNAUTHENTICATE, 401);
    }
}
