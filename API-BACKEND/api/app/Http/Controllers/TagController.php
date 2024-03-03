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
     * Display a listing of the resource.
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
     * Store a newly created resource in storage.
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
     * Display the specified resource.
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
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id); // Find the tag by ID
        $tag->delete(); // Delete the tag
        return response()->json(null, 204); // Return a null response with status code 204 (no content)
    }

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
