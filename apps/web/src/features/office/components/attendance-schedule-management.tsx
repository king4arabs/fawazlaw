"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type CellStatus = "no-record" | "complete" | "less-than-7" | "checkin-only";

type EmployeeRow = {
  id: string;
  name: string;
  byWeekday: Record<number, string>;
};

type ModalState = { open: boolean; employeeName: string; date: Date; status: CellStatus };

const AR_DAY_SHORT = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
const EN_DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function SectionCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">{children}</section>;
}

function mapStatus(raw: string): CellStatus {
  const value = (raw || "").trim();
  if (!value) return "no-record";
  if (value.includes("تم")) return "complete";
  if (value.includes("متأخر") || value.includes("أقل")) return "less-than-7";
  if (value.includes("دخول") || value.includes("فقط")) return "checkin-only";
  if (value.includes("إجازة")) return "no-record";
  return "no-record";
}

function statusDotClass(status: CellStatus) {
  if (status === "complete") return "bg-[#2e67b5]";
  if (status === "less-than-7") return "bg-[#d68a16]";
  if (status === "checkin-only") return "bg-[#c84b4b]";
  return "bg-[#c5cfdb] dark:bg-[#536780]";
}

function statusLabel(status: CellStatus) {
  if (status === "complete") return "مكتمل";
  if (status === "less-than-7") return "أقل من 7 ساعات";
  if (status === "checkin-only") return "تسجيل دخول فقط";
  return "لا يوجد سجل";
}

function statusBadgeClass(status: CellStatus) {
  if (status === "complete") return "bg-[#ebf2ff] text-[#2e67b5] dark:bg-[#1a2f49] dark:text-[#a5c2ea]";
  if (status === "less-than-7") return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  if (status === "checkin-only") return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  return "bg-[#edf3fa] text-[#667f9f] dark:bg-[#1f3149] dark:text-[#9db3cc]";
}

