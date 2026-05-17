<?php

namespace Modules\Office\Crm\Application\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reference' => ['required', 'string', 'max:255', 'unique:case_records,reference'],
            'client_name' => ['required', 'string', 'max:255'],
            'case_type' => ['required', 'string', 'max:255'],
            'court_name' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'owner_name' => ['required', 'string', 'max:255'],
            'opened_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
