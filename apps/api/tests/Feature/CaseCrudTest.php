<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CaseCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_cases(): void
    {
        $this->seed();

        $response = $this->getJson('/api/office/cases');

        $response
            ->assertOk()
            ->assertJsonPath('meta.total', 3)
            ->assertJsonCount(3, 'data');
    }

    public function test_it_creates_case(): void
    {
        $response = $this->postJson('/api/office/cases', [
            'reference' => 'CASE-2026-009',
            'client_name' => 'عميل جديد',
            'case_type' => 'تجاري',
            'court_name' => 'المحكمة التجارية',
            'status' => 'مفتوحة',
            'owner_name' => 'أ. فواز',
            'opened_at' => '2026-05-16',
            'notes' => 'قضية جديدة للتجربة.',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.reference', 'CASE-2026-009');

        $this->assertDatabaseHas('case_records', [
            'reference' => 'CASE-2026-009',
        ]);
    }

    public function test_it_updates_case(): void
    {
        $this->seed();

        $response = $this->putJson('/api/office/cases/1', [
            'reference' => 'CASE-2026-002',
            'client_name' => 'شركة الرؤية المحدثة',
            'case_type' => 'تجاري',
            'court_name' => 'المحكمة التجارية بالرياض',
            'status' => 'قيد الانتظار',
            'owner_name' => 'أ. فواز',
            'opened_at' => '2026-05-02',
            'notes' => 'تم تحديث السجل.',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.client_name', 'شركة الرؤية المحدثة')
            ->assertJsonPath('data.status', 'قيد الانتظار');
    }

    public function test_it_deletes_case(): void
    {
        $this->seed();

        $response = $this->deleteJson('/api/office/cases/1');

        $response->assertOk();

        $this->assertDatabaseMissing('case_records', [
            'id' => 1,
        ]);
    }
}
