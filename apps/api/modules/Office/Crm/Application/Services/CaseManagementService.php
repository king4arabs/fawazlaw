<?php

namespace Modules\Office\Crm\Application\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\Office\Crm\Domain\Models\CaseRecord;

class CaseManagementService
{
    public function paginate(?string $search = null): LengthAwarePaginator
    {
        return CaseRecord::query()
            ->when($search, function ($query, string $search): void {
                $query->where(function ($nestedQuery) use ($search): void {
                    $nestedQuery
                        ->where('reference', 'like', "%{$search}%")
                        ->orWhere('client_name', 'like', "%{$search}%")
                        ->orWhere('case_type', 'like', "%{$search}%")
                        ->orWhere('court_name', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%")
                        ->orWhere('owner_name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);
    }

    public function create(array $payload): CaseRecord
    {
        return CaseRecord::query()->create($payload);
    }

    public function findOrFail(int $id): CaseRecord
    {
        return CaseRecord::query()->findOrFail($id);
    }

    public function update(CaseRecord $caseRecord, array $payload): CaseRecord
    {
        $caseRecord->update($payload);

        return $caseRecord->refresh();
    }

    public function delete(CaseRecord $caseRecord): void
    {
        $caseRecord->delete();
    }
}
