"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { OfficePageData } from "@/features/office/types";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";

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

function badgeClasses(value: string) {
  if (value.includes("نشط")) return "bg-[#ebfff1] text-[#14954c]";
  if (value.includes("معلق")) return "bg-[#fff5df] text-[#d47a00]";
  if (value.includes("غير")) return "bg-[#fff0f0] text-[#d74646]";

  return "bg-[#edf5ff] text-[#2769b8]";
}

const defaultValues: ClientFormValues = {
  name: "",
  type: "فرد",
  status: "نشط",
  phone: "",
  email: "",
  company_name: "",
};

export function ClientsManagement({
  page,
}: Readonly<{
  page: OfficePageData;
}>) {
  const { dir, t, translateText } = useOfficePreferences();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState<ClientsApiResponse["meta"] | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

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

  const resetForm = () => {
    form.reset(defaultValues);
    setEditingId(null);
  };

  const submitForm = form.handleSubmit(async (values) => {
    setError(null);
    setSuccess(null);

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/office/clients/${editingId}` : "/api/office/clients";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        company_name: values.company_name || null,
      }),
    });

    const payload = (await response.json()) as {
      message?: string;
      errors?: Record<string, string[]>;
    };

    if (!response.ok) {
      const firstError = payload.errors ? Object.values(payload.errors)[0]?.[0] : null;
      throw new Error(firstError ?? payload.message ?? "فشل حفظ العميل.");
    }

    setSuccess(payload.message ?? "تم حفظ العميل.");
    resetForm();
    await loadClients(search);
  });

  const startEdit = (client: ClientRecord) => {
    setEditingId(client.id);
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
  };

  const removeClient = async (id: number) => {
    setError(null);
    setSuccess(null);

    const response = await fetch(`/api/office/clients/${id}`, {
      method: "DELETE",
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      throw new Error(payload.message ?? "فشل حذف العميل.");
    }

    setSuccess(payload.message ?? "تم حذف العميل.");
    if (editingId === id) {
      resetForm();
    }
    await loadClients(search);
  };

  const register = form.register;
  const formErrors = form.formState.errors;

  return (
    <div dir={dir} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.65fr]">
        <section className="rounded-[1.6rem] border border-[#c8d8ef] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7d91ab] dark:text-[#8da0bd]">{translateText("نموذج العميل")}</p>
              <h3 className="mt-1 text-2xl font-semibold text-[#16355e] dark:text-[#eef4ff]">
                {editingId ? t.editClient : t.addClient}
              </h3>
            </div>
            {editingId ? (
              <button
                onClick={resetForm}
                className="rounded-full border border-[#d9e4f4] px-4 py-2 text-sm text-[#5f7898] dark:border-[#1d2d46] dark:text-[#9cb1cd]"
              >
                {t.cancelEdit}
              </button>
            ) : null}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              startTransition(() => {
                submitForm().catch((submitError) => {
                  setError(
                    submitError instanceof Error ? submitError.message : "حدث خطأ غير متوقع.",
                  );
                });
              });
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-right">
                <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.name}</span>
                <input
                  {...register("name")}
                  className="w-full rounded-2xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
                />
                {formErrors.name ? (
                  <span className="mt-2 block text-xs text-[#c33d3d]">{formErrors.name.message}</span>
                ) : null}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.type}</span>
                <select
                  {...register("type")}
                  className="w-full rounded-2xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
                >
                  <option value="فرد">{t.individual}</option>
                  <option value="شركة">{t.companyType}</option>
                </select>
                {formErrors.type ? (
                  <span className="mt-2 block text-xs text-[#c33d3d]">{formErrors.type.message}</span>
                ) : null}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.status}</span>
                <select
                  {...register("status")}
                  className="w-full rounded-2xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
                >
                  <option value="نشط">{t.active}</option>
                  <option value="معلق">{t.suspended}</option>
                  <option value="غير نشط">{t.inactive}</option>
                </select>
                {formErrors.status ? (
                  <span className="mt-2 block text-xs text-[#c33d3d]">{formErrors.status.message}</span>
                ) : null}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.phone}</span>
                <input
                  {...register("phone")}
                  className="w-full rounded-2xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
                />
                {formErrors.phone ? (
                  <span className="mt-2 block text-xs text-[#c33d3d]">{formErrors.phone.message}</span>
                ) : null}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.email}</span>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full rounded-2xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
                />
                {formErrors.email ? (
                  <span className="mt-2 block text-xs text-[#c33d3d]">{formErrors.email.message}</span>
                ) : null}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.company}</span>
                <input
                  {...register("company_name")}
                  className="w-full rounded-2xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
                />
              </label>
            </div>

            {error ? (
              <p className="rounded-2xl bg-[#fff1f1] px-4 py-3 text-sm text-[#c33d3d] dark:bg-[#351923] dark:text-[#ff9aa8]">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-2xl bg-[#eefcf2] px-4 py-3 text-sm text-[#14824a] dark:bg-[#123427] dark:text-[#7ce0ac]">
                {success}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-[#0f3a67] px-5 py-3 text-sm font-medium text-white dark:bg-[#15375f]"
            >
              {isPending
                ? translateText("جاري الحفظ...")
                : editingId
                  ? translateText("حفظ التعديلات")
                  : translateText("إنشاء عميل")}
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="rounded-[1.6rem] border border-[#c8d8ef] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-[#16355e] dark:text-[#eef4ff]">{translateText(page.title)}</h3>
                <p className="mt-1 text-sm text-[#7890ad] dark:text-[#8da0bd]">{translateText(page.subtitle)}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {page.filters?.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-[#d9e4f4] bg-[#f8fbff] px-4 py-2 text-sm text-[#6883a5] dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#9cb1cd]"
                  >
                    {translateText(filter)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={translateText("ابحث بالاسم أو البريد أو الهاتف...")}
                className="w-full rounded-full border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
              />
              <button
                onClick={() =>
                  startTransition(() => {
                    loadClients(search).catch((loadError) => {
                      setError(
                        loadError instanceof Error
                          ? loadError.message
                          : "حدث خطأ أثناء البحث.",
                      );
                    });
                  })
                }
                className="rounded-full bg-[#0f3a67] px-5 py-3 text-sm text-white dark:bg-[#15375f]"
              >
                {isPending ? translateText("جاري التحميل...") : translateText("بحث")}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.6rem] border border-[#c8d8ef] bg-white shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="overflow-x-auto">
              <table dir={dir} className="min-w-full text-right text-sm">
                <thead className="bg-[#f5f9ff] text-[#58708e] dark:bg-[#13233a] dark:text-[#9db2ce]">
                  <tr>
                    <th className="px-4 py-4 font-medium">{t.name}</th>
                    <th className="px-4 py-4 font-medium">{t.type}</th>
                    <th className="px-4 py-4 font-medium">{t.status}</th>
                    <th className="px-4 py-4 font-medium">{t.phone}</th>
                    <th className="px-4 py-4 font-medium">{translateText("البريد")}</th>
                    <th className="px-4 py-4 font-medium">{t.company}</th>
                    <th className="px-4 py-4 font-medium">{translateText("الإجراءات")}</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-t border-[#edf3fb] dark:border-[#1d2d46]">
                      <td className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">{translateText(client.name)}</td>
                      <td className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">{translateText(client.type)}</td>
                      <td className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">
                        <span className={`rounded-full px-3 py-1 text-xs ${badgeClasses(client.status)}`}>
                          {translateText(client.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">{client.phone}</td>
                      <td className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">{client.email}</td>
                      <td className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">{client.company_name ? translateText(client.company_name) : "-"}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => startEdit(client)}
                            className="rounded-full bg-[#edf5ff] px-3 py-2 text-xs text-[#2a67b5] dark:bg-[#13233a] dark:text-[#9ec3ee]"
                          >
                            {t.edit}
                          </button>
                          <button
                            onClick={() =>
                              startTransition(() => {
                                removeClient(client.id).catch((removeError) => {
                                  setError(
                                    removeError instanceof Error
                                      ? removeError.message
                                      : "فشل حذف العميل.",
                                  );
                                });
                              })
                            }
                            className="rounded-full bg-[#fff0f0] px-3 py-2 text-xs text-[#c54040] dark:bg-[#351923] dark:text-[#ff9aa8]"
                          >
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {clients.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-[#7f93ae] dark:text-[#8da0bd]">
                {translateText("لا يوجد عملاء مطابقون لنتيجة البحث الحالية.")}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between rounded-[1.4rem] border border-[#c8d8ef] bg-white px-5 py-4 text-sm text-[#6c86a7] shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d] dark:text-[#9cb1cd]">
            <span>{translateText("إجمالي السجلات:")} {meta?.total ?? clients.length}</span>
            <span>
              {translateText("الصفحة")} {meta?.current_page ?? 1} {translateText("من")} {meta?.last_page ?? 1}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
