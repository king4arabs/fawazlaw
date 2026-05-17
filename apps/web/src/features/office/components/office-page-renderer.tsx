"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Download,
  ExternalLink,
  Eye,
  File as FileIcon,
  FileArchive,
  FileAudio,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  LayoutGrid,
  List,
} from "lucide-react";
import { useMemo, useState } from "react";
import type {
  BoardColumn,
  ChartCard,
  OfficePageData,
} from "@/features/office/types";
import { CasesManagement } from "@/features/office/components/cases-management";
import { CalendarPage } from "@/features/office/components/calendar-page";
import { ClientsManagement } from "@/features/office/components/clients-management";
import { ConsultationsManagement } from "@/features/office/components/consultations-management";
import { DocumentsManagement } from "@/features/office/components/documents-management";
import { AttendanceScheduleManagement } from "@/features/office/components/attendance-schedule-management";
import { AttendanceRecordsManagement } from "@/features/office/components/attendance-records-management";
import { EmployeesManagement } from "@/features/office/components/employees-management";
import { HomeDashboard } from "@/features/office/components/home-dashboard";
import { InvoicesManagement } from "@/features/office/components/invoices-management";
import { LeaveRequestsManagement } from "@/features/office/components/leave-requests-management";
import { OperationsManagement } from "@/features/office/components/operations-management";
import { PayrollRunsManagement } from "@/features/office/components/payroll-runs-management";
import { ServicesManagement } from "@/features/office/components/services-management";
import { SubscriptionPlansManagement } from "@/features/office/components/subscription-plans-management";
import { SupportChatsManagement } from "@/features/office/components/support-chats-management";
import { SupportTicketsManagement } from "@/features/office/components/support-tickets-management";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import { TasksBoardPage } from "@/features/office/components/tasks-board-page";

function toneClasses(value: string) {
  if (
    value.includes("مدفوع") ||
    value.includes("مكتملة") ||
    value.includes("مفتوحة") ||
    value.includes("نشط")
  ) {
    return "bg-[#ebfff1] text-[#14954c]";
  }

  if (
    value.includes("معلقة") ||
    value.includes("قيد") ||
    value.includes("انتظار") ||
    value.includes("مجدولة")
  ) {
    return "bg-[#fff5df] text-[#d47a00]";
  }

  if (value.includes("متوقفة") || value.includes("مغلقة") || value.includes("تعطيل")) {
    return "bg-[#fff0f0] text-[#d74646]";
  }

  return "bg-[#edf5ff] text-[#2769b8]";
}

function renderSparkline(values: number[]) {
  const max = Math.max(...values, 1);

  return (
    <div className="mt-6 flex h-40 items-end gap-2 rounded-[1.5rem] bg-white px-4 pb-4 pt-6">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-t-full bg-[#194f80]"
            style={{ height: `${Math.max((value / max) * 110, 8)}px` }}
          />
        </div>
      ))}
    </div>
  );
}

