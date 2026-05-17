export type OfficeLocale = "ar" | "en";
export type OfficeTheme = "light" | "dark";

type OfficeCopy = {
  companyName: string;
  dashboard: string;
  tasksBoard: string;
  calendar: string;
  cases: string;
  operations: string;
  consultations: string;
  clients: string;
  support: string;
  supportChats: string;
  documents: string;
  archive: string;
  tasks: string;
  services: string;
  subscriptionPlans: string;
  employees: string;
  attendanceMatrix: string;
  attendance: string;
  leaveRequests: string;
  payroll: string;
  invoices: string;
  expenses: string;
  settings: string;
  dataManagement: string;
  humanResources: string;
  finance: string;
  documentsGroup: string;
  taskManagement: string;
  systemSubscription: string;
  offices: string;
  departments: string;
  roles: string;
  logout: string;
  languageArabic: string;
  languageEnglish: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  openMenu: string;
  closeMenu: string;
  searchPlaceholder: string;
  today: string;
  send: string;
  typeMessage: string;
  userName: string;
  modelTitleCase: string;
  addCase: string;
  editCase: string;
  cancelEdit: string;
  saveCase: string;
  allCases: string;
  addClient: string;
  editClient: string;
  saveClient: string;
  allClients: string;
  name: string;
  type: string;
  status: string;
  phone: string;
  email: string;
  company: string;
  notes: string;
  owner: string;
  reference: string;
  court: string;
  openedAt: string;
  caseType: string;
  individual: string;
  companyType: string;
  active: string;
  inactive: string;
  suspended: string;
  open: string;
  pending: string;
  closed: string;
  edit: string;
  delete: string;
  create: string;
  update: string;
  back: string;
  filters: string;
  enabled: string;
  disabled: string;
};

export const officeCopy: Record<OfficeLocale, OfficeCopy> = {
  ar: {
    companyName: "شركة فواز للمحاماة",
    dashboard: "لوحة التحكم",
    tasksBoard: "لوحة المهام",
    calendar: "التقويم",
    cases: "القضايا",
    operations: "العمليات",
    consultations: "الاستشارات",
    clients: "العملاء",
    support: "الدعم",
    supportChats: "محادثات الدعم",
    documents: "المستندات",
    archive: "الأرشيف",
    tasks: "المهام",
    services: "الخدمات",
    subscriptionPlans: "الخطط والاشتراكات",
    employees: "الموظفون",
    attendanceMatrix: "جدول الحضور",
    attendance: "الحضور",
    leaveRequests: "طلبات الإجازات",
    payroll: "الرواتب",
    invoices: "الفواتير",
    expenses: "المصروفات",
    settings: "الإعدادات",
    dataManagement: "إدارة البيانات",
    humanResources: "الموارد البشرية",
    finance: "الحسابات والمالية",
    documentsGroup: "المستندات",
    taskManagement: "إدارة المهام",
    systemSubscription: "اشتراك النظام",
    offices: "المكاتب",
    departments: "الأقسام",
    roles: "الأدوار",
    logout: "تسجيل الخروج",
    languageArabic: "عربي",
    languageEnglish: "English",
    themeLight: "فاتح",
    themeDark: "داكن",
    themeSystem: "النظام",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    searchPlaceholder: "ابحث بالعنوان أو رقم الطلب…",
    today: "اليوم",
    send: "إرسال",
    typeMessage: "اكتب رسالة…",
    userName: "أ. فواز",
    modelTitleCase: "نموذج القضية",
    addCase: "إضافة قضية",
    editCase: "تعديل قضية",
    cancelEdit: "إلغاء التعديل",
    saveCase: "حفظ القضية",
    allCases: "جميع القضايا",
    addClient: "إضافة عميل",
    editClient: "تعديل عميل",
    saveClient: "حفظ العميل",
    allClients: "إجمالي العملاء",
    name: "الاسم",
    type: "النوع",
    status: "الحالة",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    company: "الشركة",
    notes: "ملاحظات",
    owner: "المحامي المسؤول",
    reference: "المرجع",
    court: "المحكمة",
    openedAt: "تاريخ الفتح",
    caseType: "نوع القضية",
    individual: "فرد",
    companyType: "شركة",
    active: "نشط",
    inactive: "غير نشط",
    suspended: "معلق",
    open: "مفتوحة",
    pending: "قيد الانتظار",
    closed: "مغلقة",
    edit: "تعديل",
    delete: "حذف",
    create: "إضافة",
    update: "تحديث",
    back: "رجوع",
    filters: "الفلاتر",
    enabled: "مفعل",
    disabled: "غير مفعل",
  },
  en: {
    companyName: "Fawaz Law Firm",
    dashboard: "Dashboard",
    tasksBoard: "Task Board",
    calendar: "Calendar",
    cases: "Cases",
    operations: "Operations",
    consultations: "Consultations",
    clients: "Clients",
    support: "Support",
    supportChats: "Support Chats",
    documents: "Documents",
    archive: "Archive",
    tasks: "Tasks",
    services: "Services",
    subscriptionPlans: "Plans & Subscriptions",
    employees: "Employees",
    attendanceMatrix: "Attendance Matrix",
    attendance: "Attendance",
    leaveRequests: "Leave Requests",
    payroll: "Payroll",
    invoices: "Invoices",
    expenses: "Expenses",
    settings: "Settings",
    dataManagement: "Data Management",
    humanResources: "Human Resources",
    finance: "Finance & Accounts",
    documentsGroup: "Documents",
    taskManagement: "Task Management",
    systemSubscription: "System Subscription",
    offices: "Offices",
    departments: "Departments",
    roles: "Roles",
    logout: "Log out",
    languageArabic: "Arabic",
    languageEnglish: "English",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    searchPlaceholder: "Search by title or request number…",
    today: "Today",
    send: "Send",
    typeMessage: "Type a message…",
    userName: "A. Fawaz",
    modelTitleCase: "Case Form",
    addCase: "Add Case",
    editCase: "Edit Case",
    cancelEdit: "Cancel",
    saveCase: "Save Case",
    allCases: "All Cases",
    addClient: "Add Client",
    editClient: "Edit Client",
    saveClient: "Save Client",
    allClients: "Total Clients",
    name: "Name",
    type: "Type",
    status: "Status",
    phone: "Phone",
    email: "Email",
    company: "Company",
    notes: "Notes",
    owner: "Assigned Lawyer",
    reference: "Reference",
    court: "Court",
    openedAt: "Opened At",
    caseType: "Case Type",
    individual: "Individual",
    companyType: "Company",
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
    open: "Open",
    pending: "Pending",
    closed: "Closed",
    edit: "Edit",
    delete: "Delete",
    create: "Create",
    update: "Update",
    back: "Back",
    filters: "Filters",
    enabled: "Enabled",
    disabled: "Disabled",
  },
};

