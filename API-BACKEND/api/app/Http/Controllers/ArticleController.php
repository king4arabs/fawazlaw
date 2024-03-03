<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('tags', 'images')->get();
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
     * Display the specified resource.
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
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
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
