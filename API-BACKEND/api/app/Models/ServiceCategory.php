<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'thumbnail'];

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_category_mappings', 'category_id', 'service_id');
    }
}
