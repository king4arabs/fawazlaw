<?php

namespace Modules\Office\Crm\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class CrmPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::table(
                '/office/cases',
                'القضايا',
                'جدول القضايا مع إمكانات البحث والتعديل والاستعادة والإجراءات الجماعية.',
                ['بحث', 'الحالة', 'المحكمة', 'نوع القضية'],
                ['الإجراءات', 'استعادة المحدد', 'تعديل'],
                PageBuilder::columns([
                    ['key' => 'number', 'label' => '#'],
                    ['key' => 'client', 'label' => 'العميل'],
                    ['key' => 'type', 'label' => 'نوع القضية'],
                    ['key' => 'court', 'label' => 'المحكمة'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'owner', 'label' => 'المحامي المسؤول'],
                ]),
                [
                    ['number' => 'CASE-2026-002', 'client' => 'شركة الرؤية', 'type' => 'تجاري', 'court' => 'المحكمة التجارية بالرياض', 'status' => 'مفتوحة', 'owner' => 'أ. فواز'],
                    ['number' => 'CASE-2026-001', 'client' => 'محمد سعيد', 'type' => 'عمالي', 'court' => 'المحكمة العمالية', 'status' => 'مغلقة', 'owner' => 'أ. ليلى'],
                ],
            ),
            PageBuilder::table(
                '/office/operations',
                'الطلبات',
                'جدول الطلبات القانونية الجارية مع الحذف والإجراءات الجماعية تمامًا كسلوك النظام المرجعي.',
                ['بحث', 'نوع الطلب', 'الحالة'],
                ['الإجراءات', 'استعادة المحدد', 'حذف'],
                PageBuilder::columns([
                    ['key' => 'number', 'label' => '#'],
                    ['key' => 'service', 'label' => 'الخدمة'],
                    ['key' => 'client', 'label' => 'العميل'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'createdAt', 'label' => 'تاريخ الإنشاء'],
                ]),
                [
                    ['number' => 'REQ-014', 'service' => 'توثيق عقد', 'client' => 'Fatmahf', 'status' => 'قيد الانتظار', 'createdAt' => '14 مايو 2026'],
                    ['number' => 'REQ-013', 'service' => 'استشارة قانونية', 'client' => 'Mohamed Sa’ed', 'status' => 'مفتوحة', 'createdAt' => '09 مايو 2026'],
                    ['number' => 'REQ-012', 'service' => 'صياغة لائحة', 'client' => 'شركة المسار', 'status' => 'مغلقة', 'createdAt' => '03 مايو 2026'],
                ],
            ),
            PageBuilder::table(
                '/office/consultations',
                'الاستشارات',
                'شاشة الاستشارات مع حالة الدفع وحالة التنفيذ والإجراء السريع للمراجعة.',
                ['بحث', 'حالة الدفع', 'حالة التنفيذ'],
                ['مراجعة'],
                PageBuilder::columns([
                    ['key' => 'id', 'label' => '#'],
                    ['key' => 'client', 'label' => 'العميل'],
                    ['key' => 'subject', 'label' => 'الموضوع'],
                    ['key' => 'scheduledAt', 'label' => 'الموعد'],
                    ['key' => 'payment', 'label' => 'الدفع'],
                    ['key' => 'status', 'label' => 'الحالة'],
                ]),
                [
                    ['id' => '6', 'client' => 'Mohamed Sa’ed', 'subject' => 'Test Payments From Dev Team', 'scheduledAt' => '1 أبريل 2026 09:00', 'payment' => 'مدفوع', 'status' => 'قيد الانتظار'],
                    ['id' => '5', 'client' => 'Fatmahf', 'subject' => 'تجربه', 'scheduledAt' => '18 مارس 2026 02:30', 'payment' => 'مدفوع', 'status' => 'مجدولة'],
                ],
            ),
            PageBuilder::table(
                '/office/clients',
                'العملاء',
                'واجهة العملاء مع الاستيراد وتخصيص الأعمدة وتعدد الصفحات كما في المرجع.',
                ['بحث', 'النوع', 'الحالة'],
                ['استيراد العملاء', 'إعادة ضبط التصفيات', 'تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الاسم'],
                    ['key' => 'type', 'label' => 'النوع'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'phone', 'label' => 'الهاتف'],
                    ['key' => 'email', 'label' => 'البريد'],
                    ['key' => 'company', 'label' => 'الشركة'],
                ]),
                [
                    ['name' => 'Mohamed Sa’ed', 'type' => 'فرد', 'status' => 'نشط', 'phone' => '0500000001', 'email' => 'mohamed@example.com', 'company' => '-'],
                    ['name' => 'شركة الرؤية', 'type' => 'شركة', 'status' => 'نشط', 'phone' => '0500000002', 'email' => 'contact@vision.sa', 'company' => 'شركة الرؤية'],
                    ['name' => 'Fatmahf', 'type' => 'فرد', 'status' => 'نشط', 'phone' => '0500000003', 'email' => 'fatmahf@example.com', 'company' => '-'],
                ],
            ),
        ];
    }
}
