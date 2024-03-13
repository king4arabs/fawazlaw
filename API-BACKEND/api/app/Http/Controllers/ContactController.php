<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormSubmitted;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
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
    public function markAsDone($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_done' => 1]);

        return response()->json(['message'=>'Message marked as done'], 200);
    }
    public function markAsUnDone($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_done' => 0]);

        return response()->json(['message'=>'Message marked as Undone'], 200);
    }
}
