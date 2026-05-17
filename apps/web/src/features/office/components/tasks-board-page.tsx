"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Filter,
  Folder,
  MoreVertical,
  PauseCircle,
  Pencil,
  PlayCircle,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { BoardColumn, OfficePageData } from "@/features/office/types";

type TaskStatus = "لم تبدأ" | "جاري العمل" | "متوقفة" | "مكتملة";
type TaskPriority = "عاجل" | "عالي" | "متوسط" | "منخفض";

type TaskRecord = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  owner: string;
  related: string;
  status: TaskStatus;
};

type TaskFormValues = {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  related: string;
};

const STATUS_ORDER: TaskStatus[] = ["لم تبدأ", "جاري العمل", "متوقفة", "مكتملة"];

const STATUS_VARIANTS: Record<TaskStatus, string> = {
  "لم تبدأ":
    "bg-[#eef5ff] text-[#2b5a93] dark:bg-[#15283e] dark:text-[#a8c4e8]",
  "جاري العمل":
    "bg-[#e8f6ff] text-[#0e6aa8] dark:bg-[#133149] dark:text-[#9fd7ff]",
  متوقفة: "bg-[#fff0ed] text-[#b84629] dark:bg-[#3b2020] dark:text-[#f2b2a2]",
  مكتملة: "bg-[#eaf9ef] text-[#167548] dark:bg-[#173326] dark:text-[#9fddbc]",
};

const PRIORITY_VARIANTS: Record<TaskPriority, string> = {
  عاجل: "bg-[#ffe7e7] text-[#a12f2f] dark:bg-[#402024] dark:text-[#ffb4b4]",
  عالي: "bg-[#fff2de] text-[#b06a0d] dark:bg-[#3e2d18] dark:text-[#f2c58a]",
  متوسط: "bg-[#e8f2ff] text-[#2b5ea8] dark:bg-[#172a44] dark:text-[#9ec0ee]",
  منخفض: "bg-[#ecf9f0] text-[#197247] dark:bg-[#173227] dark:text-[#9cd6b5]",
};

function asStatus(value: string): TaskStatus {
  if (value.includes("جاري")) return "جاري العمل";
  if (value.includes("متوق")) return "متوقفة";
  if (value.includes("مكتمل")) return "مكتملة";
  return "لم تبدأ";
}

function asPriority(value: string): TaskPriority {
  if (value.includes("عاج")) return "عاجل";
  if (value.includes("عال") || value.includes("نشط") || value.includes("انتظار")) return "عالي";
  if (value.includes("منخفض")) return "منخفض";
  return "متوسط";
}

function normalizeBoard(board: BoardColumn[]): TaskRecord[] {
  return board.flatMap((column, colIndex) =>
    column.tasks.map((task, taskIndex) => ({
      id: `${colIndex}-${taskIndex}-${task.title}`,
      title: task.title,
      description: task.meta,
      priority: asPriority(task.priority),
      dueDate: task.meta.includes("موعد") ? task.meta : "",
      assignee: task.assignee,
      owner: "أ. فواز",
      related: task.meta,
      status: asStatus(column.title),
    })),
  );
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

function TaskPriorityBadge({ priority }: Readonly<{ priority: TaskPriority }>) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${PRIORITY_VARIANTS[priority]}`}>
      {priority}
    </span>
  );
}

function TaskStatusBadge({ status }: Readonly<{ status: TaskStatus }>) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_VARIANTS[status]}`}>
      {status}
    </span>
  );
}

