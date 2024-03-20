<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    private $authService = null;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $inputData = $request->all();

        $response = $this->authService->login($inputData);


        return $this->sendResponse(
                    $response->data,
                    $response->message,
                    $response->status_code
                );
    }


    public function refreshToken()
    {
        $response = $this->authService->refreshToken();

        return $this->sendResponse(
                    $response->data,
                    $response->message,
                    $response->status_code
                );
    }


    public function getAuthUser()
    {
        $response = $this->authService->getCurrentAuthUser();

        return $this->sendResponse(
                    $response->data,
                    $response->message,
                    $response->status_code
                );
    }
}
