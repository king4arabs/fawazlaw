<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/service-categories",
     *     summary="Get a list of service categories",
     *     tags={"Service Categories"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/ServiceCategory")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $serviceCategories = ServiceCategory::all();
        return response()->json($serviceCategories);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/service-categories",
     *     summary="Create a new service category",
     *     tags={"Service Categories"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Service category data",
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Category Name"),
     *             @OA\Property(property="description", type="string", example="Category Description"),
     *             @OA\Property(property="thumbnail", type="string", example="thumbnail.jpg"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Service category created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/ServiceCategory")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         )
     *     ),
     * )
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
     * @OA\Get(
     *     path="/service-categories/{serviceCategory}",
     *     summary="Get a specific service category",
     *     tags={"Service Categories"},
     *     @OA\Parameter(
     *         name="serviceCategory",
     *         in="path",
     *         required=true,
     *         description="ID of the service category",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/ServiceCategory")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Service category not found",
     *         @OA\JsonContent(type="object", example={"error": "Service category not found"})
     *     ),
     * )
     */
    public function show(ServiceCategory $serviceCategory)
    {
        return response()->json($serviceCategory);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/service-categories/{serviceCategory}",
     *     summary="Update a specific service category",
     *     tags={"Service Categories"},
     *     @OA\Parameter(
     *         name="serviceCategory",
     *         in="path",
     *         required=true,
     *         description="ID of the service category",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Service category data",
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Updated Category Name"),
     *             @OA\Property(property="description", type="string", example="Updated Category Description"),
     *             @OA\Property(property="thumbnail", type="string", example="updated_thumbnail.jpg"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Service category updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/ServiceCategory")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Service category not found",
     *         @OA\JsonContent(type="object", example={"error": "Service category not found"})
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         )
     *     ),
     * )
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
     * @OA\Delete(
     *     path="/service-categories/{id}",
     *     summary="Delete a specific service category",
     *     tags={"Service Categories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the service category",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Service category deleted successfully",
     *         @OA\JsonContent(type="object", example={"message": "Service category deleted successfully"})
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Service category not found",
     *         @OA\JsonContent(type="object", example={"error": "Service category not found"})
     *     ),
     * )
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

        if ($delete) {
            return response()->json(['message' => 'Service category deleted successfully'], 200);
        }
        return response()->json(['error' => 'Failed to delete service category'], 500);
    }
}
