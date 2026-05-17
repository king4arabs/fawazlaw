<?php

namespace Modules\Office\Catalog\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class CatalogPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::table(
                '/office/case-types',
                'أنواع القضايا',
                'تعريفات أنواع القضايا مع تصفية الاستخدام الحالي.',
                ['بحث', 'له قضايا'],
                ['إعادة ضبط التصفيات', 'تطبيق التصفيات'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'النوع'],
                    ['key' => 'department', 'label' => 'القسم'],
                    ['key' => 'used', 'label' => 'الاستخدام'],
                ]),
                [
                    ['name' => 'تجاري', 'department' => 'القضايا', 'used' => 'نعم'],
                    ['name' => 'عمالي', 'department' => 'القضايا', 'used' => 'نعم'],
                    ['name' => 'أحوال شخصية', 'department' => 'القضايا', 'used' => 'لا'],
                ],
            ),
            PageBuilder::table(
                '/office/courts',
                'المحاكم',
                'مرجع المحاكم مع التصفية حسب المدينة كما في النظام الحقيقي.',
                ['بحث', 'المدينة'],
                ['إعادة ضبط التصفيات', 'تطبيق التصفيات'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'المحكمة'],
                    ['key' => 'city', 'label' => 'المدينة'],
                    ['key' => 'type', 'label' => 'النوع'],
                ]),
                [
                    ['name' => 'المحكمة التجارية', 'city' => 'الرياض', 'type' => 'تجاري'],
                    ['name' => 'المحكمة العمالية', 'city' => 'الرياض', 'type' => 'عمالي'],
                    ['name' => 'محكمة الأحوال الشخصية', 'city' => 'جدة', 'type' => 'أحوال شخصية'],
                ],
            ),
            PageBuilder::table(
                '/office/form-templates',
                'النماذج',
                'قوالب جاهزة للمستندات القانونية مع حالة فارغة قابلة للتطوير.',
                ['بحث'],
                ['إضافة نموذج'],
                PageBuilder::columns([
                    ['key' => 'title', 'label' => 'العنوان'],
                    ['key' => 'category', 'label' => 'التصنيف'],
                    ['key' => 'updatedAt', 'label' => 'آخر تحديث'],
                ]),
                [
                    ['title' => 'نموذج توكيل', 'category' => 'وكالات', 'updatedAt' => '10 مايو 2026'],
                    ['title' => 'نموذج اتفاقية أتعاب', 'category' => 'عقود', 'updatedAt' => '08 مايو 2026'],
                ],
            ),
            PageBuilder::table(
                '/office/document-categories',
                'فئات المستندات',
                'فئات مرجعية لتنظيم أرشيف المكتب ومستندات العملاء.',
                ['بحث'],
                ['عرض'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الفئة'],
                    ['key' => 'visibility', 'label' => 'الظهور'],
                    ['key' => 'documents', 'label' => 'عدد المستندات'],
                ]),
                [
                    ['name' => 'عقود', 'visibility' => 'مشترك', 'documents' => '14'],
                    ['name' => 'تفويضات', 'visibility' => 'داخلي', 'documents' => '7'],
                ],
            ),
        ];
    }
}
