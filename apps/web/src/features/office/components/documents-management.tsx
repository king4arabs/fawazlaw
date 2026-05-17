"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Eye, Filter, FolderUp, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type DocumentRow = {
  id: string;
  title: string;
  originalName: string;
  category: string;
  visibility: string;
  client: string;
  type: string;
  format: string;
  extension: string;
  size: string;
  owner: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: string;
  notes: string;
  relatedLabel: string;
  previewable: string;
};

type ViewMode = "list" | "show" | "add" | "edit";
type ShowTab = "preview" | "links";

type DocumentForm = {
  title: string;
  visibility: string;
  category: string;
  tags: string;
  notes: string;
  type: string;
  client: string;
  relatedLabel: string;
  file: File | null;
};

const emptyForm: DocumentForm = {
  title: "",
  visibility: "للعميل",
  category: "",
  tags: "",
  notes: "",
  type: "أخرى",
  client: "",
  relatedLabel: "",
  file: null,
};

function fileTypeIconSrc(document: Pick<DocumentRow, "format" | "extension">) {
  const formatValue = `${document.format} ${document.extension}`.toLowerCase();
  if (formatValue.includes("pdf")) return "/file-pdf.png";
  if (formatValue.includes("doc") || formatValue.includes("docx")) return "/file-doc.png";
  if (formatValue.includes("video") || formatValue.includes("mp4") || formatValue.includes("mov") || formatValue.includes("avi") || formatValue.includes("mkv")) {
    return "/file-video.png";
  }
  return "/file-doc.png";
}

function badgeTone(value: string) {
  if (value.includes("داخلي") || value.includes("خاص")) return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  if (value.includes("للعميل")) return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  if (value.includes("Pdf")) return "bg-[#e9f1ff] text-[#1e60ad] dark:bg-[#1a2e49] dark:text-[#9ec3ee]";
  if (value.includes("Image")) return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  if (value.includes("Doc")) return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  if (value.includes("قضية") || value.includes("خدمة") || value.includes("عميل") || value.includes("استشارة") || value.includes("تذكرة")) return "bg-[#edf6ff] text-[#3c6f9f] dark:bg-[#13233a] dark:text-[#a7bfdc]";
  return "bg-[#edf6ff] text-[#3c6f9f] dark:bg-[#13233a] dark:text-[#a7bfdc]";
}

function EmptyState({ title, description }: Readonly<{ title: string; description?: string }>) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center dark:border-[#29405d] dark:bg-[#132238]">
      <p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{title}</p>
      {description ? <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{description}</p> : null}
    </div>
  );
}

function PreviewModal({ open, document, onClose }: Readonly<{ open: boolean; document: DocumentRow | null; onClose: () => void }>) {
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

  if (!open || !document) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07101d]/55 px-3 py-6">
      <div ref={ref} className="w-full max-w-5xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{document.title}</h3><button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]"><X className="h-5 w-5" /></button></div>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-4 dark:border-[#223752] dark:bg-[#122136]"><h4 className="mb-2 text-sm font-semibold text-[#1f4f7f] dark:text-[#dce8f8]">المعاينة</h4>{document.previewable === "yes" ? <div className="flex h-[340px] items-center justify-center rounded-lg border border-[#d7e3f3] bg-white text-[#5f7898] dark:border-[#29405d] dark:bg-[#0f1b2d] dark:text-[#9cb3ce]">{document.format === "Pdf" ? "PDF Preview" : "Image Preview"}</div> : <div className="flex h-[340px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[#d7e3f3] bg-white text-sm text-[#6f89ab] dark:border-[#29405d] dark:bg-[#0f1b2d] dark:text-[#9cb3ce]"><Image src={fileTypeIconSrc(document)} alt={document.format} width={64} height={64} className="h-16 w-16 object-contain" />لا يمكن عرض معاينة لهذا النوع من الملفات.</div>}</section>
          <section className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-4 dark:border-[#223752] dark:bg-[#122136]"><h4 className="mb-2 text-sm font-semibold text-[#1f4f7f] dark:text-[#dce8f8]">التفاصيل</h4><div className="grid gap-2 text-sm">{[["ID", document.id],["العنوان", document.title],["الاسم الأصلي", document.originalName],["النوع", document.type],["الصيغة / الامتداد", `${document.format} / ${document.extension}`],["الحجم", document.size],["الخصوصية", document.visibility],["الفئة", document.category],["الوسوم", document.tags || "-"],["تم الرفع بواسطة", document.owner],["تاريخ الرفع", document.uploadedAt],["تاريخ الإنشاء", document.createdAt],["تاريخ التحديث", document.updatedAt]].map(([k,v]) => <div key={k} className="flex items-center justify-between gap-3 rounded-lg border border-[#e8eef8] bg-white px-3 py-2 dark:border-[#243953] dark:bg-[#0f1b2d]"><span className="text-xs text-[#7891b0]">{k}</span><span className="text-xs text-[#1f4f7f] dark:text-[#dce8f8]">{v}</span></div>)}</div></section>
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2"><button className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">فتح</button><button className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">تحميل</button><button onClick={onClose} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إغلاق</button></div>
      </div>
    </div>
  );
}

