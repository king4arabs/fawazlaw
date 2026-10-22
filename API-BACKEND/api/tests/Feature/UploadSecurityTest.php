<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UploadSecurityTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        Sanctum::actingAs(new User(['name' => 'Test administrator']));
    }

    public function test_executable_files_are_rejected_without_storage(): void
    {
        $this->postJson('/api/upload-images', [
            'image' => UploadedFile::fake()->create('payload.php', 1, 'application/x-httpd-php'),
        ])->assertUnprocessable()->assertJsonValidationErrors('image');
        $this->assertSame([], Storage::disk('public')->allFiles());
    }

    public function test_missing_and_oversized_images_are_rejected(): void
    {
        $this->postJson('/api/upload-images')->assertUnprocessable();
        $this->postJson('/api/upload-images', [
            'image' => UploadedFile::fake()->image('large.jpg')->size(5121),
        ])->assertUnprocessable()->assertJsonValidationErrors('image');
        $this->assertSame([], Storage::disk('public')->allFiles());
    }

    public function test_valid_images_keep_the_existing_response_contract(): void
    {
        $response = $this->postJson('/api/upload-images', [
            'image' => UploadedFile::fake()->image('photo.jpg'),
        ])->assertCreated()->assertJsonStructure(['image_path', 'image_url']);
        $path = $response->json('image_path');
        $this->assertStringStartsWith('public/images/', $path);
        Storage::disk('public')->assertExists(substr($path, strlen('public/')));
    }

    public function test_browser_posts_require_a_csrf_token(): void
    {
        $this->app['env'] = 'production';
        $this->post('/contact-us', [])->assertStatus(419);
    }
}
