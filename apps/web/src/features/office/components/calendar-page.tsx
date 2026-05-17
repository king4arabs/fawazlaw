"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { CalendarEvent, OfficePageData } from "@/features/office/types";

type CalendarView = "day" | "month" | "year";

type DayCellValue = {
  date: Date;
  inMonth: boolean;
  events: CalendarEvent[];
};

const AR_WEEK_DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const EN_WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const EVENT_TYPE_COLORS: Record<string, string> = {
  جلسة: "bg-[#2b5ea8]",
  موعد: "bg-[#1f7a56]",
  مهمة: "bg-[#c57b1f]",
  إجازة: "bg-[#9a3d9f]",
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addByView(date: Date, view: CalendarView, amount: number) {
  const next = new Date(date);
  if (view === "month") next.setMonth(next.getMonth() + amount);
  if (view === "day") next.setDate(next.getDate() + amount);
  if (view === "year") next.setFullYear(next.getFullYear() + amount);
  return next;
}

function formatDateTitle(date: Date, locale: "ar" | "en", view: CalendarView) {
  if (view === "year") {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
      year: "numeric",
    }).format(date);
  }

  if (view === "day") {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function parseInitialMonth(monthText?: string) {
  const today = new Date();
  if (!monthText) return today;

  const yearMatch = monthText.match(/\d{4}/);
  const year = yearMatch ? Number(yearMatch[0]) : today.getFullYear();
  const monthIndex = AR_MONTHS.findIndex((name) => monthText.includes(name));
  if (monthIndex < 0) return today;

  return new Date(year, monthIndex, 1);
}

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClose: () => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active, onClose, ref]);
}

