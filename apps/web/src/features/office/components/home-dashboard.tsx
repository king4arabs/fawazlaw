"use client";

import clsx from "clsx";
import {
  BriefcaseBusiness,
  CircleCheckBig,
  CircleOff,
  CopyPlus,
  Play,
  RefreshCw,
  Users,
} from "lucide-react";
import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { ChartCard, OfficePageData, StatCard } from "@/features/office/types";

function toneClasses(tone: StatCard["tone"]) {
  if (tone === "green") {
    return {
      icon: "bg-[#daf7e8] text-[#109760] dark:bg-[#123427] dark:text-[#65d9a3]",
      badge: "bg-[#edfdf3] text-[#109760] dark:bg-[#102d22] dark:text-[#65d9a3]",
    };
  }

  if (tone === "amber") {
    return {
      icon: "bg-[#fff1cf] text-[#d88400] dark:bg-[#35280f] dark:text-[#f3ba56]",
      badge: "bg-[#fff7e4] text-[#d88400] dark:bg-[#2d2410] dark:text-[#f3ba56]",
    };
  }

  if (tone === "red") {
    return {
      icon: "bg-[#ffe5ea] text-[#dc4a63] dark:bg-[#351923] dark:text-[#ff93a5]",
      badge: "bg-[#fff0f3] text-[#dc4a63] dark:bg-[#2f1820] dark:text-[#ff93a5]",
    };
  }

  return {
    icon: "bg-[#dff0ff] text-[#1e82cf] dark:bg-[#132e46] dark:text-[#7dc7ff]",
    badge: "bg-[#edf6ff] text-[#1e82cf] dark:bg-[#11293f] dark:text-[#7dc7ff]",
  };
}

function StatGlyph({ label }: Readonly<{ label: string }>) {
  if (label.includes("العملاء")) {
    return <Users className="h-6 w-6" strokeWidth={1.9} />;
  }

  if (label.includes("القضايا")) {
    return <BriefcaseBusiness className="h-6 w-6" strokeWidth={1.9} />;
  }

  if (label.includes("الخدمات")) {
    return <Play className="h-6 w-6" strokeWidth={1.9} />;
  }

  if (label.includes("مكتملة")) {
    return <CircleCheckBig className="h-6 w-6" strokeWidth={1.9} />;
  }

  if (label.includes("متوقفة")) {
    return <CircleOff className="h-6 w-6" strokeWidth={1.9} />;
  }

  if (label.includes("الانتظار")) {
    return <CopyPlus className="h-6 w-6" strokeWidth={1.9} />;
  }

  return <RefreshCw className="h-6 w-6" strokeWidth={1.9} />;
}

function months() {
  return [
    "Jun 2025",
    "Jul 2025",
    "Aug 2025",
    "Sep 2025",
    "Oct 2025",
    "Nov 2025",
    "Dec 2025",
    "Jan 2026",
    "Feb 2026",
    "Mar 2026",
    "Apr 2026",
    "May 2026",
  ];
}

function cardClassName() {
  return "rounded-[1.5rem] border border-[#d2deec] bg-white shadow-[0_10px_24px_rgba(94,124,168,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]";
}

function StatCardView({ stat }: Readonly<{ stat: StatCard }>) {
  const tones = toneClasses(stat.tone);
  const { translateText } = useOfficePreferences();

  return (
    <article className={clsx(cardClassName(), "px-5 py-6 sm:px-6")}>
      <div className="flex items-start justify-between gap-4">
        <div className="text-right">
          <p className="text-sm text-[#7a8eab] dark:text-[#8da0bd]">
            {translateText(stat.label)}
          </p>
          <p className="mt-2 text-[2rem] font-semibold leading-none text-[#0f1f36] dark:text-[#eef4ff]">
            {stat.value}
          </p>
          <span
            className={clsx(
              "mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium",
              tones.badge,
            )}
          >
            {translateText(stat.hint)}
          </span>
        </div>

        <div
          className={clsx(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
            tones.icon,
          )}
        >
          <StatGlyph label={stat.label} />
        </div>
      </div>
    </article>
  );
}

function buildLineData(chart: ChartCard) {
  return months().map((month, index) => ({
    month,
    value: chart.values[index] ?? 0,
  }));
}

function lineTickColor() {
  return "#8194af";
}

