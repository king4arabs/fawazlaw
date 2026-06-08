"use client";

import clsx from "clsx";
import { CalendarDays, CheckCircle2, DollarSign, Eye, FileUp, Pencil, Plus, Search, StickyNote, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ViewMode = "list" | "add" | "edit" | "show";

type Expense = {
  id: string;
  date: string;
  category: string;
  amount: string;
  currency: string;
  client: string;
  service: string;
  addedBy: string;
  invoiceable: boolean;
  officeRef: string;
  notes: string;
  receiptName: string;
};

type ExpenseForm = {
  date: string;
  category: string;
  amount: string;
  currency: string;
  service: string;
  client: string;
  invoiceable: boolean;
  notes: string;
  receiptFile: File | null;
};

const emptyForm: ExpenseForm = {
  date: "",
  category: "",
  amount: "",
  currency: "SAR",
  service: "",
  client: "",
  invoiceable: true,
  notes: "",
  receiptFile: null,
};

function SectionCard({ title, subtitle, icon, children }: Readonly<{ title?: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode }>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      {title ? (
        <div className="mb-4 border-b border-[#e7eef8] pb-3 dark:border-[#223752]">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h2>
          </div>
          {subtitle ? <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea3c0]">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function InvoiceableModal({
  open,
  invoiceable,
  notes,
  setInvoiceable,
  setNotes,
  onClose,
  onSave,
}: Readonly<{
  open: boolean;
  invoiceable: boolean;
  notes: string;
  setInvoiceable: (v: boolean) => void;
  setNotes: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
}>) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07101d]/55 px-3 py-6">
      <div ref={ref} className="w-full max-w-2xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">تحديث الفوترة والملاحظات</h3><button onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]"><X className="h-5 w-5" /></button></div>
        <div className="space-y-4">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">قابل للفوترة</span><button type="button" onClick={() => setInvoiceable(!invoiceable)} className={clsx("inline-flex h-11 w-full items-center justify-center rounded-xl border text-sm", invoiceable ? "border-[#9fd5b5] bg-[#ebfff1] text-[#14954c]" : "border-[#d8e3f1] bg-[#f6f9fe] text-[#6f89ab]")}>{invoiceable ? "نعم" : "لا"}</button></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[120px] w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2"><button onClick={onSave} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">حفظ</button><button onClick={onClose} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></div>
      </div>
    </div>
  );
}

