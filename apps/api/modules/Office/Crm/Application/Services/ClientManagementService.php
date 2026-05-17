<?php

namespace Modules\Office\Crm\Application\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\Office\Crm\Domain\Models\ClientRecord;

class ClientManagementService
{
    public function paginate(?string $search = null): LengthAwarePaginator
    {
        return ClientRecord::query()
            ->when($search, function ($query, string $search): void {
                $query->where(function ($nestedQuery) use ($search): void {
                    $nestedQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('type', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('company_name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);
    }

    public function create(array $payload): ClientRecord
    {
        return ClientRecord::query()->create($payload);
    }

    public function findOrFail(int $id): ClientRecord
    {
        return ClientRecord::query()->findOrFail($id);
    }

    public function update(ClientRecord $clientRecord, array $payload): ClientRecord
    {
        $clientRecord->update($payload);

        return $clientRecord->refresh();
    }

    public function delete(ClientRecord $clientRecord): void
    {
        $clientRecord->delete();
    }
}