const englishMap: Record<string, string> = {
  "لوحة القيادة": "Control Panel",
  "لوحة التحكم": "Dashboard",
  "لوحة المهام": "Task Board",
  التقويم: "Calendar",
  القضايا: "Cases",
  العمليات: "Operations",
  الاستشارات: "Consultations",
  العملاء: "Clients",
  الدعم: "Support",
  "محادثات الدعم": "Support Chats",
  المستندات: "Documents",
  الأرشيف: "Archive",
  المهام: "Tasks",
  الخدمات: "Services",
  "الخطط والاشتراكات": "Plans & Subscriptions",
  الموظفون: "Employees",
  "جدول الحضور": "Attendance Matrix",
  الحضور: "Attendance",
  "طلبات الإجازات": "Leave Requests",
  الرواتب: "Payroll",
  الفواتير: "Invoices",
  المصروفات: "Expenses",
  "إدارة البيانات": "Data Management",
  الإعدادات: "Settings",
  "الموارد البشرية": "Human Resources",
  "الحسابات والمالية": "Finance & Accounts",
  "إدارة المهام": "Task Management",
  "أنواع القضايا": "Case Types",
  المحاكم: "Courts",
  النماذج: "Templates",
  "أنواع الإجازات": "Leave Types",
  المزايا: "Benefits",
  "فئات المستندات": "Document Categories",
  المكاتب: "Offices",
  الأقسام: "Departments",
  الأدوار: "Roles",
  "تكاملات محامي": "Mohami Integrations",
  "اشتراك النظام": "System Subscription",
  "الخدمات قيد التنفيذ": "Services In Progress",
  "المهام قيد الانتظار": "Tasks Pending",
  "المهام قيد التنفيذ": "Tasks In Progress",
  "المهام متوقفة": "Tasks On Hold",
  "المهام مكتملة": "Completed Tasks",
  "العملاء الجدد (آخر 12 شهرًا)": "New Clients (Last 12 Months)",
  "القضايا: المفتوحة مقابل المغلقة (آخر 12 شهرًا)":
    "Cases: Open vs Closed (Last 12 Months)",
  "الفواتير حسب الحالة": "Invoices by Status",
  "المصروفات (آخر 12 شهرًا)": "Expenses (Last 12 Months)",
  "العملاء الجدد": "New Clients",
  "إجمالي المصروفات": "Total Expenses",
  "جميع القضايا": "All Cases",
  "إجمالي العملاء": "Total Clients",
  "العميل": "Client",
  "الإجراءات": "Actions",
  "الخطة الاحترافية السنوية": "Professional Annual Plan",
  "المزايا المفعلة": "Enabled Features",
  "هذه الشاشة تحاكي نظرة عامة للاشتراك الحالي مع حالة التجديد والاستهلاك وحدود النظام والمزايا المفعلة للمكتب.":
    "This screen provides an overview of the current subscription, renewal status, consumption, system limits, and enabled office features.",
  "مفتوحة": "Open",
  "قيد الانتظار": "Pending",
  "مغلقة": "Closed",
  نشط: "Active",
  "غير نشط": "Inactive",
  معلق: "Suspended",
  "تم الإنجاز": "Completed",
  "تحتاج متابعة": "Needs Follow-up",
  "عمل جار": "In Progress",
  "مهام مجدولة": "Scheduled Tasks",
  "نشطة / قيد العمل": "Active / In Progress",
  مفعل: "Enabled",
  "غير مفعل": "Disabled",
  "ابحث في المرجع أو العميل أو المحكمة...":
    "Search by reference, client, or court...",
  "ابحث بالاسم أو البريد أو الهاتف...": "Search by name, email, or phone...",
  "جاري الحفظ...": "Saving...",
  "حفظ التعديلات": "Save Changes",
  "إنشاء قضية": "Create Case",
  "إنشاء عميل": "Create Client",
  "جاري التحميل...": "Loading...",
  بحث: "Search",
  "لا توجد قضايا مطابقة لنتيجة البحث الحالية.":
    "No cases match the current search.",
  "لا يوجد عملاء مطابقون لنتيجة البحث الحالية.":
    "No clients match the current search.",
  "إجمالي السجلات:": "Total records:",
  الصفحة: "Page",
  من: "of",
  "نموذج العميل": "Client Form",
};

export function translateOfficeText(
  value: string,
  locale: OfficeLocale,
): string {
  if (locale === "ar") {
    return value;
  }

  return englishMap[value] ?? value;
}

export function officeDirection(locale: OfficeLocale) {
  return locale === "ar" ? "rtl" : "ltr";
}
