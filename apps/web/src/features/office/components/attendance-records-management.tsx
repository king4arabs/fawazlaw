"use client";

import clsx from "clsx";
import { Download, Eye, Filter, FileSpreadsheet, Plus, Search, Settings2, Trash2, Upload, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type ViewMode = "list" | "add";
type PeriodFilter = "today" | "yesterday" | "week" | "month" | "custom";

type AttendanceRow = {
  id: string;
  date: string;
  employee: string;
  checkIn: string;
  checkOut: string;
  minutes: string;
  checkInMethod: string;
  checkOutMethod: string;
  officeId: string;
  notes: string;
};

type ColumnKey =
  | "date"
  | "employee"
  | "checkIn"
  | "checkOut"
  | "minutes"
  | "checkInMethod"
  | "checkOutMethod";

const COLUMN_CONFIG: Array<{ key: ColumnKey; label: string }> = [
  { key: "date", label: "التاريخ" },
  { key: "employee", label: "الموظف" },
  { key: "checkIn", label: "وقت الحضور" },
  { key: "checkOut", label: "وقت الانصراف" },
  { key: "minutes", label: "ساعات العمل" },
  { key: "checkInMethod", label: "طريقة تسجيل الدخول" },
  { key: "checkOutMethod", label: "طريقة تسجيل الخروج" },
];

const defaultVisibleColumns: Record<ColumnKey, boolean> = {
  date: true,
  employee: true,
  checkIn: true,
  checkOut: true,
  minutes: true,
  checkInMethod: true,
  checkOutMethod: true,
};

type FiltersState = {
  period: PeriodFilter;
  employee: string;
  fromDate: string;
  toDate: string;
};

const defaultFilters: FiltersState = {
  period: "today",
  employee: "all",
  fromDate: "",
  toDate: "",
};

type FormState = {
  employee: string;
  date: string;
  officeId: string;
  checkIn: string;
  checkOut: string;
  checkInMethod: string;
  checkOutMethod: string;
  minutes: string;
  notes: string;
};

const defaultForm: FormState = {
  employee: "",
  date: "",
  officeId: "",
  checkIn: "",
  checkOut: "",
  checkInMethod: "GPS",
  checkOutMethod: "GPS",
  minutes: "",
  notes: "",
};

function SectionCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">{children}</section>;
}

function useOutsideClick<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