export function AttendanceScheduleManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, translateText } = useOfficePreferences();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<ModalState | null>(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const employees = useMemo<EmployeeRow[]>(() =>
    (page.rows ?? []).map((row, idx) => ({
      id: String(idx + 1),
      name: row.employee ?? row.name ?? `#${idx + 1}`,
      byWeekday: {
        0: row.sun ?? "",
        1: row.mon ?? "",
        2: row.tue ?? "",
        3: row.wed ?? "",
        4: row.thu ?? "",
        5: row.fri ?? "",
        6: row.sat ?? "",
      },
    })),
  [page.rows]);

  const monthDates = useMemo(() => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  }, [year, month]);

  const filteredEmployees = useMemo(() => {
    if (!query.trim()) return employees;
    const q = query.toLowerCase();
    return employees.filter((e) => `${e.name} ${e.id}`.toLowerCase().includes(q));
  }, [employees, query]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(isArabic ? "ar" : "en", {
        month: "long",
        year: "numeric",
      }).format(new Date(year, month, 1)),
    [isArabic, month, year],
  );

  const prevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  useEffect(() => {
    if (!modal?.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("جدول الحضور")}</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("جدول الحضور")}</h1>
      </div>

      <SectionCard>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="block">
            <span className="mb-2 block text-sm text-[#6d84a1]">{translateText("السنة")}</span>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]">
              {Array.from({ length: 7 }, (_, i) => now.getFullYear() - 3 + i).map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الشهر")}</span>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]">
              {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{new Intl.DateTimeFormat(isArabic ? "ar" : "en", { month: "long" }).format(new Date(2026, i, 1))}</option>)}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button onClick={prevMonth} className="inline-flex h-11 items-center gap-1 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"><ChevronRight className="h-4 w-4" />{translateText("السابق")}</button>
            <button onClick={nextMonth} className="inline-flex h-11 items-center gap-1 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"><ChevronLeft className="h-4 w-4" />{translateText("التالي")}</button>
          </div>
          <div className="relative md:col-span-2 xl:col-span-2">
            <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("ابحث عن موظف...")} className={clsx("h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {([
            ["checkin-only", "تسجيل دخول فقط (بدون خروج)"],
            ["less-than-7", "أقل من 7 ساعات"],
            ["complete", "مكتمل (+7 ساعات)"],
            ["no-record", "لا يوجد سجل"],
          ] as Array<[CellStatus, string]>).map(([status, label]) => (
            <span key={status} className={clsx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs", statusBadgeClass(status))}>
              <span className={clsx("h-2.5 w-2.5 rounded-full", statusDotClass(status))} />
              {translateText(label)}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{monthLabel}</h2>
          {filteredEmployees.length === 0 ? <span className="text-xs text-[#7f95b1]">{query.trim() ? translateText("لا توجد نتائج مطابقة") : translateText("لا يوجد موظفون")}</span> : null}
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
          <table dir={dir} className="min-w-[1100px] w-full text-sm">
            <thead className="sticky top-0 z-10 bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]">
              <tr>
                <th className={clsx("sticky z-20 min-w-[220px] border-[#d9e5f6] bg-[#edf4ff] px-4 py-3 text-start dark:border-[#223752] dark:bg-[#122136]", dir === "rtl" ? "right-0 border-l" : "left-0 border-r")}>{translateText("الموظف")}</th>
                {monthDates.map((date) => {
                  const weekday = isArabic ? AR_DAY_SHORT[date.getDay()] : EN_DAY_SHORT[date.getDay()];
                  return <th key={date.toISOString()} className="min-w-[54px] border-l border-[#e3ecf8] px-2 py-3 text-center dark:border-[#223752]"><p className="text-[11px]">{weekday}</p><p className="text-xs font-semibold">{String(date.getDate()).padStart(2, "0")}</p></th>;
                })}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                  <td className={clsx("sticky z-10 bg-white px-4 py-3 align-top dark:bg-[#0f1b2d]", dir === "rtl" ? "right-0 border-l border-[#e3ecf8] dark:border-[#223752]" : "left-0 border-r border-[#e3ecf8] dark:border-[#223752]")}>
                    <p className="font-medium text-[#153a62] dark:text-[#eaf2ff]">{employee.name}</p>
                    <p className="text-xs text-[#7b92ad]">#{employee.id}</p>
                  </td>
                  {monthDates.map((date) => {
                    const raw = employee.byWeekday[date.getDay()] ?? "";
                    const status = mapStatus(raw);
                    return (
                      <td key={`${employee.id}-${date.toISOString()}`} className="border-l border-[#edf3fb] px-2 py-2 text-center dark:border-[#1d2d46]">
                        <button
                          type="button"
                          onClick={() => setModal({ open: true, employeeName: employee.name, date, status })}
                          aria-label={`${translateText("تفاصيل حضور")} ${employee.name} ${translateText("بتاريخ")} ${date.toLocaleDateString(isArabic ? "ar" : "en")}`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-offset-2 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#123f6f]"
                        >
                          <span className={clsx("h-4 w-4 rounded-full", statusDotClass(status))} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading ? <div className="mt-3 text-sm text-[#6f89ab]">{translateText("جاري التحميل...")}</div> : null}
        {error ? <div className="mt-3 rounded-xl border border-[#ffd9d9] bg-[#fff4f4] px-3 py-2 text-sm text-[#b44444]">{translateText("تعذر تحميل جدول الحضور")}</div> : null}
      </SectionCard>

      {modal?.open ? (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07101d]/55 px-3 py-6" onClick={() => setModal(null)}>
          <div className="w-full max-w-3xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("تفاصيل الحضور")}</h3><button onClick={() => setModal(null)} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]"><X className="h-5 w-5" /></button></div>
            <div className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-4 dark:border-[#223752] dark:bg-[#122136]"><div className="grid gap-3 md:grid-cols-2"><div><p className="text-xs text-[#7d95b2]">{translateText("الموظف")}</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{modal.employeeName}</p></div><div><p className="text-xs text-[#7d95b2]">{translateText("التاريخ")}</p><p className="text-sm text-[#1b4a79] dark:text-[#e5f0ff]">{modal.date.toLocaleDateString(isArabic ? "ar" : "en")}</p></div></div></div>

            {modal.status === "no-record" ? (
              <div className="mt-4 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center text-sm text-[#718aa9] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#9ab2cf]">{translateText("لا يوجد سجل حضور لهذا اليوم.")}</div>
            ) : (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2"><p className="text-[11px] text-[#7891b0]">{translateText("وقت الحضور")}</p><p className="text-xs text-[#1f4f7f] dark:text-[#dce8f8]">-</p></div>
                <div className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2"><p className="text-[11px] text-[#7891b0]">{translateText("وقت الانصراف")}</p><p className="text-xs text-[#1f4f7f] dark:text-[#dce8f8]">-</p></div>
                <div className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2"><p className="text-[11px] text-[#7891b0]">{translateText("ساعات العمل / دقائق العمل")}</p><p className="text-xs text-[#1f4f7f] dark:text-[#dce8f8]">-</p></div>
                <div className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2"><p className="text-[11px] text-[#7891b0]">{translateText("الحالة")}</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", statusBadgeClass(modal.status))}>{translateText(statusLabel(modal.status))}</span></div>
                <div className="rounded-lg border border-[#e8eef8] bg-[#fbfdff] px-3 py-2 md:col-span-2"><p className="text-[11px] text-[#7891b0]">{translateText("ملاحظات")}</p><p className="text-xs text-[#1f4f7f] dark:text-[#dce8f8]">-</p></div>
              </div>
            )}

            <div className="mt-5 flex justify-end"><button onClick={() => setModal(null)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إغلاق")}</button></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
