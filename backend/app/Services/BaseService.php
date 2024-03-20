<?php

namespace App\Services;

use App\Utils\ApiStatusCode;

abstract class BaseService
{

    public $status_code = ApiStatusCode::FAILED;
    public $message = "";
    public $data = [];

}
