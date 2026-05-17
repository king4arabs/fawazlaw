"use client";

import type {
  BoardColumn,
  ChartCard,
  OfficePageData,
} from "@/features/office/types";
import { CasesManagement } from "@/features/office/components/cases-management";
import { CalendarPage } from "@/features/office/components/calendar-page";
import { ClientsManagement } from "@/features/office/components/clients-management";
import { ConsultationsManagement } from "@/features/office/components/consultations-management";
import { HomeDashboard } from "@/features/office/components/home-dashboard";
import { OperationsManagement } from "@/features/office/components/operations-management";
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
  const { translateText } = useOfficePreferences();
  const archive = page.archive;

  if (!archive) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {archive.folders.map((folder) => (
          <article
            key={folder.name}
            className="rounded-[1.4rem] border border-[#c8d8ef] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"
          >
            <p className="text-base font-semibold text-[#183a60] dark:text-[#eef4ff]">{translateText(folder.name)}</p>
            <p className="mt-3 text-sm text-[#7f93ae] dark:text-[#8da0bd]">{translateText(folder.count)}</p>
          </article>
        ))}
      </div>
      <TableView
        columns={[
          { key: "title", label: "العنوان" },
          { key: "category", label: "التصنيف" },
          { key: "owner", label: "المالك" },
          { key: "updatedAt", label: "آخر تحديث" },
        ]}
        rows={archive.recent}
      />
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

  if (page.path === "/office/consultations") {
    return <ConsultationsManagement page={page} />;
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
