<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    //
    public function register(RegisterRequest $request)
    {
        $inputData = $request->all();

        $response = (new UserService)->add($inputData);

        return $this->sendResponse(
            $response->data,
            $response->message,
            $response->status_code
        );
    }
}
