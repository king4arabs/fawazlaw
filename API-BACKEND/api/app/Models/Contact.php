<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 *     title="Contact",
 *     description="Contact model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         format="int64",
 *         description="The unique identifier for the contact",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The name of the contact",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         description="The email address of the contact",
 *         example="john@example.com"
 *     ),
 *     @OA\Property(
 *         property="phone_number",
 *         type="string",
 *         nullable=true,
 *         description="The phone number of the contact",
 *         example="123456789"
 *     ),
 *     @OA\Property(
 *         property="message",
 *         type="string",
 *         description="The message sent by the contact",
 *         example="This is a sample message"
 *     ),
 *     @OA\Property(
 *         property="is_done",
 *         type="boolean",
 *         description="Indicates whether the contact is done or not",
 *         example=false
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the contact was created",
 *         example="2023-01-01 12:00:00"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the contact was last updated",
 *         example="2023-01-01 12:00:00"
 *     )
 * )
 */
class Contact extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email','phone_number', 'message', 'is_done'];    
}
