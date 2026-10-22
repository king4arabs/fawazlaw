<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUpload extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $path = $request->file('image')->store('images', 'public');

        if ($path === false) {
            return response()->json(['error' => 'Failed to upload image'], 500);
        }

        return response()->json([
            'image_path' => 'public/' . $path,
            'image_url' => Storage::disk('public')->url($path),
        ], 201);
    }
}