function ChartCardView({ chart }: Readonly<{ chart: ChartCard }>) {
  const { translateText, theme } = useOfficePreferences();
  const isDark = theme === "dark";

  if (chart.kind === "donut") {
    const pieData = chart.labels.map((label, index) => ({
      name: label,
      value: chart.values[index] ?? 0,
    }));
    const pieColors = ["#b4bcc8", "#447fe7", "#24c45d", "#ef5350"];

    return (
      <article className={clsx(cardClassName(), "flex min-h-[26rem] flex-col")}>
        <div className="border-b border-[#e6eef8] px-5 py-5 dark:border-[#1d2d46] sm:px-6">
          <h3 className="text-right text-lg font-semibold text-[#0e1c33] dark:text-[#eef4ff]">
            {translateText(chart.title)}
          </h3>
        </div>

        <div className="flex flex-1 items-center justify-center px-3 py-5 sm:px-5">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={115}
                paddingAngle={1}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={pieColors[index] ?? "#447fe7"} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="square"
                formatter={(value) => (
                  <span style={{ color: isDark ? "#b8c7dc" : "#637894" }}>
                    {value}
                  </span>
                )}
              />
              <Tooltip
                formatter={(value) => [value, ""]}
                contentStyle={{
                  borderRadius: 16,
                  border: isDark ? "1px solid #1d2d46" : "1px solid #dbe6f3",
                  backgroundColor: isDark ? "#0f1b2d" : "#ffffff",
                  color: isDark ? "#eef4ff" : "#0f1f36",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
    );
  }

  return (
    <article className={clsx(cardClassName(), "flex min-h-[26rem] flex-col")}>
      <div className="border-b border-[#e6eef8] px-5 py-5 dark:border-[#1d2d46] sm:px-6">
        <h3 className="text-right text-lg font-semibold text-[#0e1c33] dark:text-[#eef4ff]">
          {translateText(chart.title)}
        </h3>
      </div>

      <div className="flex flex-1 items-center px-3 py-4 sm:px-5">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={buildLineData(chart)}
            margin={{ top: 18, right: 16, bottom: 18, left: 0 }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: lineTickColor(), fontSize: 11 }}
              angle={-32}
              textAnchor="end"
              height={56}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: lineTickColor(), fontSize: 11 }}
              width={32}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: isDark ? "1px solid #1d2d46" : "1px solid #dbe6f3",
                backgroundColor: isDark ? "#0f1b2d" : "#ffffff",
                color: isDark ? "#eef4ff" : "#0f1f36",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="square"
              formatter={() => (
                <span style={{ color: isDark ? "#b8c7dc" : "#637894" }}>
                  {chart.title.includes("العملاء")
                    ? translateText("العملاء الجدد")
                    : chart.title.includes("المصروفات")
                      ? translateText("إجمالي المصروفات")
                      : translateText("مفتوحة")}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1f4d80"
              strokeWidth={3}
              dot={{ r: 4, fill: "#1f4d80", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

export function HomeDashboard({
  page,
}: Readonly<{
  page: OfficePageData;
}>) {
  const { translateText } = useOfficePreferences();
  const stats = page.stats ?? [];
  const charts = page.charts ?? [];
  const orderedStats = [
    stats.find((item) => item.label === "العملاء"),
    stats.find((item) => item.label === "القضايا"),
    stats.find((item) => item.label === "الخدمات قيد التنفيذ"),
    stats.find((item) => item.label === "الموظفون"),
    stats.find((item) => item.label === "المهام قيد الانتظار"),
    stats.find((item) => item.label === "المهام قيد التنفيذ"),
    stats.find((item) => item.label === "المهام متوقفة"),
    stats.find((item) => item.label === "المهام مكتملة"),
  ].filter(Boolean) as StatCard[];

  const orderedCharts = [
    charts.find((item) => item.title === "القضايا: المفتوحة مقابل المغلقة (آخر 12 شهرًا)"),
    charts.find((item) => item.title === "العملاء الجدد (آخر 12 شهرًا)"),
    charts.find((item) => item.title === "المصروفات (آخر 12 شهرًا)"),
    charts.find((item) => item.title === "الفواتير حسب الحالة"),
  ].filter(Boolean) as ChartCard[];

  return (
    <section className="space-y-6">
      <header className="text-right">
        <h1 className="text-[2rem] font-semibold text-[#091a30] dark:text-[#eef4ff] sm:text-[2.35rem]">
          {translateText(page.title)}
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {orderedStats.map((stat) => (
          <StatCardView key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {orderedCharts.map((chart) => (
          <ChartCardView key={chart.title} chart={chart} />
        ))}
      </div>
    </section>
  );
}
