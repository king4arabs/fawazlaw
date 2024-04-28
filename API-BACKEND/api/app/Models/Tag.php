<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *     title="Tag",
 *     description="Tag model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         format="int64",
 *         description="The unique identifier for the tag",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The name of the tag",
 *         example="Sample Tag Name"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the tag was created",
 *         example="2023-01-01 12:00:00"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the tag was last updated",
 *         example="2023-01-01 12:00:00"
 *     )
 * )
 */
class Tag extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
}
