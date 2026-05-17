<?php

namespace Modules\Office\Finance\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class FinancePageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::table(
                '/office/services',
                'الخدمات',
                'قائمة الخدمات القانونية المعروضة للعملاء مع الأسعار والحالة.',
                ['بحث', 'الفئة', 'الحالة'],
                ['إضافة خدمة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الخدمة'],
                    ['key' => 'category', 'label' => 'الفئة'],
                    ['key' => 'price', 'label' => 'السعر'],
                    ['key' => 'status', 'label' => 'الحالة'],
                ]),
                [
                    ['name' => 'استشارة قانونية', 'category' => 'استشارات', 'price' => '250 SAR', 'status' => 'نشط'],
                    ['name' => 'صياغة عقد', 'category' => 'عقود', 'price' => '1,500 SAR', 'status' => 'نشط'],
                ],
            ),
            PageBuilder::table(
                '/office/subscription-plans',
                'خطط الاشتراك',
                'إدارة خطط الاشتراك المتاحة مع الحالة والسعر والترويج.',
                ['بحث', 'التوفر'],
                ['إعادة ضبط التصفيات', 'تطبيق الأعمدة', 'حذف'],
                PageBuilder::columns([
                    ['key' => 'title', 'label' => 'الخطة'],
                    ['key' => 'price', 'label' => 'السعر'],
                    ['key' => 'available', 'label' => 'التوفر'],
                    ['key' => 'promoted', 'label' => 'مروجة'],
                    ['key' => 'createdAt', 'label' => 'تاريخ الإنشاء'],
                ]),
                [
                    ['title' => 'الخطة الأساسية', 'price' => '499 SAR', 'available' => 'نشط', 'promoted' => 'لا', 'createdAt' => 'يناير 2026'],
                    ['title' => 'الخطة الاحترافية', 'price' => '899 SAR', 'available' => 'نشط', 'promoted' => 'نعم', 'createdAt' => 'فبراير 2026'],
                ],
            ),
            PageBuilder::table(
                '/office/finance/invoices',
                'الفواتير',
                'صفحة الفواتير مع التصدير، فلاتر الخدمة والمدى الزمني والأعمدة الأساسية.',
                ['بحث', 'نوع الخدمة', 'المدى الزمني'],
                ['تصدير إكسل', 'تطبيق التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'number', 'label' => 'الرقم'],
                    ['key' => 'client', 'label' => 'العميل'],
                    ['key' => 'issueDate', 'label' => 'الإصدار'],
                    ['key' => 'dueDate', 'label' => 'الاستحقاق'],
                    ['key' => 'total', 'label' => 'الإجمالي'],
                    ['key' => 'status', 'label' => 'الحالة'],
                ]),
                [
                    ['number' => 'INV-1008', 'client' => 'شركة الرؤية', 'issueDate' => '02 مايو 2026', 'dueDate' => '12 مايو 2026', 'total' => '8,200 SAR', 'status' => 'Sent'],
                    ['number' => 'INV-1007', 'client' => 'Mohamed Sa’ed', 'issueDate' => '29 أبريل 2026', 'dueDate' => '09 مايو 2026', 'total' => '1,500 SAR', 'status' => 'Paid'],
                    ['number' => 'INV-1006', 'client' => 'Fatmahf', 'issueDate' => '25 أبريل 2026', 'dueDate' => '05 مايو 2026', 'total' => '250 SAR', 'status' => 'Draft'],
                ],
            ),
            PageBuilder::table(
                '/office/finance/expenses',
                'المصروفات',
                'المصروفات مع تحديث الفوترة والملاحظات وربط العميل والعملة وقابلية الفوترة.',
                ['بحث', 'الفئة', 'العميل'],
                ['تطبيق الأعمدة', 'تحديث الفوترة والملاحظات'],
                PageBuilder::columns([
                    ['key' => 'date', 'label' => 'التاريخ'],
                    ['key' => 'category', 'label' => 'الفئة'],
                    ['key' => 'amount', 'label' => 'المبلغ'],
                    ['key' => 'client', 'label' => 'العميل'],
                    ['key' => 'billable', 'label' => 'فوترة'],
                    ['key' => 'owner', 'label' => 'القائم'],
                ]),
                [
                    ['date' => '15 مايو 2026', 'category' => 'رسوم محكمة', 'amount' => '300 SAR', 'client' => 'شركة الرؤية', 'billable' => 'نعم', 'owner' => 'أ. فواز'],
                    ['date' => '10 مايو 2026', 'category' => 'طباعة ومستندات', 'amount' => '120 SAR', 'client' => 'Mohamed Sa’ed', 'billable' => 'لا', 'owner' => 'أ. ليلى'],
                ],
            ),
            PageBuilder::table(
                '/office/finance/payrolls',
                'دفعات الرواتب',
                'دفعات الرواتب المالية مع الفترة والحالة ومجموع الصافي.',
                ['الحالة'],
                ['تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'periodStart', 'label' => 'بداية الفترة'],
                    ['key' => 'periodEnd', 'label' => 'نهاية الفترة'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'processedAt', 'label' => 'تاريخ المعالجة'],
                    ['key' => 'netAmount', 'label' => 'صافي الدفعات'],
                ]),
                [
                    ['periodStart' => '01 مايو 2026', 'periodEnd' => '31 مايو 2026', 'status' => 'قيد الانتظار', 'processedAt' => '-', 'netAmount' => '58,000 SAR'],
                    ['periodStart' => '01 أبريل 2026', 'periodEnd' => '30 أبريل 2026', 'status' => 'تم', 'processedAt' => '01 مايو 2026', 'netAmount' => '57,500 SAR'],
                ],
            ),
        ];
    }
}
