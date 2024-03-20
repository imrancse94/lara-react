<?php

namespace App\Utils;

class ApiStatusCode
{
    const SUCCESS = 100;

    const FAILED = 900;

    const USER_NOT_FOUND = 4000;

    const UNKNOWN_ERROR = 700;

    const VALIDATION_ERROR = 900;

    const INVALID_TOKEN = 4003;

    const TOKEN_REFRESHED = 1003;

    const TOKEN_EXPIRED = 4004;

    const TOKEN_PARSE_ERROR = 4005;

    const UNAUTHENTICATE = 4001;
}
