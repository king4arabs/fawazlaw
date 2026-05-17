<?php

namespace Modules\Office\Hr\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class HrPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::table(
                '/office/employees',
                'الموظفون',
                'جدول الموظفين مع الأعمدة الأساسية وحالة التفعيل وآخر تسجيل دخول.',
                ['بحث', 'الدور', 'الحالة'],
                ['إعادة ضبط التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الاسم'],
                    ['key' => 'email', 'label' => 'البريد'],
                    ['key' => 'role', 'label' => 'الدور'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'lastLogin', 'label' => 'آخر دخول'],
                ]),
                [
                    ['name' => 'أ. فواز', 'email' => 'admin@fawazlaw.sa', 'role' => 'Super Admin', 'status' => 'نشط', 'lastLogin' => 'منذ 10 دقائق'],
                    ['name' => 'أ. ليلى', 'email' => 'layla@fawazlaw.sa', 'role' => 'Lawyer', 'status' => 'نشط', 'lastLogin' => 'منذ ساعة'],
                    ['name' => 'أ. سارة', 'email' => 'sara@fawazlaw.sa', 'role' => 'Assistant', 'status' => 'نشط', 'lastLogin' => 'أمس'],
                ],
            ),
            PageBuilder::table(
                '/office/attendance-matrix',
                'جدول الحضور',
                'عرض شبكي لحضور الموظفين مع نافذة تفاصيل الحضور كما في النظام الأصلي.',
                ['ابحث عن موظف...'],
                ['‹', '›', 'إغلاق'],
                PageBuilder::columns([
                    ['key' => 'employee', 'label' => 'الموظف'],
                    ['key' => 'sun', 'label' => 'الأحد'],
                    ['key' => 'mon', 'label' => 'الإثنين'],
                    ['key' => 'tue', 'label' => 'الثلاثاء'],
                    ['key' => 'wed', 'label' => 'الأربعاء'],
                    ['key' => 'thu', 'label' => 'الخميس'],
                ]),
                [
                    ['employee' => 'أ. فواز', 'sun' => 'تم', 'mon' => 'تم', 'tue' => 'تم', 'wed' => 'متأخر', 'thu' => 'تم'],
                    ['employee' => 'أ. ليلى', 'sun' => 'تم', 'mon' => 'إجازة', 'tue' => 'تم', 'wed' => 'تم', 'thu' => 'تم'],
                ],
            ),
            PageBuilder::table(
                '/office/attendance-records',
                'الحضور',
                'سجلات حضور مع استيراد إكسل وتنزيل السجلات وتصفية زمنية.',
                ['بحث', 'المدى الزمني', 'الموظف'],
                ['استيراد إكسل', 'تحميل السجلات', 'تطبيق التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'date', 'label' => 'التاريخ'],
                    ['key' => 'employee', 'label' => 'الموظف'],
                    ['key' => 'checkIn', 'label' => 'الدخول'],
                    ['key' => 'checkOut', 'label' => 'الخروج'],
                    ['key' => 'minutes', 'label' => 'الدقائق'],
                    ['key' => 'method', 'label' => 'الطريقة'],
                ]),
                [
                    ['date' => '16 مايو 2026', 'employee' => 'أ. فواز', 'checkIn' => '08:59', 'checkOut' => '17:05', 'minutes' => '486', 'method' => 'GPS'],
                    ['date' => '16 مايو 2026', 'employee' => 'أ. ليلى', 'checkIn' => '09:11', 'checkOut' => '17:01', 'minutes' => '470', 'method' => 'GPS'],
                ],
            ),
            PageBuilder::table(
                '/office/leave-requests',
                'طلبات الإجازات',
                'طلب إجازات مع أعمدة الموظف، النوع، الفترة، الأيام، والحالة والمعتمد.',
                ['بحث', 'الحالة', 'نوع الإجازة'],
                ['إعادة ضبط التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'employee', 'label' => 'الموظف'],
                    ['key' => 'type', 'label' => 'النوع'],
                    ['key' => 'startDate', 'label' => 'البداية'],
                    ['key' => 'endDate', 'label' => 'النهاية'],
                    ['key' => 'days', 'label' => 'الأيام'],
                    ['key' => 'status', 'label' => 'الحالة'],
                ]),
                [
                    ['employee' => 'أ. ليلى', 'type' => 'سنوية', 'startDate' => '20 مايو 2026', 'endDate' => '22 مايو 2026', 'days' => '3', 'status' => 'مجدولة'],
                    ['employee' => 'أ. سارة', 'type' => 'مرضية', 'startDate' => '11 مايو 2026', 'endDate' => '12 مايو 2026', 'days' => '2', 'status' => 'تم'],
                ],
            ),
            PageBuilder::table(
                '/office/payroll-runs',
                'الرواتب',
                'تشغيلات الرواتب الخاصة بالموارد البشرية للفترات الشهرية.',
                ['الفترة', 'الحالة'],
                ['إنشاء تشغيل رواتب'],
                PageBuilder::columns([
                    ['key' => 'period', 'label' => 'الفترة'],
                    ['key' => 'employees', 'label' => 'الموظفون'],
                    ['key' => 'netAmount', 'label' => 'الصافي'],
                    ['key' => 'status', 'label' => 'الحالة'],
                ]),
                [
                    ['period' => 'مايو 2026', 'employees' => '10', 'netAmount' => '58,000 SAR', 'status' => 'قيد الانتظار'],
                    ['period' => 'أبريل 2026', 'employees' => '10', 'netAmount' => '57,500 SAR', 'status' => 'تم'],
                ],
            ),
            PageBuilder::table(
                '/office/leave-types',
                'أنواع الإجازات',
                'أنواع الإجازات المستخدمة في النظام مع قابلية التصفح وإدارة الرصيد.',
                ['بحث'],
                ['التالي'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'النوع'],
                    ['key' => 'days', 'label' => 'الحد'],
                    ['key' => 'paid', 'label' => 'مدفوعة'],
                ]),
                [
                    ['name' => 'إجازة سنوية', 'days' => '21', 'paid' => 'نعم'],
                    ['name' => 'إجازة مرضية', 'days' => '10', 'paid' => 'نعم'],
                    ['name' => 'إجازة بدون راتب', 'days' => 'حسب الطلب', 'paid' => 'لا'],
                ],
            ),
            PageBuilder::table(
                '/office/benefits',
                'المزايا',
                'صفحة إدارة مزايا الموظفين بحالة أولية فارغة قابلة للتوسعة.',
                ['بحث'],
                ['إضافة ميزة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الميزة'],
                    ['key' => 'type', 'label' => 'النوع'],
                    ['key' => 'status', 'label' => 'الحالة'],
                ]),
                [
                    ['name' => 'تأمين طبي', 'type' => 'شهري', 'status' => 'نشط'],
                    ['name' => 'بدل تنقل', 'type' => 'شهري', 'status' => 'نشط'],
                ],
            ),
        ];
    }
}
