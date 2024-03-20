<?php

namespace App\Services;

use App\Models\User;
use App\Utils\ApiStatusCode;
use App\Utils\Logger;
use Exception;

class AuthService extends BaseService
{
    public function login($inputData)
    {
        $credentials['email'] = $inputData['email'];
        $credentials['password'] = $inputData['password'];

        try {

            $user = (new User())->getUserByCredential(
                $credentials['email'],
                $credentials['password']
            );

            if(empty($user)){
                $this->message = __("User not found");
                $this->status_code = ApiStatusCode::USER_NOT_FOUND;
                return $this;
            }
            
            $token = auth()->login($user);
            
            $this->message = __("User found successfully");
            $this->status_code = ApiStatusCode::SUCCESS;
            $this->data = array_merge($this->respondWithToken($token), ['user' => $user]);
        } catch (Exception $ex) {
            Logger::appLog('USER_LOGIN', ['exception' => $ex->getMessage()]);
            $this->message = __("Unknown Error");
            $this->status_code = ApiStatusCode::UNKNOWN_ERROR;
        }

        return $this;
    }

    public function refreshToken()
    {
        try {

            $this->message = __("Token refreshed successfully");

            $this->status_code = ApiStatusCode::TOKEN_REFRESHED;

            $this->data = array_merge($this->respondWithToken(auth()->refresh()),['user'=>auth()->user()]);
        } catch (Exception $ex) {
            Logger::appLog('REFRESH_TOKEN', ['exception' => $ex->getMessage()]);
            $this->status_code = ApiStatusCode::FAILED;
            $this->message = __("Token refreshed failed");
        }

        return $this;
    }

    public function getCurrentAuthUser()
    {
        try {

            $this->message = __("User fetched success");

            $this->status_code = ApiStatusCode::SUCCESS;

            $this->data = auth()->user();
        } catch (Exception $ex) {

            Logger::appLog('GET_CURRENT_USER', ['exception' => $ex->getMessage()]);

            $this->status_code = ApiStatusCode::FAILED;

            $this->message = __("User fetched failed");
        }

        return $this;
    }


    private function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
