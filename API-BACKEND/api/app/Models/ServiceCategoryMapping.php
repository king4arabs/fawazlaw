<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCategoryMapping extends Model
{
    use HasFactory;
    protected $fillable = ['service_id','category_id'];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function category()
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }
}
