<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HighlitedService extends Model
{
    use HasFactory;
    protected $fillable = ['service_id', 'position'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
