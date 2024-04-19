<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *     title="Service",
 *     description="Service model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         format="int64",
 *         description="The unique identifier for the service",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The name of the service",
 *         example="Sample Service Name"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="The description of the service",
 *         example="Sample service description"
 *     ),
 *     @OA\Property(
 *         property="price",
 *         type="number",
 *         format="float",
 *         description="The price of the service",
 *         example=100.50
 *     ),
 *     @OA\Property(
 *         property="currency",
 *         type="string",
 *         description="The currency used for the price",
 *         example="SAR"
 *     ),
 *     @OA\Property(
 *         property="thumbnail",
 *         type="string",
 *         description="The URL of the thumbnail image for the service",
 *         example="https://example.com/thumbnail.jpg"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the service was created",
 *         example="2023-01-01 12:00:00"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the service was last updated",
 *         example="2023-01-01 12:00:00"
 *     )
 * )
 */
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
