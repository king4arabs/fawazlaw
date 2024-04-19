<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *     title="ServiceCategory",
 *     description="Service category model",
 *     @OA\Property(
 *         property="id",
 *         description="The unique identifier for the service category",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         description="The name of the service category",
 *         type="string",
 *         example="Category Name"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         description="The description of the service category",
 *         type="string",
 *         example="Category Description"
 *     ),
 *     @OA\Property(
 *         property="thumbnail",
 *         description="The thumbnail of the service category",
 *         type="string",
 *         example="thumbnail.jpg"
 *     ),
 * )
 */

class ServiceCategory extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'thumbnail'];

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_category_mappings', 'category_id', 'service_id');
    }
}
