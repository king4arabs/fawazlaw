<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
/**
 * @OA\Schema(
 *     schema="ArticleInput",
 *     required={"title", "content"},
 *     @OA\Property(property="title", type="string", maxLength=255),
 *     @OA\Property(property="content", type="string")
 * )
 */
class ArticleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/articles",
     *     summary="Get all articles",
     *     tags={"Articles"},
     *     @OA\Response(
     *         response=200,
     *         description="List of articles",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Article")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $articles = Article::with('tags')->get();
        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
/**
 * Store a newly created resource in storage.
 *
 * @OA\Post(
 *     path="/articles",
 *     summary="Create a new article",
 *     tags={"Articles"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/ArticleInput")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Article created successfully",
 *         @OA\JsonContent(ref="#/components/schemas/Article")
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="errors", type="object", example={"title": {"The title field is required."}})
 *         )
 *     ),
 *     security={{"bearerAuth": {}}}
 * )
 */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);


        // Create a new article with the validated data
        $article = Article::create($validatedData);

        // Load the related data (e.g., author, tags) for the created article
        $article->load('tags');

        return response()->json($article, 201);
    }

    /**
     * @OA\Get(
     *     path="/articles/{id}",
     *     summary="Get a specific article",
     *     tags={"Articles"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the article",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Article found",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article not found",
     *         @OA\JsonContent(type="object", example={"error": "Article not found"})
     *     ),
     * )
     */
    public function show(string $id)
    {
        try {
            // Find the article by its ID
            $article = Article::findOrFail($id);

            // Return the article as a JSON response
            return response()->json($article);
        } catch (\Exception $e) {
            // Handle the case where the article is not found
            return response()->json(['error' => 'Article not found'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Find the article by its ID
        $article = Article::findOrFail($id);

        // Load the related data (e.g., author, tags) for the article
        $article->load('tags');

        // Return the article for editing (if needed)
        return response()->json($article);
    }

    /**
     * @OA\Put(
     *     path="/articles/{id}",
     *     summary="Update a specific article",
     *     tags={"Articles"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the article",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ArticleInput")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Article updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article not found",
     *         @OA\JsonContent(type="object", example={"error": "Article not found"})
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object", example={"title": {"The title field is required."}})
     *         )
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
            ]);

            // Find the article by its ID
            $article = Article::findOrFail($id);

            // Update the article with the validated data
            $article->update($validatedData);

            // Load the related data (e.g., author, tags) for the updated article
            $article->load('tags');

            // Return the updated article as a JSON response
            return response()->json($article);
        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json(['errors' => $e->validator->errors()], 422);
        } catch (ModelNotFoundException $e) {
            // Handle the case where the article is not found
            return response()->json(['error' => 'Article not found'], 404);
        }
    }

    /**
     * @OA\Delete(
     *     path="/articles/{id}",
     *     summary="Delete a specific article",
     *     tags={"Articles"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the article",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Article deleted successfully",
     *         @OA\JsonContent(type="object", example={"message": "Article deleted successfully"})
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article not found",
     *         @OA\JsonContent(type="object", example={"error": "Article not found"})
     *     ),
     * )
     */
    public function destroy($id)
    {
        try {
            // Find the article by its ID
            $article = Article::findOrFail($id);
            // Delete the article
            $article->delete();

            // Return a success message or appropriate response
            return response()->json(['message' => 'Article deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Article not found'], 404);
        }
    }
}
