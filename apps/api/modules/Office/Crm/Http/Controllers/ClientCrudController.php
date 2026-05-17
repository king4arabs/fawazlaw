<?php

namespace Modules\Office\Crm\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Office\Crm\Application\Requests\StoreClientRequest;
use Modules\Office\Crm\Application\Requests\UpdateClientRequest;
use Modules\Office\Crm\Application\Resources\ClientResource;
use Modules\Office\Crm\Application\Services\ClientManagementService;

class ClientCrudController extends Controller
{
    public function __construct(
        private readonly ClientManagementService $service,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $clients = $this->service->paginate($request->string('search')->toString());

        return response()->json([
            'data' => ClientResource::collection($clients->getCollection())->resolve(),
            'meta' => [
                'current_page' => $clients->currentPage(),
                'last_page' => $clients->lastPage(),
                'per_page' => $clients->perPage(),
                'total' => $clients->total(),
            ],
        ]);
    }

    public function store(StoreClientRequest $request): JsonResponse
    {
        $clientRecord = $this->service->create($request->validated());

        return response()->json([
            'data' => ClientResource::make($clientRecord)->resolve(),
            'message' => 'تم إنشاء العميل بنجاح.',
        ], 201);
    }

    public function update(UpdateClientRequest $request, string $clientRecord): JsonResponse
    {
        $updatedClient = $this->service->update(
            $this->service->findOrFail((int) $clientRecord),
            $request->validated(),
        );

        return response()->json([
            'data' => ClientResource::make($updatedClient)->resolve(),
            'message' => 'تم تحديث العميل بنجاح.',
        ]);
    }

    public function destroy(string $clientRecord): JsonResponse
    {
        $this->service->delete($this->service->findOrFail((int) $clientRecord));

        return response()->json([
            'message' => 'تم حذف العميل بنجاح.',
        ]);
    }
}
