"use client";

import clsx from "clsx";
import { Eye, Pencil, Plus, Search, Trash2, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ViewMode = "list" | "add" | "edit" | "show";

type LeaveStatus = "قيد الانتظار" | "مقبول" | "مرفوض" | "ملغي" | string;

type LeaveRow = {
  id: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
  status: LeaveStatus;
  approver: string;
  approvedAt: string;
  reason: string;
  notes: string;
};

type LeaveForm = {
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
  status: LeaveStatus;
  approver: string;
  approvedAt: string;
  reason: string;
  notes: string;
};

const emptyForm: LeaveForm = {
  employee: "",
  type: "سنوية",
  startDate: "",
  endDate: "",
  days: "",
  status: "قيد الانتظار",
  approver: "",
  approvedAt: "",
  reason: "",
  notes: "",
};

function statusTone(value: string) {
  if (value.includes("مقبول") || value.includes("موافق") || value.includes("تم")) {
    return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  }
  if (value.includes("مرفوض")) {
    return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  }
  if (value.includes("انتظار") || value.includes("معلق")) {
    return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  }
  if (value.includes("ملغي")) {
    return "bg-[#eef3fa] text-[#5d7696] dark:bg-[#24364f] dark:text-[#a8bed8]";
  }
  return "bg-[#edf5ff] text-[#2a67b5] dark:bg-[#1b304a] dark:text-[#a8c7e8]";
}

function SectionCard({ title, children }: Readonly<{ title?: string; children: React.ReactNode }>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      {title ? (
        <div className="mb-4 border-b border-[#e7eef8] pb-3 dark:border-[#223752]">
          <h2 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h2>
        </div>
      ) : null}
      {children}
    </section>
  );
}

