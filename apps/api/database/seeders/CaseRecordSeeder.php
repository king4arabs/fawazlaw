<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Office\Crm\Domain\Models\CaseRecord;

class CaseRecordSeeder extends Seeder
{
    public function run(): void
    {
        if (CaseRecord::query()->exists()) {
            return;
        }

        CaseRecord::query()->insert([
            [
                'reference' => 'CASE-2026-002',
                'client_name' => 'شركة الرؤية',
                'case_type' => 'تجاري',
                'court_name' => 'المحكمة التجارية بالرياض',
                'status' => 'مفتوحة',
                'owner_name' => 'أ. فواز',
                'opened_at' => '2026-05-02',
                'notes' => 'دعوى تعاقدية مرتبطة بخدمات تجارية.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'reference' => 'CASE-2026-001',
                'client_name' => 'محمد سعيد',
                'case_type' => 'عمالي',
                'court_name' => 'المحكمة العمالية',
                'status' => 'مغلقة',
                'owner_name' => 'أ. ليلى',
                'opened_at' => '2026-04-20',
                'notes' => 'تم إغلاق القضية بعد التسوية.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'reference' => 'CASE-2026-003',
                'client_name' => 'Fatmahf',
                'case_type' => 'أحوال شخصية',
                'court_name' => 'محكمة الأحوال الشخصية',
                'status' => 'قيد الانتظار',
                'owner_name' => 'أ. خالد',
                'opened_at' => '2026-05-11',
                'notes' => 'بانتظار استكمال المستندات من العميل.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
