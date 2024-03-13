<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submitted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
        p {
            color: #666666;
            margin-bottom: 10px;
        }
        strong {
            color: #333333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Contact Form Submitted</h2>
        <p><strong>Name:</strong> {{ $contact['name'] }}</p>
        <p><strong>Email:</strong> {{ $contact['email'] }}</p>
        @if ($contact['phone_number'])
            <p><strong>Phone Number:</strong> {{ $contact['phone_number'] }}</p>
        @endif
        <p><strong>Message:</strong> {{ $contact['message'] }}</p>
    </div>
</body>
</html>
