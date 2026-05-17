"use client";

import clsx from "clsx";
import { Eye, FolderUp, Pencil, Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ConsultationStatus = "قيد الانتظار" | "موعد مؤكد" | "مرفوض" | "مكتمل" | "ملغي";
type ConsultationType = "مدفوع" | "مجاني" | "للمشتركين";

type ConsultationRecord = {
  id: number;
  client: string;
  title: string;
  subject: string;
  scheduledAt: string;
  type: ConsultationType;
  status: ConsultationStatus;
  paymentStatus: "مدفوع" | "غير مدفوع";
  lawyer: string;
  hasCase: boolean;
  meetingLink: string;
  attachmentName: string;
};

type FormState = {
  client: string;
  scheduledAt: string;
  hasCase: boolean;
  lawyer: string;
  type: ConsultationType;
  status: ConsultationStatus;
  title: string;
  subject: string;
  meetingLink: string;
  attachment: File | null;
};

type ViewMode = "list" | "add" | "edit";

const emptyForm: FormState = {
  client: "",
  scheduledAt: "",
  hasCase: false,
  lawyer: "",
  type: "مدفوع",
  status: "قيد الانتظار",
  title: "",
  subject: "",
  meetingLink: "",
  attachment: null,
};

function statusTone(value: ConsultationStatus) {
  if (value === "موعد مؤكد" || value === "مكتمل") return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  if (value === "قيد الانتظار") return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
}

function typeTone(value: ConsultationType) {
  if (value === "مدفوع") return "bg-[#e9f1ff] text-[#1e60ad] dark:bg-[#1a2e49] dark:text-[#9ec3ee]";
  if (value === "للمشتركين") return "bg-[#fff4df] text-[#aa6b00] dark:bg-[#3a2c16] dark:text-[#ecc27f]";
  return "bg-[#edf6ff] text-[#3c6f9f] dark:bg-[#13233a] dark:text-[#a7bfdc]";
}

function SectionCard({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <h3 className="mb-4 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h3>
      {children}
    </section>
  );
}

function ReviewModal({ open, record, onClose, onApprove, onReject, onReschedule }: Readonly<{ open: boolean; record: ConsultationRecord | null; onClose: () => void; onApprove: () => void; onReject: () => void; onReschedule: () => void }>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, onClose]);

  if (!open || !record) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07101d]/55 px-3 py-6">
      <div ref={ref} className="w-full max-w-3xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">مراجعة الاستشارة</h3>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="rounded-2xl border border-[#dbe6f3] bg-[#fbfdff] p-4 dark:border-[#27415f] dark:bg-[#122136]">
          <p className="mb-3 text-sm font-semibold text-[#1a446f] dark:text-[#dce8f8]">تفاصيل الاستشارة</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div><p className="text-xs text-[#7d95b2]">العميل</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{record.client}</p></div>
            <div><p className="text-xs text-[#7d95b2]">المحامي المكلف</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{record.lawyer}</p></div>
            <div><p className="text-xs text-[#7d95b2]">نوع</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", typeTone(record.type))}>{record.type}</span></div>
            <div><p className="text-xs text-[#7d95b2]">حالة الدفع</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", record.paymentStatus === "مدفوع" ? "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]" : "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]")}>{record.paymentStatus}</span></div>
            <div><p className="text-xs text-[#7d95b2]">الحالة</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", statusTone(record.status))}>{record.status}</span></div>
            <div><p className="text-xs text-[#7d95b2]">الموعد المحدد</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{record.scheduledAt}</p></div>
            <div><p className="text-xs text-[#7d95b2]">العنوان</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{record.title}</p></div>
            <div><p className="text-xs text-[#7d95b2]">هل توجد قضية؟</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{record.hasCase ? "نعم" : "لا"}</p></div>
            <div className="md:col-span-2"><p className="text-xs text-[#7d95b2]">الموضوع</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{record.subject || "-"}</p></div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={onApprove} className="rounded-xl bg-[#1f8c4f] px-4 py-2 text-sm font-medium text-white">موافقة</button>
          <button type="button" onClick={onReject} className="rounded-xl bg-[#b94141] px-4 py-2 text-sm font-medium text-white">رفض</button>
          <button type="button" onClick={onReschedule} className="rounded-xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248]">طلب إعادة جدولة</button>
          <button type="button" onClick={onClose} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">إغلاق</button>
        </div>
      </div>
    </div>
  );
}

