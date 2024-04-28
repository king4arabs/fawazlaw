<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Tag; // Import the Tag model
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    /**
     * @OA\Get(
     *     path="/tags",
     *     summary="Retrieve a list of tags",
     *     tags={"Tags"},
     *     @OA\Response(
     *         response=200,
     *         description="A list of tags",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Tag")
     *         )
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function index()
    {
        $tags = Tag::all(); // Retrieve all tags
        return response()->json($tags);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method is not typically used in API routes
    }

    /**
     * @OA\Post(
     *     path="/tags",
     *     summary="Create a new tag",
     *     tags={"Tags"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Tag name")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="The created tag",
     *         @OA\JsonContent(ref="#/components/schemas/Tag")
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
        ]);

        return response()->json($tag, 201); // Return the newly created tag with status code 201
    }

    /**
     * @OA\Get(
     *     path="/tags/{id}",
     *     summary="Retrieve a specific tag",
     *     tags={"Tags"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the tag",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="The specified tag",
     *         @OA\JsonContent(ref="#/components/schemas/Tag")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tag not found"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function show(string $id)
    {
        $tag = Tag::findOrFail($id); // Find the tag by ID
        return response()->json($tag);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // This method is not typically used in API routes
    }

    /**
     * @OA\Put(
     *     path="/tags/{id}",
     *     summary="Update a specific tag",
     *     tags={"Tags"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the tag",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Updated tag name")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="The updated tag",
     *         @OA\JsonContent(ref="#/components/schemas/Tag")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tag not found"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function update(Request $request, string $id)
    {
        $tag = Tag::findOrFail($id); // Find the tag by ID
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tag->update([
            'name' => $request->name,
        ]);

        return response()->json($tag, 200); // Return the updated tag with status code 200
    }

    /**
     * @OA\Delete(
     *     path="/tags/{id}",
     *     summary="Delete a specific tag",
     *     tags={"Tags"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the tag",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Tag deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tag not found"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id); // Find the tag by ID
        $tag->delete(); // Delete the tag
        return response()->json(null, 204); // Return a null response with status code 204 (no content)
    }
    /**
     * @OA\Post(
     *     path="/tags/link",
     *     summary="Link a tag to an article",
     *     tags={"Tags"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"article_id", "tag_id"},
     *             @OA\Property(property="article_id", type="integer", example=1),
     *             @OA\Property(property="tag_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tag linked successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Tag linked successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Article or tag not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function linkTagArticle(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'article_id' => 'required|exists:articles,id',
            'tag_id' => 'required|exists:tags,id',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Retrieve the article and tag based on the provided IDs
        $article = Article::find($request->article_id);
        $tag = Tag::find($request->tag_id);

        // Check if article and tag exist
        if (!$article || !$tag) {
            return response()->json(['error' => 'Article or tag not found'], 404);
        }

        // Check if the tag is already linked with the article
        if ($article->tags()->where('tag_id', $tag->id)->exists()) {
            return response()->json(['message' => 'Tag already linked with the article'], 200);
        }

        // Link the tag with the article and set the created_at attribute
        DB::table('article_tag')->insert([
            'article_id' => $article->id,
            'tag_id' => $tag->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Return a success response
        return response()->json(['message' => 'Tag linked successfully'], 200);
    }
}
