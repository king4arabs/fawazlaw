<?php

namespace Modules\Office\Core\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Office\Core\OfficePageRegistry;

class OfficePageController extends Controller
{
    public function __invoke(Request $request, OfficePageRegistry $registry): JsonResponse
    {
        $path = (string) $request->query('path', '/office');
        $page = $registry->findByPath($path);

        if (! $page) {
            return response()->json([
                'message' => 'Office page not found.',
            ], 404);
        }

        return response()->json($page);
    }
}