export function DocumentsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, translateText } = useOfficePreferences();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTab, setShowTab] = useState<ShowTab>("preview");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form, setForm] = useState<DocumentForm>(emptyForm);

  const [docs, setDocs] = useState<DocumentRow[]>(
    (page.rows ?? []).map((row) => ({
      id: row.id ?? String(Date.now()),
      title: row.title ?? "-",
      originalName: row.originalName ?? row.title ?? "-",
      category: row.category ?? "-",
      visibility: row.visibility ?? "-",
      client: row.client ?? "-",
      type: row.type ?? "أخرى",
      format: row.format ?? "Other",
      extension: row.extension ?? "-",
      size: row.size ?? "-",
      owner: row.owner ?? "-",
      uploadedAt: row.uploadedAt ?? "-",
      createdAt: row.createdAt ?? "-",
      updatedAt: row.updatedAt ?? "-",
      tags: row.tags ?? "",
      notes: row.notes ?? "",
      relatedLabel: row.relatedLabel ?? "-",
      previewable: row.previewable ?? "no",
    })),
  );

  useEffect(() => {
    const docId = searchParams.get("doc");
    if (!docId) return;
    const found = docs.find((d) => d.id === docId || d.title === docId);
    if (found) {
      setSelectedId(found.id);
      setViewMode("show");
    }
  }, [searchParams, docs]);

  const selected = useMemo(() => docs.find((doc) => doc.id === selectedId) ?? null, [docs, selectedId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return docs;
    const q = query.toLowerCase();
    return docs.filter((doc) => `${doc.title} ${doc.category} ${doc.visibility} ${doc.client} ${doc.type} ${doc.owner}`.toLowerCase().includes(q));
  }, [docs, query]);

  const startAdd = () => {
    setForm(emptyForm);
    setViewMode("add");
  };

  const startEdit = (doc: DocumentRow) => {
    setSelectedId(doc.id);
    setForm({ title: doc.title, visibility: doc.visibility, category: doc.category, tags: doc.tags, notes: doc.notes, type: doc.type, client: doc.client === "-" ? "" : doc.client, relatedLabel: doc.relatedLabel === "-" ? "" : doc.relatedLabel, file: null });
    setViewMode("edit");
  };

  const saveAdd = (resetAfter = false) => {
    const created: DocumentRow = {
      id: String(Date.now()),
      title: form.title,
      originalName: form.file?.name ?? form.title,
      category: form.category || "-",
      visibility: form.visibility,
      client: form.client || "-",
      type: form.type || "أخرى",
      format: form.file?.type.includes("pdf") ? "Pdf" : form.file?.type.includes("image") ? "Image" : form.file?.type.includes("doc") ? "Doc" : "Other",
      extension: form.file?.name.split(".").pop() ?? "-",
      size: form.file ? `${Math.max(1, Math.round(form.file.size / 1024))} KB` : "-",
      owner: "أ. فواز",
      uploadedAt: new Date().toLocaleString(isArabic ? "ar" : "en"),
      createdAt: new Date().toLocaleString(isArabic ? "ar" : "en"),
      updatedAt: new Date().toLocaleString(isArabic ? "ar" : "en"),
      tags: form.tags,
      notes: form.notes,
      relatedLabel: form.relatedLabel || "-",
      previewable: form.file && (form.file.type.includes("pdf") || form.file.type.includes("image")) ? "yes" : "no",
    };
    setDocs((current) => [created, ...current]);
    if (resetAfter) setForm(emptyForm);
    else setViewMode("list");
  };

  const saveEdit = () => {
    if (!selected) return;
    setDocs((current) => current.map((doc) => doc.id === selected.id ? { ...doc, title: form.title, visibility: form.visibility, category: form.category, tags: form.tags, notes: form.notes, type: form.type, client: form.client || "-", relatedLabel: form.relatedLabel || "-", updatedAt: new Date().toLocaleString(isArabic ? "ar" : "en") } : doc));
    setViewMode("show");
  };

  if (viewMode === "list") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("المستندات / القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Image src="/folder-icon.png" alt={translateText("مستندات")} width={28} height={28} className="h-7 w-7 object-contain" /><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("المستندات")}</h1></div><button type="button" onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("إضافة مستند")}</button></div></div>

        <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-4 flex flex-wrap items-center gap-2"><div className="relative min-w-[240px] flex-1"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div><button className="inline-flex items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-4 py-2.5 text-sm text-[#547094]"><Filter className="h-4 w-4" />{translateText("تصفية")}</button></div>

          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
            <table dir={dir} className="min-w-[1320px] w-full text-sm">
              <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3"><input type="checkbox" /></th><th className="px-4 py-3">{translateText("معاينة")}</th><th className="px-4 py-3">{translateText("العنوان")}</th><th className="px-4 py-3">{translateText("الفئة")}</th><th className="px-4 py-3">{translateText("الخصوصية")}</th><th className="px-4 py-3">{translateText("العميل")}</th><th className="px-4 py-3">{translateText("النوع")}</th><th className="px-4 py-3">{translateText("تاريخ الرفع")}</th><th className="px-4 py-3">{translateText("تم الرفع بواسطة")}</th><th className="px-4 py-3">{translateText("الصيغة")}</th><th className="px-4 py-3">{translateText("الإجراءات")}</th></tr></thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3"><input type="checkbox" /></td><td className="px-4 py-3"><button type="button" onClick={() => { setSelectedId(doc.id); setPreviewOpen(true); }} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("معاينة")}</button></td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]"><div className="flex items-center gap-2"><Image src={fileTypeIconSrc(doc)} alt={doc.format} width={18} height={18} className="h-[18px] w-[18px] object-contain" /><div className="line-clamp-2 break-all">{doc.title}</div></div></td><td className="px-4 py-3">{doc.category}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", badgeTone(doc.visibility))}>{doc.visibility}</span></td><td className="px-4 py-3">{doc.client}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", badgeTone(doc.type))}>{doc.type}</span></td><td className="px-4 py-3">{doc.uploadedAt}</td><td className="px-4 py-3">{doc.owner}</td><td className="px-4 py-3"><span className="inline-flex items-center gap-1"><Image src={fileTypeIconSrc(doc)} alt={doc.format} width={14} height={14} className="h-3.5 w-3.5 object-contain" /><span className={clsx("rounded-full px-2.5 py-1 text-xs", badgeTone(doc.format))}>{doc.format}</span></span></td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button type="button" onClick={() => { setSelectedId(doc.id); setPreviewOpen(true); }} className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]">{translateText("معاينة")}</button><button type="button" onClick={() => { setSelectedId(doc.id); setViewMode("show"); }} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{translateText("عرض")}</button><button type="button" onClick={() => startEdit(doc)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{translateText("تعديل")}</button><button type="button" onClick={() => setDocs((current) => current.filter((item) => item.id !== doc.id))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="inline h-3.5 w-3.5" /> {translateText("حذف")}</button></div></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>{translateText("إجمالي النتائج")}: {filtered.length}</span><span>{translateText("الصفحة")} 1 {translateText("من")} 1</span></div>
        </div>

        <PreviewModal open={previewOpen} document={selected} onClose={() => setPreviewOpen(false)} />
      </section>
    );
  }

  if (viewMode === "add" || viewMode === "edit") {
    const isEdit = viewMode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? translateText("المستندات / تعديل") : translateText("المستندات / إضافة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Image src="/folder-icon.png" alt={translateText("مستندات")} width={28} height={28} className="h-7 w-7 object-contain" /><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? translateText("تعديل مستند") : translateText("إضافة مستند")}</h1></div>{isEdit ? <button type="button" onClick={() => setViewMode("show")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("عرض")}</button> : null}</div></div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><h3 className="mb-4 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("المعلومات الأساسية")}</h3><div className="grid gap-4 md:grid-cols-2"><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العنوان")} <span className="text-[#d14b4b]">*</span></span><input value={form.title} onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الخصوصية")}</span><select value={form.visibility} onChange={(e) => setForm((c) => ({ ...c, visibility: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>للعميل</option><option>خاص</option><option>داخلي</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الفئة")}</span><input value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الوسوم")}</span><input value={form.tags} onChange={(e) => setForm((c) => ({ ...c, tags: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label></div></div>
          <div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><h3 className="mb-4 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("الملف")}</h3><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الملف")}</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setForm((c) => ({ ...c, file: e.target.files?.[0] ?? null }))} /></div>{form.file ? <p className="mt-2 text-xs text-[#6f86a5]">{form.file.name} ({Math.max(1, Math.round(form.file.size / 1024))} KB)</p> : null}</label><label className="mt-4 block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("ملاحظات")}</span><textarea rows={4} value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm" /></label></div>
        </div>

        <div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><h3 className="mb-4 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("الارتباطات")}</h3><div className="grid gap-4 md:grid-cols-3"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("النوع")}</span><select value={form.type} onChange={(e) => setForm((c) => ({ ...c, type: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>قضية</option><option>خدمة</option><option>عميل</option><option>استشارة</option><option>تذكرة</option><option>أخرى</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العميل")}</span><input value={form.client} onChange={(e) => setForm((c) => ({ ...c, client: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الارتباط")}</span><input value={form.relatedLabel} onChange={(e) => setForm((c) => ({ ...c, relatedLabel: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label></div></div>

        <div className="flex flex-wrap justify-end gap-2">{isEdit ? <button type="button" onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("حفظ التغييرات")}</button> : <><button type="button" onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}<button type="button" onClick={() => setViewMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></div>
      </section>
    );
  }

  if (!selected) return null;

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("المستندات / عرض")}</p><div className="mt-2 flex items-center gap-3"><Image src="/folder-icon.png" alt={translateText("مستندات")} width={28} height={28} className="h-7 w-7 object-contain" /><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("عرض مستند")}</h1></div></div>
      <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><div className="inline-flex min-w-max gap-2">{[["preview","المعاينة والتفاصيل"],["links","الارتباطات"]].map(([k,l]) => <button key={k} type="button" onClick={() => setShowTab(k as ShowTab)} className={clsx("rounded-xl px-4 py-2 text-sm", showTab===k?"bg-[#e9f2ff] text-[#123d6a]":"text-[#5f7898] hover:bg-[#f5f9ff]")}>{translateText(l)}</button>)}</div></div>

      {showTab === "preview" ? (
        <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]"><div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><h3 className="mb-3 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("المعاينة")}</h3>{selected.previewable === "yes" ? <div className="flex h-[320px] items-center justify-center rounded-xl border border-[#d7e3f3] bg-[#fbfdff] text-[#5f7898] dark:border-[#29405d] dark:bg-[#122136] dark:text-[#9cb3ce]">{selected.format === "Pdf" ? "PDF Preview" : "Image Preview"}</div> : <div className="flex h-[320px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#d7e3f3] bg-[#fbfdff]"><Image src={fileTypeIconSrc(selected)} alt={selected.format} width={68} height={68} className="h-[68px] w-[68px] object-contain" /><EmptyState title={translateText("لا يمكن عرض معاينة لهذا النوع من الملفات.")} /></div>}</div><div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><h3 className="mb-3 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("التفاصيل")}</h3><div className="grid gap-2 text-sm">{[["العنوان",selected.title],["ID",selected.id],["الاسم الأصلي",selected.originalName],["النوع",selected.type],["الصيغة",selected.format],["الامتداد",selected.extension],["الحجم",selected.size],["الخصوصية",selected.visibility],["الفئة",selected.category],["الوسوم",selected.tags || "-"],["تم الرفع بواسطة",selected.owner],["تاريخ الرفع",selected.uploadedAt],["تاريخ الإنشاء",selected.createdAt],["تاريخ التحديث",selected.updatedAt],["ملاحظات",selected.notes || "-"]].map(([k,v]) => <div key={k} className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2 dark:border-[#243953] dark:bg-[#122136]"><p className="text-[11px] text-[#7891b0]">{k}</p><p className="break-all text-xs text-[#1f4f7f] dark:text-[#dce8f8]">{v}</p></div>)}</div><div className="mt-3 flex gap-2"><button className="rounded-xl bg-[#103a67] px-4 py-2 text-xs text-white">فتح</button><button className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-xs text-[#547094]">تحميل</button></div></div></div>
      ) : (
        <div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <h3 className="mb-3 text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("الارتباطات")}</h3>
          {selected.relatedLabel && selected.relatedLabel !== "-" ? (
            <div className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-3 dark:border-[#223752] dark:bg-[#122136]"><p className="text-sm text-[#1f4f7f] dark:text-[#dce8f8]">{selected.relatedLabel}</p><div className="mt-2"><Link href="/office/archive" className="text-xs text-[#2a67b5] underline">{translateText("فتح الارتباط في الأرشيف")}</Link></div></div>
          ) : (
            <EmptyState title={translateText("لا توجد ارتباطات لهذا المستند.")} />
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={() => startEdit(selected)} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">{translateText("تعديل")}</button><button type="button" onClick={() => setViewMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("رجوع")}</button></div>
    </section>
  );
}
