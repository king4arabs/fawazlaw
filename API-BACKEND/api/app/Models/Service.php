<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $casts = [
        'price' => 'float', // or 'decimal:2' if you want to specify precision and scale
    ];
    protected $fillable = ['name', 'description', 'price', 'currency', 'thumbnail'];

    public function categories()
    {
        return $this->belongsToMany(ServiceCategory::class, 'service_category_mappings', 'service_id', 'category_id');
    }
}
