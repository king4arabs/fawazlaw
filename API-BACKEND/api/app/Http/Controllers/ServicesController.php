<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceCategoryMapping;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    public function index()
    {
        return response()->json(Service::all());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'currency' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('public/services_thumbnails');
            $validatedData['thumbnail'] = $thumbnailPath;
        }
        $service = Service::create($validatedData);

        return response()->json($service, 201);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);

        return response()->json($service);
    }
    public function servicesByCategory($category_id)
    {
        try {
            // Find the service category by its ID and eager load the associated services
            $category = ServiceCategory::with('services')->findOrFail($category_id);
    
            // Return the category with its associated services
            return response()->json(['category' => $category, 'services' => $category->services]);
        } catch (\Exception $e) {
            // Handle any exceptions, such as category not found
            return response()->json(["error" => "Category not found"], 404);
        }
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'currency' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('public/services_thumbnails');
            $validatedData['thumbnail'] = $thumbnailPath;
        }
        $service = Service::findOrFail($id);


        $service->update($validatedData);

        return response()->json($service, 200);
    }
    //this function is to for linking service with it category
    public function mapServiceToCategory(Request $request)
    {
        $validatedData = $request->validate([
            'service_id' => 'required|exists:services,id',
            'category_id' => 'required|exists:service_categories,id'
        ]);
        // Check if there is already a record with the provided service ID and category ID
        $existingMapping = ServiceCategoryMapping::where('service_id', $validatedData['service_id'])
            ->where('category_id', $validatedData['category_id'])
            ->first();
        // If a record already exists, return an error response
        if ($existingMapping) {
            return response()->json([
                'error' => 'This service is already mapped to the provided category.'
            ], 409); // HTTP 409 Conflict status code
        }
        // Create a new record in the service_categories table
        ServiceCategoryMapping::create([
            'service_id' => $validatedData['service_id'],
            'category_id' => $validatedData['category_id']
        ]);
        // Once the mapping is done, return a success response
        return response()->json([
            'message' => 'Service successfully mapped to the category.'
        ], 201); // HTTP 201 Created status code
    }
    public function unmapServiceToCategory(Request $request) {
        $validatedData = $request->validate([
            'service_id' => 'required|exists:services,id',
            'category_id' => 'required|exists:service_categories,id'
        ]);
    
        // Find the mapping record
        $mapping = ServiceCategoryMapping::where('service_id', $validatedData['service_id'])
            ->where('category_id', $validatedData['category_id'])
            ->first();
    
        // If mapping exists, delete it
        if ($mapping) {
            $mapping->delete();
            return response()->json([
                'message' => 'Service successfully unmapped from the category.'
            ]);
        } else {
            return response()->json([
                'error' => 'No mapping found for the provided service and category.'
            ], 404); // HTTP 404 Not Found status code
        }
    }
    public function destroy($id)
    {
        try {
            $service = Service::find($id);

            if (!$service) {
                return response()->json(["message" => "Service not found"], 404);
            }

            $service->delete();

            return response()->json(["message" => "Service deleted successfully"], 200);
        } catch (\Exception $e) {
            return response()->json(["message" => "Failed to delete service: " . $e->getMessage()], 500);
        }
    }
}
