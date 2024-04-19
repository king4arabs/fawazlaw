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
    /**
     * @OA\Get(
     *     path="/services",
     *     summary="Retrieve a list of services",
     *     tags={"Services"},
     *     @OA\Response(
     *         response=200,
     *         description="A list of services",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Service")
     *         )
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function index()
    {
        return response()->json(Service::all());
    }
    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/services",
     *     summary="Create a new service",
     *     tags={"Services"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Service data",
     *         @OA\JsonContent(
     *             required={"name", "price"},
     *             @OA\Property(property="name", type="string", example="Service Name"),
     *             @OA\Property(property="description", type="string", example="Service Description"),
     *             @OA\Property(property="price", type="number", example=100.50),
     *             @OA\Property(property="currency", type="string", example="USD"),
     *             @OA\Property(property="thumbnail", type="string", example="service_thumbnail.jpg"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="The created service",
     *         @OA\JsonContent(ref="#/components/schemas/Service")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         )
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
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
    /**
     * @OA\Get(
     *     path="/services/{id}",
     *     summary="Retrieve a specific service",
     *     tags={"Services"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the service",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="The specified service",
     *         @OA\JsonContent(ref="#/components/schemas/Service")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Service not found"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
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
    /**
     * Update a specific service.
     *
     * @OA\Put(
     *     path="/services/{id}",
     *     summary="Update a specific service",
     *     tags={"Services"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the service",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Service data",
     *         @OA\JsonContent(
     *             required={"name", "price"},
     *             @OA\Property(property="name", type="string", example="Updated Service Name"),
     *             @OA\Property(property="description", type="string", example="Updated Service Description"),
     *             @OA\Property(property="price", type="number", example=150.75),
     *             @OA\Property(property="currency", type="string", example="USD"),
     *             @OA\Property(property="thumbnail", type="string", example="updated_service_thumbnail.jpg"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="The updated service",
     *         @OA\JsonContent(ref="#/components/schemas/Service")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Service not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         )
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
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
    /**
     * @OA\Post(
     *     path="/services/map-category",
     *     summary="Map a service to a category",
     *     tags={"Services"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"service_id", "category_id"},
     *             @OA\Property(property="service_id", type="integer", description="ID of the service"),
     *             @OA\Property(property="category_id", type="integer", description="ID of the category")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Service successfully mapped to the category"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No mapping found for the provided service and category"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
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
    /**
     * @OA\Post(
     *     path="/services/unmap-category",
     *     summary="Unmap a service from a category",
     *     tags={"Services"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"service_id", "category_id"},
     *             @OA\Property(property="service_id", type="integer", description="ID of the service"),
     *             @OA\Property(property="category_id", type="integer", description="ID of the category")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Service successfully unmapped from the category"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No mapping found for the provided service and category"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function unmapServiceToCategory(Request $request)
    {
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
    /**
     * @OA\Delete(
     *     path="/services/{id}",
     *     summary="Delete a specific service",
     *     tags={"Services"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the service",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Service deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Service not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Failed to delete service"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
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