function TaskActionsMenu({
  onEdit,
  onDelete,
  onMove,
}: Readonly<{
  onEdit: () => void;
  onDelete: () => void;
  onMove: (next: TaskStatus) => void;
}>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg p-1.5 text-[#6f85a3] transition hover:bg-[#f0f5fb] hover:text-[#163f6d] dark:text-[#94a8c4] dark:hover:bg-[#1a2a42]"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open ? (
        <div className="absolute z-40 mt-2 w-48 rounded-xl border border-[#d7e1ef] bg-white p-1.5 shadow-[0_14px_30px_rgba(18,47,81,0.18)] dark:border-[#2a3c57] dark:bg-[#111f33]">
          <button type="button" onClick={() => { setOpen(false); onEdit(); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#193f6b] hover:bg-[#f4f8fc] dark:text-[#dce8f8] dark:hover:bg-[#1a2b43]"><Pencil className="h-4 w-4" />تعديل</button>
          <button type="button" onClick={() => { setOpen(false); onDelete(); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b14141] hover:bg-[#fff1f1] dark:text-[#f3b0b0] dark:hover:bg-[#392426]"><Trash2 className="h-4 w-4" />حذف</button>
          <div className="my-1 h-px bg-[#e6edf7] dark:bg-[#2a3d58]" />
          <button type="button" onClick={() => { setOpen(false); onMove("لم تبدأ"); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#193f6b] hover:bg-[#f4f8fc] dark:text-[#dce8f8] dark:hover:bg-[#1a2b43]"><PauseCircle className="h-4 w-4" />لم تبدأ</button>
          <button type="button" onClick={() => { setOpen(false); onMove("جاري العمل"); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#193f6b] hover:bg-[#f4f8fc] dark:text-[#dce8f8] dark:hover:bg-[#1a2b43]"><PlayCircle className="h-4 w-4" />جاري العمل</button>
          <button type="button" onClick={() => { setOpen(false); onMove("متوقفة"); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#193f6b] hover:bg-[#f4f8fc] dark:text-[#dce8f8] dark:hover:bg-[#1a2b43]"><PauseCircle className="h-4 w-4" />متوقفة</button>
          <button type="button" onClick={() => { setOpen(false); onMove("مكتملة"); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#193f6b] hover:bg-[#f4f8fc] dark:text-[#dce8f8] dark:hover:bg-[#1a2b43]"><CheckCircle2 className="h-4 w-4" />مكتملة</button>
        </div>
      ) : null}
    </div>
  );
}

function TaskCard({
  task,
  onEdit,
  onDelete,
  onMove,
}: Readonly<{
  task: TaskRecord;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (next: TaskStatus) => void;
}>) {
  return (
    <article className="rounded-2xl border border-[#d9e5f4] bg-white p-4 shadow-[0_6px_20px_rgba(18,51,92,0.08)] dark:border-[#263a56] dark:bg-[#132239]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-[#0f2d4e] dark:text-[#edf3ff]">{task.title}</h4>
        <TaskActionsMenu onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
      </div>
      <p className="line-clamp-2 text-xs leading-5 text-[#6f84a1] dark:text-[#9bb0cc]">{task.description || "-"}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <TaskPriorityBadge priority={task.priority} />
        <TaskStatusBadge status={task.status} />
      </div>
      <div className="mt-4 space-y-2 text-xs text-[#5a7394] dark:text-[#95abc8]">
        <p className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" />{task.dueDate || "غير محدد"}</p>
        <p className="flex items-center gap-2"><User className="h-3.5 w-3.5" />{task.assignee}</p>
        <p className="flex items-center gap-2"><User className="h-3.5 w-3.5" />{task.owner}</p>
        <p className="flex items-center gap-2"><Folder className="h-3.5 w-3.5" />{task.related}</p>
      </div>
    </article>
  );
}

function TaskColumn({
  title,
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onMove,
}: Readonly<{
  title: TaskStatus;
  tasks: TaskRecord[];
  onAdd: (status: TaskStatus) => void;
  onEdit: (task: TaskRecord) => void;
  onDelete: (task: TaskRecord) => void;
  onMove: (taskId: string, next: TaskStatus) => void;
}>) {
  return (
    <section className="min-w-0 rounded-3xl border border-[#d8e3f2] bg-[#f7fafe] p-3 dark:border-[#243953] dark:bg-[#0f1d31]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-[#11365f] dark:text-[#ecf4ff]">{title}</h3>
          <p className="text-xs text-[#6f86a5] dark:text-[#8ea5c4]">{tasks.length} مهمة</p>
        </div>
        <button type="button" onClick={() => onAdd(title)} className="inline-flex items-center gap-1 rounded-full bg-[#103c6d] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0d325b] dark:bg-[#1d4f85]">
          <Plus className="h-3.5 w-3.5" />إضافة
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
            onMove={(next) => onMove(task.id, next)}
          />
        ))}
      </div>
    </section>
  );
}

function TasksToolbar({
  query,
  setQuery,
  priority,
  setPriority,
  onAdd,
}: Readonly<{
  query: string;
  setQuery: (value: string) => void;
  priority: "all" | TaskPriority;
  setPriority: (value: "all" | TaskPriority) => void;
  onAdd: () => void;
}>) {
  return (
    <section className="rounded-3xl border border-[#d9e4f2] bg-white p-4 shadow-[0_10px_30px_rgba(17,48,85,0.06)] dark:border-[#243a56] dark:bg-[#121f33]">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <label className="relative block">
          <Search className="pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4 text-[#7891b0] dark:text-[#8ea5c2]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بعنوان المهمة أو الوصف" className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f8fbff] py-2.5 pe-10 ps-3 text-sm text-[#123860] outline-none ring-0 transition focus:border-[#bfcee3] focus:bg-white dark:border-[#29405d] dark:bg-[#102038] dark:text-[#ecf4ff] dark:focus:bg-[#11253f]" />
        </label>
        <div className="relative">
          <Filter className="pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4 text-[#7891b0]" />
          <select value={priority} onChange={(event) => setPriority(event.target.value as "all" | TaskPriority)} className="w-full appearance-none rounded-2xl border border-[#d8e3f2] bg-[#f8fbff] py-2.5 pe-10 ps-3 text-sm text-[#123860] outline-none transition focus:border-[#bfcee3] focus:bg-white dark:border-[#29405d] dark:bg-[#102038] dark:text-[#ecf4ff]">
            <option value="all">كل الأولويات</option>
            <option value="عاجل">عاجل</option>
            <option value="عالي">عالي</option>
            <option value="متوسط">متوسط</option>
            <option value="منخفض">منخفض</option>
          </select>
        </div>
        <button type="button" onClick={onAdd} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0c2f55] dark:bg-[#204d82]">
          <Plus className="h-4 w-4" />إضافة مهمة
        </button>
      </div>
    </section>
  );
}

function TaskModal({
  open,
  initial,
  loading,
  onClose,
  onSubmit,
  onSubmitAndContinue,
}: Readonly<{
  open: boolean;
  initial: TaskFormValues;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  onSubmitAndContinue: (values: TaskFormValues) => void;
}>) {
  const { dir } = useOfficePreferences();
  const [values, setValues] = useState<TaskFormValues>(initial);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => setValues(initial), [initial]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useOnClickOutside(modalRef, onClose, open);
  if (!open) return null;
  const isRtl = dir === "rtl";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#081b34]/50 p-4">
      <div ref={modalRef} dir={dir} className="w-full max-w-3xl rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0f3258] dark:text-[#edf4ff]">إضافة مهمة</h3>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6f84a0] hover:bg-[#f1f6fc] dark:text-[#93a8c4] dark:hover:bg-[#192a42]"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-right">
            <span className="mb-1.5 block text-sm text-[#567091] dark:text-[#95acc8]">العنوان <span className="text-[#d44b4b]">*</span></span>
            <input value={values.title} onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))} placeholder="أدخل عنوان المهمة" className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2.5 text-sm text-[#12385f] outline-none transition focus:border-[#b9cbdf] focus:bg-white dark:border-[#2a3f5c] dark:bg-[#112038] dark:text-[#ebf4ff]" />
          </label>
          <label className="block text-right">
            <span className="mb-1.5 block text-sm text-[#567091] dark:text-[#95acc8]">الأولوية <span className="text-[#d44b4b]">*</span></span>
            <select value={values.priority} onChange={(event) => setValues((prev) => ({ ...prev, priority: event.target.value as TaskPriority }))} className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2.5 text-sm text-[#12385f] outline-none transition focus:border-[#b9cbdf] focus:bg-white dark:border-[#2a3f5c] dark:bg-[#112038] dark:text-[#ebf4ff]">
              <option value="عاجل">عاجل</option><option value="عالي">عالي</option><option value="متوسط">متوسط</option><option value="منخفض">منخفض</option>
            </select>
          </label>
          <label className="block text-right md:col-span-2">
            <span className="mb-1.5 block text-sm text-[#567091] dark:text-[#95acc8]">الوصف</span>
            <textarea value={values.description} onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))} placeholder="أضف وصفًا مختصرًا للمهمة" rows={3} className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2.5 text-sm text-[#12385f] outline-none transition focus:border-[#b9cbdf] focus:bg-white dark:border-[#2a3f5c] dark:bg-[#112038] dark:text-[#ebf4ff]" />
          </label>
          <label className="block text-right">
            <span className="mb-1.5 block text-sm text-[#567091] dark:text-[#95acc8]">موعد التسليم</span>
            <input dir="ltr" type="datetime-local" value={values.dueDate} onChange={(event) => setValues((prev) => ({ ...prev, dueDate: event.target.value }))} className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2.5 text-sm text-[#12385f] outline-none transition focus:border-[#b9cbdf] focus:bg-white dark:border-[#2a3f5c] dark:bg-[#112038] dark:text-[#ebf4ff]" />
          </label>
          <label className="block text-right">
            <span className="mb-1.5 block text-sm text-[#567091] dark:text-[#95acc8]">تعيين إلى <span className="text-[#d44b4b]">*</span></span>
            <input value={values.assignee} onChange={(event) => setValues((prev) => ({ ...prev, assignee: event.target.value }))} placeholder="اسم المسؤول عن التنفيذ" className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2.5 text-sm text-[#12385f] outline-none transition focus:border-[#b9cbdf] focus:bg-white dark:border-[#2a3f5c] dark:bg-[#112038] dark:text-[#ebf4ff]" />
          </label>
          <label className="block text-right md:col-span-2">
            <span className="mb-1.5 block text-sm text-[#567091] dark:text-[#95acc8]">الملف/المعاملة</span>
            <input value={values.related} onChange={(event) => setValues((prev) => ({ ...prev, related: event.target.value }))} placeholder="اسم الملف أو المعاملة المرتبطة" className="w-full rounded-2xl border border-[#d8e3f2] bg-[#f9fbff] px-3 py-2.5 text-sm text-[#12385f] outline-none transition focus:border-[#b9cbdf] focus:bg-white dark:border-[#2a3f5c] dark:bg-[#112038] dark:text-[#ebf4ff]" />
          </label>
        </div>
        <div className={`mt-6 flex flex-wrap gap-2 ${isRtl ? "justify-start" : "justify-end"}`}>
          <button type="button" disabled={loading} onClick={onClose} className="rounded-2xl border border-[#d7e2f0] px-4 py-2 text-sm text-[#547094] hover:bg-[#f3f7fd] disabled:opacity-60 dark:border-[#2c3f5b] dark:text-[#9cb3ce] dark:hover:bg-[#172741]">إلغاء</button>
          <button type="button" disabled={loading} onClick={() => onSubmitAndContinue(values)} className="rounded-2xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248] hover:bg-[#c89d50] disabled:opacity-60">إضافة وبدء إضافة المزيد</button>
          <button type="button" disabled={loading} onClick={() => onSubmit(values)} className="inline-flex items-center gap-2 rounded-2xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white hover:bg-[#0c2f55] disabled:opacity-60"><BriefcaseBusiness className="h-4 w-4" />{loading ? "جاري الإضافة..." : "إضافة"}</button>
        </div>
      </div>
    </div>
  );
}

export function TasksBoardPage({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, translateText } = useOfficePreferences();
  const [isPending, startTransition] = useTransition();
  const [tasks, setTasks] = useState<TaskRecord[]>(() => normalizeBoard(page.board ?? []));
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<"all" | TaskPriority>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [initialStatus, setInitialStatus] = useState<TaskStatus>("لم تبدأ");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filtered = useMemo(
    () =>
      tasks.filter((task) => {
        const text = `${task.title} ${task.description} ${task.assignee} ${task.related}`.toLowerCase();
        const queryMatch = query.trim() ? text.includes(query.toLowerCase()) : true;
        const priorityMatch = priority === "all" ? true : task.priority === priority;
        return queryMatch && priorityMatch;
      }),
    [priority, query, tasks],
  );

  const grouped = useMemo(
    () =>
      STATUS_ORDER.reduce<Record<TaskStatus, TaskRecord[]>>((acc, status) => {
        acc[status] = filtered.filter((task) => task.status === status);
        return acc;
      }, { "لم تبدأ": [], "جاري العمل": [], متوقفة: [], مكتملة: [] }),
    [filtered],
  );

  const initialValues: TaskFormValues = useMemo(() => {
    const current = tasks.find((task) => task.id === editId);
    if (current) {
      return {
        title: current.title,
        description: current.description,
        priority: current.priority,
        dueDate: current.dueDate,
        assignee: current.assignee,
        related: current.related,
      };
    }
    return { title: "", description: "", priority: "متوسط", dueDate: "", assignee: "", related: "" };
  }, [editId, tasks]);

  const persistTask = (values: TaskFormValues, keepOpen: boolean) => {
    if (!values.title.trim() || !values.assignee.trim()) {
      setToast({ type: "error", message: "يرجى تعبئة الحقول المطلوبة." });
      return;
    }
    startTransition(() => {
      if (editId) {
        setTasks((prev) => prev.map((task) => (task.id === editId ? { ...task, ...values } : task)));
        setToast({ type: "success", message: "تم تحديث المهمة بنجاح." });
      } else {
        setTasks((prev) => [{
          id: `${Date.now()}`,
          title: values.title.trim(),
          description: values.description.trim(),
          priority: values.priority,
          dueDate: values.dueDate,
          assignee: values.assignee.trim(),
          owner: "أ. فواز",
          related: values.related.trim() || "-",
          status: initialStatus,
        }, ...prev]);
        setToast({ type: "success", message: "تمت إضافة المهمة بنجاح." });
      }
      if (!keepOpen) setModalOpen(false);
      setEditId(null);
    });
  };

  return (
    <section dir={dir} className="space-y-5 rounded-[1.8rem] bg-[#f2f6fc] p-4 dark:bg-[#0b1728] sm:p-5">


      <TasksToolbar query={query} setQuery={setQuery} priority={priority} setPriority={setPriority} onAdd={() => { setEditId(null); setInitialStatus("لم تبدأ"); setModalOpen(true); }} />

      <div className="grid gap-4 xl:grid-cols-4">
        {STATUS_ORDER.map((status) => (
          <TaskColumn
            key={status}
            title={status}
            tasks={grouped[status]}
            onAdd={(nextStatus) => { setEditId(null); setInitialStatus(nextStatus); setModalOpen(true); }}
            onEdit={(task) => { setEditId(task.id); setInitialStatus(task.status); setModalOpen(true); }}
            onDelete={(task) => { setTasks((prev) => prev.filter((item) => item.id !== task.id)); setToast({ type: "success", message: "تم حذف المهمة." }); }}
            onMove={(taskId, next) => { setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: next } : task))); setToast({ type: "success", message: `تم نقل المهمة إلى ${translateText(next)}.` }); }}
          />
        ))}
      </div>

      <TaskModal open={modalOpen} initial={initialValues} loading={isPending} onClose={() => { setModalOpen(false); setEditId(null); }} onSubmit={(values) => persistTask(values, false)} onSubmitAndContinue={(values) => persistTask(values, true)} />

      {toast ? (
        <div className={`fixed bottom-5 z-[80] rounded-xl px-4 py-2 text-sm shadow-lg ${dir === "rtl" ? "left-5" : "right-5"} ${toast.type === "success" ? "bg-[#163f6f] text-white" : "bg-[#8b2d2d] text-white"}`}>
          {toast.message}
        </div>
      ) : null}
    </section>
  );
}
