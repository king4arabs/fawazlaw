<?php

namespace Modules\Office\Documents\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class DocumentsPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::archive(
                '/office/archive',
                'الأرشيف',
                'عرض بصري للأرشيف مع مجلدات رئيسية وآخر الملفات المؤرشفة.',
                [
                    ['name' => 'العقود', 'count' => '12 ملفًا'],
                    ['name' => 'القضايا المغلقة', 'count' => '8 ملفات'],
                    ['name' => 'مستندات العملاء', 'count' => '21 ملفًا'],
                ],
                [
                    ['title' => 'عقد تأسيس شركة المسار', 'category' => 'العقود', 'owner' => 'أ. فواز', 'updatedAt' => 'منذ يومين'],
                    ['title' => 'لائحة استئناف - CASE-2026-001', 'category' => 'القضايا المغلقة', 'owner' => 'أ. ليلى', 'updatedAt' => 'منذ أسبوع'],
                ],
            ),
            PageBuilder::table(
                '/office/documents',
                'المستندات',
                'إدارة المستندات مع البحث، الفلاتر، الرؤية، والحذف الجماعي.',
                ['بحث', 'نوع الارتباط', 'الفئة', 'الظهور', 'العميل'],
                ['الإجراءات', 'حذف المحدد', 'تطبيق التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'title', 'label' => 'العنوان'],
                    ['key' => 'category', 'label' => 'الفئة'],
                    ['key' => 'visibility', 'label' => 'الظهور'],
                    ['key' => 'client', 'label' => 'العميل'],
                    ['key' => 'owner', 'label' => 'المالك'],
                    ['key' => 'updatedAt', 'label' => 'آخر تحديث'],
                ]),
                [
                    ['title' => 'عقد بيع نهائي', 'category' => 'عقود', 'visibility' => 'داخلي', 'client' => 'شركة الرؤية', 'owner' => 'أ. فواز', 'updatedAt' => '16 مايو 2026'],
                    ['title' => 'تفويض رسمي', 'category' => 'تفويضات', 'visibility' => 'مشترك', 'client' => 'Mohamed Sa’ed', 'owner' => 'أ. خالد', 'updatedAt' => '14 مايو 2026'],
                ],
            ),
        ];
    }
}
