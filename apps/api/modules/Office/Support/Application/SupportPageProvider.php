<?php

namespace Modules\Office\Support\Application;

use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\Support\PageBuilder;

class SupportPageProvider implements OfficePageProvider
{
    public function pages(): array
    {
        return [
            PageBuilder::table(
                '/office/support/support-tickets',
                'التذاكر',
                'صفحة التذاكر مع حالات كل التذاكر وتذاكري وغير المسندة والمفتوحة والمغلقة.',
                ['بحث', 'كل التذاكر', 'غير مسندة', 'مفتوحة', 'مغلقة'],
                ['إسناد', 'تعديل الأولوية'],
                PageBuilder::columns([
                    ['key' => 'id', 'label' => '#'],
                    ['key' => 'title', 'label' => 'عنوان التذكرة'],
                    ['key' => 'customer', 'label' => 'العميل'],
                    ['key' => 'priority', 'label' => 'الأولوية'],
                    ['key' => 'status', 'label' => 'الحالة'],
                    ['key' => 'assignee', 'label' => 'المسند إليه'],
                ]),
                [
                    ['id' => '15', 'title' => 'تكاليف قضية القذف', 'customer' => 'layla abdullah', 'priority' => 'عالية', 'status' => 'مفتوحة', 'assignee' => 'غير مسندة'],
                    ['id' => '14', 'title' => 'تجربه', 'customer' => 'Fatmahf', 'priority' => 'متوسطة', 'status' => 'مفتوحة', 'assignee' => 'أ. خالد'],
                    ['id' => '13', 'title' => 'عدم القدرة على الدفع', 'customer' => 'Fatmahf', 'priority' => 'منخفضة', 'status' => 'مغلقة', 'assignee' => 'أ. فواز'],
                ],
            ),
            PageBuilder::chat(
                '/office/tickets-chat',
                'محادثات الدعم',
                'عرض ثنائي الأعمدة لقائمة المحادثات مع شريط الرسائل الحالي.',
                [
                    ['id' => '15', 'title' => '#15 تكاليف قضية القذف والشكاوي الكيدية', 'customer' => 'layla abdullah', 'updatedAt' => 'منذ شهر'],
                    ['id' => '14', 'title' => '#14 تجربه', 'customer' => 'Fatmahf', 'updatedAt' => 'منذ شهرين'],
                    ['id' => '13', 'title' => '#13 عدم القدره على الدفع', 'customer' => 'Fatmahf', 'updatedAt' => 'منذ شهرين'],
                ],
                [
                    ['from' => 'client', 'text' => 'أحتاج تفاصيل الرسوم المتوقعة للقضية.', 'time' => '10:14 AM'],
                    ['from' => 'admin', 'text' => 'تمت مراجعة الطلب وسيتم تزويدك بالتكلفة خلال اليوم.', 'time' => '10:19 AM'],
                    ['from' => 'client', 'text' => 'شكرًا، هل يمكن إرفاق المستندات المطلوبة أيضًا؟', 'time' => '10:23 AM'],
                    ['from' => 'admin', 'text' => 'بالتأكيد، سنرسل قائمة كاملة بالمتطلبات بعد قليل.', 'time' => '10:25 AM'],
                ],
            ),
        ];
    }
}
