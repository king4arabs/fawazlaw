import type { NavGroup } from "@/features/office/types";

export const officeNavigation: NavGroup[] = [
  {
    label: "لوحة القيادة",
    items: [
      { label: "لوحة التحكم", path: "/office" },
      { label: "لوحة المهام", path: "/office/tasks-board" },
      { label: "التقويم", path: "/office/calendar" },
      { label: "القضايا", path: "/office/cases" },
      { label: "العمليات", path: "/office/operations" },
      { label: "الاستشارات", path: "/office/consultations" },
      { label: "العملاء", path: "/office/clients" },
      { label: "الدعم", path: "/office/support/support-tickets" },
      { label: "محادثات الدعم", path: "/office/tickets-chat" },
    ],
  },
  {
    label: "المستندات",
    items: [
      { label: "الأرشيف", path: "/office/archive" },
      { label: "المستندات", path: "/office/documents" },
    ],
  },
  {
    label: "إدارة المهام",
    items: [{ label: "المهام", path: "/office/tasks" }],
  },
  {
    label: "إدارة الخدمات",
    items: [
      { label: "الخدمات", path: "/office/services" },
      { label: "الخطط والاشتراكات", path: "/office/subscription-plans" },
    ],
  },
  {
    label: "الموارد البشرية",
    items: [
      { label: "الموظفون", path: "/office/employees" },
      { label: "جدول الحضور", path: "/office/attendance-matrix" },
      { label: "الحضور", path: "/office/attendance-records" },
      { label: "طلبات الإجازات", path: "/office/leave-requests" },
      { label: "الرواتب", path: "/office/payroll-runs" },
    ],
  },
  {
    label: "الحسابات والمالية",
    items: [
      { label: "الفواتير", path: "/office/finance/invoices" },
      { label: "المصروفات", path: "/office/finance/expenses" },
      { label: "الرواتب", path: "/office/finance/payrolls" },
    ],
  },
  {
    label: "إدارة البيانات",
    items: [
      { label: "أنواع القضايا", path: "/office/case-types" },
      { label: "المحاكم", path: "/office/courts" },
      { label: "النماذج", path: "/office/form-templates" },
      { label: "أنواع الإجازات", path: "/office/leave-types" },
      { label: "المزايا", path: "/office/benefits" },
      { label: "فئات المستندات", path: "/office/document-categories" },
    ],
  },
  {
    label: "الإعدادات",
    items: [
      { label: "المكاتب", path: "/office/config/offices" },
      { label: "الأقسام", path: "/office/config/departments" },
      { label: "الأدوار", path: "/office/config/roles" },
      { label: "تكاملات محامي", path: "/office/config/mohami-connections" },
      { label: "اشتراك النظام", path: "/office/config/subscription" },
    ],
  },
];
