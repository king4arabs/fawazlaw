<?php

namespace Modules\Office\Crm\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class CaseRecord extends Model
{
    protected $table = 'case_records';

    protected $fillable = [
        'reference',
        'client_name',
        'case_type',
        'court_name',
        'status',
        'owner_name',
        'opened_at',
        'notes',
    ];

    protected $casts = [
        'opened_at' => 'date',
    ];
}
