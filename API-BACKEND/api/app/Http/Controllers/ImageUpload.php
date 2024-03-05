<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUpload extends Controller
{
    /**
     * Upload image and return its path.
     */
    public function upload(Request $request)
    {
        try {
            // Validate the incoming request data (if needed)

            // Check if image is provided in the request
            if ($request->hasFile('image')) {
                // Upload the image
                $imagePath = $request->file('image')->store('public/images');
                $imageUrl = asset('storage/' . str_replace('public/', '', $imagePath));
                // Return the image path and url as a JSON response
                return response()->json(['image_path' => $imagePath, 'image_url' => $imageUrl], 201);
            }

            // If no image is provided in the request, return an error response
            return response()->json(['error' => 'No image provided'], 400);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => 'Failed to upload image'], 500);
        }
    }
}
