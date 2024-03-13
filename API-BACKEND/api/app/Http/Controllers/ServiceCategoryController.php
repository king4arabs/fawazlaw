<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceCategories = ServiceCategory::all();
        return response()->json($serviceCategories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:service_categories,name',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Maximum file size of 2MB
        ]);

        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('public/service_categories_thumbnails');
            $validatedData['thumbnail'] = $thumbnailPath;
        }

        $serviceCategory = ServiceCategory::create($validatedData);
        return response()->json($serviceCategory, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceCategory $serviceCategory)
    {
        return response()->json($serviceCategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceCategory $serviceCategory)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Maximum file size of 2MB
        ]);

        if ($request->hasFile('thumbnail')) {
            Storage::delete($serviceCategory->thumbnail); // Delete old thumbnail
            $thumbnailPath = $request->file('thumbnail')->store('public/thumbnails');
            $validatedData['thumbnail'] = $thumbnailPath;
        }

        $serviceCategory->update($validatedData);
        return response()->json($serviceCategory, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the service category by ID
        $serviceCategory = ServiceCategory::find($id);

        // If the service category doesn't exist, return a 404 error response
        if (!$serviceCategory) {
            return response()->json(['error' => 'Service category not found'], 404);
        }
        $delete = $serviceCategory->delete();
        
        if($delete) {
            return response()->json(['message' => 'Service category deleted successfully'], 200);
        }
        return response()->json(['error' => 'Failed to delete service category'], 500);

    }
}
