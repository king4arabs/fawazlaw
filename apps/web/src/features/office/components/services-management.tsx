"use client";

import clsx from "clsx";
import { CheckCircle2, Eye, FolderUp, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type LangKey = "ar" | "en" | "ur";
type ViewMode = "list" | "add" | "edit" | "show";
type ShowTab = "overview" | "tasks" | "data";

type ServiceRecord = {
  id: string;
  name: string;
  category: string;
  price: string;
  status: string;
  createdAt: string;
  slug: string;
  currency: string;
  available: boolean;
  initialDataModel: string;
  internalInfo: string;
  taskTemplates: string[];
  metadata: Array<{ key: string; value: string }>;
  localizedTitle: Record<LangKey, string>;
  iconName: string;
};

type ServiceForm = {
  localizedTitle: Record<LangKey, string>;
  slug: string;
  available: boolean;
  priceValue: string;
  currency: string;
  initialDataModel: string;
  internalInfo: string;
  taskTemplates: string[];
  metadataText: string;
  iconFile: File | null;
};

const emptyForm: ServiceForm = {
  localizedTitle: { ar: "", en: "", ur: "" },
  slug: "",
  available: true,
  priceValue: "",
  currency: "SAR",
  initialDataModel: "",
  internalInfo: "",
  taskTemplates: [],
  metadataText: "",
  iconFile: null,
};

function SectionCard({ title, subtitle, children }: Readonly<{ title: string; subtitle?: string; children: React.ReactNode }>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <h3 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h3>
      {subtitle ? <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea3c0]">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function availabilityTone(available: boolean) {
  return available
    ? "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]"
    : "bg-[#eef3fa] text-[#5d7696] dark:bg-[#24364f] dark:text-[#a8bed8]";
}

export function ServicesManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [showTab, setShowTab] = useState<ShowTab>("overview");
  const [activeLang, setActiveLang] = useState<LangKey>("ar");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState("");
  const [form, setForm] = useState<ServiceForm>(emptyForm);

  const [rows, setRows] = useState<ServiceRecord[]>(() =>
    (page.rows ?? []).map((row, index) => {
      const name = row.name ?? row.title ?? `خدمة ${index + 1}`;
      const statusValue = row.status ?? "نشط";
      return {
        id: row.id ?? String(index + 1),
        name,
        category: row.category ?? "-",
        price: row.price ?? "0 SAR",
        status: statusValue,
        createdAt: row.createdAt ?? `2026-05-${String(index + 10).padStart(2, "0")}`,
        slug: row.slug ?? name.replace(/\s+/g, "-").toLowerCase(),
        currency: row.currency ?? "SAR",
        available: statusValue.includes("نشط") || statusValue.includes("متاح"),
        initialDataModel: row.initialDataModel ?? "-",
        internalInfo: row.internalInfo ?? "-",
        taskTemplates: row.tasks ? row.tasks.split("|").filter(Boolean) : [],
        metadata: row.meta ? row.meta.split("|").map((item) => {
          const [k, v] = item.split(":");
          return { key: (k ?? "-").trim(), value: (v ?? "-").trim() };
        }) : [],
        localizedTitle: { ar: name, en: row.nameEn ?? "", ur: row.nameUr ?? "" },
        iconName: row.iconName ?? "-",
      };
    }),
  );

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => `${r.name} ${r.price} ${r.createdAt} ${r.status}`.toLowerCase().includes(q));
  }, [rows, query]);

  const startAdd = () => {
    setMode("add");
    setForm(emptyForm);
    setSelectedId(null);
    setTaskInput("");
  };

  const startEdit = (record: ServiceRecord) => {
    setSelectedId(record.id);
    setMode("edit");
    const numericPrice = record.price.replace(/[^\d.]/g, "");
    setForm({
      localizedTitle: record.localizedTitle,
      slug: record.slug,
      available: record.available,
      priceValue: numericPrice,
      currency: record.currency,
      initialDataModel: record.initialDataModel === "-" ? "" : record.initialDataModel,
      internalInfo: record.internalInfo === "-" ? "" : record.internalInfo,
      taskTemplates: [...record.taskTemplates],
      metadataText: record.metadata.map((m) => `${m.key}:${m.value}`).join("\n"),
      iconFile: null,
    });
    setTaskInput("");
  };

  const openShow = (record: ServiceRecord) => {
    setSelectedId(record.id);
    setMode("show");
    setShowTab("overview");
  };

  const addTaskTemplate = () => {
    if (!taskInput.trim()) return;
    setForm((current) => ({ ...current, taskTemplates: [...current.taskTemplates, taskInput.trim()] }));
    setTaskInput("");
  };

  const removeTaskTemplate = (idx: number) => {
    setForm((current) => ({ ...current, taskTemplates: current.taskTemplates.filter((_, i) => i !== idx) }));
  };

  const saveAdd = (resetAfter = false) => {
    const arName = form.localizedTitle.ar.trim() || "خدمة جديدة";
    const next: ServiceRecord = {
      id: String(Date.now()),
      name: arName,
      category: "خدمات",
      price: `${form.priceValue || "0"} ${form.currency}`,
      status: form.available ? "نشط" : "غير متاح",
      createdAt: new Date().toLocaleDateString("en-CA"),
      slug: form.slug || arName.replace(/\s+/g, "-").toLowerCase(),
      currency: form.currency,
      available: form.available,
      initialDataModel: form.initialDataModel || "-",
      internalInfo: form.internalInfo || "-",
      taskTemplates: form.taskTemplates,
      metadata: form.metadataText
        ? form.metadataText.split("\n").map((line) => {
            const [k, v] = line.split(":");
            return { key: (k ?? "-").trim(), value: (v ?? "-").trim() };
          })
        : [],
      localizedTitle: form.localizedTitle,
      iconName: form.iconFile?.name ?? "-",
    };
    setRows((current) => [next, ...current]);
    if (resetAfter) {
      setForm(emptyForm);
      setTaskInput("");
    } else {
      setMode("list");
    }
  };

  const saveEdit = () => {
    if (!selectedId) return;
    const arName = form.localizedTitle.ar.trim() || "خدمة";
    setRows((current) =>
      current.map((row) =>
        row.id === selectedId
          ? {
              ...row,
              name: arName,
              slug: form.slug || row.slug,
              available: form.available,
              status: form.available ? "نشط" : "غير متاح",
              price: `${form.priceValue || "0"} ${form.currency}`,
              currency: form.currency,
              initialDataModel: form.initialDataModel || "-",
              internalInfo: form.internalInfo || "-",
              taskTemplates: form.taskTemplates,
              metadata: form.metadataText
                ? form.metadataText.split("\n").map((line) => {
                    const [k, v] = line.split(":");
                    return { key: (k ?? "-").trim(), value: (v ?? "-").trim() };
                  })
                : [],
              localizedTitle: form.localizedTitle,
              iconName: form.iconFile?.name ?? row.iconName,
            }
          : row,
      ),
    );
    setMode("show");
  };

  if (mode === "list") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الخدمات / القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الخدمات")}</h1><button type="button" onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("إضافة خدمة")}</button></div></div>

        <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-4 relative"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div>
          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[860px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3">{translateText("الاسم")}</th><th className="px-4 py-3">{translateText("متاح")}</th><th className="px-4 py-3">{translateText("السعر")}</th><th className="px-4 py-3">{translateText("تم الإنشاء")}</th><th className="px-4 py-3">{translateText("الإجراءات")}</th></tr></thead><tbody>{filtered.map((row) => <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.name}</td><td className="px-4 py-3"><span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs", availabilityTone(row.available))}><CheckCircle2 className="h-3.5 w-3.5" />{translateText(row.available ? "متاح" : "غير متاح")}</span></td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.price}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.createdAt}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button onClick={() => openShow(row)} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("عرض")}</button><button onClick={() => startEdit(row)} className="inline-flex items-center gap-1 rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="h-3.5 w-3.5" />{translateText("تعديل")}</button><button onClick={() => setRows((current) => current.filter((s) => s.id !== row.id))} className="inline-flex items-center gap-1 rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="h-3.5 w-3.5" />{translateText("حذف")}</button></div></td></tr>)}</tbody></table></div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>{translateText("إجمالي النتائج")}: {filtered.length}</span><span>{translateText("الصفحة")} 1 {translateText("من")} 1</span></div>
        </div>
      </section>
    );
  }

  if (mode === "add" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? translateText(`الخدمات / ${selected?.name ?? "-"} / تعديل`) : translateText("الخدمات / إضافة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? `${translateText("تعديل")} ${selected?.name ?? ""}` : translateText("إضافة خدمة")}</h1>{isEdit ? <button type="button" onClick={() => selected && openShow(selected)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("عرض")}</button> : null}</div></div>

        <SectionCard title={translateText("هوية الخدمة")} subtitle={translateText("الهوية الأساسية وتوفير الخدمة.")}>
          <div className="mb-4 overflow-x-auto"><div className="inline-flex min-w-max gap-2">{([{ key: "ar", label: "العربية" }, { key: "en", label: "الإنجليزية" }, { key: "ur", label: "الأردية" }] as Array<{ key: LangKey; label: string }>).map((lang) => <button key={lang.key} type="button" onClick={() => setActiveLang(lang.key)} className={clsx("rounded-xl px-4 py-2 text-sm", activeLang === lang.key ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{translateText(lang.label)}</button>)}</div></div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العنوان / الاسم")} <span className="text-[#d14b4b]">*</span></span><input value={form.localizedTitle[activeLang]} onChange={(e) => setForm((c) => ({ ...c, localizedTitle: { ...c.localizedTitle, [activeLang]: e.target.value } }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("المعرف (Slug)")}</span><input value={form.slug} onChange={(e) => setForm((c) => ({ ...c, slug: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الأيقونة / الصورة")}</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setForm((c) => ({ ...c, iconFile: e.target.files?.[0] ?? null }))} />{form.iconFile ? <p className="mt-2 text-xs text-[#6f86a5]">{form.iconFile.name} ({Math.max(1, Math.round(form.iconFile.size / 1024))} KB)</p> : null}</div></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("متاح")}</span><button type="button" onClick={() => setForm((c) => ({ ...c, available: !c.available }))} className={clsx("inline-flex h-11 w-full items-center justify-center rounded-xl border text-sm", form.available ? "border-[#9fd5b5] bg-[#ebfff1] text-[#14954c]" : "border-[#d8e3f1] bg-[#f6f9fe] text-[#6f89ab]")}>{translateText(form.available ? "متاح" : "غير متاح")}</button></label>
          </div>
        </SectionCard>

        <SectionCard title={translateText("خصائص الخدمة")}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("قيمة السعر")}</span><input value={form.priceValue} onChange={(e) => setForm((c) => ({ ...c, priceValue: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العملة")}</span><select value={form.currency} onChange={(e) => setForm((c) => ({ ...c, currency: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option value="SAR">SAR</option><option value="USD">USD</option><option value="AED">AED</option></select></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("نموذج البيانات الأولي")}</span><input value={form.initialDataModel} onChange={(e) => setForm((c) => ({ ...c, initialDataModel: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("معلومات داخلية")}</span><textarea rows={4} value={form.internalInfo} onChange={(e) => setForm((c) => ({ ...c, internalInfo: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
          </div>
        </SectionCard>

        <SectionCard title={translateText("قوالب المهام")}>
          <div className="mb-3 flex flex-wrap gap-2"><input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder={translateText("اسم المهمة")}
            className="h-10 flex-1 rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" />
            <button type="button" onClick={addTaskTemplate} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة مهمة")}</button></div>
          {form.taskTemplates.length === 0 ? <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center"><p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{translateText("لا توجد قوالب مهام")}</p><p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("أضف قالب مهمة لتنفيذها أثناء الخدمة.")}</p></div> : <div className="space-y-2">{form.taskTemplates.map((task, idx) => <div key={`${task}-${idx}`} className="flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-3 py-2 text-sm"><span>{task}</span><button type="button" onClick={() => removeTaskTemplate(idx)} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div>}
        </SectionCard>

        <SectionCard title={translateText("متقدم")}>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">Metadata (key:value)</span><textarea rows={4} value={form.metadataText} onChange={(e) => setForm((c) => ({ ...c, metadataText: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
        </SectionCard>

        <div className="flex flex-wrap justify-end gap-2">{isEdit ? <button type="button" onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("حفظ التغييرات")}</button> : <><button type="button" onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}<button type="button" onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></div>
      </section>
    );
  }

  if (!selected) return null;

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText(`الخدمات / ${selected.name} / عرض`)}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("عرض")} {selected.name}</h1></div>

      <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><div className="inline-flex min-w-max gap-2">{([ ["overview", "نظرة عامة"], ["tasks", "المهام"], ["data", "بيانات"] ] as Array<[ShowTab, string]>).map(([k,l]) => <button key={k} type="button" onClick={() => setShowTab(k)} className={clsx("rounded-xl px-4 py-2 text-sm", showTab===k ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{translateText(l)}</button>)}</div></div>

      {showTab === "overview" ? (
        <div className="grid gap-4 xl:grid-cols-3">
          <SectionCard title={translateText("الهوية")}><div className="space-y-2 text-sm"><p><span className="text-[#7891b0]">{translateText("الاسم")}: </span>{selected.name}</p><p><span className="text-[#7891b0]">Slug: </span>{selected.slug}</p><p><span className="text-[#7891b0]">{translateText("متاح")}: </span><span className={clsx("rounded-full px-2 py-0.5 text-xs", availabilityTone(selected.available))}>{translateText(selected.available ? "متاح" : "غير متاح")}</span></p></div></SectionCard>
          <SectionCard title={translateText("التسعير")}><div className="space-y-2 text-sm"><p><span className="text-[#7891b0]">{translateText("المبلغ")}: </span>{selected.price}</p><p><span className="text-[#7891b0]">{translateText("العملة")}: </span>{selected.currency}</p><p><span className="text-[#7891b0]">{translateText("معلومات داخلية")}: </span>{selected.internalInfo || "-"}</p></div></SectionCard>
          <SectionCard title={translateText("نموذج البيانات الأولي")}><p className="text-sm text-[#17395f] dark:text-[#e8f0ff] break-all">{selected.initialDataModel || "-"}</p></SectionCard>
        </div>
      ) : null}

      {showTab === "tasks" ? (
        <SectionCard title={translateText("قوالب المهام")}>
          {selected.taskTemplates.length === 0 ? <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center"><p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{translateText("لا توجد قوالب مهام")}</p><p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("لم تتم إضافة قوالب مهام لهذه الخدمة بعد.")}</p></div> : <div className="space-y-2">{selected.taskTemplates.map((task, i) => <div key={`${task}-${i}`} className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-3 py-2 text-sm text-[#17395f] dark:border-[#223752] dark:bg-[#122136] dark:text-[#e8f0ff]"><p className="font-medium">{task}</p><p className="text-xs text-[#7f95b1]">#{i + 1}</p></div>)}</div>}
        </SectionCard>
      ) : null}

      {showTab === "data" ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <SectionCard title={translateText("الطوابع الزمنية")}><div className="space-y-2 text-sm"><p><span className="text-[#7891b0]">{translateText("تاريخ الإنشاء")}: </span>{selected.createdAt || "-"}</p><p><span className="text-[#7891b0]">{translateText("تاريخ التحديث")}: </span>{selected.createdAt || "-"}</p><p><span className="text-[#7891b0]">{translateText("تاريخ الحذف")}: </span>-</p></div></SectionCard>
          <SectionCard title={translateText("البيانات الإضافية")}>
            {selected.metadata.length === 0 ? <p className="text-sm text-[#7f95b1]">-</p> : <div className="space-y-2">{selected.metadata.map((item, i) => <div key={`${item.key}-${i}`} className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2 text-sm"><span className="text-[#7891b0]">{item.key}</span><p className="text-[#1f4f7f] dark:text-[#dce8f8]">{item.value}</p></div>)}</div>}
          </SectionCard>
        </div>
      ) : null}
    </section>
  );
}
