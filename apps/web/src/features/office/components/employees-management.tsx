"use client";

import clsx from "clsx";
import { CheckCircle2, Eye, Pencil, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ViewMode = "list" | "add" | "edit" | "show";
type TopTab = "info" | "salary" | "leaveBalance";
type LowerTab = "attendance" | "leaveRequests" | "payslips" | "benefits";

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
  lastLogin: string;
  office: string;
  department: string;
  roleType: string;
  avatarName: string;
  salaryBasic: string;
  currency: string;
  paySchedule: string;
  salaryFrom: string;
  salaryTo: string;
  allowances: Array<{ name: string; amount: string }>;
  deductions: Array<{ name: string; amount: string }>;
  leaveBalances: Array<{ type: string; allocated: string; used: string; remaining: string }>;
};

type AttendanceRecord = { id: string; date: string; inAt: string; outAt: string; minutes: string; notes: string };
type LeaveRequest = { id: string; type: string; start: string; end: string; days: string; status: "معلق" | "موافق" | "مرفوض" | "ملغي"; reason: string };
type Payslip = { id: string; periodStart: string; periodEnd: string; net: string; status: string; paidAt: string };
type Benefit = { id: string; benefit: string; amount: string; textValue: string; from: string; to: string; notes: string };

type EmployeeForm = {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  office: string;
  department: string;
  role: string;
  password: string;
  passwordConfirm: string;
  avatarFile: File | null;
};

type AttendanceForm = Omit<AttendanceRecord, "id">;
type LeaveRequestForm = Omit<LeaveRequest, "id">;
type BenefitForm = Omit<Benefit, "id">;

const emptyForm: EmployeeForm = {
  name: "",
  email: "",
  phone: "",
  active: true,
  office: "",
  department: "",
  role: "موظف",
  password: "",
  passwordConfirm: "",
  avatarFile: null,
};

const emptyAttendanceForm: AttendanceForm = { date: "", inAt: "", outAt: "", minutes: "", notes: "" };
const emptyLeaveForm: LeaveRequestForm = { type: "سنوية", start: "", end: "", days: "", status: "معلق", reason: "" };
const emptyBenefitForm: BenefitForm = { benefit: "", amount: "", textValue: "", from: "", to: "", notes: "" };

function SectionCard({ title, subtitle, children }: Readonly<{ title: string; subtitle?: string; children: React.ReactNode }>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <h3 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h3>
      {subtitle ? <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea3c0]">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function statusTone(active: boolean) {
  return active
    ? "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]"
    : "bg-[#eef3fa] text-[#5d7696] dark:bg-[#24364f] dark:text-[#a8bed8]";
}

function roleTone() {
  return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
}

function modalShell(
  open: boolean,
  onClose: () => void,
  title: string,
  content: React.ReactNode,
  footer: React.ReactNode,
) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07101d]/55 px-3 py-6">
      <div className="w-full max-w-3xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{title}</h3><button onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]"><X className="h-5 w-5" /></button></div>
        {content}
        <div className="mt-5 flex flex-wrap justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
}

