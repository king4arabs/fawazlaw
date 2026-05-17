"use client";

import clsx from "clsx";
import { Eye, Pencil, Plus, Search, Upload, UserPlus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type TicketStatus = "مفتوحة" | "مغلقة" | "بانتظار ردك" | "قيد المعالجة";
type TicketPriority = "منخفضة" | "عادية" | "عالية" | "عاجلة";

type Ticket = {
  id: number;
  subject: string;
  client: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
  lastActivity: string;
  createdAt: string;
  category: string;
  channel: string;
  description: string;
  clientEmail: string;
  clientPhone: string;
  clientType: string;
  clientState: string;
  subscribed: boolean;
};

type CommentRecord = {
  id: number;
  author: string;
  timestamp: string;
  message: string;
  attachment?: string;
  internal?: boolean;
};

type FilterTab = "all" | "mine" | "unassigned" | "open" | "closed";
type ShowTab = "tickets" | "consultations" | "services" | "invoices" | "ai";
type ViewMode = "list" | "show" | "add";

function toneStatus(status: string) {
  if (status.includes("مفتوحة") || status.includes("معالجة")) return "bg-[#e9f1ff] text-[#1e60ad] dark:bg-[#1a2e49] dark:text-[#9ec3ee]";
  if (status.includes("بانتظار")) return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
}

function tonePriority(priority: string) {
  if (priority.includes("عاجلة") || priority.includes("عالية")) return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  if (priority.includes("منخفضة")) return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
}

function SectionCard({ title, children, action }: Readonly<{ title: string; children: React.ReactNode; action?: React.ReactNode }>) {
  return (
    <section className="rounded-[1.5rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#12375f] dark:text-[#eef4ff]">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function AppModal({ open, title, onClose, children, footer }: Readonly<{ open: boolean; title: string; onClose: () => void; children: React.ReactNode; footer: React.ReactNode }>) {
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
      <div ref={ref} className="w-full max-w-2xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]"><X className="h-5 w-5" /></button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto">{children}</div>
        <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
}

export function SupportTicketsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, translateText } = useOfficePreferences();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [showTab, setShowTab] = useState<ShowTab>("tickets");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [assignTo, setAssignTo] = useState("أ. خالد");
  const [priorityValue, setPriorityValue] = useState<TicketPriority>("عادية");
  const [reply, setReply] = useState("");
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);
  const [newTicket, setNewTicket] = useState({
    client: "",
    subject: "",
    description: "",
    attachment: null as File | null,
    category: "عام",
    priority: "عادية" as TicketPriority,
    channel: "البوابة",
    status: "مفتوحة" as TicketStatus,
    assignee: "",
  });

  const [commentsByTicket, setCommentsByTicket] = useState<Record<number, CommentRecord[]>>({
    15: [
      { id: 1, author: "layla abdullah", timestamp: "10:14 AM", message: "أحتاج تفاصيل الرسوم المتوقعة للقضية." },
      { id: 2, author: "أ. فواز", timestamp: "10:19 AM", message: "تمت مراجعة الطلب وسيتم تزويدك بالتكلفة خلال اليوم.", internal: true },
    ],
  });

  const [tickets, setTickets] = useState<Ticket[]>(() =>
    (page.rows ?? []).map((row, index) => ({
      id: Number(row.id ?? index + 1),
      subject: row.title ?? "-",
      client: row.customer ?? "-",
      status: ((row.status ?? "مفتوحة") as TicketStatus),
      priority: ((row.priority === "متوسطة" ? "عادية" : row.priority) as TicketPriority) ?? "عادية",
      assignee: row.assignee ?? "غير مسندة",
      lastActivity: "منذ ساعة",
      createdAt: "2026-05-01",
      category: "عام",
      channel: "البوابة",
      description: "تفاصيل التذكرة كما وردت من العميل.",
      clientEmail: "client@example.com",
      clientPhone: "0500000000",
      clientType: "فرد",
      clientState: "نشط",
      subscribed: true,
    })),
  );

  const selected = useMemo(() => tickets.find((t) => t.id === selectedId) ?? null, [tickets, selectedId]);
  const comments = useMemo(() => (selected ? commentsByTicket[selected.id] ?? [] : []), [selected, commentsByTicket]);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status !== "مغلقة").length;
    const closed = tickets.filter((t) => t.status === "مغلقة").length;
    return { total, open, closed };
  }, [tickets]);

  const filtered = useMemo(() => {
    const tabFiltered = tickets.filter((t) => {
      if (filterTab === "mine") return t.assignee !== "غير مسندة";
      if (filterTab === "unassigned") return t.assignee === "غير مسندة";
      if (filterTab === "open") return t.status !== "مغلقة";
      if (filterTab === "closed") return t.status === "مغلقة";
      return true;
    });
    if (!query.trim()) return tabFiltered;
    const q = query.toLowerCase();
    return tabFiltered.filter((t) => `${t.id} ${t.subject} ${t.client} ${t.status} ${t.assignee}`.toLowerCase().includes(q));
  }, [tickets, query, filterTab]);

  const submitReply = () => {
    if (!selected || !reply.trim()) return;
    setCommentsByTicket((current) => ({
      ...current,
      [selected.id]: [
        ...(current[selected.id] ?? []),
        { id: Date.now(), author: "أ. فواز", timestamp: new Date().toLocaleString(isArabic ? "ar" : "en"), message: reply, attachment: replyAttachment?.name, internal: true },
      ],
    }));
    setReply("");
    setReplyAttachment(null);
  };

  if (viewMode === "list") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("التذاكر / القائمة")}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("التذاكر")}</h1>
            <button type="button" onClick={() => setViewMode("add")} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0d3258]"><Plus className="h-4 w-4" />{translateText("إنشاء تذكرة")}</button>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d] sm:grid-cols-3">
          <div className="rounded-xl bg-[#f4f9ff] p-3 text-center dark:bg-[#122136]"><p className="text-xs text-[#7d95b2]">{translateText("إجمالي التذاكر")}</p><p className="mt-1 text-2xl font-semibold text-[#154372] dark:text-[#e5f0ff]">{stats.total}</p></div>
          <div className="rounded-xl bg-[#f4f9ff] p-3 text-center dark:bg-[#122136]"><p className="text-xs text-[#7d95b2]">{translateText("التذاكر المفتوحة")}</p><p className="mt-1 text-2xl font-semibold text-[#154372] dark:text-[#e5f0ff]">{stats.open}</p></div>
          <div className="rounded-xl bg-[#f4f9ff] p-3 text-center dark:bg-[#122136]"><p className="text-xs text-[#7d95b2]">{translateText("التذاكر المغلقة")}</p><p className="mt-1 text-2xl font-semibold text-[#154372] dark:text-[#e5f0ff]">{stats.closed}</p></div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="inline-flex min-w-max gap-2">
            {[
              ["all", "كل التذاكر"],
              ["mine", "تذاكري"],
              ["unassigned", "غير مسندة"],
              ["open", "مفتوحة"],
              ["closed", "مغلقة"],
            ].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setFilterTab(key as FilterTab)} className={clsx("rounded-xl px-4 py-2 text-sm", filterTab === key ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{translateText(label)} <span className="ms-1 rounded-full bg-[#d8aa5a] px-2 py-0.5 text-[10px] text-[#223248]">{key === "all" ? stats.total : key === "open" ? stats.open : key === "closed" ? stats.closed : filtered.length}</span></button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <div className="mb-4 max-w-md">
            <div className="relative">
              <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#e1e9f5]">
            <table dir={dir} className="min-w-[1200px] w-full text-sm">
              <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]"><tr><th className="px-4 py-3">{translateText("المعرف")}</th><th className="px-4 py-3">{translateText("الموضوع")}</th><th className="px-4 py-3">{translateText("العميل")}</th><th className="px-4 py-3">{translateText("الحالة")}</th><th className="px-4 py-3">{translateText("الأولوية")}</th><th className="px-4 py-3">{translateText("المسند إليه")}</th><th className="px-4 py-3">{translateText("آخر نشاط")}</th><th className="px-4 py-3">{translateText("تاريخ الإنشاء")}</th><th className="px-4 py-3">{translateText("الإجراءات")}</th></tr></thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-4 py-3">#{row.id}</td><td className="px-4 py-3">{row.subject}</td><td className="px-4 py-3">{row.client}</td><td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", toneStatus(row.status))}>{row.status}</span></td><td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", tonePriority(row.priority))}>{row.priority}</span></td><td className="px-4 py-3">{row.assignee}</td><td className="px-4 py-3">{row.lastActivity}</td><td className="px-4 py-3">{row.createdAt}</td><td className="px-4 py-3"><button type="button" onClick={() => { setSelectedId(row.id); setViewMode("show"); }} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("عرض")}</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]"><span>{translateText("إجمالي النتائج")}: {filtered.length}</span><span>{translateText("الصفحة")} 1 {translateText("من")} 1</span></div>
        </div>
      </section>
    );
  }

  if (viewMode === "add") {
    return (
      <section dir={dir} className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("التذاكر / إضافة")}</p><h1 className="mt-2 text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("إضافة تذكرة")}</h1></div>
        <div className="grid gap-4 xl:grid-cols-2">
          <SectionCard title={translateText("معلومات التذكرة")}>
            <div className="grid gap-4 md:grid-cols-2"><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("العميل")} <span className="text-[#d14b4b]">*</span></span><select value={newTicket.client} onChange={(e) => setNewTicket((c) => ({ ...c, client: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option value="">{translateText("اختر")}</option><option>Fatmahf</option><option>layla abdullah</option></select></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الموضوع")} <span className="text-[#d14b4b]">*</span></span><input value={newTicket.subject} onChange={(e) => setNewTicket((c) => ({ ...c, subject: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الوصف")}</span><textarea rows={6} value={newTicket.description} onChange={(e) => setNewTicket((c) => ({ ...c, description: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("مرفق")}</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><Upload className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setNewTicket((c) => ({ ...c, attachment: e.target.files?.[0] ?? null }))} /></div></label></div>
          </SectionCard>
          <SectionCard title={translateText("التصنيف والتوجيه")}>
            <div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الفئة")}</span><select value={newTicket.category} onChange={(e) => setNewTicket((c) => ({ ...c, category: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>عام</option><option>دفع</option><option>تقني</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الأولوية")}</span><select value={newTicket.priority} onChange={(e) => setNewTicket((c) => ({ ...c, priority: e.target.value as TicketPriority }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>منخفضة</option><option>عادية</option><option>عالية</option><option>عاجلة</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("القناة")}</span><select value={newTicket.channel} onChange={(e) => setNewTicket((c) => ({ ...c, channel: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>البوابة</option><option>واتساب</option><option>هاتف</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الحالة")}</span><select value={newTicket.status} onChange={(e) => setNewTicket((c) => ({ ...c, status: e.target.value as TicketStatus }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>مفتوحة</option><option>بانتظار ردك</option><option>قيد المعالجة</option><option>مغلقة</option></select></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("المسند إليه")}</span><select value={newTicket.assignee} onChange={(e) => setNewTicket((c) => ({ ...c, assignee: e.target.value }))} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option value="">غير مسندة</option><option>أ. خالد</option><option>أ. فواز</option></select></label></div>
          </SectionCard>
        </div>
        <div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={() => { setTickets((current) => [{ id: Date.now(), subject: newTicket.subject || "-", client: newTicket.client || "-", status: newTicket.status, priority: newTicket.priority, assignee: newTicket.assignee || "غير مسندة", lastActivity: "الآن", createdAt: new Date().toLocaleDateString(), category: newTicket.category, channel: newTicket.channel, description: newTicket.description, clientEmail: "-", clientPhone: "-", clientType: "فرد", clientState: "نشط", subscribed: false }, ...current]); setViewMode("list"); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { setTickets((current) => [{ id: Date.now(), subject: newTicket.subject || "-", client: newTicket.client || "-", status: newTicket.status, priority: newTicket.priority, assignee: newTicket.assignee || "غير مسندة", lastActivity: "الآن", createdAt: new Date().toLocaleDateString(), category: newTicket.category, channel: newTicket.channel, description: newTicket.description, clientEmail: "-", clientPhone: "-", clientType: "فرد", clientState: "نشط", subscribed: false }, ...current]); setNewTicket({ client: "", subject: "", description: "", attachment: null, category: "عام", priority: "عادية", channel: "البوابة", status: "مفتوحة", assignee: "" }); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button><button type="button" onClick={() => setViewMode("list")} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></div>
      </section>
    );
  }

  if (!selected) return null;

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("التذاكر / عرض")}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("عرض تذكرة")}</h1><div className="flex flex-wrap gap-2"><button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white"><Pencil className="h-4 w-4" />{translateText("تعديل")}</button><button type="button" onClick={() => setTickets((current) => current.map((t) => t.id === selected.id ? { ...t, status: "مغلقة" } : t))} className="rounded-xl bg-[#b94141] px-4 py-2 text-sm text-white">{translateText("إغلاق تذكرة")}</button></div></div></div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4">
          <SectionCard title={translateText("بيانات العميل")}>
            <div className="grid gap-3 md:grid-cols-2"><div><p className="text-xs text-[#7891b0]">الاسم</p><p className="mt-1 text-sm">{selected.client || "-"}</p></div><div><p className="text-xs text-[#7891b0]">البريد الإلكتروني</p><p className="mt-1 text-sm">{selected.clientEmail || "-"}</p></div><div><p className="text-xs text-[#7891b0]">رقم الجوال</p><p className="mt-1 text-sm">{selected.clientPhone || "-"}</p></div><div><p className="text-xs text-[#7891b0]">النوع</p><span className="mt-1 inline-flex rounded-full bg-[#e9f1ff] px-2.5 py-1 text-xs text-[#1e60ad]">{selected.clientType || "-"}</span></div><div><p className="text-xs text-[#7891b0]">الحالة</p><span className="mt-1 inline-flex rounded-full bg-[#ebfff1] px-2.5 py-1 text-xs text-[#14954c]">{selected.clientState || "-"}</span></div><div><p className="text-xs text-[#7891b0]">مشترك</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", selected.subscribed ? "bg-[#ebfff1] text-[#14954c]" : "bg-[#fff0f0] text-[#c74747]")}>{selected.subscribed ? "نعم" : "لا"}</span></div></div>
          </SectionCard>

          <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]"><div className="inline-flex min-w-max gap-2">{[["tickets","التذاكر"],["consultations","الاستشارات"],["services","الطلبات/الخدمات"],["invoices","الفواتير"],["ai","محادثة الذكاء الاصطناعي"]].map(([k,l]) => <button key={k} type="button" onClick={() => setShowTab(k as ShowTab)} className={clsx("rounded-xl px-4 py-2 text-sm", showTab===k?"bg-[#e9f2ff] text-[#123d6a]":"text-[#5f7898] hover:bg-[#f5f9ff]")}>{translateText(l)}</button>)}</div></div>

          <SectionCard title={translateText("التعليقات")}>
            <div className="space-y-3">{comments.map((c) => <article key={c.id} className={clsx("rounded-xl border p-3", c.internal ? "border-[#d6e5f6] bg-[#f6faff] dark:border-[#29405d] dark:bg-[#132238]" : "border-[#e3ebf6] bg-white dark:border-[#223752] dark:bg-[#0f1b2d]")}><div className="mb-1 flex items-center justify-between gap-2"><p className="text-sm font-semibold text-[#1f4f7f] dark:text-[#e5f0ff]">{c.author}</p><p className="text-xs text-[#8ba1bd]">{c.timestamp}</p></div><p className="text-sm text-[#3c5f86] dark:text-[#cfe0f5]">{c.message}</p>{c.attachment ? <p className="mt-2 text-xs text-[#5d7ea5]">📎 {c.attachment}</p> : null}</article>)}</div>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title={translateText("تفاصيل التذكرة")} action={<div className="flex gap-2"><button type="button" onClick={() => setAssignOpen(true)} className="rounded-lg border border-[#d7e2f0] px-3 py-1.5 text-xs text-[#547094]"><UserPlus className="inline h-3.5 w-3.5" /> {translateText("إسناد")}</button><button type="button" onClick={() => setPriorityOpen(true)} className="rounded-lg border border-[#d7e2f0] px-3 py-1.5 text-xs text-[#547094]">{translateText("تعديل الأولوية")}</button></div>}>
            <div className="grid gap-3 md:grid-cols-2"><div><p className="text-xs text-[#7891b0]">الموضوع</p><p className="mt-1 text-sm">{selected.subject}</p></div><div><p className="text-xs text-[#7891b0]">الحالة</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", toneStatus(selected.status))}>{selected.status}</span></div><div><p className="text-xs text-[#7891b0]">الفئة</p><span className="mt-1 inline-flex rounded-full bg-[#edf6ff] px-2.5 py-1 text-xs text-[#3c6f9f]">{selected.category}</span></div><div><p className="text-xs text-[#7891b0]">الأولوية</p><span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", tonePriority(selected.priority))}>{selected.priority}</span></div><div><p className="text-xs text-[#7891b0]">القناة</p><span className="mt-1 inline-flex rounded-full bg-[#edf6ff] px-2.5 py-1 text-xs text-[#3c6f9f]">{selected.channel}</span></div><div><p className="text-xs text-[#7891b0]">المسند إليه</p><p className="mt-1 text-sm">{selected.assignee}</p></div><div><p className="text-xs text-[#7891b0]">آخر نشاط</p><p className="mt-1 text-sm">{selected.lastActivity}</p></div><div><p className="text-xs text-[#7891b0]">تاريخ الإنشاء</p><p className="mt-1 text-sm">{selected.createdAt}</p></div><div className="md:col-span-2"><p className="text-xs text-[#7891b0]">الوصف</p><p className="mt-1 whitespace-pre-wrap text-sm">{selected.description}</p></div></div>
          </SectionCard>

          <SectionCard title={translateText("إضافة تعليق")}>
            <div className="space-y-3"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الرسالة")}</span><textarea rows={5} value={reply} onChange={(e) => setReply(e.target.value)} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("مرفق")}</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><Upload className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setReplyAttachment(e.target.files?.[0] ?? null)} /></div></label><button type="button" onClick={submitReply} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إرسال")}</button></div>
          </SectionCard>
        </div>
      </div>

      <AppModal open={assignOpen} onClose={() => setAssignOpen(false)} title={translateText("إسناد")} footer={<><button type="button" onClick={() => { setTickets((current) => current.map((t) => t.id === selected.id ? { ...t, assignee: assignTo } : t)); setAssignOpen(false); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إرسال")}</button><button type="button" onClick={() => setAssignOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></>}>
        <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("المسند إليه")}</span><select value={assignTo} onChange={(e) => setAssignTo(e.target.value)} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>أ. خالد</option><option>أ. فواز</option><option>غير مسندة</option></select></label>
      </AppModal>

      <AppModal open={priorityOpen} onClose={() => setPriorityOpen(false)} title={translateText("تعديل الأولوية")} footer={<><button type="button" onClick={() => { setTickets((current) => current.map((t) => t.id === selected.id ? { ...t, priority: priorityValue } : t)); setPriorityOpen(false); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إرسال")}</button><button type="button" onClick={() => setPriorityOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></>}>
        <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الأولوية")}</span><select value={priorityValue} onChange={(e) => setPriorityValue(e.target.value as TicketPriority)} className="h-11 w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 text-sm"><option>منخفضة</option><option>عادية</option><option>عالية</option><option>عاجلة</option></select><span className={clsx("mt-2 inline-flex rounded-full px-2.5 py-1 text-xs", tonePriority(priorityValue))}>{priorityValue}</span></label>
      </AppModal>
    </section>
  );
}
