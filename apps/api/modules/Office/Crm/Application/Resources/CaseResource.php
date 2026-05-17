<?php

namespace Modules\Office\Crm\Application\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'client_name' => $this->client_name,
            'case_type' => $this->case_type,
            'court_name' => $this->court_name,
            'status' => $this->status,
            'owner_name' => $this->owner_name,
            'opened_at' => $this->opened_at?->format('Y-m-d'),
            'opened_at_human' => $this->opened_at?->translatedFormat('d M Y'),
            'notes' => $this->notes,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
