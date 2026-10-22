<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_api_only_application_has_no_root_page(): void
    {
        $this->get('/')->assertNotFound();
    }

    public function test_anonymous_requests_cannot_read_the_current_user(): void
    {
        $this->getJson('/api/user')->assertUnauthorized();
    }

    public function test_anonymous_requests_cannot_create_articles(): void
    {
        $this->postJson('/api/articles', ['title' => 'Unauthorized'])->assertUnauthorized();
    }

    public function test_anonymous_requests_cannot_upload_images(): void
    {
        $this->postJson('/api/upload-images')->assertUnauthorized();
    }
}
