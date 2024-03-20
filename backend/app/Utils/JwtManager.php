<?php

namespace App\Utils;

use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtManager {
    

    public static function verifyToken()
    {
        $result =  false;
        
        try{
            JWTAuth::parseToken()->authenticate();
            $result =  true;
        }catch(Exception $ex){
            Logger::appLog('VERIFY_TOKEN',['exception'=>$ex->getMessage()]);
        }

        return $result;
    }

}