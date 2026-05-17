"use client";

import clsx from "clsx";
import {
  Copy,
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  Link as LinkIcon,
  ListPlus,
  Pencil,
  Plus,
  Search,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ViewMode = "list" | "add" | "edit" | "show";
type InvoiceStatus = "مسودة" | "مرسلة" | "مدفوعة" | "متأخرة" | "ملغاة" | "قيد الانتظار" | string;
type ColumnKey = "number" | "client" | "issueDate" | "dueDate" | "currency" | "total" | "status" | "service";

type InvoiceItem = {
  id: string;
  type: string;
  description: string;
  qty: number;
  unitPrice: number;
  tax: number;
};

type Invoice = {
  id: string;
  number: string;
  client: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  status: InvoiceStatus;
  service: string;
  subscription: string;
  consultation: string;
  serviceType: string;
  notes: string;
  discount: number;
  items: InvoiceItem[];
};

type InvoiceForm = Omit<Invoice, "id">;

type FiltersState = {
  service: string;
  date: string;
};

const columns: Array<{ key: ColumnKey; label: string }> = [
  { key: "number", label: "رقم الفاتورة" },
  { key: "client", label: "العميل" },
  { key: "issueDate", label: "الإصدار" },
  { key: "dueDate", label: "الاستحقاق" },
  { key: "currency", label: "العملة" },
  { key: "total", label: "الإجمالي" },
  { key: "status", label: "الحالة" },
  { key: "service", label: "الخدمة" },
];

const defaultVisible: Record<ColumnKey, boolean> = {
  number: true,
  client: true,
  issueDate: true,
  dueDate: true,
  currency: true,
  total: true,
  status: true,
  service: true,
};

const emptyForm: InvoiceForm = {
  number: `INV-${Date.now().toString().slice(-6)}`,
  client: "",
  issueDate: "",
  dueDate: "",
  currency: "SAR",
  status: "مسودة",
  service: "",
  subscription: "",
  consultation: "",
  serviceType: "",
  notes: "",
  discount: 0,
  items: [{ id: "item-1", type: "خدمة", description: "", qty: 1, unitPrice: 0, tax: 0 }],
};

const defaultFilters: FiltersState = { service: "الكل", date: "هذا الشهر" };

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

function statusTone(status: string) {
  if (status.includes("مدفوعة")) return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  if (status.includes("مرسلة")) return "bg-[#e9f1ff] text-[#1e60ad] dark:bg-[#1a2e49] dark:text-[#9ec3ee]";
  if (status.includes("متأخرة")) return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  if (status.includes("قيد") || status.includes("انتظار")) return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  if (status.includes("ملغاة") || status.includes("مسودة")) return "bg-[#eef3fa] text-[#5d7696] dark:bg-[#24364f] dark:text-[#a8bed8]";
  return "bg-[#edf5ff] text-[#2a67b5] dark:bg-[#1b304a] dark:text-[#a8c7e8]";
}

function useOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T | null>(null);
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
  return ref;
}

