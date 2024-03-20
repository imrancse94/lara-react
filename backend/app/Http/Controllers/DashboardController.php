<?php

namespace App\Http\Controllers;

use App\Utils\ApiStatusCode;

class DashboardController extends Controller
{
    public function dashboard()
    {
      return $this->sendResponse([], 'Dashboard fetched', ApiStatusCode::SUCCESS);
    }
}