function DashboardCharts({ charts }: Readonly<{ charts: ChartCard[] }>) {
  const { translateText } = useOfficePreferences();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {charts.map((chart) => (
        <article
          key={chart.title}
          className="rounded-[1.6rem] border border-[#c9d8eb] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"
        >
          <h3 className="text-right text-2xl font-semibold text-[#0f2747] dark:text-[#eef4ff]">
            {translateText(chart.title)}
          </h3>
          {chart.kind === "line" ? (
            renderSparkline(chart.values)
          ) : (
            <div className="mt-8 flex flex-col items-center gap-6 rounded-[1.5rem] bg-white py-6">
              <div
                className="h-60 w-60 rounded-full"
                style={{
                  background: `conic-gradient(#437ce2 0deg 290deg, #2ac25d 290deg 360deg)`,
                }}
              >
                <div className="m-auto mt-[46px] h-[168px] w-[168px] rounded-full bg-white" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-[#6b7f9b]">
                {chart.labels.map((label, index) => (
                  <span
                    key={label}
                    className="rounded-full bg-[#f4f8fe] px-3 py-1"
                  >
                    {label}: {chart.values[index]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function BoardView({ columns }: Readonly<{ columns: BoardColumn[] }>) {
  const { translateText } = useOfficePreferences();

  return (
    <div className="grid gap-5 xl:grid-cols-4">
      {columns.map((column) => (
        <section key={column.title} className="rounded-[1.5rem] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:bg-[#0f1b2d]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12365f] dark:text-[#eef4ff]">{translateText(column.title)}</h3>
            <span className="rounded-full bg-[#eff5ff] px-3 py-1 text-xs text-[#295d96] dark:bg-[#13233a] dark:text-[#9ec3ee]">
              {column.tasks.length}
            </span>
          </div>
          <div className="space-y-4">
            {column.tasks.map((task) => (
              <article
                key={`${column.title}-${task.title}`}
                className="rounded-[1.25rem] border border-[#d7e4f5] bg-[#fbfdff] p-4 dark:border-[#1d2d46] dark:bg-[#122136]"
              >
                <p className="text-base font-semibold text-[#173b64] dark:text-[#eef4ff]">{translateText(task.title)}</p>
                <p className="mt-2 text-sm text-[#7e91ad] dark:text-[#8da0bd]">{translateText(task.meta)}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className={`rounded-full px-3 py-1 ${toneClasses(task.priority)}`}>
                    {translateText(task.priority)}
                  </span>
                  <span className="text-[#54739b] dark:text-[#90a4c3]">{translateText(task.assignee)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TableView({
  columns,
  rows,
}: Readonly<{
  columns: OfficePageData["columns"];
  rows: OfficePageData["rows"];
}>) {
  const { dir, translateText } = useOfficePreferences();

  if (!columns || !rows) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-[#c8d8ef] bg-white shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <div className="overflow-x-auto">
        <table dir={dir} className="min-w-full text-right text-sm">
          <thead className="bg-[#f5f9ff] text-[#58708e] dark:bg-[#13233a] dark:text-[#9db2ce]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-4 font-medium">
                  {translateText(column.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-[#edf3fb] dark:border-[#1d2d46]">
                {columns.map((column) => {
                  const value = row[column.key];
                  const badgeLike =
                    value.includes("مفتوحة") ||
                    value.includes("مغلقة") ||
                    value.includes("مدفوع") ||
                    value.includes("مسودة") ||
                    value.includes("نشط") ||
                    value.includes("مجدولة") ||
                    value.includes("بانتظار") ||
                    value.includes("معلقة") ||
                    value.includes("تم") ||
                    value.includes("قيد");

                  return (
                    <td key={column.key} className="px-4 py-4 text-[#1e3553] dark:text-[#e0e8f6]">
                      {badgeLike ? (
                        <span className={`rounded-full px-3 py-1 text-xs ${toneClasses(value)}`}>
                          {translateText(value)}
                        </span>
                      ) : (
                        translateText(value)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChatView({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, t, translateText } = useOfficePreferences();
  const chat = page.chat;

  if (!chat) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.5fr]">
      <section className="rounded-[1.6rem] border border-[#c8d8ef] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <div className="mb-4 rounded-full border border-[#d7e2f3] px-4 py-3 text-sm text-[#7d91ab] dark:border-[#1d2d46] dark:text-[#8da0bd]">
          {t.searchPlaceholder}
        </div>
        <div className="space-y-3">
          {chat.conversations.map((conversation) => (
            <article
              key={conversation.id}
              className="rounded-[1.2rem] border border-[#e4edf8] bg-[#fbfdff] p-4 dark:border-[#1d2d46] dark:bg-[#122136]"
            >
              <p className="text-sm font-semibold text-[#14365d] dark:text-[#eef4ff]">{translateText(conversation.title)}</p>
              <p className="mt-2 text-xs text-[#6b82a3] dark:text-[#8da0bd]">{translateText(conversation.customer)}</p>
              <p className="mt-2 text-xs text-[#94a6c1] dark:text-[#7388aa]">{translateText(conversation.updatedAt)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-[#c8d8ef] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <div className="space-y-4">
          {chat.messages.map((message, index) => {
            const admin = message.from === "admin";

            return (
              <div
                key={`${message.time}-${index}`}
                className={`flex ${admin ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-[1.4rem] px-4 py-3 text-sm leading-7",
                    admin
                      ? "bg-[#eff5ff] text-[#13395f] dark:bg-[#13233a] dark:text-[#e2ebf8]"
                      : "bg-[#0f3a67] text-white dark:bg-[#15375f]",
                  ].join(" ")}
                >
                  <p>{translateText(message.text)}</p>
                  <p className={`mt-2 text-xs ${admin ? "text-[#7c92af]" : "text-[#d1def0]"}`}>
                    {translateText(message.time)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div dir={dir} className="mt-6 flex items-center gap-3 rounded-full border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 dark:border-[#1d2d46] dark:bg-[#122136]">
          <input
            readOnly
            value={t.typeMessage}
            className="w-full bg-transparent text-sm text-[#8ba0bb] outline-none dark:text-[#8da0bd]"
          />
          <button className="rounded-full bg-[#0f3a67] px-4 py-2 text-sm text-white dark:bg-[#15375f]">
            {t.send}
          </button>
        </div>
      </section>
    </div>
  );
}

function ArchiveView({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const archive = page.archive;
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  if (!archive) {
    return null;
  }

  const folderMap: Record<string, { key: string; name: string; description: string }> = {
    clients: {
      key: "العملاء",
      name: "العملاء",
      description: "الملفات المرتبطة بسجلات العملاء.",
    },
    cases: {
      key: "القضايا",
      name: "القضايا",
      description: "ملفات القضايا والمرفقات القانونية المرتبطة بها.",
    },
    services: {
      key: "الخدمات",
      name: "الخدمات",
      description: "الملفات المرتبطة بالطلبات والخدمات والعمليات.",
    },
    categories: {
      key: "التصنيفات",
      name: "التصنيفات",
      description: "الملفات المصنفة تحت فئات المستندات.",
    },
    other: {
      key: "أخرى",
      name: "أخرى",
      description: "ملفات غير مرتبطة أو غير مصنفة.",
    },
  };

  const slug = page.path.startsWith("/office/archive/")
    ? page.path.replace("/office/archive/", "")
    : "";
  const selectedFolder = slug ? folderMap[slug] ?? null : null;

  const allRows = (archive.recent ?? []).map((row) => ({
    id: row.id ?? "",
    title: row.title ?? "-",
    category: row.category ?? "-",
    format: row.format ?? "-",
    size: row.size ?? "-",
    visibility: row.visibility ?? "-",
    related: row.related ?? "أخرى",
    owner: row.owner ?? "-",
    updatedAt: row.updatedAt ?? "-",
  }));

  const counts = {
    العملاء: allRows.filter((row) => row.related === "العملاء").length,
    القضايا: allRows.filter((row) => row.related === "القضايا").length,
    الخدمات: allRows.filter((row) => row.related === "الخدمات").length,
    التصنيفات: allRows.filter((row) => row.related === "التصنيفات").length,
    أخرى: allRows.filter((row) => row.related === "أخرى").length,
  };

  const currentRows = selectedFolder
    ? allRows.filter((row) => row.related === selectedFolder.key)
    : allRows;
  const folderEntries = [
    { slug: "clients", name: "العملاء" },
    { slug: "cases", name: "القضايا" },
    { slug: "services", name: "الخدمات" },
    { slug: "categories", name: "التصنيفات" },
    { slug: "other", name: "أخرى" },
  ];
  const groupedByCategory = Object.entries(
    currentRows.reduce<Record<string, number>>((acc, row) => {
      const key = row.category?.trim() || "غير مصنف";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const categories = Array.from(new Set(currentRows.map((r) => r.category).filter(Boolean)));
  const visibilities = Array.from(new Set(currentRows.map((r) => r.visibility).filter(Boolean)));

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return currentRows.filter((row) => {
      const matchesQuery =
        q.length === 0 ||
        `${row.title} ${row.category} ${row.owner} ${row.related}`.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || row.category === categoryFilter;
      const matchesVisibility = visibilityFilter === "all" || row.visibility === visibilityFilter;
      return matchesQuery && matchesCategory && matchesVisibility;
    });
  }, [categoryFilter, currentRows, query, visibilityFilter]);

  const fileTypeInfo = (format: string, title: string) => {
    const value = `${format} ${title}`.toLowerCase();
    if (value.includes("pdf")) return { key: "PDF", icon: FileText };
    if (value.includes("image") || value.includes("jpg") || value.includes("jpeg") || value.includes("png") || value.includes("gif") || value.includes("webp")) return { key: "Image", icon: FileImage };
    if (value.includes("doc") || value.includes("word")) return { key: "DOC", icon: FileText };
    if (value.includes("xls") || value.includes("xlsx") || value.includes("csv") || value.includes("sheet")) return { key: "XLS", icon: FileSpreadsheet };
    if (value.includes("video") || value.includes("mp4") || value.includes("mov") || value.includes("avi") || value.includes("mkv")) return { key: "Video", icon: FileVideo };
    if (value.includes("audio") || value.includes("mp3") || value.includes("wav") || value.includes("m4a")) return { key: "Audio", icon: FileAudio };
    if (value.includes("zip") || value.includes("rar") || value.includes("7z") || value.includes("archive")) return { key: "Archive", icon: FileArchive };
    return { key: "Other", icon: FileIcon };
  };

  return (
    <div className="space-y-6">
      {!selectedFolder ? (
        <>
          <header className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <h2 className="text-2xl font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("الأرشيف")}</h2>
            <p className="mt-1 text-sm text-[#7890ad] dark:text-[#8da0bd]">{translateText("تصفح الأرشيف")}</p>
            <p className="mt-1 text-xs text-[#8ea4bf] dark:text-[#7f96b3]">{translateText("اختر مجموعة للمتابعة.")}</p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ["clients", "العملاء"],
              ["cases", "القضايا"],
              ["services", "الخدمات"],
              ["categories", "التصنيفات"],
              ["other", "أخرى"],
            ].map(([folderSlug, folderName]) => (
              <Link
                key={folderSlug}
                href={`/office/archive/${folderSlug}`}
                className="group rounded-[1.4rem] border border-[#c8d8ef] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] transition hover:border-[#9fbbdc] hover:bg-[#f8fbff] dark:border-[#1d2d46] dark:bg-[#0f1b2d] dark:hover:border-[#2e4a6a] dark:hover:bg-[#13233a]"
              >
                <div className="mb-2">
                  <Image src="/folder-icon.png" alt={translateText("مستندات")} width={28} height={28} className="h-7 w-7 object-contain" />
                </div>
                <p className="text-base font-semibold text-[#183a60] dark:text-[#eef4ff]">{translateText(folderName)}</p>
                <p className="mt-3 text-sm text-[#7f93ae] dark:text-[#8da0bd]">
                  {counts[folderName as keyof typeof counts]} {translateText("ملف")}
                </p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">
              {translateText("الأرشيف")} / {translateText(selectedFolder.name)}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText(selectedFolder.name)}</h2>
                <p className="mt-1 text-xs text-[#8ea4bf] dark:text-[#7f96b3]">{translateText(selectedFolder.description)}</p>
              </div>
              <Link
                href="/office/archive"
                className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] hover:bg-[#f3f7fd] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"
              >
                {translateText("العودة إلى المجلدات")}
              </Link>
            </div>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {folderEntries.map(({ slug: folderSlug, name: folderName }) => {
              const isActive = slug === folderSlug;
              return (
                <Link
                  key={folderSlug}
                  href={`/office/archive/${folderSlug}`}
                  className={[
                    "rounded-[1.2rem] border p-4 transition",
                    isActive
                      ? "border-[#9fbbdc] bg-[#f3f8ff] dark:border-[#2e4a6a] dark:bg-[#13233a]"
                      : "border-[#d6e2f1] bg-white hover:border-[#bdd0e8] dark:border-[#1d2d46] dark:bg-[#0f1b2d]",
                  ].join(" ")}
                >
                  <div className="mb-2">
                    <Image src="/folder-icon.png" alt={translateText("مستندات")} width={22} height={22} className="h-[22px] w-[22px] object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-[#183a60] dark:text-[#eef4ff]">{translateText(folderName)}</p>
                  <p className="mt-1 text-xs text-[#7f93ae] dark:text-[#8da0bd]">
                    {counts[folderName as keyof typeof counts]} {translateText("ملف")}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[280px_1fr]">
            <aside className="rounded-[1.25rem] border border-[#d6e2f1] bg-white p-3 shadow-[0_10px_24px_rgba(111,145,183,0.06)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
              <h3 className="mb-3 text-sm font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("مجلدات داخلية")}</h3>
              <div className="space-y-2">
                {groupedByCategory.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-3 py-3 text-xs text-[#7b91ab] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#9ab2cf]">
                    {translateText("لا توجد مجلدات فرعية حتى الآن.")}
                  </p>
                ) : (
                  groupedByCategory.map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between rounded-lg border border-[#e4ecf8] bg-[#fbfdff] px-3 py-2 dark:border-[#223752] dark:bg-[#122136]">
                      <div className="flex min-w-0 items-center gap-2">
                        <Image src="/folder-icon.png" alt={translateText("مجلد")} width={16} height={16} className="h-4 w-4 object-contain" />
                        <span className="truncate text-xs text-[#17395f] dark:text-[#e8f0ff]">{translateText(category)}</span>
                      </div>
                      <span className="rounded-full bg-[#edf5ff] px-2 py-0.5 text-[11px] text-[#2a67b5] dark:bg-[#1a2d47] dark:text-[#9fc3ec]">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </aside>

            <div className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="mb-4 grid gap-3 md:grid-cols-3">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث بالعنوان أو الفئة أو الرافع...")} className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-2.5 text-sm text-[#2a4364] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-2.5 text-sm text-[#2a4364] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]">
                <option value="all">{translateText("التصنيف: الكل")}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{translateText(category)}</option>
                ))}
              </select>
              <select value={visibilityFilter} onChange={(e) => setVisibilityFilter(e.target.value)} className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-2.5 text-sm text-[#2a4364] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]">
                <option value="all">{translateText("الظهور: الكل")}</option>
                {visibilities.map((visibility) => (
                  <option key={visibility} value={visibility}>{translateText(visibility)}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-[#7891b0] dark:text-[#9cb3ce]">{translateText("عرض افتراضي: شبكة")}</p>
              <div className="inline-flex rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-1 dark:border-[#2a3f5c] dark:bg-[#122136]">
                <button type="button" onClick={() => setViewMode("grid")} className={["inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs", viewMode === "grid" ? "bg-[#e9f1ff] text-[#144673] dark:bg-[#1b314d] dark:text-[#d2e2f6]" : "text-[#6a84a7] dark:text-[#9ab0cc]"].join(" ")}><LayoutGrid className="h-3.5 w-3.5" />{translateText("شبكة")}</button>
                <button type="button" onClick={() => setViewMode("table")} className={["inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs", viewMode === "table" ? "bg-[#e9f1ff] text-[#144673] dark:bg-[#1b314d] dark:text-[#d2e2f6]" : "text-[#6a84a7] dark:text-[#9ab0cc]"].join(" ")}><List className="h-3.5 w-3.5" />{translateText("جدول")}</button>
              </div>
            </div>

            {filteredRows.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center text-sm text-[#718aa9] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#9ab2cf]">
                <p className="font-medium">{translateText("لا توجد ملفات في هذا المجلد")}</p>
                <p className="mt-1 text-xs">{translateText("ستظهر هنا الملفات المرفوعة والمرتبطة بهذا القسم.")}</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRows.map((row, index) => {
                  const type = fileTypeInfo(row.format, row.title);
                  const TypeIcon = type.icon;
                  return (
                    <article key={`${row.title}-${index}`} className="rounded-[1.1rem] border border-[#d8e4f2] bg-[#fbfdff] p-3 transition hover:border-[#b8cce4] hover:bg-white dark:border-[#223752] dark:bg-[#122136] dark:hover:border-[#2f4b69]">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-[#eef5ff] p-2 text-[#245f9f] dark:bg-[#1b304a] dark:text-[#a9c7e8]">
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full bg-[#fff5df] px-2 py-0.5 text-[11px] text-[#b57010] dark:bg-[#3a2b18] dark:text-[#f0c58b]">{type.key}</span>
                        </div>
                        <span className="rounded-full bg-[#edf5ff] px-2 py-0.5 text-[11px] text-[#2a67b5] dark:bg-[#1a2d47] dark:text-[#9fc3ec]">{translateText(row.visibility)}</span>
                      </div>
                      <p className="line-clamp-2 text-sm font-semibold text-[#153a62] dark:text-[#eaf2ff]">{translateText(row.title)}</p>
                      <div className="mt-2 space-y-1 text-xs text-[#6f89ab] dark:text-[#9cb3ce]">
                        <p>{translateText("التصنيف")}: {translateText(row.category)}</p>
                        <p>{translateText("مرتبط بـ")}: {translateText(row.related)}</p>
                        <p>{translateText("تاريخ الرفع")}: {translateText(row.updatedAt)}</p>
                        <p>{translateText("تم الرفع بواسطة")}: {translateText(row.owner)}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Link href={`/office/documents?doc=${encodeURIComponent(row.id ?? row.title)}`} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("معاينة")}</Link>
                        <Link href={`/office/documents?doc=${encodeURIComponent(row.id ?? row.title)}`} className="inline-flex items-center gap-1 rounded-lg bg-[#103a67] px-2 py-1 text-xs text-white"><ExternalLink className="h-3.5 w-3.5" />{translateText("فتح")}</Link>
                        <Link href={`/office/documents?doc=${encodeURIComponent(row.id ?? row.title)}`} className="inline-flex items-center gap-1 rounded-lg border border-[#d7e2f0] bg-white px-2 py-1 text-xs text-[#2a67b5] dark:border-[#28415f] dark:bg-[#0f1b2d] dark:text-[#9fc3ec]"><Download className="h-3.5 w-3.5" />{translateText("تحميل")}</Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
                <table dir={dir} className="min-w-[1100px] w-full text-sm">
                  <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]">
                    <tr>
                      <th className="px-4 py-3">{translateText("العنوان / اسم الملف")}</th>
                      <th className="px-4 py-3">{translateText("التصنيف")}</th>
                      <th className="px-4 py-3">{translateText("الصيغة")}</th>
                      <th className="px-4 py-3">{translateText("الحجم")}</th>
                      <th className="px-4 py-3">{translateText("الظهور")}</th>
                      <th className="px-4 py-3">{translateText("مرتبط بـ")}</th>
                      <th className="px-4 py-3">{translateText("تاريخ الرفع")}</th>
                      <th className="px-4 py-3">{translateText("تم الرفع بواسطة")}</th>
                      <th className="px-4 py-3">{translateText("الإجراءات")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, index) => (
                      <tr key={`${row.title}-${index}`} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.title)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.category)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.format)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.size)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.visibility)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.related)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.updatedAt)}</td>
                        <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{translateText(row.owner)}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            <Link
                              href={`/office/documents?doc=${encodeURIComponent(row.id ?? row.title)}`}
                              className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"
                            >
                              {translateText("عرض / فتح")}
                            </Link>
                            <Link
                              href={`/office/documents?doc=${encodeURIComponent(row.id ?? row.title)}`}
                              className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"
                            >
                              {translateText("تنزيل")}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function OverviewView({ page }: Readonly<{ page: OfficePageData }>) {
  const { t, translateText } = useOfficePreferences();
  const overview = page.overview;

  if (!overview) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <section className="rounded-[1.7rem] bg-[#103a66] p-7 text-white shadow-[0_25px_55px_rgba(15,58,103,0.2)] dark:bg-[#15375f]">
        <p className="text-sm text-[#d8e5f5]">{translateText("اشتراك النظام")}</p>
        <h3 className="mt-3 text-4xl font-semibold">{translateText("الخطة الاحترافية السنوية")}</h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#e8eef7]">
          {translateText("هذه الشاشة تحاكي نظرة عامة للاشتراك الحالي مع حالة التجديد والاستهلاك وحدود النظام والمزايا المفعلة للمكتب.")}
        </p>
      </section>

      <section className="rounded-[1.7rem] border border-[#c8d8ef] bg-white p-6 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <h3 className="text-xl font-semibold text-[#16355e] dark:text-[#eef4ff]">{translateText("المزايا المفعلة")}</h3>
        <div className="mt-5 space-y-3">
          {overview.features.map((feature) => (
            <div
              key={feature.name}
              className="flex items-center justify-between rounded-full bg-[#f5f9ff] px-4 py-3 dark:bg-[#13233a]"
            >
              <span className="text-[#18395e] dark:text-[#eef4ff]">{translateText(feature.name)}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  feature.enabled
                    ? "bg-[#ebfff1] text-[#14954c]"
                    : "bg-[#fff0f0] text-[#d74646]"
                }`}
              >
                {feature.enabled ? t.enabled : t.disabled}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3 xl:col-span-2">
        {overview.metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-[1.4rem] border border-[#c8d8ef] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"
          >
            <p className="text-sm text-[#7d91ab] dark:text-[#8da0bd]">{translateText(metric.label)}</p>
            <p className="mt-3 text-3xl font-semibold text-[#16355e] dark:text-[#eef4ff]">{metric.value}</p>
            <p className="mt-2 text-sm text-[#91a4be] dark:text-[#8da0bd]">{translateText(metric.caption)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function DashboardStats({ page }: Readonly<{ page: OfficePageData }>) {
  const { translateText } = useOfficePreferences();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {page.stats?.map((stat) => (
        <article
          key={stat.label}
          className="rounded-[1.5rem] border border-[#c8d8ef] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"
        >
          <div className="flex items-start justify-between">
            <div
              className={[
                "flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold",
                stat.tone === "green" && "bg-[#ddfae6] text-[#0d9157]",
                stat.tone === "blue" && "bg-[#e3f1ff] text-[#2f76c7]",
                stat.tone === "amber" && "bg-[#fff1cf] text-[#d88a10]",
                stat.tone === "red" && "bg-[#ffe4e4] text-[#d74646]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              •
            </div>
            <div className="text-right">
              <p className="text-sm text-[#7b91ae] dark:text-[#8da0bd]">{translateText(stat.label)}</p>
              <p className="mt-2 text-5xl font-semibold text-[#111f38] dark:text-[#eef4ff]">{stat.value}</p>
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs ${toneClasses(stat.hint)}`}>
                {translateText(stat.hint)}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ActionBar({ page }: Readonly<{ page: OfficePageData }>) {
  const { translateText } = useOfficePreferences();
  const filters = page.filters ?? [];
  const actions = page.actions ?? [];

  if (filters.length === 0 && actions.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-[#c8d8ef] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-full bg-[#0f3a67] px-4 py-2 text-sm text-white dark:bg-[#15375f]"
          >
            {translateText(action)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <span
            key={filter}
            className="rounded-full border border-[#d9e4f4] bg-[#f8fbff] px-4 py-2 text-sm text-[#6883a5] dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#9cb1cd]"
          >
            {translateText(filter)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function OfficePageRenderer({ page }: Readonly<{ page: OfficePageData }>) {
  const { translateText } = useOfficePreferences();

  if (page.path === "/office/cases") {
    return <CasesManagement page={page} />;
  }

  if (page.path === "/office/clients") {
    return <ClientsManagement page={page} />;
  }

  if (page.path === "/office") {
    return <HomeDashboard page={page} />;
  }

  if (page.path === "/office/tasks-board") {
    return <TasksBoardPage page={page} />;
  }

  if (page.path === "/office/operations") {
    return <OperationsManagement page={page} />;
  }

  if (page.path === "/office/services") {
    return <ServicesManagement page={page} />;
  }

  if (page.path === "/office/subscription-plans") {
    return <SubscriptionPlansManagement page={page} />;
  }

  if (page.path === "/office/employees") {
    return <EmployeesManagement page={page} />;
  }

  if (page.path === "/office/attendance-matrix") {
    return <AttendanceScheduleManagement page={page} />;
  }

  if (page.path === "/office/attendance-records") {
    return <AttendanceRecordsManagement page={page} />;
  }

  if (page.path === "/office/leave-requests") {
    return <LeaveRequestsManagement page={page} />;
  }

  if (page.path === "/office/payroll-runs") {
    return <PayrollRunsManagement page={page} />;
  }

  if (page.path === "/office/finance/invoices") {
    return <InvoicesManagement page={page} />;
  }

  if (page.path === "/office/consultations") {
    return <ConsultationsManagement page={page} />;
  }

  if (page.path === "/office/documents") {
    return <DocumentsManagement page={page} />;
  }

  if (page.path === "/office/support/support-tickets") {
    return <SupportTicketsManagement page={page} />;
  }

  if (page.path === "/office/tickets-chat") {
    return <SupportChatsManagement page={page} />;
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 text-right">
        <h1 className="text-4xl font-semibold tracking-tight text-[#081b34] dark:text-[#eef4ff] sm:text-5xl">
          {translateText(page.title)}
        </h1>
        <p className="text-base text-[#6e85a3] dark:text-[#8da0bd]">{translateText(page.subtitle)}</p>
      </header>

      <ActionBar page={page} />

      {page.pageType === "dashboard" ? (
        <>
          <DashboardStats page={page} />
          <DashboardCharts charts={page.charts ?? []} />
        </>
      ) : null}

      {page.pageType === "board" && page.board ? <BoardView columns={page.board} /> : null}
      {page.pageType === "table" ? <TableView columns={page.columns} rows={page.rows} /> : null}
      {page.pageType === "calendar" ? <CalendarPage page={page} /> : null}
      {page.pageType === "chat" ? <ChatView page={page} /> : null}
      {page.pageType === "archive" ? <ArchiveView page={page} /> : null}
      {page.pageType === "overview" ? <OverviewView page={page} /> : null}
    </section>
  );
}