export function EmployeesManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [topTab, setTopTab] = useState<TopTab>("info");
  const [lowerTab, setLowerTab] = useState<LowerTab>("attendance");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<EmployeeForm>(emptyForm);

  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [benefitOpen, setBenefitOpen] = useState(false);

  const [attendanceForm, setAttendanceForm] = useState<AttendanceForm>(emptyAttendanceForm);
  const [leaveForm, setLeaveForm] = useState<LeaveRequestForm>(emptyLeaveForm);
  const [benefitForm, setBenefitForm] = useState<BenefitForm>(emptyBenefitForm);

  const [rows, setRows] = useState<Employee[]>(
    (page.rows ?? []).map((row, idx) => ({
      id: row.id ?? String(idx + 1),
      name: row.name ?? "-",
      email: row.email ?? "-",
      phone: row.phone ?? "-",
      role: row.role ?? "موظف",
      active: (row.status ?? "نشط").includes("نشط"),
      lastLogin: row.lastLogin ?? "-",
      office: row.office ?? "المكتب الرئيسي",
      department: row.department ?? "القسم القانوني",
      roleType: row.roleType ?? "تشغيلي",
      avatarName: row.avatarName ?? "-",
      salaryBasic: row.salaryBasic ?? "8000",
      currency: row.currency ?? "SAR",
      paySchedule: row.paySchedule ?? "شهري",
      salaryFrom: row.salaryFrom ?? "2026-01-01",
      salaryTo: row.salaryTo ?? "-",
      allowances: [],
      deductions: [],
      leaveBalances: [
        { type: "سنوية", allocated: "21", used: "5", remaining: "16" },
        { type: "مرضية", allocated: "10", used: "2", remaining: "8" },
      ],
    })),
  );

  const [attendanceByEmployee, setAttendanceByEmployee] = useState<Record<string, AttendanceRecord[]>>({});
  const [leaveByEmployee, setLeaveByEmployee] = useState<Record<string, LeaveRequest[]>>({});
  const [payslipsByEmployee, setPayslipsByEmployee] = useState<Record<string, Payslip[]>>({});
  const [benefitsByEmployee, setBenefitsByEmployee] = useState<Record<string, Benefit[]>>({});

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => `${r.name} ${r.email} ${r.role} ${r.lastLogin}`.toLowerCase().includes(q));
  }, [rows, query]);

  const attendanceRows = selected ? attendanceByEmployee[selected.id] ?? [] : [];
  const leaveRows = selected ? leaveByEmployee[selected.id] ?? [] : [];
  const payslipRows = selected ? payslipsByEmployee[selected.id] ?? [] : [];
  const benefitRows = selected ? benefitsByEmployee[selected.id] ?? [] : [];

  const startAdd = () => {
    setMode("add");
    setSelectedId(null);
    setForm(emptyForm);
  };

  const startEdit = (row: Employee) => {
    setMode("edit");
    setSelectedId(row.id);
    setForm({
      name: row.name,
      email: row.email,
      phone: row.phone,
      active: row.active,
      office: row.office,
      department: row.department,
      role: row.role,
      password: "",
      passwordConfirm: "",
      avatarFile: null,
    });
  };

  const openShow = (row: Employee) => {
    setMode("show");
    setSelectedId(row.id);
    setTopTab("info");
    setLowerTab("attendance");
  };

  const saveAdd = (resetAfter = false) => {
    const next: Employee = {
      id: String(Date.now()),
      name: form.name || "-",
      email: form.email || "-",
      phone: form.phone || "-",
      role: form.role,
      active: form.active,
      lastLogin: "-",
      office: form.office || "-",
      department: form.department || "-",
      roleType: "تشغيلي",
      avatarName: form.avatarFile?.name ?? "-",
      salaryBasic: "0",
      currency: "SAR",
      paySchedule: "شهري",
      salaryFrom: "-",
      salaryTo: "-",
      allowances: [],
      deductions: [],
      leaveBalances: [],
    };
    setRows((current) => [next, ...current]);
    if (resetAfter) setForm(emptyForm);
    else setMode("list");
  };

  const saveEdit = () => {
    if (!selectedId) return;
    setRows((current) => current.map((r) => (r.id === selectedId ? { ...r, name: form.name, email: form.email, phone: form.phone, role: form.role, active: form.active, office: form.office, department: form.department, avatarName: form.avatarFile?.name ?? r.avatarName } : r)));
    setMode("show");
  };

  useEffect(() => {
    if (!attendanceOpen && !leaveOpen && !benefitOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAttendanceOpen(false);
        setLeaveOpen(false);
        setBenefitOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [attendanceOpen, leaveOpen, benefitOpen]);

  if (mode === "list") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الموظفون / القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الموظفون")}</h1><button onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("إضافة موظف")}</button></div></div>

        <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-4 relative"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div>
          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[980px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3">الموظف</th><th className="px-4 py-3">البريد الإلكتروني</th><th className="px-4 py-3">الدور بالنظام</th><th className="px-4 py-3">نشط</th><th className="px-4 py-3">آخر تسجيل دخول</th><th className="px-4 py-3">الإجراءات</th></tr></thead><tbody>{filtered.map((row) => <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.name}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff] break-all">{row.email}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", roleTone())}>{row.role}</span></td><td className="px-4 py-3"><span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs", statusTone(row.active))}><CheckCircle2 className="h-3.5 w-3.5" />{row.active ? "نشط" : "غير نشط"}</span></td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.lastLogin}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button onClick={() => openShow(row)} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />عرض</button><button onClick={() => startEdit(row)} className="inline-flex items-center gap-1 rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="h-3.5 w-3.5" />تعديل</button><button onClick={() => setRows((current) => current.filter((r) => r.id !== row.id))} className="inline-flex items-center gap-1 rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="h-3.5 w-3.5" />حذف</button></div></td></tr>)}</tbody></table></div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>إجمالي النتائج: {filtered.length}</span><span>الصفحة 1 من 1</span></div>
        </div>
      </section>
    );
  }

  if (mode === "add" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? `الموظفون / ${selected?.name ?? "-"} / تعديل` : "الموظفون / إضافة"}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? `تعديل ${selected?.name ?? ""}` : "إضافة موظف"}</h1>{isEdit ? <button onClick={() => selected && openShow(selected)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">عرض</button> : null}</div></div>

        <SectionCard title="الملف الشخصي" subtitle="بيانات الهوية ووسائل التواصل.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الصورة</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><Upload className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">اسحب و ادرج ملفك أو تصفح</p><input type="file" onChange={(e) => setForm((c) => ({ ...c, avatarFile: e.target.files?.[0] ?? null }))} />{form.avatarFile ? <p className="mt-2 text-xs text-[#6f86a5]">{form.avatarFile.name}</p> : null}</div></label>
            <div className="grid gap-4">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الاسم <span className="text-[#d14b4b]">*</span></span><input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">البريد الإلكتروني <span className="text-[#d14b4b]">*</span></span><input type="email" value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الجوال</span><input value={form.phone} onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">نشط</span><button type="button" onClick={() => setForm((c) => ({ ...c, active: !c.active }))} className={clsx("inline-flex h-11 w-full items-center justify-center rounded-xl border text-sm", form.active ? "border-[#9fd5b5] bg-[#ebfff1] text-[#14954c]" : "border-[#d8e3f1] bg-[#f6f9fe] text-[#6f89ab]")}>{form.active ? "نشط" : "غير نشط"}</button></label>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="الهيكل التنظيمي" subtitle="المكتب، القسم، والدور.">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">المكتب</span><select value={form.office} onChange={(e) => setForm((c) => ({ ...c, office: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option value="">-</option><option>المكتب الرئيسي</option><option>فرع جدة</option></select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">القسم</span><select value={form.department} onChange={(e) => setForm((c) => ({ ...c, department: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option value="">-</option><option>القسم القانوني</option><option>العمليات</option><option>الموارد البشرية</option></select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الدور بالنظام</span><select value={form.role} onChange={(e) => setForm((c) => ({ ...c, role: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>مدير النظام</option><option>موظف</option><option>محامي</option><option>محامي متدرب</option></select></label>
          </div>
        </SectionCard>

        <SectionCard title="الأمان" subtitle="تعيين أو إعادة تعيين كلمة المرور.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">كلمة المرور</span><input type="password" value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تأكيد كلمة المرور</span><input type="password" value={form.passwordConfirm} onChange={(e) => setForm((c) => ({ ...c, passwordConfirm: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
          </div>
        </SectionCard>

        <SectionCard title="الخطوة التالية" subtitle="بعد إنشاء الموظف يمكنك تعديل هيكل الراتب وتتبع الإجازات."><p className="text-sm text-[#6f89ab]">{translateText("متابعة إعدادات الموظف بعد الحفظ من صفحة العرض.")}</p></SectionCard>

        <div className="flex flex-wrap justify-end gap-2">{isEdit ? <button onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">حفظ التغييرات</button> : <><button onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button></>}<button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></div>
      </section>
    );
  }

  if (!selected) return null;

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">الموظفون / {selected.name} / عرض</p><div className="mt-2 flex items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">عرض {selected.name}</h1><button onClick={() => startEdit(selected)} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">تعديل</button></div></div>
      <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><div className="inline-flex min-w-max gap-2">{([ ["info", "المعلومات"], ["salary", "هيكل الراتب"], ["leaveBalance", "رصيد الإجازات (2026)"] ] as Array<[TopTab, string]>).map(([k, l]) => <button key={k} onClick={() => setTopTab(k)} className={clsx("rounded-xl px-4 py-2 text-sm", topTab === k ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{l}</button>)}</div></div>

      {topTab === "info" ? <div className="grid gap-4 xl:grid-cols-2"><SectionCard title="بيانات التواصل"><div className="grid gap-2 text-sm"><p><span className="text-[#7891b0]">الاسم: </span>{selected.name || "-"}</p><p><span className="text-[#7891b0]">البريد الإلكتروني: </span><span className="break-all">{selected.email || "-"}</span></p><p><span className="text-[#7891b0]">الجوال: </span>{selected.phone || "-"}</p></div></SectionCard><SectionCard title="الهيكل التنظيمي"><div className="grid gap-2 text-sm"><p><span className="text-[#7891b0]">المكتب: </span>{selected.office || "-"}</p><p><span className="text-[#7891b0]">القسم: </span>{selected.department || "-"}</p><p><span className="text-[#7891b0]">الدور بالنظام: </span><span className={clsx("rounded-full px-2 py-0.5 text-xs", roleTone())}>{selected.role || "-"}</span></p><p><span className="text-[#7891b0]">نوع الدور: </span>{selected.roleType || "-"}</p></div></SectionCard></div> : null}

      {topTab === "salary" ? <div className="space-y-4"><SectionCard title="هيكل الراتب"><div className="grid gap-2 text-sm md:grid-cols-2"><p><span className="text-[#7891b0]">الراتب الأساسي: </span>{selected.salaryBasic || "-"}</p><p><span className="text-[#7891b0]">العملة: </span>{selected.currency || "-"}</p><p><span className="text-[#7891b0]">جدول الدفع: </span>{selected.paySchedule || "-"}</p><p><span className="text-[#7891b0]">ساري من: </span>{selected.salaryFrom || "-"}</p><p><span className="text-[#7891b0]">ساري إلى: </span>{selected.salaryTo || "-"}</p></div></SectionCard><SectionCard title="البدلات">{selected.allowances.length ? selected.allowances.map((item, i) => <div key={`${item.name}-${i}`} className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2 text-sm">{item.name} - {item.amount}</div>) : <p className="text-sm text-[#7f95b1]">لا توجد بدلات.</p>}</SectionCard><SectionCard title="الاستقطاعات">{selected.deductions.length ? selected.deductions.map((item, i) => <div key={`${item.name}-${i}`} className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2 text-sm">{item.name} - {item.amount}</div>) : <p className="text-sm text-[#7f95b1]">لا توجد استقطاعات.</p>}</SectionCard></div> : null}

      {topTab === "leaveBalance" ? <SectionCard title="رصيد الإجازات" subtitle="أرصدة الإجازات لهذه السنة."><div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[620px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">نوع الإجازة</th><th className="px-4 py-3">الأيام المخصصة</th><th className="px-4 py-3">الأيام المستخدمة</th><th className="px-4 py-3">المتبقي</th></tr></thead><tbody>{selected.leaveBalances.map((row, i) => <tr key={`${row.type}-${i}`} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{row.type}</td><td className="px-4 py-3">{row.allocated}</td><td className="px-4 py-3">{row.used}</td><td className="px-4 py-3">{row.remaining}</td></tr>)}</tbody></table></div></SectionCard> : null}

      <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><div className="inline-flex min-w-max gap-2">{([ ["attendance", "الحضور والانصراف"], ["leaveRequests", "طلبات الإجازات"], ["payslips", "قسائم الرواتب"], ["benefits", "المزايا"] ] as Array<[LowerTab, string]>).map(([k, l]) => <button key={k} onClick={() => setLowerTab(k)} className={clsx("rounded-xl px-4 py-2 text-sm", lowerTab === k ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{l}</button>)}</div></div>

      {lowerTab === "attendance" ? <SectionCard title="الحضور والانصراف"><div className="mb-3 flex justify-end"><button onClick={() => { setAttendanceForm(emptyAttendanceForm); setAttendanceOpen(true); }} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">إضافة يومية</button></div>{attendanceRows.length === 0 ? <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center"><p className="text-sm font-medium text-[#5d7da3]">لا توجد سجلات حضور</p><p className="mt-1 text-xs text-[#7f95b1]">قم بإضافة يومية للبدء.</p></div> : <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[760px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">التاريخ</th><th className="px-4 py-3">وقت الحضور</th><th className="px-4 py-3">وقت الانصراف</th><th className="px-4 py-3">ساعات العمل</th><th className="px-4 py-3">actions</th></tr></thead><tbody>{attendanceRows.map((r) => <tr key={r.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{r.date}</td><td className="px-4 py-3">{r.inAt}</td><td className="px-4 py-3">{r.outAt}</td><td className="px-4 py-3">{r.minutes}</td><td className="px-4 py-3"><button onClick={() => setAttendanceByEmployee((c) => ({ ...c, [selected.id]: (c[selected.id] ?? []).filter((i) => i.id !== r.id) }))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">حذف</button></td></tr>)}</tbody></table></div>}</SectionCard> : null}

      {lowerTab === "leaveRequests" ? <SectionCard title="طلبات الإجازات"><div className="mb-3 flex justify-end"><button onClick={() => { setLeaveForm(emptyLeaveForm); setLeaveOpen(true); }} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">إضافة طلب إجازة</button></div>{leaveRows.length === 0 ? <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center"><p className="text-sm font-medium text-[#5d7da3]">لا توجد طلبات</p><p className="mt-1 text-xs text-[#7f95b1]">قم بإضافة طلب إجازة للبدء.</p></div> : <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[860px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">نوع الإجازة</th><th className="px-4 py-3">تاريخ البداية</th><th className="px-4 py-3">تاريخ النهاية</th><th className="px-4 py-3">عدد الأيام</th><th className="px-4 py-3">الحالة</th><th className="px-4 py-3">actions</th></tr></thead><tbody>{leaveRows.map((r) => <tr key={r.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{r.type}</td><td className="px-4 py-3">{r.start}</td><td className="px-4 py-3">{r.end}</td><td className="px-4 py-3">{r.days}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", r.status === "موافق" ? "bg-[#ebfff1] text-[#14954c]" : r.status === "معلق" ? "bg-[#fff5df] text-[#bf6f00]" : "bg-[#fff0f0] text-[#c74747]")}>{r.status}</span></td><td className="px-4 py-3"><button onClick={() => setLeaveByEmployee((c) => ({ ...c, [selected.id]: (c[selected.id] ?? []).filter((i) => i.id !== r.id) }))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">حذف</button></td></tr>)}</tbody></table></div>}</SectionCard> : null}

      {lowerTab === "payslips" ? <SectionCard title="قسائم الرواتب">{payslipRows.length === 0 ? <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center"><p className="text-sm font-medium text-[#5d7da3]">لا توجد قسائم الرواتب</p></div> : <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[860px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">بداية الفترة</th><th className="px-4 py-3">نهاية الفترة</th><th className="px-4 py-3">صافي الراتب</th><th className="px-4 py-3">الحالة</th><th className="px-4 py-3">تاريخ الدفع</th></tr></thead><tbody>{payslipRows.map((r) => <tr key={r.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{r.periodStart}</td><td className="px-4 py-3">{r.periodEnd}</td><td className="px-4 py-3">{r.net}</td><td className="px-4 py-3">{r.status}</td><td className="px-4 py-3">{r.paidAt}</td></tr>)}</tbody></table></div>}</SectionCard> : null}

      {lowerTab === "benefits" ? <SectionCard title="المزايا"><div className="mb-3 flex justify-end"><button onClick={() => { setBenefitForm(emptyBenefitForm); setBenefitOpen(true); }} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">إضافة مزايا</button></div>{benefitRows.length === 0 ? <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center"><p className="text-sm font-medium text-[#5d7da3]">لا توجد مزايا</p><p className="mt-1 text-xs text-[#7f95b1]">قم بإضافة مزايا للبدء.</p></div> : <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[860px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">الميزة</th><th className="px-4 py-3">المبلغ</th><th className="px-4 py-3">قيمة نصية</th><th className="px-4 py-3">ساري من</th><th className="px-4 py-3">ساري إلى</th><th className="px-4 py-3">actions</th></tr></thead><tbody>{benefitRows.map((r) => <tr key={r.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{r.benefit}</td><td className="px-4 py-3">{r.amount}</td><td className="px-4 py-3">{r.textValue}</td><td className="px-4 py-3">{r.from}</td><td className="px-4 py-3">{r.to}</td><td className="px-4 py-3"><button onClick={() => setBenefitsByEmployee((c) => ({ ...c, [selected.id]: (c[selected.id] ?? []).filter((i) => i.id !== r.id) }))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">حذف</button></td></tr>)}</tbody></table></div>}</SectionCard> : null}

      {modalShell(
        attendanceOpen,
        () => setAttendanceOpen(false),
        "إضافة يومية",
        <div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التاريخ</span><input type="date" value={attendanceForm.date} onChange={(e) => setAttendanceForm((c) => ({ ...c, date: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت الحضور</span><input type="time" value={attendanceForm.inAt} onChange={(e) => setAttendanceForm((c) => ({ ...c, inAt: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت الانصراف</span><input type="time" value={attendanceForm.outAt} onChange={(e) => setAttendanceForm((c) => ({ ...c, outAt: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">دقائق العمل</span><input type="number" value={attendanceForm.minutes} onChange={(e) => setAttendanceForm((c) => ({ ...c, minutes: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={attendanceForm.notes} onChange={(e) => setAttendanceForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label></div>,
        <><button onClick={() => { if (!selected) return; const rec: AttendanceRecord = { id: String(Date.now()), ...attendanceForm }; setAttendanceByEmployee((c) => ({ ...c, [selected.id]: [rec, ...(c[selected.id] ?? [])] })); setAttendanceOpen(false); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => { if (!selected) return; const rec: AttendanceRecord = { id: String(Date.now()), ...attendanceForm }; setAttendanceByEmployee((c) => ({ ...c, [selected.id]: [rec, ...(c[selected.id] ?? [])] })); setAttendanceForm(emptyAttendanceForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button><button onClick={() => setAttendanceOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></>,
      )}

      {modalShell(
        leaveOpen,
        () => setLeaveOpen(false),
        "إضافة طلب إجازة",
        <div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">نوع الإجازة</span><select value={leaveForm.type} onChange={(e) => setLeaveForm((c) => ({ ...c, type: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm"><option>سنوية</option><option>مرضية</option><option>بدون راتب</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">عدد الأيام</span><input type="number" value={leaveForm.days} onChange={(e) => setLeaveForm((c) => ({ ...c, days: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ البداية</span><input type="date" value={leaveForm.start} onChange={(e) => setLeaveForm((c) => ({ ...c, start: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ النهاية</span><input type="date" value={leaveForm.end} onChange={(e) => setLeaveForm((c) => ({ ...c, end: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">السبب</span><textarea rows={3} value={leaveForm.reason} onChange={(e) => setLeaveForm((c) => ({ ...c, reason: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label></div>,
        <><button onClick={() => { if (!selected) return; const rec: LeaveRequest = { id: String(Date.now()), ...leaveForm }; setLeaveByEmployee((c) => ({ ...c, [selected.id]: [rec, ...(c[selected.id] ?? [])] })); setLeaveOpen(false); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => { if (!selected) return; const rec: LeaveRequest = { id: String(Date.now()), ...leaveForm }; setLeaveByEmployee((c) => ({ ...c, [selected.id]: [rec, ...(c[selected.id] ?? [])] })); setLeaveForm(emptyLeaveForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button><button onClick={() => setLeaveOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></>,
      )}

      {modalShell(
        benefitOpen,
        () => setBenefitOpen(false),
        "إضافة مزايا",
        <div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الميزة</span><select value={benefitForm.benefit} onChange={(e) => setBenefitForm((c) => ({ ...c, benefit: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm"><option value="">-</option><option>تأمين طبي</option><option>بدل تنقل</option><option>بدل سكن</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">المبلغ</span><input type="number" value={benefitForm.amount} onChange={(e) => setBenefitForm((c) => ({ ...c, amount: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">قيمة نصية</span><input value={benefitForm.textValue} onChange={(e) => setBenefitForm((c) => ({ ...c, textValue: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">ساري من</span><input type="date" value={benefitForm.from} onChange={(e) => setBenefitForm((c) => ({ ...c, from: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">ساري إلى</span><input type="date" value={benefitForm.to} onChange={(e) => setBenefitForm((c) => ({ ...c, to: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] px-4 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={benefitForm.notes} onChange={(e) => setBenefitForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label></div>,
        <><button onClick={() => { if (!selected) return; const rec: Benefit = { id: String(Date.now()), ...benefitForm }; setBenefitsByEmployee((c) => ({ ...c, [selected.id]: [rec, ...(c[selected.id] ?? [])] })); setBenefitOpen(false); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => { if (!selected) return; const rec: Benefit = { id: String(Date.now()), ...benefitForm }; setBenefitsByEmployee((c) => ({ ...c, [selected.id]: [rec, ...(c[selected.id] ?? [])] })); setBenefitForm(emptyBenefitForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button><button onClick={() => setBenefitOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></>,
      )}
    </section>
  );
}
