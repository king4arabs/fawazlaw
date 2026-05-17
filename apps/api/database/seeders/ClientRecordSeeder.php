<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Office\Crm\Domain\Models\ClientRecord;

class ClientRecordSeeder extends Seeder
{
    public function run(): void
    {
        if (ClientRecord::query()->exists()) {
            return;
        }

        ClientRecord::query()->insert([
            [
                'name' => 'Mohamed Sa’ed',
                'type' => 'فرد',
                'status' => 'نشط',
                'phone' => '0500000001',
                'email' => 'mohamed@example.com',
                'company_name' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'شركة الرؤية',
                'type' => 'شركة',
                'status' => 'نشط',
                'phone' => '0500000002',
                'email' => 'contact@vision.sa',
                'company_name' => 'شركة الرؤية',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fatmahf',
                'type' => 'فرد',
                'status' => 'نشط',
                'phone' => '0500000003',
                'email' => 'fatmahf@example.com',
                'company_name' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
