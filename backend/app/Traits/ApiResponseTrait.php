<?php

namespace App\Traits;

trait ApiResponseTrait{

    public function sendResponse($data, $message, $status_code, $http_code = 200)
    {
        
        $response['status_code'] = $status_code;

        if(!empty($message)){
            $response['message'] = $message;
        }
        
        if(!empty($data)){
            $response['data'] = $data;
        }
       
        return response()->json($response, $http_code);
    }

}