export function ConsultationsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const [rows, setRows] = useState<ConsultationRecord[]>(() => {
    const mapped = (page.rows ?? []).map((row, index) => ({
      id: Number(row.id ?? index + 1),
      client: row.client ?? "-",
      title: row.subject ?? "-",
      subject: row.subject ?? "",
      scheduledAt: row.scheduledAt ?? "-",
      type: "مدفوع" as ConsultationType,
      status: (row.status as ConsultationStatus) ?? "قيد الانتظار",
      paymentStatus: (row.payment as "مدفوع" | "غير مدفوع") ?? "مدفوع",
      lawyer: "أ. فواز",
      hasCase: false,
      meetingLink: "",
      attachmentName: "",
    }));
    return mapped.length > 0 ? mapped : [];
  });

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => `${r.id} ${r.client} ${r.title} ${r.status} ${r.type} ${r.lawyer}`.toLowerCase().includes(q));
  }, [rows, query]);

  const startAdd = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setMode("add");
  };

  const startEdit = (row: ConsultationRecord) => {
    setSelectedId(row.id);
    setForm({
      client: row.client,
      scheduledAt: row.scheduledAt.includes("T") ? row.scheduledAt : "",
      hasCase: row.hasCase,
      lawyer: row.lawyer,
      type: row.type,
      status: row.status,
      title: row.title,
      subject: row.subject,
      meetingLink: row.meetingLink,
      attachment: null,
    });
    setMode("edit");
  };

  const saveAdd = (resetAfter = false) => {
    const next: ConsultationRecord = {
      id: Date.now(),
      client: form.client || "-",
      title: form.title || "-",
      subject: form.subject,
      scheduledAt: form.scheduledAt || "-",
      type: form.type,
      status: form.status,
      paymentStatus: form.type === "مدفوع" ? "مدفوع" : "غير مدفوع",
      lawyer: form.lawyer || "-",
      hasCase: form.hasCase,
      meetingLink: form.meetingLink,
      attachmentName: form.attachment?.name ?? "",
    };
    setRows((current) => [next, ...current]);
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
              client: form.client,
              scheduledAt: form.scheduledAt || row.scheduledAt,
              hasCase: form.hasCase,
              lawyer: form.lawyer,
              type: form.type,
              status: form.status,
              title: form.title,
              subject: form.subject,
              meetingLink: form.meetingLink,
              attachmentName: form.attachment?.name ?? row.attachmentName,
            }
          : row,
      ),
    );
    setMode("list");
  };

  const openReview = (row: ConsultationRecord) => {
    setSelectedId(row.id);
    setReviewOpen(true);
  };

  const updateReviewStatus = (status: ConsultationStatus) => {
    if (!selectedId) return;
    setRows((current) => current.map((row) => (row.id === selectedId ? { ...row, status } : row)));
    setReviewOpen(false);
  };

  if (mode === "list") {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الاستشارات / القائمة")}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الاستشارات")}</h1>
            <button type="button" onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0d3258]"><Plus className="h-4 w-4" />{translateText("إضافة استشارة")}</button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-4 max-w-md">
            <div className="relative">
              <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
            <table dir={dir} className="min-w-[1020px] w-full text-sm">
              <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">{translateText("العميل")}</th>
                  <th className="px-4 py-3">{translateText("العنوان")}</th>
                  <th className="px-4 py-3">{translateText("الموعد")}</th>
                  <th className="px-4 py-3">{translateText("نوع")}</th>
                  <th className="px-4 py-3">{translateText("الحالة")}</th>
                  <th className="px-4 py-3">{translateText("المحامي")}</th>
                  <th className="px-4 py-3">{translateText("الإجراءات")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.id}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.client}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.title}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.scheduledAt}</td>
                    <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", typeTone(row.type))}>{row.type}</span></td>
                    <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", statusTone(row.status))}>{row.status}</span></td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.lawyer}</td>
                    <td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button type="button" onClick={() => openReview(row)} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("مراجعة")}</button><button type="button" onClick={() => startEdit(row)} className="inline-flex items-center gap-1 rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="h-3.5 w-3.5" />{translateText("تعديل")}</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]">
            <span>{translateText("إجمالي النتائج")}: {filtered.length}</span>
            <div className="flex items-center gap-2"><button className="rounded-lg border border-[#d9e4f4] px-3 py-1">1</button></div>
          </div>
        </div>

        <ReviewModal
          open={reviewOpen}
          record={selected}
          onClose={() => setReviewOpen(false)}
          onApprove={() => updateReviewStatus("موعد مؤكد")}
          onReject={() => updateReviewStatus("مرفوض")}
          onReschedule={() => updateReviewStatus("قيد الانتظار")}
        />
      </section>
    );
  }

  const isEdit = mode === "edit";
  const title = isEdit ? "تعديل استشارة" : "إضافة استشارة";
  const breadcrumb = isEdit ? "الاستشارات / تعديل" : "الاستشارات / إضافة";

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText(breadcrumb)}</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText(title)}</h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title={translateText("العميل والموعد")}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العميل")} <span className="text-[#d14b4b]">*</span></span><input value={form.client} onChange={(e) => setForm((c) => ({ ...c, client: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الموعد المحدد")} <span className="text-[#d14b4b]">*</span></span><input dir="ltr" type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm((c) => ({ ...c, scheduledAt: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
            <label className="inline-flex items-center gap-2 text-sm md:col-span-2"><input type="checkbox" checked={form.hasCase} onChange={(e) => setForm((c) => ({ ...c, hasCase: e.target.checked }))} />{translateText("هل توجد قضية؟")}</label>
          </div>
        </SectionCard>

        <SectionCard title={translateText("الإدارة")}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("المحامي المكلف")} <span className="text-[#d14b4b]">*</span></span><input value={form.lawyer} onChange={(e) => setForm((c) => ({ ...c, lawyer: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("نوع")} <span className="text-[#d14b4b]">*</span></span><select value={form.type} onChange={(e) => setForm((c) => ({ ...c, type: e.target.value as ConsultationType }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]"><option>مدفوع</option><option>مجاني</option><option>للمشتركين</option></select></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الحالة")} <span className="text-[#d14b4b]">*</span></span><select value={form.status} onChange={(e) => setForm((c) => ({ ...c, status: e.target.value as ConsultationStatus }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]"><option>قيد الانتظار</option><option>موعد مؤكد</option><option>مرفوض</option><option>مكتمل</option><option>ملغي</option></select></label>
          </div>
        </SectionCard>
      </div>

      <SectionCard title={translateText("تفاصيل الاستشارة")}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العنوان")} <span className="text-[#d14b4b]">*</span></span><input value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الموضوع / ملاحظات")}</span><textarea rows={4} value={form.subject} onChange={(e) => setForm((c) => ({ ...c, subject: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("رابط الاجتماع")}</span><input value={form.meetingLink} onChange={(e) => setForm((c) => ({ ...c, meetingLink: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("مرفق")}</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center dark:border-[#2b425f] dark:bg-[#122136]"><FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setForm((c) => ({ ...c, attachment: e.target.files?.[0] ?? null }))} /></div></label>
        </div>
      </SectionCard>

      <div className="flex flex-wrap justify-end gap-2">
        {isEdit ? (
          <>
            <button type="button" onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("حفظ التغييرات")}</button>
            <button type="button" onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
            <button type="button" onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إضافة وبدء إضافة المزيد")}</button>
            <button type="button" onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
          </>
        )}
      </div>
    </section>
  );
}