function CalendarToolbar({
  title,
  currentView,
  onPrev,
  onNext,
  onToday,
  onViewChange,
}: Readonly<{
  title: string;
  currentView: CalendarView;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
}>) {
  const { isArabic } = useOfficePreferences();
  const previousLabel = isArabic ? "السابق" : "Previous";
  const nextLabel = isArabic ? "التالي" : "Next";

  return (
    <div className="rounded-[1.5rem] border border-[#d8e3f2] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToday}
            className="rounded-full border border-[#cfddee] px-4 py-2 text-sm text-[#274c74] hover:bg-[#f4f8fd] dark:border-[#29405d] dark:text-[#b7cbe7] dark:hover:bg-[#16263d]"
          >
            {isArabic ? "اليوم" : "Today"}
          </button>
          <div className="flex items-center gap-2 rounded-full border border-[#d6e2f1] p-1 dark:border-[#29405d]">
            <button
              type="button"
              onClick={onPrev}
              aria-label={previousLabel}
              className="rounded-full p-2 text-[#355b84] hover:bg-[#edf3fb] dark:text-[#a9c0dd] dark:hover:bg-[#1a2b42]"
            >
              {isArabic ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label={nextLabel}
              className="rounded-full p-2 text-[#355b84] hover:bg-[#edf3fb] dark:text-[#a9c0dd] dark:hover:bg-[#1a2b42]"
            >
              {isArabic ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[#16355e] dark:text-[#eef4ff] sm:text-2xl">{title}</h2>

        <div className="inline-flex rounded-full border border-[#d6e2f1] bg-[#f8fbff] p-1 dark:border-[#29405d] dark:bg-[#132238]">
          {(["day", "month", "year"] as CalendarView[]).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => onViewChange(view)}
              className={clsx(
                "rounded-full px-3 py-1.5 text-sm",
                currentView === view
                  ? "bg-[#123f6f] text-white dark:bg-[#275a92]"
                  : "text-[#58779e] hover:bg-[#edf3fb] dark:text-[#9ab1ce] dark:hover:bg-[#1a2b43]",
              )}
            >
              {view === "day" ? (isArabic ? "يوم" : "Day") : null}
              {view === "month" ? (isArabic ? "شهر" : "Month") : null}
              {view === "year" ? (isArabic ? "سنة" : "Year") : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventList({
  events,
  maxVisible,
  onMoreClick,
}: Readonly<{
  events: CalendarEvent[];
  maxVisible: number;
  onMoreClick: () => void;
}>) {
  const { isArabic } = useOfficePreferences();
  const visible = events.slice(0, maxVisible);
  const hidden = Math.max(events.length - maxVisible, 0);

  return (
    <div className="mt-1 space-y-1">
      {visible.map((event, index) => (
        <button
          type="button"
          onClick={onMoreClick}
          key={`${event.title}-${index}`}
          className="flex w-full items-center gap-1.5 rounded-md px-1 py-0.5 text-xs text-[#30567f] hover:bg-[#eef4fc] dark:text-[#b7cce8] dark:hover:bg-[#172741]"
        >
          <span
            className={clsx(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              EVENT_TYPE_COLORS[event.type] ?? "bg-[#2b5ea8]",
            )}
          />
          <span className="truncate text-start">{event.title}</span>
        </button>
      ))}
      {hidden > 0 ? (
        <button
          type="button"
          onClick={onMoreClick}
          className="w-full px-1 text-start text-xs font-medium text-[#55779e] hover:text-[#254e79] dark:text-[#9cb5d1] dark:hover:text-[#c3d9f2]"
        >
          +{hidden} {isArabic ? "المزيد" : "more"}
        </button>
      ) : null}
    </div>
  );
}

function DayCell({
  cell,
  isToday,
  isSelected,
  onSelect,
  onOpenMore,
}: Readonly<{
  cell: DayCellValue;
  isToday: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onOpenMore: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "h-[132px] rounded-xl border p-2 text-right align-top transition",
        cell.inMonth
          ? "border-[#dfe8f4] bg-white hover:bg-[#f9fbff] dark:border-[#253b57] dark:bg-[#122136] dark:hover:bg-[#142640]"
          : "border-[#e8eff8] bg-[#f7faff] text-[#95a8c0] dark:border-[#1f324c] dark:bg-[#0f1c2e] dark:text-[#6f87a9]",
        isSelected ? "ring-2 ring-[#2d5f97]" : "",
      )}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className={clsx(
            "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm",
            isToday
              ? "bg-[#123f6f] text-white"
              : "text-[#1d3f67] dark:text-[#dce8f8]",
          )}
        >
          {cell.date.getDate()}
        </span>
      </div>
      <EventList events={cell.events} maxVisible={3} onMoreClick={onOpenMore} />
    </button>
  );
}

function MonthView({
  currentDate,
  selectedDate,
  eventsByDay,
  onSelectDate,
  onOpenDayEvents,
}: Readonly<{
  currentDate: Date;
  selectedDate: Date;
  eventsByDay: Map<number, CalendarEvent[]>;
  onSelectDate: (date: Date) => void;
  onOpenDayEvents: (date: Date) => void;
}>) {
  const { isArabic } = useOfficePreferences();
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDay = monthStart.getDay();
  const startDate = new Date(monthStart);
  startDate.setDate(monthStart.getDate() - startDay);

  const cells = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const inMonth = date.getMonth() === currentDate.getMonth();
    const events = inMonth ? (eventsByDay.get(date.getDate()) ?? []) : [];
    return { date, inMonth, events };
  });

  const weekDays = isArabic ? AR_WEEK_DAYS : EN_WEEK_DAYS;

  return (
    <div className="rounded-[1.5rem] border border-[#d8e3f2] bg-white p-3 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <div className="mb-2 grid grid-cols-7 gap-2 px-1">
        {weekDays.map((day) => (
          <div key={day} className="py-1 text-center text-xs font-semibold text-[#6e85a3] dark:text-[#92a8c5]">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell) => (
          <DayCell
            key={cell.date.toISOString()}
            cell={cell}
            isToday={isSameDay(cell.date, new Date())}
            isSelected={isSameDay(cell.date, selectedDate)}
            onSelect={() => onSelectDate(cell.date)}
            onOpenMore={() => onOpenDayEvents(cell.date)}
          />
        ))}
      </div>
    </div>
  );
}

function DayView({
  date,
  events,
  onEdit,
  onDelete,
}: Readonly<{
  date: Date;
  events: CalendarEvent[];
  onEdit: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
}>) {
  const { isArabic, locale } = useOfficePreferences();
  const dateText = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <section className="rounded-[1.5rem] border border-[#d8e3f2] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <h3 className="text-lg font-semibold text-[#16355e] dark:text-[#eef4ff]">{dateText}</h3>
      <div className="mt-4 space-y-2">
        {events.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] p-4 text-sm text-[#7089a8] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#97aecb]">
            {isArabic ? "لا توجد تذكيرات في هذا اليوم." : "No reminders for this day."}
          </p>
        ) : (
          events.map((event, index) => (
            <article
              key={`${event.title}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#e0e8f4] bg-[#fbfdff] p-3 dark:border-[#253b57] dark:bg-[#122136]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#21486f] dark:text-[#d9e8fb]">{event.title}</p>
                <p className="mt-0.5 text-xs text-[#6c84a3] dark:text-[#95acc9]">{event.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(event)}
                  className="rounded-lg px-2 py-1 text-xs text-[#486d95] hover:bg-[#eff5fc] dark:text-[#a6beda] dark:hover:bg-[#182a43]"
                >
                  {isArabic ? "تعديل" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(event)}
                  className="rounded-lg px-2 py-1 text-xs text-[#b64b4b] hover:bg-[#fff1f1] dark:text-[#f1b0b0] dark:hover:bg-[#3a2424]"
                >
                  {isArabic ? "حذف" : "Delete"}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function MiniMonth({
  date,
  onClick,
}: Readonly<{
  date: Date;
  onClick: () => void;
}>) {
  const { locale } = useOfficePreferences();
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = monthStart.getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: firstDay + daysInMonth }, (_, idx) => (idx < firstDay ? null : idx - firstDay + 1));
  const monthLabel = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { month: "long" }).format(date);

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-[#dce6f3] bg-white p-3 text-right hover:bg-[#f8fbff] dark:border-[#253b57] dark:bg-[#122136] dark:hover:bg-[#142640]"
    >
      <p className="mb-2 text-sm font-semibold text-[#20466d] dark:text-[#dce8f8]">{monthLabel}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#6f86a5] dark:text-[#94abca]">
        {days.map((value, index) => (
          <span key={index} className="rounded py-0.5">
            {value ?? ""}
          </span>
        ))}
      </div>
    </button>
  );
}

function YearView({
  currentDate,
  onSelectMonth,
}: Readonly<{
  currentDate: Date;
  onSelectMonth: (month: number) => void;
}>) {
  const months = Array.from({ length: 12 }, (_, index) => new Date(currentDate.getFullYear(), index, 1));

  return (
    <section className="rounded-[1.5rem] border border-[#d8e3f2] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {months.map((monthDate) => (
          <MiniMonth
            key={monthDate.toISOString()}
            date={monthDate}
            onClick={() => onSelectMonth(monthDate.getMonth())}
          />
        ))}
      </div>
    </section>
  );
}

function DayEventsModal({
  open,
  date,
  events,
  onClose,
}: Readonly<{
  open: boolean;
  date: Date | null;
  events: CalendarEvent[];
  onClose: () => void;
}>) {
  const { locale, isArabic } = useOfficePreferences();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose, open);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open || !date) return null;
  const dateLabel = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#081b34]/50 p-3 sm:items-center">
      <div
        ref={ref}
        className="w-full max-w-lg rounded-2xl border border-[#d8e3f2] bg-white p-4 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-base font-semibold text-[#153b65] dark:text-[#e5f0ff]">{dateLabel}</h4>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-[#f2f7fd] dark:hover:bg-[#1a2b42]">
            <X className="h-4 w-4 text-[#6c85a4] dark:text-[#a3bbd7]" />
          </button>
        </div>
        <div className="max-h-80 space-y-2 overflow-y-auto">
          {events.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] p-3 text-sm text-[#7089a8] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#97aecb]">
              {isArabic ? "لا توجد تذكيرات في هذا اليوم." : "No reminders for this day."}
            </p>
          ) : (
            events.map((event, index) => (
              <div
                key={`${event.title}-${index}`}
                className="flex items-center gap-2 rounded-lg border border-[#e0e8f4] bg-[#fbfdff] px-3 py-2 dark:border-[#253b57] dark:bg-[#122136]"
              >
                <span className={clsx("h-2 w-2 shrink-0 rounded-full", EVENT_TYPE_COLORS[event.type] ?? "bg-[#2b5ea8]")} />
                <p className="truncate text-sm text-[#224a72] dark:text-[#d9e8fb]">{event.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function CalendarPage({ page }: Readonly<{ page: OfficePageData }>) {
  const { locale } = useOfficePreferences();
  const initialDate = useMemo(() => parseInitialMonth(page.calendar?.month), [page.calendar?.month]);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [currentView, setCurrentView] = useState<CalendarView>("month");
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [modalDate, setModalDate] = useState<Date | null>(null);

  const sourceMonth = initialDate.getMonth();
  const sourceYear = initialDate.getFullYear();
  const eventsByDay = useMemo(() => {
    if (
      currentDate.getMonth() !== sourceMonth ||
      currentDate.getFullYear() !== sourceYear
    ) {
      return new Map<number, CalendarEvent[]>();
    }

    const map = new Map<number, CalendarEvent[]>();
    for (const event of page.calendar?.events ?? []) {
      const current = map.get(event.day) ?? [];
      current.push(event);
      map.set(event.day, current);
    }
    return map;
  }, [currentDate, page.calendar?.events, sourceMonth, sourceYear]);

  const selectedDayEvents = eventsByDay.get(selectedDate.getDate()) ?? [];
  const modalEvents = modalDate ? eventsByDay.get(modalDate.getDate()) ?? [] : [];

  return (
    <section className="space-y-4">
      <CalendarToolbar
        title={formatDateTitle(currentDate, locale, currentView)}
        currentView={currentView}
        onPrev={() => setCurrentDate((date) => addByView(date, currentView, -1))}
        onNext={() => setCurrentDate((date) => addByView(date, currentView, 1))}
        onToday={() => {
          const now = new Date();
          setCurrentDate(now);
          setSelectedDate(now);
        }}
        onViewChange={setCurrentView}
      />

      {currentView === "month" ? (
        <MonthView
          currentDate={currentDate}
          selectedDate={selectedDate}
          eventsByDay={eventsByDay}
          onSelectDate={(date) => setSelectedDate(date)}
          onOpenDayEvents={(date) => {
            setSelectedDate(date);
            setModalDate(date);
          }}
        />
      ) : null}

      {currentView === "day" ? (
        <DayView
          date={selectedDate}
          events={selectedDayEvents}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ) : null}

      {currentView === "year" ? (
        <YearView
          currentDate={currentDate}
          onSelectMonth={(month) => {
            const next = new Date(currentDate.getFullYear(), month, 1);
            setCurrentDate(next);
            setSelectedDate(next);
            setCurrentView("month");
          }}
        />
      ) : null}

      <DayEventsModal
        open={modalDate !== null}
        date={modalDate}
        events={modalEvents}
        onClose={() => setModalDate(null)}
      />
    </section>
  );
}
