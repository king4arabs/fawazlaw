"use client";

import clsx from "clsx";
import { CheckCircle2, Eye, FolderUp, Pencil, Plus, Search, Star, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type LangKey = "ar" | "en" | "ur";
type ViewMode = "list" | "add" | "edit" | "show";

type Plan = {
  id: string;
  title: Record<LangKey, string>;
  features: Record<LangKey, string[]>;
  price: string;
  available: boolean;
  featured: boolean;
  createdAt: string;
  coverName: string;
};

type Subscription = {
  id: string;
  client: string;
  startsAt: string;
  endsAt: string;
  status: "نشط" | "منتهي" | "ملغي" | "معلق" | "مدفوع";
};

type PlanForm = {
  title: Record<LangKey, string>;
  features: Record<LangKey, string[]>;
  price: string;
  available: boolean;
  featured: boolean;
  coverFile: File | null;
};

type SubscriptionForm = {
  client: string;
  startsAt: string;
  endsAt: string;
  status: Subscription["status"];
};

const emptyPlanForm: PlanForm = {
  title: { ar: "", en: "", ur: "" },
  features: { ar: [], en: [], ur: [] },
  price: "",
  available: true,
  featured: false,
  coverFile: null,
};

const emptySubscriptionForm: SubscriptionForm = {
  client: "",
  startsAt: "",
  endsAt: "",
  status: "نشط",
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

function availabilityTone(on: boolean) {
  return on
    ? "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]"
    : "bg-[#eef3fa] text-[#5d7696] dark:bg-[#24364f] dark:text-[#a8bed8]";
}

function featuredTone(on: boolean) {
  return on
    ? "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]"
    : "bg-[#eef3fa] text-[#5d7696] dark:bg-[#24364f] dark:text-[#a8bed8]";
}

function subscriptionStatusTone(value: Subscription["status"]) {
  if (value === "نشط" || value === "مدفوع") return "bg-[#ebfff1] text-[#14954c]";
  if (value === "معلق") return "bg-[#fff5df] text-[#bf6f00]";
  return "bg-[#fff0f0] text-[#c74747]";
}

function SubscriptionModal({
  open,
  mode,
  form,
  setForm,
  onClose,
  onSubmit,
}: Readonly<{
  open: boolean;
  mode: "add" | "edit";
  form: SubscriptionForm;
  setForm: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
  onClose: () => void;
  onSubmit: () => void;
}>) {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07101d]/55 px-3 py-6">
      <div ref={ref} className="w-full max-w-3xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{mode === "edit" ? "تعديل الاشتراك" : "إضافة اشتراك"}</h3><button onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]"><X className="h-5 w-5" /></button></div>
        <p className="mb-3 text-xs text-[#6f89ab] dark:text-[#9cb3ce]">يتم ضبطه غالبًا تلقائيًا عند تأكيد الدفع.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العميل</span><input value={form.client} onChange={(e) => setForm((c) => ({ ...c, client: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={form.status} onChange={(e) => setForm((c) => ({ ...c, status: e.target.value as Subscription["status"] }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option>نشط</option><option>منتهي</option><option>ملغي</option><option>معلق</option><option>مدفوع</option></select></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ البدء</span><input type="datetime-local" value={form.startsAt} onChange={(e) => setForm((c) => ({ ...c, startsAt: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الانتهاء</span><input type="datetime-local" value={form.endsAt} onChange={(e) => setForm((c) => ({ ...c, endsAt: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2"><button onClick={onSubmit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{mode === "edit" ? "حفظ التغييرات" : "إضافة"}</button><button onClick={onClose} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">إلغاء</button></div>
      </div>
    </div>
  );
}

export function SubscriptionPlansManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [activeLang, setActiveLang] = useState<LangKey>("ar");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [form, setForm] = useState<PlanForm>(emptyPlanForm);
  const [subsQuery, setSubsQuery] = useState("");
  const [subsOpen, setSubsOpen] = useState(false);
  const [subsMode, setSubsMode] = useState<"add" | "edit">("add");
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [subsForm, setSubsForm] = useState<SubscriptionForm>(emptySubscriptionForm);

  const [rows, setRows] = useState<Plan[]>(() =>
    (page.rows ?? []).map((row, index) => ({
      id: row.id ?? String(index + 1),
      title: { ar: row.title ?? `خطة ${index + 1}`, en: row.titleEn ?? "", ur: row.titleUr ?? "" },
      features: {
        ar: row.featuresAr ? row.featuresAr.split("|").filter(Boolean) : [],
        en: row.featuresEn ? row.featuresEn.split("|").filter(Boolean) : [],
        ur: row.featuresUr ? row.featuresUr.split("|").filter(Boolean) : [],
      },
      price: row.price ?? "0",
      available: (row.available ?? row.status ?? "نشط").includes("نشط"),
      featured: (row.promoted ?? "لا").includes("نعم"),
      createdAt: row.createdAt ?? `2026-05-${String(index + 1).padStart(2, "0")}`,
      coverName: row.coverName ?? "-",
    })),
  );

  const [subscriptionsByPlan, setSubscriptionsByPlan] = useState<Record<string, Subscription[]>>(() => {
    const seed: Record<string, Subscription[]> = {};
    for (const row of rows) {
      seed[row.id] = [
        { id: `${row.id}-s1`, client: "Mohamed Sa'ed", startsAt: "2026-05-01T10:00", endsAt: "2026-11-01T10:00", status: "نشط" },
      ];
    }
    return seed;
  });

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);
  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => `${r.id} ${r.title.ar} ${r.price}`.toLowerCase().includes(q));
  }, [rows, query]);

  const selectedSubs = selected ? subscriptionsByPlan[selected.id] ?? [] : [];
  const filteredSubs = useMemo(() => {
    if (!subsQuery.trim()) return selectedSubs;
    const q = subsQuery.toLowerCase();
    return selectedSubs.filter((s) => `${s.id} ${s.client} ${s.status}`.toLowerCase().includes(q));
  }, [selectedSubs, subsQuery]);

  const startAdd = () => {
    setMode("add");
    setSelectedId(null);
    setForm(emptyPlanForm);
    setFeatureInput("");
  };

  const startEdit = (plan: Plan) => {
    setSelectedId(plan.id);
    setMode("edit");
    setForm({
      title: plan.title,
      features: plan.features,
      price: plan.price,
      available: plan.available,
      featured: plan.featured,
      coverFile: null,
    });
    setFeatureInput("");
  };

  const openShow = (plan: Plan) => {
    setSelectedId(plan.id);
    setMode("show");
  };

  const saveAdd = (resetAfter = false) => {
    const id = String(Date.now());
    const next: Plan = {
      id,
      title: form.title,
      features: form.features,
      price: form.price || "0",
      available: form.available,
      featured: form.featured,
      createdAt: new Date().toLocaleDateString("en-CA"),
      coverName: form.coverFile?.name ?? "-",
    };
    setRows((current) => [next, ...current]);
    setSubscriptionsByPlan((current) => ({ ...current, [id]: [] }));
    if (resetAfter) setForm(emptyPlanForm);
    else setMode("list");
  };

  const saveEdit = () => {
    if (!selectedId) return;
    setRows((current) => current.map((p) => (p.id === selectedId ? { ...p, title: form.title, features: form.features, price: form.price || "0", available: form.available, featured: form.featured, coverName: form.coverFile?.name ?? p.coverName } : p)));
    setMode("show");
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm((current) => ({
      ...current,
      features: { ...current.features, [activeLang]: [...current.features[activeLang], featureInput.trim()] },
    }));
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    setForm((current) => ({
      ...current,
      features: { ...current.features, [activeLang]: current.features[activeLang].filter((_, i) => i !== index) },
    }));
  };

  const moveFeature = (index: number, direction: -1 | 1) => {
    setForm((current) => {
      const list = [...current.features[activeLang]];
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...current, features: { ...current.features, [activeLang]: list } };
    });
  };

  const openAddSubscription = () => {
    setSubsMode("add");
    setEditingSubId(null);
    setSubsForm(emptySubscriptionForm);
    setSubsOpen(true);
  };

  const openEditSubscription = (sub: Subscription) => {
    setSubsMode("edit");
    setEditingSubId(sub.id);
    setSubsForm({ client: sub.client, startsAt: sub.startsAt, endsAt: sub.endsAt, status: sub.status });
    setSubsOpen(true);
  };

  const submitSubscription = () => {
    if (!selected) return;
    setSubscriptionsByPlan((current) => {
      const existing = current[selected.id] ?? [];
      if (subsMode === "add") {
        const next: Subscription = { id: `${selected.id}-${Date.now()}`, client: subsForm.client || "-", startsAt: subsForm.startsAt || "-", endsAt: subsForm.endsAt || "-", status: subsForm.status };
        return { ...current, [selected.id]: [next, ...existing] };
      }
      return { ...current, [selected.id]: existing.map((item) => (item.id === editingSubId ? { ...item, ...subsForm } : item)) };
    });
    setSubsOpen(false);
  };

  if (mode === "list") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("خطط الاشتراك / القائمة")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("خطط الاشتراك")}</h1><button onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("إضافة خطة اشتراك")}</button></div></div>

        <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-4 relative"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div>
          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[980px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3">المعرف</th><th className="px-4 py-3">العنوان</th><th className="px-4 py-3">السعر</th><th className="px-4 py-3">متاح</th><th className="px-4 py-3">مروج</th><th className="px-4 py-3">تاريخ الإنشاء</th><th className="px-4 py-3">الإجراءات</th></tr></thead><tbody>{filtered.map((row) => <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.id}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.title.ar || "-"}</td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.price}</td><td className="px-4 py-3"><span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs", availabilityTone(row.available))}><CheckCircle2 className="h-3.5 w-3.5" />{row.available ? "متاح" : "غير متاح"}</span></td><td className="px-4 py-3"><span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs", featuredTone(row.featured))}><Star className="h-3.5 w-3.5" />{row.featured ? "مروج" : "غير مروج"}</span></td><td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.createdAt}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1"><button onClick={() => openShow(row)} className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="inline h-3.5 w-3.5" /> عرض</button><button onClick={() => startEdit(row)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="inline h-3.5 w-3.5" /> تعديل</button><button onClick={() => setRows((current) => current.filter((p) => p.id !== row.id))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="inline h-3.5 w-3.5" /> حذف</button></div></td></tr>)}</tbody></table></div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>إجمالي النتائج: {filtered.length}</span><span>الصفحة 1 من 1</span></div>
        </div>
      </section>
    );
  }

  if (mode === "add" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{isEdit ? "خطط الاشتراك / تعديل" : "خطط الاشتراك / إضافة"}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{isEdit ? "تعديل خطة اشتراك" : "إضافة خطة اشتراك"}</h1>{isEdit ? <button onClick={() => selected && openShow(selected)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">عرض</button> : null}</div></div>

        <SectionCard title="معلومات الخطة" subtitle="العنوان والخصائص بجميع اللغات.">
          <div className="mb-4 overflow-x-auto"><div className="inline-flex min-w-max gap-2">{([{ key: "ar", label: "العربية" }, { key: "en", label: "الإنجليزية" }, { key: "ur", label: "الأردية" }] as Array<{ key: LangKey; label: string }>).map((lang) => <button key={lang.key} onClick={() => setActiveLang(lang.key)} className={clsx("rounded-xl px-4 py-2 text-sm", activeLang === lang.key ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{lang.label}</button>)}</div></div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العنوان <span className="text-[#d14b4b]">*</span></span><input value={form.title[activeLang]} onChange={(e) => setForm((c) => ({ ...c, title: { ...c.title, [activeLang]: e.target.value } }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <div className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الخصائص</span><div className="space-y-2">{form.features[activeLang].map((feature, idx) => <div key={`${feature}-${idx}`} className="flex items-center gap-2 rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-2 py-2"><button onClick={() => moveFeature(idx, -1)} className="rounded bg-[#edf5ff] px-2 py-1 text-xs">↑</button><button onClick={() => moveFeature(idx, 1)} className="rounded bg-[#edf5ff] px-2 py-1 text-xs">↓</button><input value={feature} onChange={(e) => setForm((c) => ({ ...c, features: { ...c.features, [activeLang]: c.features[activeLang].map((f, i) => (i === idx ? e.target.value : f)) } }))} className="h-9 flex-1 rounded-lg border border-[#d9e4f4] px-3 text-sm" /><button onClick={() => removeFeature(idx)} className="rounded bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div><div className="mt-2 flex gap-2"><input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="h-10 flex-1 rounded-xl border border-[#d9e4f4] px-3 text-sm" placeholder="خاصية" /><button onClick={addFeature} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة إلى الخصائص</button></div></div>
          </div>
        </SectionCard>

        <SectionCard title="التسعير والظهور">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">السعر <span className="text-[#d14b4b]">*</span></span><input type="number" value={form.price} onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">صورة الغلاف</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">اسحب و ادرج ملفك أو تصفح</p><input type="file" onChange={(e) => setForm((c) => ({ ...c, coverFile: e.target.files?.[0] ?? null }))} />{form.coverFile ? <p className="mt-2 text-xs text-[#6f86a5]">{form.coverFile.name}</p> : null}</div></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">متاح</span><button type="button" onClick={() => setForm((c) => ({ ...c, available: !c.available }))} className={clsx("inline-flex h-11 w-full items-center justify-center rounded-xl border text-sm", form.available ? "border-[#9fd5b5] bg-[#ebfff1] text-[#14954c]" : "border-[#d8e3f1] bg-[#f6f9fe] text-[#6f89ab]")}>{form.available ? "متاح" : "غير متاح"}</button></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">مروج</span><button type="button" onClick={() => setForm((c) => ({ ...c, featured: !c.featured }))} className={clsx("inline-flex h-11 w-full items-center justify-center rounded-xl border text-sm", form.featured ? "border-[#efcf9e] bg-[#fff5df] text-[#bf6f00]" : "border-[#d8e3f1] bg-[#f6f9fe] text-[#6f89ab]")}>{form.featured ? "مروج" : "غير مروج"}</button></label>
          </div>
        </SectionCard>

        <div className="flex flex-wrap justify-end gap-2">{isEdit ? <button onClick={saveEdit} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">حفظ التغييرات</button> : <><button onClick={() => saveAdd(false)} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">إضافة</button><button onClick={() => saveAdd(true)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إضافة وبدء إضافة المزيد</button></>}<button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">إلغاء</button></div>

        {isEdit && selected ? (
          <SectionCard title="الاشتراكات">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><div className="relative min-w-[260px] flex-1"><Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} /><input value={subsQuery} onChange={(e) => setSubsQuery(e.target.value)} placeholder="بحث..." className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} /></div><button onClick={openAddSubscription} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">إضافة اشتراك</button></div>
            <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]"><table dir={dir} className="min-w-[780px] w-full text-sm"><thead className="bg-[#f3f8ff] text-[#5b7594]"><tr><th className="px-4 py-3">Id</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Starts</th><th className="px-4 py-3">Ends</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">actions</th></tr></thead><tbody>{filteredSubs.map((sub) => <tr key={sub.id} className="border-t border-[#e7eef8]"><td className="px-4 py-3">{sub.id}</td><td className="px-4 py-3">{sub.client}</td><td className="px-4 py-3">{sub.startsAt}</td><td className="px-4 py-3">{sub.endsAt}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-2.5 py-1 text-xs", subscriptionStatusTone(sub.status))}>{sub.status}</span></td><td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => openEditSubscription(sub)} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">تعديل</button><button onClick={() => setSubscriptionsByPlan((c) => ({ ...c, [selected.id]: (c[selected.id] ?? []).filter((s) => s.id !== sub.id) }))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">حذف</button></div></td></tr>)}</tbody></table></div>
            {filteredSubs.length === 0 ? <div className="mt-3 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-8 text-center text-sm text-[#718aa9]">لا توجد اشتراكات لهذه الخطة</div> : null}
          </SectionCard>
        ) : null}

        <SubscriptionModal open={subsOpen} mode={subsMode} form={subsForm} setForm={setSubsForm} onClose={() => setSubsOpen(false)} onSubmit={submitSubscription} />
      </section>
    );
  }

  if (!selected) return null;

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">خطط الاشتراك / عرض</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">عرض خطة اشتراك</h1></div>
      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="نظرة عامة"><div className="space-y-2 text-sm"><p><span className="text-[#7891b0]">العنوان: </span>{selected.title.ar || "-"}</p><p><span className="text-[#7891b0]">السعر: </span>{selected.price}</p><p><span className="text-[#7891b0]">متاح: </span><span className={clsx("rounded-full px-2 py-0.5 text-xs", availabilityTone(selected.available))}>{selected.available ? "متاح" : "غير متاح"}</span></p><p><span className="text-[#7891b0]">مروج: </span><span className={clsx("rounded-full px-2 py-0.5 text-xs", featuredTone(selected.featured))}>{selected.featured ? "مروج" : "غير مروج"}</span></p><p><span className="text-[#7891b0]">صورة الغلاف: </span>{selected.coverName || "-"}</p></div></SectionCard>
        <SectionCard title="الخصائص">{selected.features.ar.length ? <div className="space-y-2">{selected.features.ar.map((feature, i) => <div key={`${feature}-${i}`} className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2 text-sm">{feature}</div>)}</div> : <p className="text-sm text-[#7f95b1]">-</p>}</SectionCard>
      </div>
      <div className="flex flex-wrap gap-2"><button onClick={() => startEdit(selected)} className="rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">تعديل</button><button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">رجوع</button></div>
    </section>
  );
}
