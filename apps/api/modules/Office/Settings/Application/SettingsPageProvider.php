<?php

namespace Modules\Office\Settings\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class SettingsPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::table(
                '/office/config/offices',
                'المكاتب',
                'إعدادات المكاتب مع الاسم والرمز والمنطقة الزمنية ووسائل التواصل.',
                ['بحث'],
                ['تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الاسم'],
                    ['key' => 'code', 'label' => 'الرمز'],
                    ['key' => 'timezone', 'label' => 'المنطقة الزمنية'],
                    ['key' => 'phone', 'label' => 'الهاتف'],
                    ['key' => 'email', 'label' => 'البريد'],
                ]),
                [
                    ['name' => 'المكتب الرئيسي', 'code' => 'HQ', 'timezone' => 'Asia/Riyadh', 'phone' => '0110000000', 'email' => 'admin@fawazlaw.sa'],
                ],
            ),
            PageBuilder::table(
                '/office/config/departments',
                'الأقسام',
                'تعريفات الأقسام التنظيمية للمكتب.',
                ['بحث'],
                ['تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'القسم'],
                    ['key' => 'code', 'label' => 'الرمز'],
                    ['key' => 'description', 'label' => 'الوصف'],
                ]),
                [
                    ['name' => 'القضايا', 'code' => 'LIT', 'description' => 'إدارة جميع القضايا والنزاعات'],
                    ['name' => 'الاستشارات', 'code' => 'CNS', 'description' => 'طلبات الاستشارة والاستشارات المدفوعة'],
                ],
            ),
            PageBuilder::table(
                '/office/config/roles',
                'الأدوار',
                'إدارة الأدوار والصلاحيات مع عدد الصلاحيات وآخر تحديث.',
                ['بحث'],
                ['تطبيق الأعمدة'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الدور'],
                    ['key' => 'slug', 'label' => 'Slug'],
                    ['key' => 'permissions', 'label' => 'عدد الصلاحيات'],
                    ['key' => 'updatedAt', 'label' => 'آخر تحديث'],
                ]),
                [
                    ['name' => 'Super Admin', 'slug' => 'super-admin', 'permissions' => 'كل الصلاحيات', 'updatedAt' => 'اليوم'],
                    ['name' => 'Lawyer', 'slug' => 'lawyer', 'permissions' => '24', 'updatedAt' => 'هذا الأسبوع'],
                ],
            ),
            PageBuilder::table(
                '/office/config/mohami-connections',
                'اتصالات منصة محامي',
                'إدارة الاتصالات الخارجية مع المفاتيح والحالة وتاريخ الانتهاء.',
                ['بحث'],
                ['تغيير المفتاح', 'تعطيل'],
                PageBuilder::columns([
                    ['key' => 'name', 'label' => 'الاسم'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'keyTail', 'label' => 'آخر 4 أرقام'],
                    ['key' => 'lastCalledAt', 'label' => 'آخر استدعاء'],
                    ['key' => 'expiresAt', 'label' => 'الانتهاء'],
                ]),
                [
                    ['name' => 'Mohami Production', 'status' => 'نشط', 'keyTail' => '9A2F', 'lastCalledAt' => 'منذ 3 ساعات', 'expiresAt' => '31 ديسمبر 2026'],
                ],
            ),
            PageBuilder::overview(
                '/office/config/subscription',
                'اشتراك النظام',
                'صفحة نظرة عامة للاشتراك الحالي والاستهلاك والحدود والمزايا.',
                [
                    ['label' => 'الحالة', 'value' => 'نشط', 'caption' => 'يتم التجديد تلقائيًا'],
                    ['label' => 'تاريخ التجديد', 'value' => '31 ديسمبر 2026', 'caption' => 'الخطة السنوية'],
                    ['label' => 'المستخدمون', 'value' => '10 / 20', 'caption' => 'المستخدمون النشطون'],
                    ['label' => 'المساحة', 'value' => '18 GB / 50 GB', 'caption' => 'التخزين المستخدم'],
                    ['label' => 'المعاملات', 'value' => '1,240', 'caption' => 'هذا الشهر'],
                    ['label' => 'الخطة', 'value' => 'Professional', 'caption' => 'باقات المكاتب القانونية'],
                ],
                [
                    ['name' => 'الدعم المباشر', 'enabled' => true],
                    ['name' => 'التقارير المالية', 'enabled' => true],
                    ['name' => 'إدارة المستندات', 'enabled' => true],
                    ['name' => 'تكاملات خارجية', 'enabled' => true],
                    ['name' => 'واجهة العملاء الذاتية', 'enabled' => false],
                ],
            ),
        ];
    }
}
