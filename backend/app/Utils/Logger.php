<?php

namespace App\Utils;

class Logger
{
    public static function appLog($action, $data)
    {
        $log = array_merge(['action' => $action], $data);

        info(json_encode($log));
    }
}