export function InvoicesManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(defaultVisible);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [filtersDraft, setFiltersDraft] = useState<FiltersState>(defaultFilters);
  const [form, setForm] = useState<InvoiceForm>(emptyForm);

  const columnsRef = useOutside<HTMLDivElement>(columnsOpen, () => setColumnsOpen(false));
  const filtersRef = useOutside<HTMLDivElement>(filtersOpen, () => setFiltersOpen(false));

  const [rows, setRows] = useState<Invoice[]>(
    (page.rows ?? []).map((row, i) => ({
      id: row.id ?? String(i + 1),
      number: row.number ?? `INV-${1000 + i}`,
      client: row.client ?? "-",
      issueDate: row.issueDate ?? "-",
      dueDate: row.dueDate ?? "-",
      currency: row.currency ?? "SAR",
      status: (row.status as InvoiceStatus) ?? "مسودة",
      service: row.service ?? row.serviceType ?? "-",
      subscription: row.subscription ?? "",
      consultation: row.consultation ?? "",
      serviceType: row.serviceType ?? "",
      notes: row.notes ?? "",
      discount: Number(row.discount ?? 0),
      items: [{ id: `${i}-1`, type: "خدمة", description: row.service ?? "", qty: 1, unitPrice: Number(String(row.total ?? "0").replace(/[^\d.]/g, "")), tax: 0 }],
    })),
  );

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesSearch = !q || `${r.number} ${r.client} ${r.status} ${r.service}`.toLowerCase().includes(q);
      const matchesService = filters.service === "الكل" || r.service === filters.service;
      const matchesDate = filters.date === "هذا الشهر" ? true : true;
      return matchesSearch && matchesService && matchesDate;
    });
  }, [rows, query, filters]);

  const serviceOptions = useMemo(() => ["الكل", ...Array.from(new Set(rows.map((r) => r.service).filter(Boolean)))], [rows]);

  const itemsTotals = useMemo(() => {
    const subtotal = form.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
    const totalTax = form.items.reduce((sum, item) => sum + (item.qty * item.unitPrice * item.tax) / 100, 0);
    const finalTotal = subtotal - (form.discount || 0) + totalTax;
    return { subtotal, totalTax, finalTotal };
  }, [form.items, form.discount]);

  const currentTotal = (invoice: Invoice) => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
    const totalTax = invoice.items.reduce((sum, item) => sum + (item.qty * item.unitPrice * item.tax) / 100, 0);
    return subtotal - (invoice.discount || 0) + totalTax;
  };

  const addItem = () => {
    setForm((c) => ({ ...c, items: [...c.items, { id: `item-${Date.now()}`, type: "خدمة", description: "", qty: 1, unitPrice: 0, tax: 0 }] }));
  };

  const duplicateItem = (id: string) => {
    setForm((c) => {
      const item = c.items.find((i) => i.id === id);
      if (!item) return c;
      return { ...c, items: [...c.items, { ...item, id: `item-${Date.now()}` }] };
    });
  };

  const removeItem = (id: string) => {
    setForm((c) => ({ ...c, items: c.items.filter((i) => i.id !== id) }));
  };

  const updateItem = (id: string, patch: Partial<InvoiceItem>) => {
    setForm((c) => ({ ...c, items: c.items.map((item) => (item.id === id ? { ...item, ...patch } : item)) }));
  };

  const saveAdd = (resetAfter = false) => {
    const next: Invoice = { id: String(Date.now()), ...form };
    setRows((c) => [next, ...c]);
    if (resetAfter) setForm({ ...emptyForm, number: `INV-${Date.now().toString().slice(-6)}` });
    else setMode("list");
  };

  const saveEdit = () => {
    if (!selectedId) return;
    setRows((c) => c.map((r) => (r.id === selectedId ? { ...r, ...form } : r)));
    setMode("show");
  };

  const startAdd = () => {
    setForm({ ...emptyForm, number: `INV-${Date.now().toString().slice(-6)}` });
    setMode("add");
    setSelectedId(null);
  };

  const startEdit = (invoice: Invoice) => {
    setSelectedId(invoice.id);
    setForm({ ...invoice });
    setMode("edit");
  };

  const openShow = (invoice: Invoice) => {
    setSelectedId(invoice.id);
    setMode("show");
  };

  const activeFilterChips = [filters.date !== "" ? `التاريخ: ${filters.date}` : "", filters.service !== "الكل" ? `الخدمة: ${filters.service}` : ""].filter(Boolean);

  if ((mode === "show" || mode === "edit") && !selected && !form.number) {
    setMode("list");
  }

  if (mode === "show" && selected) {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText(`الفواتير > ${selected.number} > عرض`)}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("عرض فاتورة")}</h1></div>

        <SectionCard title={translateText("ملخص الفاتورة")}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[ ["رقم الفاتورة", selected.number], ["الحالة", selected.status], ["العملة", selected.currency], ["الإصدار", selected.issueDate], ["الاستحقاق", selected.dueDate], ["الإجمالي", `${currentTotal(selected).toFixed(2)} ${selected.currency}`] ].map(([k,v]) => <div key={String(k)} className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2"><p className="text-xs text-[#7f95b1]">{k}</p>{k === "الحالة" ? <span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", statusTone(String(v)))}>{v}</span> : <p className="mt-1 text-sm text-[#183a60] dark:text-[#e8f0ff]">{v || "—"}</p>}</div>)}
          </div>
        </SectionCard>

        <SectionCard title={translateText("بيانات العميل")}>
          <div className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2 text-sm text-[#183a60] dark:text-[#e8f0ff]">{selected.client || "—"}</div>
        </SectionCard>

        <SectionCard title={translateText("الارتباطات")}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{[["الخدمة",selected.service],["الاشتراك",selected.subscription],["الاستشارة",selected.consultation],["نوع الخدمة",selected.serviceType]].map(([k,v]) => <div key={String(k)} className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2"><p className="text-xs text-[#7f95b1]">{k}</p><p className="mt-1 text-sm text-[#183a60]">{String(v || "—")}</p></div>)}</div>
        </SectionCard>

        <SectionCard title={translateText("بنود الفاتورة")}>
          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[860px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">النوع</th><th className="px-4 py-3">الوصف</th><th className="px-4 py-3">الكمية</th><th className="px-4 py-3">سعر الوحدة</th><th className="px-4 py-3">الضريبة %</th><th className="px-4 py-3">الإجمالي</th></tr></thead><tbody>{selected.items.map((item) => <tr key={item.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{item.type}</td><td className="px-4 py-3">{item.description || "—"}</td><td className="px-4 py-3">{item.qty}</td><td className="px-4 py-3">{item.unitPrice.toFixed(2)}</td><td className="px-4 py-3">{item.tax}</td><td className="px-4 py-3">{(item.qty * item.unitPrice * (1 + item.tax / 100)).toFixed(2)}</td></tr>)}</tbody></table></div>
        </SectionCard>

        <SectionCard title={translateText("الإجماليات")}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{[["الإجمالي قبل الخصم", selected.items.reduce((s, i) => s + i.qty * i.unitPrice, 0)], ["الخصم", selected.discount], ["إجمالي الضريبة", selected.items.reduce((s, i) => s + (i.qty * i.unitPrice * i.tax) / 100, 0)], ["الإجمالي النهائي", currentTotal(selected)]].map(([k,v]) => <div key={String(k)} className="rounded-xl border border-[#e7eef8] bg-[#fbfdff] px-3 py-2"><p className="text-xs text-[#7f95b1]">{k}</p><p className="mt-1 text-sm text-[#183a60]">{Number(v).toFixed(2)} {selected.currency}</p></div>)}</div>
        </SectionCard>

        <SectionCard title={translateText("الملاحظات")}>
          <p className="text-sm text-[#183a60] dark:text-[#e8f0ff]">{selected.notes || "—"}</p>
        </SectionCard>

        <div className="flex flex-wrap justify-end gap-2"><button onClick={() => startEdit(selected)} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">تعديل</button><button className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">تحميل PDF</button><button className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إرسال</button><button className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">طباعة</button><button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></div>
      </section>
    );
  }

  if (mode === "add" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? `الفواتير > ${form.number} > تعديل` : "الفواتير > إضافة"}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? "تعديل فاتورة" : "إضافة فاتورة"}</h1></div>

        <SectionCard title={translateText("الفاتورة")} subtitle={translateText("تفاصيل الفاتورة والتواريخ والحالة.")} icon={<FileSpreadsheet className="h-5 w-5 text-[#12375f]" />}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">رقم الفاتورة <span className="text-[#d14b4b]">*</span></span><input value={form.number} onChange={(e) => setForm((c) => ({ ...c, number: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العميل <span className="text-[#d14b4b]">*</span></span><input value={form.client} onChange={(e) => setForm((c) => ({ ...c, client: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الإصدار <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.issueDate} onChange={(e) => setForm((c) => ({ ...c, issueDate: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.dueDate} onChange={(e) => setForm((c) => ({ ...c, dueDate: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العملة <span className="text-[#d14b4b]">*</span></span><select value={form.currency} onChange={(e) => setForm((c) => ({ ...c, currency: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>SAR</option><option>USD</option><option>AED</option></select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة <span className="text-[#d14b4b]">*</span></span><select value={form.status} onChange={(e) => setForm((c) => ({ ...c, status: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>مسودة</option><option>مرسلة</option><option>مدفوعة</option><option>متأخرة</option><option>ملغاة</option><option>قيد الانتظار</option></select></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">تفاصيل الفاتورة / ملاحظات</span><textarea rows={4} value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} className="min-h-[100px] w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm" /></label>
          </div>
        </SectionCard>

        <SectionCard title={translateText("الارتباطات")} subtitle={translateText("ربط الفاتورة بخدمة/قضية أو اشتراك.")} icon={<LinkIcon className="h-5 w-5 text-[#12375f]" />}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الارتباط بالخدمة</span><input value={form.service} onChange={(e) => setForm((c) => ({ ...c, service: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الاشتراك</span><input value={form.subscription} onChange={(e) => setForm((c) => ({ ...c, subscription: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الاستشارة</span><input value={form.consultation} onChange={(e) => setForm((c) => ({ ...c, consultation: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">نوع الخدمة</span><input value={form.serviceType} onChange={(e) => setForm((c) => ({ ...c, serviceType: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
          </div>
        </SectionCard>

        <SectionCard title={translateText("بنود الفاتورة")} subtitle={translateText("أضف البنود وسيتم احتساب الإجماليات تلقائياً.")} icon={<ListPlus className="h-5 w-5 text-[#12375f]" />}>
          <div className="mb-3 flex justify-end"><button onClick={addItem} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة بند</button></div>
          <div className="space-y-3">
            {form.items.map((item) => {
              const rowTotal = item.qty * item.unitPrice * (1 + item.tax / 100);
              return (
                <div key={item.id} className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-3">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
                    <label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">النوع</span><input value={item.type} onChange={(e) => updateItem(item.id, { type: e.target.value })} className="h-10 w-full rounded-lg border border-[#d9e4f4] px-3 text-sm" /></label>
                    <label className="block xl:col-span-2"><span className="mb-1 block text-xs text-[#6d84a1]">الوصف</span><input value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} className="h-10 w-full rounded-lg border border-[#d9e4f4] px-3 text-sm" /></label>
                    <label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">الكمية</span><input type="number" value={item.qty} onChange={(e) => updateItem(item.id, { qty: Number(e.target.value || 0) })} className="h-10 w-full rounded-lg border border-[#d9e4f4] px-3 text-sm" /></label>
                    <label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">سعر الوحدة</span><input type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value || 0) })} className="h-10 w-full rounded-lg border border-[#d9e4f4] px-3 text-sm" /></label>
                    <label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">الضريبة %</span><input type="number" value={item.tax} onChange={(e) => updateItem(item.id, { tax: Number(e.target.value || 0) })} className="h-10 w-full rounded-lg border border-[#d9e4f4] px-3 text-sm" /></label>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2"><span className="text-sm text-[#5f7898]">الإجمالي: <strong className="text-[#12375f]">{rowTotal.toFixed(2)} {form.currency}</strong></span><div className="flex gap-1"><button onClick={() => duplicateItem(item.id)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Copy className="inline h-3.5 w-3.5" /> نسخ</button><button onClick={() => removeItem(item.id)} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="inline h-3.5 w-3.5" /> حذف</button></div></div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-[#e1e9f5] bg-[#f8fbff] p-3">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div><p className="text-xs text-[#7f95b1]">الإجمالي قبل الخصم</p><p className="text-sm text-[#183a60]">{itemsTotals.subtotal.toFixed(2)} {form.currency}</p></div>
              <label className="block"><span className="text-xs text-[#7f95b1]">الخصم</span><input type="number" value={form.discount} onChange={(e) => setForm((c) => ({ ...c, discount: Number(e.target.value || 0) }))} className="mt-1 h-10 w-full rounded-lg border border-[#d9e4f4] bg-white px-3 text-sm" /></label>
              <div><p className="text-xs text-[#7f95b1]">إجمالي الضريبة</p><p className="text-sm text-[#183a60]">{itemsTotals.totalTax.toFixed(2)} {form.currency}</p></div>
              <div><p className="text-xs text-[#7f95b1]">الإجمالي النهائي</p><p className="text-sm font-semibold text-[#12375f]">{itemsTotals.finalTotal.toFixed(2)} {form.currency}</p></div>
            </div>
          </div>
        </SectionCard>

        <div className="flex flex-wrap justify-end gap-2">{isEdit ? <button onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">حفظ التغييرات</button> : <><button onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button></>}<button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></div>
      </section>
    );
  }

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الفواتير > القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الفواتير")}</h1><div className="flex flex-wrap gap-2"><button onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />إضافة فاتورة</button><button className="inline-flex items-center gap-2 rounded-xl bg-[#1f8c4f] px-4 py-2.5 text-sm font-medium text-white"><Download className="h-4 w-4" />تصدير إكسل</button></div></div></div>

      <SectionCard>
        <div className="mb-3 flex flex-wrap items-center gap-2"><div className="relative min-w-[220px] flex-1"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث")} className={clsx("h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] text-sm", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div>

          <div className="relative" ref={columnsRef}>
            <button onClick={() => { setFiltersOpen(false); setColumnsOpen((v) => !v); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094]"><Settings2 className="h-4 w-4" />الأعمدة</button>
            {columnsOpen ? <div className={clsx("absolute z-[60] mt-2 w-72 rounded-2xl border border-[#d9e4f4] bg-white p-3 shadow-[0_20px_45px_rgba(14,39,68,0.18)]", dir === "rtl" ? "right-0" : "left-0")}><div className="mb-2 flex items-center justify-between"><h4 className="text-sm font-semibold text-[#12375f]">الأعمدة</h4><button onClick={() => setVisibleColumns(defaultVisible)} className="text-xs text-[#c74747]">إعادة ضبط التصفيات</button></div><div className="space-y-2">{columns.map((column) => <label key={column.key} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f3f8ff]"><input type="checkbox" checked={visibleColumns[column.key]} onChange={(e) => { const next = { ...visibleColumns, [column.key]: e.target.checked }; if (Object.values(next).every((v) => !v)) return; setVisibleColumns(next); }} className="h-4 w-4 accent-[#123f6f]" /><span className="text-sm text-[#274a71]">{column.label}</span></label>)}</div><button onClick={() => setColumnsOpen(false)} className="mt-3 w-full rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">تطبيق الأعمدة</button></div> : null}
          </div>

          <div className="relative" ref={filtersRef}>
            <button onClick={() => { setColumnsOpen(false); setFiltersOpen((v) => !v); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094]"><Filter className="h-4 w-4" />التصفيات</button>
            {filtersOpen ? <div className={clsx("absolute z-[60] mt-2 w-80 rounded-2xl border border-[#d9e4f4] bg-white p-3 shadow-[0_20px_45px_rgba(14,39,68,0.18)]", dir === "rtl" ? "right-0" : "left-0")}><div className="mb-2 flex items-center justify-between"><h4 className="text-sm font-semibold text-[#12375f]">التصفيات</h4><button onClick={() => { setFilters(defaultFilters); setFiltersDraft(defaultFilters); }} className="text-xs text-[#c74747]">إعادة ضبط التصفيات</button></div><div className="grid gap-3"><label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">الخدمة</span><select value={filtersDraft.service} onChange={(e) => setFiltersDraft((c) => ({ ...c, service: e.target.value }))} className="h-10 w-full rounded-lg border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm">{serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}</select></label><label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">التاريخ</span><select value={filtersDraft.date} onChange={(e) => setFiltersDraft((c) => ({ ...c, date: e.target.value }))} className="h-10 w-full rounded-lg border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm"><option>هذا الشهر</option><option>هذا الأسبوع</option><option>اليوم</option></select></label></div><button onClick={() => { setFilters(filtersDraft); setFiltersOpen(false); }} className="mt-3 w-full rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">تطبيق التصفيات</button></div> : null}
          </div>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">{activeFilterChips.map((chip) => <span key={chip} className="inline-flex items-center gap-1 rounded-full bg-[#fff5df] px-3 py-1 text-xs text-[#bf6f00]">{chip}<button onClick={() => { if (chip.startsWith("التاريخ")) setFilters((c) => ({ ...c, date: "" })); if (chip.startsWith("الخدمة")) setFilters((c) => ({ ...c, service: "الكل" })); }}><X className="h-3 w-3" /></button></span>)}</div>

        <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table className="min-w-[1180px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr>{columns.filter((c) => visibleColumns[c.key]).map((column) => <th key={column.key} className="px-4 py-3">{column.label}</th>)}<th className="px-4 py-3">Actions</th></tr></thead><tbody>{filteredRows.map((row) => <tr key={row.id} className="border-t border-[#e7eef8]">{visibleColumns.number ? <td className="px-4 py-3 text-[#17395f]">{row.number}</td> : null}{visibleColumns.client ? <td className="px-4 py-3 text-[#17395f]">{row.client}</td> : null}{visibleColumns.issueDate ? <td className="px-4 py-3 text-[#17395f]">{row.issueDate}</td> : null}{visibleColumns.dueDate ? <td className="px-4 py-3 text-[#17395f]">{row.dueDate}</td> : null}{visibleColumns.currency ? <td className="px-4 py-3 text-[#17395f]">{row.currency}</td> : null}{visibleColumns.total ? <td className="px-4 py-3 text-[#17395f]">{currentTotal(row).toFixed(2)}</td> : null}{visibleColumns.status ? <td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", statusTone(row.status))}>{row.status}</span></td> : null}{visibleColumns.service ? <td className="px-4 py-3 text-[#17395f]">{row.service}</td> : null}<td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button onClick={() => openShow(row)} className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="inline h-3.5 w-3.5" /> عرض</button><button onClick={() => startEdit(row)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="inline h-3.5 w-3.5" /> تعديل</button><button onClick={() => setRows((c) => c.filter((i) => i.id !== row.id))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="inline h-3.5 w-3.5" /> حذف</button></div></td></tr>)}</tbody></table></div>

        {filteredRows.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ecf3fc] text-[#7a93b2]"><FileSpreadsheet className="h-5 w-5" /></div><p className="text-sm font-medium text-[#5d7da3]">لا توجد الفواتير</p><p className="mt-1 text-xs text-[#7f95b1]">قم بإضافة فاتورة للبدء.</p></div> : null}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898]"><span>عرض 1 إلى {Math.min(10, filteredRows.length)} من {filteredRows.length} نتيجة</span><span>لكل صفحة: 10</span></div>
      </SectionCard>
    </section>
  );
}
