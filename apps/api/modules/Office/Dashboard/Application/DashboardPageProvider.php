<?php

namespace Modules\Office\Dashboard\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class DashboardPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::dashboard(
                '/office',
                'لوحة التحكم',
                'نفس هيكل الداشبورد الأصلي مع بطاقات مؤشرات ورسوم تحليلية رئيسية.',
                [
                    ['label' => 'العملاء', 'value' => '33', 'hint' => 'إجمالي العملاء', 'tone' => 'blue'],
                    ['label' => 'القضايا', 'value' => '2', 'hint' => 'جميع القضايا', 'tone' => 'blue'],
                    ['label' => 'الخدمات قيد التنفيذ', 'value' => '6', 'hint' => 'نشطة / قيد العمل', 'tone' => 'green'],
                    ['label' => 'الموظفون', 'value' => '10', 'hint' => 'المستخدمون', 'tone' => 'blue'],
                    ['label' => 'المهام قيد التنفيذ', 'value' => '1', 'hint' => 'عمل جار', 'tone' => 'blue'],
                    ['label' => 'المهام قيد الانتظار', 'value' => '2', 'hint' => 'مهام مجدولة', 'tone' => 'amber'],
                    ['label' => 'المهام مكتملة', 'value' => '1', 'hint' => 'تم الإنجاز', 'tone' => 'green'],
                    ['label' => 'المهام متوقفة', 'value' => '1', 'hint' => 'تحتاج متابعة', 'tone' => 'red'],
                ],
                [
                    [
                        'title' => 'القضايا: المفتوحة مقابل المغلقة (آخر 12 شهرًا)',
                        'kind' => 'line',
                        'labels' => ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        'values' => [0, 0, 0, 0, 0, 0, 1, 8, 3, 6, 5, 2],
                    ],
                    [
                        'title' => 'العملاء الجدد (آخر 12 شهرًا)',
                        'kind' => 'line',
                        'labels' => ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        'values' => [0, 0, 0, 0, 0, 0, 1, 13, 2, 9, 7, 2],
                    ],
                    [
                        'title' => 'المصروفات (آخر 12 شهرًا)',
                        'kind' => 'line',
                        'labels' => ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        'values' => [0, 0, 0, 0, 0, 0, 15, 300, 12, 0, 0, 0],
                    ],
                    [
                        'title' => 'الفواتير حسب الحالة',
                        'kind' => 'donut',
                        'labels' => ['Draft', 'Sent', 'Paid', 'Void'],
                        'values' => [3, 18, 7, 1],
                    ],
                ],
            ),
        ];
    }
}
