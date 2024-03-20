<?php

namespace App\Services;

use App\Models\User;
use App\Utils\ApiStatusCode;
use App\Utils\Logger;
use Exception;

class UserService extends BaseService
{
    public function add($inputData)
    {

        $this->message = __("User fail to add");

        try {

            $data = (new User())->add($inputData);

            if (!empty($data)) {
                $this->data = $data;
                $this->message = __("An user has been created you can login now.");
                $this->status_code = ApiStatusCode::SUCCESS;
            }
        } catch (Exception $ex) {
            Logger::appLog('USER_ADD', [
                'exception' => $ex->getMessage(),
                'email'=>$inputData['email']
            ]);
        }

        return $this;
    }
}
