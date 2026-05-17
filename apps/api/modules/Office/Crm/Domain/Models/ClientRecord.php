<?php

namespace Modules\Office\Crm\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class ClientRecord extends Model
{
    protected $table = 'client_records';

    protected $fillable = [
        'name',
        'type',
        'status',
        'phone',
        'email',
        'company_name',
    ];
}
