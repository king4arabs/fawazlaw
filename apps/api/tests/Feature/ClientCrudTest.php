<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_clients(): void
    {
        $this->seed();

        $response = $this->getJson('/api/office/clients');

        $response
            ->assertOk()
            ->assertJsonPath('meta.total', 3)
            ->assertJsonCount(3, 'data');
    }

    public function test_it_creates_client(): void
    {
        $response = $this->postJson('/api/office/clients', [
            'name' => 'عميل تجريبي',
            'type' => 'شركة',
            'status' => 'نشط',
            'phone' => '0500000009',
            'email' => 'demo-client@example.com',
            'company_name' => 'شركة تجريبية',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.email', 'demo-client@example.com');

        $this->assertDatabaseHas('client_records', [
            'email' => 'demo-client@example.com',
        ]);
    }

    public function test_it_updates_client(): void
    {
        $this->seed();

        $response = $this->putJson('/api/office/clients/1', [
            'name' => 'Mohamed Sa’ed Updated',
            'type' => 'فرد',
            'status' => 'معلق',
            'phone' => '0500000101',
            'email' => 'mohamed@example.com',
            'company_name' => null,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.name', 'Mohamed Sa’ed Updated')
            ->assertJsonPath('data.status', 'معلق');
    }

    public function test_it_deletes_client(): void
    {
        $this->seed();

        $response = $this->deleteJson('/api/office/clients/1');

        $response->assertOk();

        $this->assertDatabaseMissing('client_records', [
            'id' => 1,
        ]);
    }
}