export function AttendanceRecordsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [mode, setMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(defaultVisibleColumns);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [filtersDraft, setFiltersDraft] = useState<FiltersState>(defaultFilters);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [form, setForm] = useState<FormState>(defaultForm);

  const columnsRef = useOutsideClick<HTMLDivElement>(columnsOpen, () => setColumnsOpen(false));
  const filtersRef = useOutsideClick<HTMLDivElement>(filtersOpen, () => setFiltersOpen(false));

  const [rows, setRows] = useState<AttendanceRow[]>(
    (page.rows ?? []).map((row, idx) => ({
      id: row.id ?? String(idx + 1),
      date: row.date ?? "-",
      employee: row.employee ?? row.name ?? "-",
      checkIn: row.checkIn ?? "-",
      checkOut: row.checkOut ?? "-",
      minutes: row.minutes ?? "-",
      checkInMethod: row.method ?? row.checkInMethod ?? "GPS",
      checkOutMethod: row.checkOutMethod ?? row.method ?? "GPS",
      officeId: row.officeId ?? "-",
      notes: row.notes ?? "",
    })),
  );

  const employeeOptions = useMemo(() => {
    const set = new Set(rows.map((r) => r.employee).filter(Boolean));
    return Array.from(set);
  }, [rows]);

  const activeFilterChips = useMemo(() => {
    const chips: Array<{ key: keyof FiltersState; label: string }> = [];
    if (filters.period !== "today") {
      const periodMap: Record<PeriodFilter, string> = {
        today: "اليوم",
        yesterday: "أمس",
        week: "هذا الأسبوع",
        month: "هذا الشهر",
        custom: "مخصص",
      };
      chips.push({ key: "period", label: `الفترة: ${periodMap[filters.period]}` });
    }
    if (filters.employee !== "all") chips.push({ key: "employee", label: `الموظف: ${filters.employee}` });
    if (filters.fromDate) chips.push({ key: "fromDate", label: `من: ${filters.fromDate}` });
    if (filters.toDate) chips.push({ key: "toDate", label: `إلى: ${filters.toDate}` });
    return chips;
  }, [filters]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch = q.length === 0 || `${row.date} ${row.employee} ${row.checkIn} ${row.checkOut} ${row.minutes}`.toLowerCase().includes(q);
      const matchesEmployee = filters.employee === "all" || row.employee === filters.employee;
      return matchesSearch && matchesEmployee;
    });
  }, [rows, query, filters.employee]);

  const visibleColumnKeys = COLUMN_CONFIG.map((c) => c.key).filter((key) => visibleColumns[key]);
  const filterCount = activeFilterChips.length;

  const removeFilterChip = (key: keyof FiltersState) => {
    if (key === "period") setFilters((c) => ({ ...c, period: "today" }));
    else if (key === "employee") setFilters((c) => ({ ...c, employee: "all" }));
    else if (key === "fromDate") setFilters((c) => ({ ...c, fromDate: "" }));
    else if (key === "toDate") setFilters((c) => ({ ...c, toDate: "" }));
  };

  const applyColumns = () => setColumnsOpen(false);

  const resetColumns = () => setVisibleColumns(defaultVisibleColumns);

  const applyFilters = () => {
    setFilters(filtersDraft);
    setFiltersOpen(false);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setFiltersDraft(defaultFilters);
    setFiltersOpen(false);
  };

  useEffect(() => {
    if (!form.checkIn || !form.checkOut) {
      setForm((c) => ({ ...c, minutes: "" }));
      return;
    }
    const [h1, m1] = form.checkIn.split(":").map(Number);
    const [h2, m2] = form.checkOut.split(":").map(Number);
    if ([h1, m1, h2, m2].some((n) => Number.isNaN(n))) return;
    const total = h2 * 60 + m2 - (h1 * 60 + m1);
    setForm((c) => ({ ...c, minutes: total > 0 ? String(total) : "0" }));
  }, [form.checkIn, form.checkOut]);

  if (mode === "add") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الحضور > إضافة")}</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("إضافة سجل حضور")}</h1>
        </div>

        <SectionCard>
          <div className="mb-4 flex items-center gap-2 text-[#12375f] dark:text-[#eef4ff]"><FileSpreadsheet className="h-5 w-5" /><h2 className="text-lg font-semibold">{translateText("الحضور")}</h2></div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الموظف")} <span className="text-[#d14b4b]">*</span></span><select value={form.employee} onChange={(e) => setForm((c) => ({ ...c, employee: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option value="">-</option>{employeeOptions.map((employee) => <option key={employee} value={employee}>{employee}</option>)}</select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("التاريخ")} <span className="text-[#d14b4b]">*</span></span><input type="date" value={form.date} onChange={(e) => setForm((c) => ({ ...c, date: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("معرف المكتب")}</span><input value={form.officeId} onChange={(e) => setForm((c) => ({ ...c, officeId: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("دقائق العمل")}</span><input readOnly value={form.minutes} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#f1f6fd] px-4 text-sm text-[#627d9f] dark:border-[#2a3f5c] dark:bg-[#18273c] dark:text-[#9fb4cd]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("وقت الحضور")}</span><input type="time" value={form.checkIn} onChange={(e) => setForm((c) => ({ ...c, checkIn: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("وقت الانصراف")}</span><input type="time" value={form.checkOut} onChange={(e) => setForm((c) => ({ ...c, checkOut: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("طريقة تسجيل الدخول")}</span><select value={form.checkInMethod} onChange={(e) => setForm((c) => ({ ...c, checkInMethod: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option>GPS</option><option>Manual</option><option>Device</option></select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("طريقة تسجيل الخروج")}</span><select value={form.checkOutMethod} onChange={(e) => setForm((c) => ({ ...c, checkOutMethod: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option>GPS</option><option>Manual</option><option>Device</option></select></label>
            <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("ملاحظات")}</span><textarea rows={4} value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]" /></label>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button onClick={() => { const next: AttendanceRow = { id: String(Date.now()), date: form.date || "-", employee: form.employee || "-", checkIn: form.checkIn || "-", checkOut: form.checkOut || "-", minutes: form.minutes || "-", checkInMethod: form.checkInMethod, checkOutMethod: form.checkOutMethod, officeId: form.officeId || "-", notes: form.notes }; setRows((c) => [next, ...c]); setMode("list"); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
            <button onClick={() => { const next: AttendanceRow = { id: String(Date.now()), date: form.date || "-", employee: form.employee || "-", checkIn: form.checkIn || "-", checkOut: form.checkOut || "-", minutes: form.minutes || "-", checkInMethod: form.checkInMethod, checkOutMethod: form.checkOutMethod, officeId: form.officeId || "-", notes: form.notes }; setRows((c) => [next, ...c]); setForm(defaultForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إضافة وبدء إضافة المزيد")}</button>
            <button onClick={() => setMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
          </div>
        </SectionCard>
      </section>
    );
  }

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الحضور > القائمة")}</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الحضور")}</h1>
      </div>

      <SectionCard>
        <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <button onClick={() => setMode("add")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white"><Plus className="h-4 w-4" />{translateText("تسجيل الحضور لموظف")}</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b94141] px-4 py-2.5 text-sm font-medium text-white"><Upload className="h-4 w-4" />{translateText("استيراد إكسل")}</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f8c4f] px-4 py-2.5 text-sm font-medium text-white"><Download className="h-4 w-4" />{translateText("تحميل السجلات")}</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d8aa5a] px-4 py-2.5 text-sm font-medium text-[#223248]"><FileSpreadsheet className="h-4 w-4" />{translateText("تحميل نموذج")}</button>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[240px] flex-1">
            <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث")} className={clsx("h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
          </div>

          <div className="relative" ref={columnsRef}>
            <button onClick={() => { setFiltersOpen(false); setColumnsOpen((v) => !v); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"><Settings2 className="h-4 w-4" />{translateText("الأعمدة")}</button>
            {columnsOpen ? (
              <div className={clsx("absolute z-[60] mt-2 w-72 rounded-2xl border border-[#d9e4f4] bg-white p-3 shadow-[0_20px_45px_rgba(14,39,68,0.18)] dark:border-[#2a3f5c] dark:bg-[#0f1b2d]", dir === "rtl" ? "right-0" : "left-0")}>
                <div className="mb-2 flex items-center justify-between"><h4 className="text-sm font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("الأعمدة")}</h4><button onClick={resetColumns} className="text-xs text-[#2a67b5]">{translateText("إعادة ضبط التصفيات")}</button></div>
                <div className="space-y-2">
                  {COLUMN_CONFIG.map((column) => (
                    <label key={column.key} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f3f8ff] dark:hover:bg-[#162640]">
                      <input
                        type="checkbox"
                        checked={visibleColumns[column.key]}
                        onChange={(e) => {
                          const next = { ...visibleColumns, [column.key]: e.target.checked };
                          if (Object.values(next).every((v) => !v)) return;
                          setVisibleColumns(next);
                        }}
                        className="h-4 w-4 accent-[#123f6f]"
                      />
                      <span className="text-sm text-[#274a71] dark:text-[#cfe1f5]">{translateText(column.label)}</span>
                    </label>
                  ))}
                </div>
                <button onClick={applyColumns} className="mt-3 w-full rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">{translateText("تطبيق الأعمدة")}</button>
              </div>
            ) : null}
          </div>

          <div className="relative" ref={filtersRef}>
            <button onClick={() => { setColumnsOpen(false); setFiltersOpen((v) => !v); }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"><Filter className="h-4 w-4" />{translateText("التصفيات")}{filterCount > 0 ? <span className="rounded-full bg-[#d8aa5a] px-2 py-0.5 text-xs text-[#223248]">{filterCount}</span> : null}</button>
            {filtersOpen ? (
              <div className={clsx("absolute z-[60] mt-2 w-80 rounded-2xl border border-[#d9e4f4] bg-white p-3 shadow-[0_20px_45px_rgba(14,39,68,0.18)] dark:border-[#2a3f5c] dark:bg-[#0f1b2d]", dir === "rtl" ? "right-0" : "left-0")}>
                <div className="mb-2 flex items-center justify-between"><h4 className="text-sm font-semibold text-[#12375f] dark:text-[#eef4ff]">{translateText("التصفيات")}</h4><button onClick={resetFilters} className="text-xs text-[#2a67b5]">{translateText("إعادة ضبط التصفيات")}</button></div>
                <div className="grid gap-3">
                  <label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">{translateText("الفترة")}</span><select value={filtersDraft.period} onChange={(e) => setFiltersDraft((c) => ({ ...c, period: e.target.value as PeriodFilter }))} className="h-10 w-full rounded-lg border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option value="today">{translateText("اليوم")}</option><option value="yesterday">{translateText("أمس")}</option><option value="week">{translateText("هذا الأسبوع")}</option><option value="month">{translateText("هذا الشهر")}</option><option value="custom">{translateText("مخصص")}</option></select></label>
                  <label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">{translateText("الموظف")}</span><select value={filtersDraft.employee} onChange={(e) => setFiltersDraft((c) => ({ ...c, employee: e.target.value }))} className="h-10 w-full rounded-lg border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm dark:border-[#2a3f5c] dark:bg-[#122136] dark:text-[#d5e3f4]"><option value="all">{translateText("الكل")}</option>{employeeOptions.map((employee) => <option key={employee} value={employee}>{employee}</option>)}</select></label>
                  {filtersDraft.period === "custom" ? <div className="grid gap-2 sm:grid-cols-2"><label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">{translateText("من تاريخ")}</span><input type="date" value={filtersDraft.fromDate} onChange={(e) => setFiltersDraft((c) => ({ ...c, fromDate: e.target.value }))} className="h-10 w-full rounded-lg border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm" /></label><label className="block"><span className="mb-1 block text-xs text-[#6d84a1]">{translateText("إلى تاريخ")}</span><input type="date" value={filtersDraft.toDate} onChange={(e) => setFiltersDraft((c) => ({ ...c, toDate: e.target.value }))} className="h-10 w-full rounded-lg border border-[#d9e4f4] bg-[#fbfdff] px-3 text-sm" /></label></div> : null}
                </div>
                <button onClick={applyFilters} className="mt-3 w-full rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">{translateText("تطبيق التصفيات")}</button>
              </div>
            ) : null}
          </div>
        </div>

        {activeFilterChips.length > 0 ? (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {activeFilterChips.map((chip) => (
              <span key={`${chip.key}-${chip.label}`} className="inline-flex items-center gap-1 rounded-full border border-[#d9e4f4] bg-[#f7fbff] px-3 py-1 text-xs text-[#43658b] dark:border-[#2a3f5c] dark:bg-[#132238] dark:text-[#a7bdd7]">
                {chip.label}
                <button onClick={() => removeFilterChip(chip.key)} className="rounded-full p-0.5 hover:bg-[#e9f2ff]"><X className="h-3 w-3" /></button>
              </span>
            ))}
            <button onClick={resetFilters} className="text-xs text-[#2a67b5]">{translateText("إعادة ضبط التصفيات")}</button>
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
          <table dir={dir} className="min-w-[980px] w-full text-sm">
            <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]">
              <tr>
                {COLUMN_CONFIG.filter((column) => visibleColumnKeys.includes(column.key)).map((column) => <th key={column.key} className="px-4 py-3">{translateText(column.label)}</th>)}
                <th className="px-4 py-3">actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                  {visibleColumns.date ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.date}</td> : null}
                  {visibleColumns.employee ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.employee}</td> : null}
                  {visibleColumns.checkIn ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.checkIn}</td> : null}
                  {visibleColumns.checkOut ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.checkOut}</td> : null}
                  {visibleColumns.minutes ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.minutes}</td> : null}
                  {visibleColumns.checkInMethod ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.checkInMethod}</td> : null}
                  {visibleColumns.checkOutMethod ? <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{row.checkOutMethod}</td> : null}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <button className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="inline h-3.5 w-3.5" /> عرض</button>
                      <button className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]" onClick={() => setRows((c) => c.filter((i) => i.id !== row.id))}><Trash2 className="inline h-3.5 w-3.5" /> حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRows.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center dark:border-[#29405d] dark:bg-[#132238]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ecf3fc] text-[#7a93b2] dark:bg-[#1b2d44] dark:text-[#9ab2cf]"><FileSpreadsheet className="h-5 w-5" /></div>
            <p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{translateText("لا توجد سجلات حضور")}</p>
            <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("قم بإضافة سجل حضور للبدء.")}</p>
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>{translateText("إجمالي النتائج")}: {filteredRows.length}</span><span>{translateText("الصفحة")} 1 {translateText("من")} 1</span></div>
      </SectionCard>
    </section>
  );
}
