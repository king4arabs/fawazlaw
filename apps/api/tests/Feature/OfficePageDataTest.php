<?php

namespace Tests\Feature;

use Tests\TestCase;

class OfficePageDataTest extends TestCase
{
    public function test_it_returns_dashboard_page_data(): void
    {
        $response = $this->getJson('/api/office/page-data?path=/office');

        $response
            ->assertOk()
            ->assertJsonPath('path', '/office')
            ->assertJsonPath('pageType', 'dashboard')
            ->assertJsonCount(8, 'stats');
    }

    public function test_it_returns_cases_page_data(): void
    {
        $response = $this->getJson('/api/office/page-data?path=/office/cases');

        $response
            ->assertOk()
            ->assertJsonPath('path', '/office/cases')
            ->assertJsonPath('pageType', 'table')
            ->assertJsonPath('title', 'القضايا');
    }
}
