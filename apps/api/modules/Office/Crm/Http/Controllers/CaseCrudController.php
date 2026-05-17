<?php

namespace Modules\Office\Crm\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Office\Crm\Application\Requests\StoreCaseRequest;
use Modules\Office\Crm\Application\Requests\UpdateCaseRequest;
use Modules\Office\Crm\Application\Resources\CaseResource;
use Modules\Office\Crm\Application\Services\CaseManagementService;

class CaseCrudController extends Controller
{
    public function __construct(
        private readonly CaseManagementService $service,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $cases = $this->service->paginate($request->string('search')->toString());

        return response()->json([
            'data' => CaseResource::collection($cases->getCollection())->resolve(),
            'meta' => [
                'current_page' => $cases->currentPage(),
                'last_page' => $cases->lastPage(),
                'per_page' => $cases->perPage(),
                'total' => $cases->total(),
            ],
        ]);
    }

    public function store(StoreCaseRequest $request): JsonResponse
    {
        $caseRecord = $this->service->create($request->validated());

        return response()->json([
            'data' => CaseResource::make($caseRecord)->resolve(),
            'message' => 'تم إنشاء القضية بنجاح.',
        ], 201);
    }

    public function update(UpdateCaseRequest $request, string $caseRecord): JsonResponse
    {
        $updatedCase = $this->service->update(
            $this->service->findOrFail((int) $caseRecord),
            $request->validated(),
        );

        return response()->json([
            'data' => CaseResource::make($updatedCase)->resolve(),
            'message' => 'تم تحديث القضية بنجاح.',
        ]);
    }

    public function destroy(string $caseRecord): JsonResponse
    {
        $this->service->delete($this->service->findOrFail((int) $caseRecord));

        return response()->json([
            'message' => 'تم حذف القضية بنجاح.',
        ]);
    }
}