function InfoItem({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2 dark:border-[#223752] dark:bg-[#122136]">
      <p className="text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{label}</p>
      <p className="mt-1 break-words text-sm text-[#183a60] dark:text-[#e8f0ff]">{value || "—"}</p>
    </div>
  );
}

export function LeaveRequestsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<LeaveForm>(emptyForm);

  const [rows, setRows] = useState<LeaveRow[]>(
    (page.rows ?? []).map((row, idx) => ({
      id: row.id ?? String(idx + 1),
      employee: row.employee ?? "-",
      type: row.type ?? "-",
      startDate: row.startDate ?? "-",
      endDate: row.endDate ?? "-",
      days: row.days ?? "-",
      status: row.status ?? "قيد الانتظار",
      approver: row.approver ?? "-",
      approvedAt: row.approvedAt ?? "-",
      reason: row.reason ?? "",
      notes: row.notes ?? "",
    })),
  );

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const employeeOptions = useMemo(() => Array.from(new Set(rows.map((r) => r.employee).filter(Boolean))), [rows]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => `${r.employee} ${r.type} ${r.status} ${r.approver} ${r.approvedAt}`.toLowerCase().includes(q));
  }, [rows, query]);

  useEffect(() => {
    if (!form.startDate || !form.endDate) {
      setForm((c) => ({ ...c, days: "" }));
      return;
    }
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (diff >= 0) setForm((c) => ({ ...c, days: String(diff) }));
  }, [form.startDate, form.endDate]);

  const startAdd = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setMode("add");
  };

  const startEdit = (row: LeaveRow) => {
    setSelectedId(row.id);
    setForm({
      employee: row.employee === "-" ? "" : row.employee,
      type: row.type,
      startDate: row.startDate === "-" ? "" : row.startDate,
      endDate: row.endDate === "-" ? "" : row.endDate,
      days: row.days === "-" ? "" : row.days,
      status: row.status,
      approver: row.approver === "-" ? "" : row.approver,
      approvedAt: row.approvedAt === "-" ? "" : row.approvedAt,
      reason: row.reason,
      notes: row.notes,
    });
    setMode("edit");
  };

  const openShow = (row: LeaveRow) => {
    setSelectedId(row.id);
    setMode("show");
  };

  const saveAdd = (resetAfter = false) => {
    const next: LeaveRow = {
      id: String(Date.now()),
      employee: form.employee || "-",
      type: form.type,
      startDate: form.startDate || "-",
      endDate: form.endDate || "-",
      days: form.days || "0",
      status: "قيد الانتظار",
      approver: "-",
      approvedAt: "-",
      reason: form.reason,
      notes: form.notes,
    };
    setRows((c) => [next, ...c]);
    if (resetAfter) setForm(emptyForm);
    else setMode("list");
  };

  const saveEdit = () => {
    if (!selectedId) return;
    setRows((current) =>
      current.map((row) =>
        row.id === selectedId
          ? {
              ...row,
              employee: form.employee || "-",
              type: form.type,
              startDate: form.startDate || "-",
              endDate: form.endDate || "-",
              days: form.days || row.days,
              status: form.status,
              approver: form.approver || "-",
              approvedAt: form.approvedAt || "-",
              reason: form.reason,
              notes: form.notes,
            }
          : row,
      ),
    );
    setMode("show");
  };

  if (mode === "show" && selected) {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText(`طلبات الإجازات > ${selected.id} > عرض`)}</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText(`عرض ${selected.id}`)}</h1>
        </div>

        <SectionCard title={translateText("تفاصيل الطلب")}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <InfoItem label={translateText("الموظف")} value={selected.employee || "—"} />
            <InfoItem label={translateText("نوع الإجازة")} value={selected.type || "—"} />
            <InfoItem label={translateText("تاريخ البداية")} value={selected.startDate || "—"} />
            <InfoItem label={translateText("تاريخ النهاية")} value={selected.endDate || "—"} />
            <InfoItem label={translateText("عدد الأيام")} value={selected.days || "—"} />
            <div className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2 dark:border-[#223752] dark:bg-[#122136]"><p className="text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("الحالة")}</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", statusTone(selected.status))}>{selected.status || "—"}</span></div>
            <InfoItem label={translateText("المعتمد")} value={selected.approver || "—"} />
            <InfoItem label={translateText("تاريخ الاعتماد")} value={selected.approvedAt || "—"} />
          </div>

          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-3 dark:border-[#223752] dark:bg-[#122136]"><p className="mb-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("السبب")}</p><p className="text-sm text-[#183a60] dark:text-[#e8f0ff]">{selected.reason?.trim() || "—"}</p></div>
            <div className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-3 dark:border-[#223752] dark:bg-[#122136]"><p className="mb-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("الملاحظات")}</p><p className="text-sm text-[#183a60] dark:text-[#e8f0ff]">{selected.notes?.trim() || "—"}</p></div>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button onClick={() => startEdit(selected)} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">{translateText("تعديل")}</button>
            <button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("رجوع")}</button>
            <button onClick={() => { setRows((c) => c.filter((i) => i.id !== selected.id)); setMode("list"); }} className="rounded-xl bg-[#fff0f0] px-4 py-2 text-sm text-[#c54040]">{translateText("حذف")}</button>
          </div>
        </SectionCard>
      </section>
    );
  }

  if (mode === "add" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? translateText(`طلبات الإجازات > ${selectedId ?? "-"} > تعديل`) : translateText("طلبات الإجازات > إضافة")}</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? translateText("تعديل طلب إجازة") : translateText("إضافة طلب إجازة")}</h1>
        </div>

        <SectionCard title={translateText("الطلب")}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الموظف")} <span className="text-[#d14b4b]">*</span></span><select value={form.employee} onChange={(e) => setForm((c) => ({ ...c, employee: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option value="">-</option>{employeeOptions.map((e) => <option key={e} value={e}>{e}</option>)}</select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("نوع الإجازة")} <span className="text-[#d14b4b]">*</span></span><select value={form.type} onChange={(e) => setForm((c) => ({ ...c, type: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option>سنوية</option><option>مرضية</option><option>بدون راتب</option></select></label>

            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("تاريخ البداية")} <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.startDate} onChange={(e) => setForm((c) => ({ ...c, startDate: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("تاريخ النهاية")} <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.endDate} onChange={(e) => setForm((c) => ({ ...c, endDate: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("عدد الأيام")}</span><input readOnly value={form.days} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#f1f6fd] px-4 text-sm text-[#627d9f] dark:border-[#2a3f5c] dark:bg-[#18273c] dark:text-[#9fb4cd]" /></label>
            {isEdit ? <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الحالة")} <span className="text-[#d14b4b]">*</span></span><select value={form.status} onChange={(e) => setForm((c) => ({ ...c, status: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option>قيد الانتظار</option><option>مقبول</option><option>مرفوض</option><option>ملغي</option></select></label> : null}

            {isEdit ? <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("المعتمد")}</span><input value={form.approver} onChange={(e) => setForm((c) => ({ ...c, approver: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label> : null}
            {isEdit ? <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("تاريخ الاعتماد")}</span><input type="date" value={form.approvedAt} onChange={(e) => setForm((c) => ({ ...c, approvedAt: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label> : null}

            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("السبب")}</span><textarea rows={4} value={form.reason} onChange={(e) => setForm((c) => ({ ...c, reason: e.target.value }))} className="min-h-[100px] w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("ملاحظات")}</span><textarea rows={4} value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} className="min-h-[100px] w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            {isEdit ? (
              <button onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("حفظ التغييرات")}</button>
            ) : (
              <>
                <button onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
                <button onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إضافة وبدء إضافة المزيد")}</button>
              </>
            )}
            <button onClick={() => (isEdit && selected ? setMode("show") : setMode("list"))} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
          </div>
        </SectionCard>
      </section>
    );
  }

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("طلبات الإجازات > القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("طلبات الإجازات")}</h1><button onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("إضافة طلب إجازة")}</button></div></div>

      <SectionCard>
        <div className="mb-4 flex flex-wrap items-center gap-2"><button className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("الأعمدة")}</button><button className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("التصفيات")}</button><div className="relative min-w-[220px] flex-1"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث")} className={clsx("h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div></div>
        <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[1180px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3">الموظف</th><th className="px-4 py-3">نوع الإجازة</th><th className="px-4 py-3">تاريخ البداية</th><th className="px-4 py-3">تاريخ النهاية</th><th className="px-4 py-3">عدد الأيام</th><th className="px-4 py-3">الحالة</th><th className="px-4 py-3">المعتمد</th><th className="px-4 py-3">تاريخ الاعتماد</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.employee}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.type}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.startDate}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.endDate}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.days}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", statusTone(row.status))}>{row.status}</span></td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.approver}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.approvedAt}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button onClick={() => openShow(row)} className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="inline h-3.5 w-3.5" /> عرض</button><button onClick={() => startEdit(row)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="inline h-3.5 w-3.5" /> تعديل</button><button onClick={() => setRows((c) => c.filter((i) => i.id !== row.id))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="inline h-3.5 w-3.5" /> حذف</button></div></td></tr>)}</tbody></table></div>
        {filteredRows.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center dark:border-[#29405d] dark:bg-[#132238]"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ecf3fc] text-[#7a93b2] dark:bg-[#1b2d44] dark:text-[#9ab2cf]"><XCircle className="h-5 w-5" /></div><p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{translateText("لا توجد طلبات إجازة")}</p><p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("قم بإضافة طلب إجازة للبدء.")}</p></div> : null}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>{translateText("إجمالي النتائج")}: {filteredRows.length}</span><span>{translateText("لكل صفحة")}: 10 • {translateText("الصفحة")} 1 {translateText("من")} 1</span></div>
      </SectionCard>
    </section>
  );
}
