<?php

namespace Modules\Office\Tasks\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class TasksPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::board(
                '/office/tasks-board',
                'لوحة المهام',
                'تجسيد للوحة Kanban الأصلية مع أعمدة: لم تبدأ، جاري العمل، متوقفة، مكتملة.',
                ['ابدأ بالكتابة للبحث...', 'الكل', 'الأولوية', 'الموظف'],
                ['إعادة ضبط التصفيات', 'تطبيق التصفيات', 'إضافة مهمة'],
                [
                    [
                        'title' => 'لم تبدء',
                        'tasks' => [
                            ['title' => 'تحضير عقد الشراكة', 'meta' => 'قضية تجارية - موعد غدًا', 'priority' => 'قيد الانتظار', 'assignee' => 'أ. ليلى'],
                            ['title' => 'مراجعة مذكرة دفاع', 'meta' => 'جلسة بعد 3 أيام', 'priority' => 'مجدولة', 'assignee' => 'أ. فواز'],
                        ],
                    ],
                    [
                        'title' => 'جاري العمل',
                        'tasks' => [
                            ['title' => 'متابعة مستندات العميل', 'meta' => 'الرياض - شركة الرؤية', 'priority' => 'نشط', 'assignee' => 'أ. سارة'],
                        ],
                    ],
                    [
                        'title' => 'متوقفة',
                        'tasks' => [
                            ['title' => 'اعتماد ميزانية القضية', 'meta' => 'بانتظار موافقة العميل', 'priority' => 'متوقفة', 'assignee' => 'أ. خالد'],
                        ],
                    ],
                    [
                        'title' => 'مكتملة',
                        'tasks' => [
                            ['title' => 'إرسال إشعار الجلسة', 'meta' => 'تم التحديث على الملف', 'priority' => 'مكتملة', 'assignee' => 'أ. فواز'],
                        ],
                    ],
                ],
            ),
            PageBuilder::calendar(
                '/office/calendar',
                'التقويم',
                'عرض شهري قريب من صفحة التقويم الأصلية مع تمييز الجلسات والمهام والمواعيد.',
                'مايو 2026',
                [
                    ['day' => 4, 'title' => 'جلسة أولى - نزاع تجاري', 'type' => 'جلسة'],
                    ['day' => 7, 'title' => 'استشارة عميل جديد', 'type' => 'موعد'],
                    ['day' => 12, 'title' => 'رفع مستندات قضية', 'type' => 'مهمة'],
                    ['day' => 19, 'title' => 'إجازة موظف - سارة', 'type' => 'إجازة'],
                    ['day' => 24, 'title' => 'اجتماع داخلي لإدارة الملفات', 'type' => 'موعد'],
                ],
            ),
            PageBuilder::table(
                '/office/tasks',
                'المهام',
                'جدول مهام مطابق لطبيعة شاشة الإدارة مع تصفيات الحالة والأولوية والمكلّف.',
                ['بحث', 'الحالة', 'الأولوية', 'المحذوفة'],
                ['إعادة ضبط التصفيات', 'تطبيق التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'title', 'label' => 'العنوان'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'priority', 'label' => 'الأولوية'],
                    ['key' => 'source', 'label' => 'المصدر'],
                    ['key' => 'assignee', 'label' => 'المكلف'],
                    ['key' => 'dueDate', 'label' => 'تاريخ الاستحقاق'],
                ]),
                [
                    ['title' => 'تحديث ملف القضية 102', 'status' => 'مفتوحة', 'priority' => 'عالية', 'source' => 'القضايا', 'assignee' => 'أ. فواز', 'dueDate' => '18 مايو 2026'],
                    ['title' => 'متابعة عقد التأسيس', 'status' => 'قيد الانتظار', 'priority' => 'متوسطة', 'source' => 'الخدمات', 'assignee' => 'أ. ليلى', 'dueDate' => '21 مايو 2026'],
                    ['title' => 'إغلاق طلب استشارة', 'status' => 'مكتملة', 'priority' => 'منخفضة', 'source' => 'الاستشارات', 'assignee' => 'أ. سارة', 'dueDate' => '15 مايو 2026'],
                ],
            ),
        ];
    }
}
