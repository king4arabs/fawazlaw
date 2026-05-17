"use client";

import clsx from "clsx";
import { CalendarDays, Eye, Plus, Search, Trash2, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ViewMode = "list" | "add";

type PayrollRow = {
  id: string;
  periodStart: string;
  periodEnd: string;
  status: string;
  processedAt: string;
  note: string;
};

type PayrollForm = {
  periodStart: string;
  periodEnd: string;
  note: string;
};

const emptyForm: PayrollForm = {
  periodStart: "",
  periodEnd: "",
  note: "",
};

function statusTone(value: string) {
  if (value.includes("تم") || value.includes("معالج")) return "bg-[#ebfff1] text-[#14954c]";
  if (value.includes("قيد") || value.includes("انتظار")) return "bg-[#fff5df] text-[#bf6f00]";
  if (value.includes("ملغي")) return "bg-[#fff0f0] text-[#c74747]";
  if (value.includes("مسودة")) return "bg-[#eef3fa] text-[#5d7696]";
  return "bg-[#edf5ff] text-[#2a67b5]";
}

function SectionCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">{children}</section>;
}

export function PayrollRunsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<PayrollForm>(emptyForm);

  const [rows, setRows] = useState<PayrollRow[]>(
    (page.rows ?? []).map((row, idx) => ({
      id: row.id ?? String(idx + 1),
      periodStart: row.periodStart ?? "-",
      periodEnd: row.periodEnd ?? "-",
      status: row.status ?? "مسودة",
      processedAt: row.processedAt ?? "-",
      note: row.note ?? "",
    })),
  );

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => `${r.periodStart} ${r.periodEnd} ${r.status} ${r.processedAt}`.toLowerCase().includes(q));
  }, [rows, query]);

  if (mode === "add") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الرواتب > إضافة")}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("إضافة راتب")}</h1></div>
        <SectionCard>
          <div className="mb-4 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-[#12375f]" /><h2 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("الفترة")}</h2></div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("بداية الفترة")} <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.periodStart} onChange={(e) => setForm((c) => ({ ...c, periodStart: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("نهاية الفترة")} <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.periodEnd} onChange={(e) => setForm((c) => ({ ...c, periodEnd: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("ملاحظات")}</span><textarea rows={4} value={form.note} onChange={(e) => setForm((c) => ({ ...c, note: e.target.value }))} className="min-h-[100px] w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm" /></label>
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2"><button onClick={() => { const next: PayrollRow = { id: String(Date.now()), periodStart: form.periodStart || "-", periodEnd: form.periodEnd || "-", status: "مسودة", processedAt: "-", note: form.note }; setRows((c) => [next, ...c]); setMode("list"); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button onClick={() => { const next: PayrollRow = { id: String(Date.now()), periodStart: form.periodStart || "-", periodEnd: form.periodEnd || "-", status: "مسودة", processedAt: "-", note: form.note }; setRows((c) => [next, ...c]); setForm(emptyForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button><button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></div>
        </SectionCard>
      </section>
    );
  }

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الرواتب > القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الرواتب")}</h1><button onClick={() => setMode("add")} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("إضافة راتب")}</button></div></div>

      <SectionCard>
        <div className="mb-4 relative min-w-[220px]"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث")} className={clsx("h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] text-sm", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div>
        <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[920px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3">بداية الفترة</th><th className="px-4 py-3">نهاية الفترة</th><th className="px-4 py-3">الحالة</th><th className="px-4 py-3">تاريخ المعالجة</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.periodStart}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.periodEnd}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", statusTone(row.status))}>{row.status}</span></td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.processedAt}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="inline h-3.5 w-3.5" /> عرض</button><button onClick={() => setRows((c) => c.filter((i) => i.id !== row.id))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="inline h-3.5 w-3.5" /> حذف</button></div></td></tr>)}</tbody></table></div>
        {filteredRows.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ecf3fc] text-[#7a93b2]"><XCircle className="h-5 w-5" /></div><p className="text-sm font-medium text-[#5d7da3]">{translateText("لا توجد رواتب")}</p><p className="mt-1 text-xs text-[#7f95b1]">{translateText("قم بإضافة راتب للبدء.")}</p></div> : null}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898]"><span>{translateText("إجمالي النتائج")}: {filteredRows.length}</span><span>{translateText("لكل صفحة")}: 10 • {translateText("الصفحة")} 1 {translateText("من")} 1</span></div>
      </SectionCard>
    </section>
  );
}