export function ExpensesManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ExpenseForm>(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInvoiceable, setModalInvoiceable] = useState(true);
  const [modalNotes, setModalNotes] = useState("");

  const [rows, setRows] = useState<Expense[]>(
    (page.rows ?? []).map((row, idx) => ({
      id: row.id ?? String(idx + 1),
      date: row.date ?? "-",
      category: row.category ?? "-",
      amount: row.amount ?? "0.00",
      currency: row.currency ?? "SAR",
      client: row.client ?? "-",
      service: row.service ?? "-",
      addedBy: row.owner ?? row.addedBy ?? "-",
      invoiceable: (row.billable ?? "لا").includes("نعم"),
      officeRef: row.officeRef ?? "-",
      notes: row.notes ?? "",
      receiptName: row.receiptName ?? "",
    })),
  );

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => `${r.date} ${r.category} ${r.client} ${r.service} ${r.addedBy}`.toLowerCase().includes(q));
  }, [rows, query]);

  const startAdd = () => {
    const today = new Date().toISOString().slice(0, 10);
    setForm({ ...emptyForm, date: today });
    setMode("add");
  };

  const startEdit = (row: Expense) => {
    setSelectedId(row.id);
    setForm({
      date: row.date === "-" ? "" : row.date,
      category: row.category === "-" ? "" : row.category,
      amount: row.amount,
      currency: row.currency,
      service: row.service === "-" ? "" : row.service,
      client: row.client === "-" ? "" : row.client,
      invoiceable: row.invoiceable,
      notes: row.notes,
      receiptFile: null,
    });
    setMode("edit");
  };

  const openShow = (row: Expense) => {
    setSelectedId(row.id);
    setMode("show");
  };

  const openBillingModal = (row: Expense) => {
    setSelectedId(row.id);
    setModalInvoiceable(row.invoiceable);
    setModalNotes(row.notes);
    setModalOpen(true);
  };

  const saveModal = () => {
    if (!selectedId) return;
    setRows((current) => current.map((row) => (row.id === selectedId ? { ...row, invoiceable: modalInvoiceable, notes: modalNotes } : row)));
    setModalOpen(false);
  };

  const saveAdd = (resetAfter = false) => {
    const next: Expense = {
      id: String(Date.now()),
      date: form.date || "-",
      category: form.category || "-",
      amount: form.amount || "0.00",
      currency: form.currency,
      client: form.client || "-",
      service: form.service || "-",
      addedBy: "أ. فواز",
      invoiceable: form.invoiceable,
      officeRef: "-",
      notes: form.notes,
      receiptName: form.receiptFile?.name ?? "",
    };
    setRows((c) => [next, ...c]);
    if (resetAfter) setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    else setMode("list");
  };

  const saveEdit = () => {
    if (!selectedId) return;
    setRows((current) => current.map((row) => (row.id === selectedId ? { ...row, date: form.date || "-", category: form.category || "-", amount: form.amount || row.amount, currency: form.currency, client: form.client || "-", service: form.service || "-", invoiceable: form.invoiceable, notes: form.notes, receiptName: form.receiptFile?.name ?? row.receiptName } : row)));
    setMode("show");
  };

  if (mode === "show" && selected) {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{`المصروفات > ${selected.id} > عرض`}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{`عرض ${selected.id}`}</h1></div>

        <SectionCard title="ملخص" icon={<DollarSign className="h-5 w-5 text-[#12375f]" />}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{[["التاريخ",selected.date],["التصنيف",selected.category],["المبلغ",selected.amount],["العملة",selected.currency],["العميل",selected.client],["الخدمة/القضية",selected.service],["أضيف بواسطة",selected.addedBy],["آخر تعديل","—"]].map(([k,v]) => <div key={String(k)} className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2"><p className="text-xs text-[#7f95b1]">{k}</p><p className="mt-1 text-sm text-[#183a60]">{String(v || "—")}</p></div>)}<div className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2"><p className="text-xs text-[#7f95b1]">قابل للفوترة</p><span className={clsx("mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs", selected.invoiceable ? "bg-[#ebfff1] text-[#14954c]" : "bg-[#eef3fa] text-[#5d7696]")}>{selected.invoiceable ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}{selected.invoiceable ? "نعم" : "—"}</span></div></div>
        </SectionCard>

        <SectionCard title="الإيصال" icon={<FileUp className="h-5 w-5 text-[#12375f]" />}>
          {selected.receiptName ? <div className="flex flex-wrap items-center gap-2"><p className="text-sm text-[#183a60]">{selected.receiptName}</p><button className="rounded-xl border border-[#d7e2f0] bg-white px-3 py-1.5 text-xs text-[#547094]">تحميل</button></div> : <p className="text-sm text-[#7f95b1]">—</p>}
        </SectionCard>

        <SectionCard title="الملاحظات" icon={<StickyNote className="h-5 w-5 text-[#12375f]" />}>
          <p className="text-sm text-[#183a60]">{selected.notes || "—"}</p>
        </SectionCard>

        <div className="flex flex-wrap justify-end gap-2"><button onClick={() => startEdit(selected)} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">تعديل</button><button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">رجوع</button><button className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">تحميل الإيصال</button><button onClick={() => { setRows((c) => c.filter((i) => i.id !== selected.id)); setMode("list"); }} className="rounded-xl bg-[#fff0f0] px-4 py-2 text-sm text-[#c54040]">حذف</button></div>
      </section>
    );
  }

  if (mode === "add" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? `المصروفات > ${selectedId ?? "-"} > تعديل` : "المصروفات > إضافة"}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? `تعديل ${selectedId ?? ""}` : "إضافة مصروف"}</h1></div>

        <SectionCard title="مصروف" icon={<DollarSign className="h-5 w-5 text-[#12375f]" />}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التاريخ <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.date} onChange={(e) => setForm((c) => ({ ...c, date: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التصنيف <span className="text-[#d14b4b]">*</span></span><select value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option value="">-</option><option>بدل انتقال</option><option>انتقال</option><option>رسوم محكمة</option></select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">المبلغ <span className="text-[#d14b4b]">*</span></span><input type="number" value={form.amount} onChange={(e) => setForm((c) => ({ ...c, amount: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العملة <span className="text-[#d14b4b]">*</span></span><select value={form.currency} onChange={(e) => setForm((c) => ({ ...c, currency: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>SAR</option><option>USD</option><option>AED</option></select></label>
            <label className="block xl:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الخدمة/القضية</span><input value={form.service} onChange={(e) => setForm((c) => ({ ...c, service: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block xl:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">العميل</span><input value={form.client} onChange={(e) => setForm((c) => ({ ...c, client: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
          </div>

          <div className="mt-4 rounded-xl border border-[#e7eef8] bg-[#fbfdff] p-3"><label className="flex items-center justify-between gap-3"><span className="text-sm text-[#6d84a1]">قابل للفوترة</span><button type="button" onClick={() => setForm((c) => ({ ...c, invoiceable: !c.invoiceable }))} className={clsx("inline-flex h-9 min-w-[130px] items-center justify-center rounded-xl border text-sm", form.invoiceable ? "border-[#9fd5b5] bg-[#ebfff1] text-[#14954c]" : "border-[#d8e3f1] bg-[#f6f9fe] text-[#6f89ab]")}>{form.invoiceable ? "نعم" : "لا"}</button></label></div>

          <div className="mt-4 grid gap-4">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الإيصال</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><FileUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">اسحب و ادرج ملفك أو تصفح</p><input type="file" onChange={(e) => setForm((c) => ({ ...c, receiptFile: e.target.files?.[0] ?? null }))} />{form.receiptFile ? <p className="mt-2 text-xs text-[#6f86a5]">{form.receiptFile.name}</p> : null}</div></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={5} value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} className="min-h-[120px] w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm" /></label>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">{isEdit ? <button onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">حفظ التغييرات</button> : <><button onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button></>}<button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></div>
        </SectionCard>
      </section>
    );
  }

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{"المصروفات > القائمة"}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">المصروفات</h1><button onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />إضافة مصروف</button></div></div>

      <SectionCard>
        <div className="mb-4 relative min-w-[220px]"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث")} className={clsx("h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] text-sm", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div>

        <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[1180px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">التاريخ</th><th className="px-4 py-3">التصنيف</th><th className="px-4 py-3">المبلغ</th><th className="px-4 py-3">العملة</th><th className="px-4 py-3">العميل</th><th className="px-4 py-3">الخدمة</th><th className="px-4 py-3">أضيف بواسطة</th><th className="px-4 py-3">قابل للفوترة</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3 text-[#17395f]">{row.date}</td><td className="px-4 py-3 text-[#17395f]">{row.category}</td><td className="px-4 py-3 text-[#17395f]">{row.amount}</td><td className="px-4 py-3 text-[#17395f]">{row.currency}</td><td className="px-4 py-3 text-[#17395f]">{row.client}</td><td className="px-4 py-3 text-[#17395f]">{row.service}</td><td className="px-4 py-3 text-[#17395f]">{row.addedBy}</td><td className="px-4 py-3"><span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs", row.invoiceable ? "bg-[#ebfff1] text-[#14954c]" : "bg-[#eef3fa] text-[#5d7696]")}>{row.invoiceable ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}{row.invoiceable ? "نعم" : "—"}</span></td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button onClick={() => openShow(row)} className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="inline h-3.5 w-3.5" /> عرض</button><button onClick={() => startEdit(row)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="inline h-3.5 w-3.5" /> تعديل</button><button onClick={() => openBillingModal(row)} className="rounded-lg bg-[#fff5df] px-2 py-1 text-xs text-[#bf6f00]">تحديث الفوترة والملاحظات</button></div></td></tr>)}</tbody></table></div>

        {filteredRows.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ecf3fc] text-[#7a93b2]"><DollarSign className="h-5 w-5" /></div><p className="text-sm font-medium text-[#5d7da3]">لا توجد المصروفات</p><p className="mt-1 text-xs text-[#7f95b1]">قم بإضافة مصروف للبدء.</p></div> : null}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898]"><span>عرض 1 إلى {Math.min(2, filteredRows.length)} من {filteredRows.length} نتيجة</span><span>لكل صفحة: 10</span></div>
      </SectionCard>

      <InvoiceableModal open={modalOpen} invoiceable={modalInvoiceable} notes={modalNotes} setInvoiceable={setModalInvoiceable} setNotes={setModalNotes} onClose={() => setModalOpen(false)} onSave={saveModal} />
    </section>
  );
}
