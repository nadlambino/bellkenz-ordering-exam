<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function successResponse(array $data, int $code = 200)
    {
        return response()->json($data, $code);
    }

    public function errorResponse(string $message, int $code = 500)
    {
        return response()->json([
            'error' => $message,
        ], $code);
    }
}
