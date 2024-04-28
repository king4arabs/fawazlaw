<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormSubmitted;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * @OA\Post(
     *     path="/contacts",
     *     summary="Submit a contact form",
     *     tags={"Contacts"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "message"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="phone_number", type="string", example="1234567890"),
     *             @OA\Property(property="message", type="string", example="This is a test message"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contact form submitted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Contact form submitted successfully"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         ),
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validatedData);

        // Send email copy
        Mail::to('abderrahman4bouichou@gmail.com')->send(new ContactFormSubmitted($contact));

        return response()->json(['message' => 'Contact form submitted successfully'], 200);
    }
    /**
     * @OA\Patch(
     *     path="/contacts/{id}/mark-as-done",
     *     summary="Mark a contact message as done",
     *     tags={"Contacts"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the contact message",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Message marked as done",
     *         @OA\JsonContent(type="object", example={"message": "Message marked as done"})
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Message not found",
     *         @OA\JsonContent(type="object", example={"error": "Message not found"})
     *     ),
     * )
     */
    public function markAsDone($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_done' => 1]);

        return response()->json(['message' => 'Message marked as done'], 200);
    }
    /**
     * @OA\Patch(
     *     path="/contacts/{id}/mark-as-undone",
     *     summary="Mark a contact message as undone",
     *     tags={"Contacts"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the contact message",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Message marked as undone",
     *         @OA\JsonContent(type="object", example={"message": "Message marked as undone"})
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Message not found",
     *         @OA\JsonContent(type="object", example={"error": "Message not found"})
     *     ),
     * )
     */
    public function markAsUnDone($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_done' => 0]);

        return response()->json(['message' => 'Message marked as Undone'], 200);
    }
}
