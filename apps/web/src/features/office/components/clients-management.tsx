"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  Building2,
  Download,
  Eye,
  FileDown,
  Info,
  NotebookPen,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserCircle2,
} from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

const clientSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب."),
  type: z.string().min(1, "النوع مطلوب."),
  status: z.string().min(1, "الحالة مطلوبة."),
  phone: z.string().min(1, "الهاتف مطلوب."),
  email: z.email("البريد الإلكتروني غير صالح."),
  company_name: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

type ClientRecord = {
  id: number;
  name: string;
  type: string;
  status: string;
  phone: string;
  email: string;
  company_name: string | null;
};

type ClientsApiResponse = {
  data: ClientRecord[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

type ViewMode = "list" | "add" | "edit" | "show";
type ProfileTab = "profile" | "notes" | "data";

type ClientExtras = {
  phoneExtra: string;
  taxNumber: string;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

const defaultValues: ClientFormValues = {
  name: "",
  type: "فرد",
  status: "نشط",
  phone: "",
  email: "",
  company_name: "",
};

const defaultExtra: ClientExtras = {
  phoneExtra: "",
  taxNumber: "",
  address: "",
  notes: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
};

function badgeClasses(value: string) {
  if (value.includes("نشط")) return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  if (value.includes("محظور") || value.includes("غير")) return "bg-[#fff0f0] text-[#d74646] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
}

function typeBadgeClasses(value: string) {
  if (value.includes("شركة")) return "bg-[#fff4df] text-[#aa6b00] dark:bg-[#3a2c16] dark:text-[#ecc27f]";
  return "bg-[#e9f1ff] text-[#1e60ad] dark:bg-[#1a2e49] dark:text-[#9ec3ee]";
}

function EmptyState({ title, description }: Readonly<{ title: string; description?: string }>) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center dark:border-[#29405d] dark:bg-[#132238]">
      <p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{title}</p>
      {description ? <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{description}</p> : null}
    </div>
  );
}

function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: Readonly<{
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <div className="mb-4 flex items-start gap-3">
        {icon ? <div className="rounded-xl bg-[#eef5ff] p-2 text-[#1f5a92] dark:bg-[#162944] dark:text-[#9ec2eb]">{icon}</div> : null}
        <div>
          <h3 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-[#7c93af] dark:text-[#8da5c3]">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function ClientsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, t, translateText } = useOfficePreferences();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState<ClientsApiResponse["meta"] | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [profileTab, setProfileTab] = useState<ProfileTab>("profile");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [extrasByClient, setExtrasByClient] = useState<Record<number, ClientExtras>>({});
  const [draftExtra, setDraftExtra] = useState<ClientExtras>(defaultExtra);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const register = form.register;
  const formErrors = form.formState.errors;

  const loadClients = async (query = "") => {
    const url = new URL("/api/office/clients", window.location.origin);
    if (query.trim()) {
      url.searchParams.set("search", query.trim());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("تعذر تحميل العملاء.");
    }

    const payload = (await response.json()) as ClientsApiResponse;
    setClients(payload.data);
    setMeta(payload.meta);
  };

  useEffect(() => {
    startTransition(() => {
      loadClients().catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "حدث خطأ غير متوقع.");
      });
    });
  }, []);

  const selectedClient = useMemo(() => clients.find((c) => c.id === selectedId) ?? null, [clients, selectedId]);

  const selectedExtra = useMemo(() => {
    if (!selectedClient) return defaultExtra;
    return extrasByClient[selectedClient.id] ?? defaultExtra;
  }, [selectedClient, extrasByClient]);

  const resetForm = () => {
    form.reset(defaultValues);
    setEditingId(null);
    setSelectedId(null);
    setDraftExtra(defaultExtra);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    setSuccess(null);

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/office/clients/${editingId}` : "/api/office/clients";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        company_name: values.company_name || null,
      }),
    });

    const payload = (await response.json()) as {
      data?: { id?: number };
      message?: string;
      errors?: Record<string, string[]>;
    };

    if (!response.ok) {
      const firstError = payload.errors ? Object.values(payload.errors)[0]?.[0] : null;
      throw new Error(firstError ?? payload.message ?? "فشل حفظ العميل.");
    }

    setSuccess(payload.message ?? "تم حفظ العميل.");

    const createdId = payload.data?.id;
    const targetId = editingId ?? createdId;

    if (targetId) {
      setExtrasByClient((current) => ({
        ...current,
        [targetId]: {
          ...draftExtra,
          createdAt: current[targetId]?.createdAt || draftExtra.createdAt || new Date().toLocaleString(isArabic ? "ar" : "en"),
          updatedAt: new Date().toLocaleString(isArabic ? "ar" : "en"),
        },
      }));
    }

    resetForm();
    setViewMode("list");
    await loadClients(search);
  });

  const onDelete = async (id: number) => {
    setError(null);
    setSuccess(null);

    const response = await fetch(`/api/office/clients/${id}`, { method: "DELETE" });
    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      throw new Error(payload.message ?? "فشل حذف العميل.");
    }

    setSuccess(payload.message ?? "تم حذف العميل.");
    setExtrasByClient((current) => ({
      ...current,
      [id]: {
        ...(current[id] ?? defaultExtra),
        deletedAt: new Date().toLocaleString(isArabic ? "ar" : "en"),
      },
    }));

    if (selectedId === id || editingId === id) {
      resetForm();
      setViewMode("list");
    }

    await loadClients(search);
  };

  const startAdd = () => {
    resetForm();
    setViewMode("add");
    setError(null);
    setSuccess(null);
  };

  const startEdit = (client: ClientRecord) => {
    setEditingId(client.id);
    setSelectedId(client.id);
    setError(null);
    setSuccess(null);
    form.reset({
      name: client.name,
      type: client.type,
      status: client.status,
      phone: client.phone,
      email: client.email,
      company_name: client.company_name ?? "",
    });
    setDraftExtra(extrasByClient[client.id] ?? defaultExtra);
    setViewMode("edit");
  };

  const startShow = (client: ClientRecord) => {
    setSelectedId(client.id);
    setProfileTab("profile");
    setViewMode("show");
    setError(null);
    setSuccess(null);
  };

  const performSearch = () => {
    startTransition(() => {
      loadClients(search).catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "حدث خطأ أثناء البحث.");
      });
    });
  };

  const headerCard = (
    <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">
        {viewMode === "list" ? translateText("العملاء / القائمة") : null}
        {viewMode === "add" ? translateText("العملاء / إضافة") : null}
        {viewMode === "edit" && selectedClient ? `${translateText("العملاء")} / ${selectedClient.name} / ${translateText("تعديل")}` : null}
        {viewMode === "show" && selectedClient ? `${translateText("العملاء")} / ${selectedClient.name} / ${translateText("عرض")}` : null}
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">
          {viewMode === "list" ? translateText("العملاء") : null}
          {viewMode === "add" ? translateText("إضافة عميل") : null}
          {viewMode === "edit" && selectedClient ? `${translateText("تعديل")} ${selectedClient.name}` : null}
          {viewMode === "show" && selectedClient ? `${translateText("عرض")} ${selectedClient.name}` : null}
        </h1>

        {viewMode === "list" ? (
          <button type="button" onClick={startAdd} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0d3258]">
            <Plus className="h-4 w-4" />
            {translateText("إضافة عميل")}
          </button>
        ) : null}

        {viewMode === "edit" ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => selectedClient && startShow(selectedClient)} className="inline-flex items-center gap-2 rounded-xl border border-[#d5e1ef] bg-white px-4 py-2 text-sm text-[#40658f] dark:border-[#28405c] dark:bg-[#102038] dark:text-[#a7bfdc]">
              <Eye className="h-4 w-4" />
              {translateText("عرض")}
            </button>
            {selectedClient ? (
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    onDelete(selectedClient.id).catch((removeError) => {
                      setError(removeError instanceof Error ? removeError.message : "فشل حذف العميل.");
                    });
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#b94141] px-4 py-2 text-sm text-white"
              >
                <Trash2 className="h-4 w-4" />
                {t.delete}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <section dir={dir} className="space-y-6">
      {headerCard}

      {error ? (
        <p className="rounded-2xl bg-[#fff1f1] px-4 py-3 text-sm text-[#c33d3d] dark:bg-[#351923] dark:text-[#ff9aa8]">{error}</p>
      ) : null}

      {success ? (
        <p className="rounded-2xl bg-[#eefcf2] px-4 py-3 text-sm text-[#14824a] dark:bg-[#123427] dark:text-[#7ce0ac]">{success}</p>
      ) : null}

      {viewMode === "list" ? (
        <>
          <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <div className="relative min-w-[240px] flex-1">
                <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={translateText("ابحث بالاسم أو البريد أو الهاتف...")}
                  className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")}
                />
              </div>

              <button type="button" onClick={performSearch} className="rounded-xl bg-[#103a67] px-4 py-2.5 text-sm text-white">
                {isPending ? translateText("جاري التحميل...") : translateText("بحث")}
              </button>

              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#18854a] px-4 py-2.5 text-sm text-white">
                <FileDown className="h-4 w-4" />
                {translateText("تحميل ملف إكسل تجريبي")}
              </button>

              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-4 py-2.5 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">
                <Download className="h-4 w-4" />
                {translateText("استيراد العملاء")}
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
              <table dir={dir} className="min-w-[1100px] w-full text-sm">
                <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]">
                  <tr>
                    <th className="px-4 py-3">{t.name}</th>
                    <th className="px-4 py-3">{t.type}</th>
                    <th className="px-4 py-3">{t.status}</th>
                    <th className="px-4 py-3">{t.phone}</th>
                    <th className="px-4 py-3">{translateText("البريد")}</th>
                    <th className="px-4 py-3">{translateText("جهات الاتصال")}</th>
                    <th className="px-4 py-3">{translateText("تاريخ الإنشاء")}</th>
                    <th className="px-4 py-3">{translateText("الإجراءات")}</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => {
                    const extra = extrasByClient[client.id] ?? defaultExtra;
                    return (
                      <tr key={client.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(client.name)}</td>
                        <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", typeBadgeClasses(client.type))}>{translateText(client.type)}</span></td>
                        <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(client.status))}>{translateText(client.status)}</span></td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{client.phone}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{client.email}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{extra.phoneExtra || "-"}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{extra.createdAt || "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            <button type="button" onClick={() => startShow(client)} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("عرض")}</button>
                            <button type="button" onClick={() => startEdit(client)} className="inline-flex items-center gap-1 rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="h-3.5 w-3.5" />{t.edit}</button>
                            <button
                              type="button"
                              onClick={() =>
                                startTransition(() => {
                                  onDelete(client.id).catch((removeError) => {
                                    setError(removeError instanceof Error ? removeError.message : "فشل حذف العميل.");
                                  });
                                })
                              }
                              className="inline-flex items-center gap-1 rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              {t.delete}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {clients.length === 0 ? (
              <div className="mt-4">
                <EmptyState title={translateText("لا يوجد عملاء مطابقون لنتيجة البحث الحالية.")} />
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]">
              <span>{translateText("إجمالي السجلات:")} {meta?.total ?? clients.length}</span>
              <span>{translateText("الصفحة")} {meta?.current_page ?? 1} {translateText("من")} {meta?.last_page ?? 1}</span>
            </div>
          </div>
        </>
      ) : null}

      {viewMode === "add" || viewMode === "edit" ? (
        <>
          <div className="grid gap-4 xl:grid-cols-2">
            <SectionCard icon={<UserCircle2 className="h-4 w-4" />} title={translateText("الهوية والحالة")} subtitle={translateText("معلومات الهوية الأساسية وحالة العميل.")}>
              <div className="grid gap-4 md:grid-cols-3">
                <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{t.name} <span className="text-[#d14b4b]">*</span></span><input {...register("name")} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" />{formErrors.name ? <span className="mt-1 block text-xs text-[#c33d3d]">{formErrors.name.message}</span> : null}</label>
                <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{t.type} <span className="text-[#d14b4b]">*</span></span><select {...register("type")} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]"><option value="فرد">{t.individual}</option><option value="شركة">{t.companyType}</option></select></label>
                <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{t.status} <span className="text-[#d14b4b]">*</span></span><select {...register("status")} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]"><option value="نشط">{t.active}</option><option value="غير نشط">{t.inactive}</option><option value="محظور">{translateText("محظور")}</option></select></label>
              </div>
            </SectionCard>

            <SectionCard icon={<Info className="h-4 w-4" />} title={translateText("بيانات التواصل")} subtitle={translateText("قنوات التواصل الأساسية.")}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{t.email} <span className="text-[#d14b4b]">*</span></span><input type="email" {...register("email")} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" />{formErrors.email ? <span className="mt-1 block text-xs text-[#c33d3d]">{formErrors.email.message}</span> : null}</label>
                <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{t.phone} <span className="text-[#d14b4b]">*</span></span><input {...register("phone")} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" />{formErrors.phone ? <span className="mt-1 block text-xs text-[#c33d3d]">{formErrors.phone.message}</span> : null}</label>
                <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("هاتف إضافي")}</span><input value={draftExtra.phoneExtra} onChange={(e) => setDraftExtra((c) => ({ ...c, phoneExtra: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
              </div>
            </SectionCard>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <SectionCard icon={<Building2 className="h-4 w-4" />} title={translateText("الشركة والضرائب")} subtitle={translateText("بيانات الشركة والمعلومات الضريبية.")}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("اسم الشركة")}</span><input {...register("company_name")} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
                <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الرقم الضريبي")}</span><input value={draftExtra.taxNumber} onChange={(e) => setDraftExtra((c) => ({ ...c, taxNumber: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
              </div>
            </SectionCard>

            <SectionCard icon={<NotebookPen className="h-4 w-4" />} title={translateText("العنوان")} subtitle={translateText("عنوان المراسلات والفوترة.")}>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العنوان")}</span><textarea rows={3} value={draftExtra.address} onChange={(e) => setDraftExtra((c) => ({ ...c, address: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
            </SectionCard>
          </div>

          <SectionCard icon={<NotebookPen className="h-4 w-4" />} title={translateText("ملاحظات داخلية")} subtitle={translateText("ملاحظات خاصة بفريق العمل.")}>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("ملاحظات")}</span><textarea rows={4} value={draftExtra.notes} onChange={(e) => setDraftExtra((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]" /></label>
          </SectionCard>

          <div className="flex flex-wrap justify-end gap-2">
            {viewMode === "add" ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      onSubmit().catch((submitError) => {
                        setError(submitError instanceof Error ? submitError.message : "حدث خطأ غير متوقع.");
                      });
                    })
                  }
                  className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white"
                >
                  {translateText("إضافة")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      onSubmit()
                        .then(() => {
                          setViewMode("add");
                          setSuccess(translateText("تمت إضافة العميل. يمكنك إضافة عميل جديد الآن."));
                        })
                        .catch((submitError) => {
                          setError(submitError instanceof Error ? submitError.message : "حدث خطأ غير متوقع.");
                        });
                    })
                  }
                  className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"
                >
                  {translateText("إضافة وبدء إضافة المزيد")}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    onSubmit().catch((submitError) => {
                      setError(submitError instanceof Error ? submitError.message : "حدث خطأ غير متوقع.");
                    });
                  })
                }
                className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white"
              >
                {translateText("حفظ التغييرات")}
              </button>
            )}

            <button type="button" onClick={() => setViewMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">
              {translateText("إلغاء")}
            </button>
          </div>
        </>
      ) : null}

      {viewMode === "show" && selectedClient ? (
        <>
          <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="inline-flex min-w-max gap-2">
              {[
                { key: "profile" as const, label: "الملف الشخصي" },
                { key: "notes" as const, label: "الملاحظات" },
                { key: "data" as const, label: "البيانات" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setProfileTab(tab.key)}
                  className={clsx(
                    "rounded-xl px-4 py-2 text-sm",
                    profileTab === tab.key
                      ? "bg-[#e9f2ff] text-[#123d6a]"
                      : "text-[#5f7898] hover:bg-[#f5f9ff] dark:text-[#a4bad2] dark:hover:bg-[#15253b]",
                  )}
                >
                  {translateText(tab.label)}
                </button>
              ))}
            </div>
          </div>

          {profileTab === "profile" ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <SectionCard title={translateText("الهوية")}>
                <div className="grid gap-3 md:grid-cols-2">
                  <div><p className="text-xs text-[#7891b0]">{t.name}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedClient.name || "-"}</p></div>
                  <div><p className="text-xs text-[#7891b0]">{t.type}</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", typeBadgeClasses(selectedClient.type))}>{selectedClient.type || "-"}</span></div>
                  <div><p className="text-xs text-[#7891b0]">{t.status}</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", badgeClasses(selectedClient.status))}>{selectedClient.status || "-"}</span></div>
                </div>
              </SectionCard>

              <SectionCard title={translateText("التواصل")}>
                <div className="grid gap-3 md:grid-cols-2">
                  <div><p className="text-xs text-[#7891b0]">{t.email}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedClient.email || "-"}</p></div>
                  <div><p className="text-xs text-[#7891b0]">{t.phone}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedClient.phone || "-"}</p></div>
                  <div><p className="text-xs text-[#7891b0]">{translateText("هاتف إضافي")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedExtra.phoneExtra || "-"}</p></div>
                  <div><p className="text-xs text-[#7891b0]">{translateText("اسم الشركة")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedClient.company_name || "-"}</p></div>
                  <div><p className="text-xs text-[#7891b0]">{translateText("الرقم الضريبي")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedExtra.taxNumber || "-"}</p></div>
                  <div className="md:col-span-2"><p className="text-xs text-[#7891b0]">{translateText("العنوان")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedExtra.address || "-"}</p></div>
                </div>
              </SectionCard>
            </div>
          ) : null}

          {profileTab === "notes" ? (
            <SectionCard title={translateText("ملاحظات داخلية")}>
              {selectedExtra.notes ? (
                <p className="whitespace-pre-wrap text-sm text-[#2f5278] dark:text-[#d6e6fb]">{selectedExtra.notes}</p>
              ) : (
                <EmptyState title={translateText("لا توجد ملاحظات")} description={translateText("لم تتم إضافة ملاحظات لهذا العميل بعد.")} />
              )}
            </SectionCard>
          ) : null}

          {profileTab === "data" ? (
            <SectionCard title={translateText("التواريخ")}>
              <div className="grid gap-3 md:grid-cols-3">
                <div><p className="text-xs text-[#7891b0]">{translateText("تاريخ الإنشاء")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedExtra.createdAt || "-"}</p></div>
                <div><p className="text-xs text-[#7891b0]">{translateText("آخر تحديث")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedExtra.updatedAt || "-"}</p></div>
                <div><p className="text-xs text-[#7891b0]">{translateText("تاريخ الحذف")}</p><p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{selectedExtra.deletedAt || "-"}</p></div>
              </div>
            </SectionCard>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
