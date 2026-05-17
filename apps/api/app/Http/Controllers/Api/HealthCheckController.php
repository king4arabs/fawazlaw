<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HealthCheckController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'name' => config('app.name'),
            'framework' => 'Laravel',
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
