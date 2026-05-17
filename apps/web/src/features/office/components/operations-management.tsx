"use client";

import clsx from "clsx";
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Eye,
  FilePlus2,
  Files,
  FolderUp,
  Info,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Shield,
  Signature,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type OrderStatus = "مسودة" | "نشط" | "قيد الانتظار" | "مكتمل" | "ملغي";

type OrderRecord = {
  id: number;
  service: string;
  client: string;
  status: OrderStatus;
  startedAt: string;
  completedAt: string;
  assignees: string;
  notes: string;
};

type MainTab = "info" | "requiredData" | "officeTasks" | "expenses";
type SecondaryTab = "documents" | "appointments" | "approvals" | "payments";

type OfficeTaskRecord = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  status: string;
  priority: string;
  dueDate: string;
  createdBy: string;
};

type ExpenseRecord = {
  id: number;
  date: string;
  amount: string;
  currency: string;
  createdBy: string;
  billable: boolean;
  category: string;
  receiptName: string;
  notes: string;
};

type DocumentRecord = {
  id: number;
  title: string;
  category: string;
  visibility: "للعميل" | "خاص" | "داخلي";
  uploadedAt: string;
  uploadedBy: string;
  notes: string;
};

type RequiredDataRecord = {
  id: number;
  template: string;
  sentBy: string;
  sentAt: string;
  dueDate: string;
  isPrivate: boolean;
};

type AppointmentRecord = {
  id: number;
  status: "قيد الانتظار" | "مؤكد" | "مكتمل" | "ملغي";
  availableFrom: string;
  availableTo: string;
  clientAppointment: string;
  location: string;
};

type ApprovalRecord = {
  id: number;
  subject: string;
  requestedFile: string;
  signedFile: string;
  decision: string;
  deadline: string;
  decisionAt: string;
  isPrivate: boolean;
  message: string;
};

type PaymentRecord = {
  id: number;
  version: string;
  issueDate: string;
  dueDate: string;
  total: number;
  note: string;
  status: "مسودة" | "مدفوع" | "متأخر" | "ملغي";
};

type OrderExtrasStore = {
  officeTasks: OfficeTaskRecord[];
  expenses: ExpenseRecord[];
  documents: DocumentRecord[];
  requiredData: RequiredDataRecord[];
  appointments: AppointmentRecord[];
  approvals: ApprovalRecord[];
  payments: PaymentRecord[];
};

type OfficeTaskFormState = Omit<OfficeTaskRecord, "id" | "createdBy">;
type ExpenseFormState = Omit<ExpenseRecord, "id" | "receiptName"> & { receiptFile: File | null };
type DocumentFormState = {
  title: string;
  category: string;
  visibility: "للعميل" | "خاص" | "داخلي";
  file: File | null;
  notes: string;
};

type RequiredDataFormState = {
  fromTemplate: boolean;
  template: string;
  message: string;
  dueDate: string;
  isPrivate: boolean;
  sentBy: string;
  sentAt: string;
};

type AppointmentFormState = {
  status: AppointmentRecord["status"];
  availableFrom: string;
  availableTo: string;
  dayStart: string;
  dayEnd: string;
  clientAppointment: string;
  location: string;
  dueDate: string;
  message: string;
  isPrivate: boolean;
};

type ApprovalFormState = {
  subject: string;
  requestedFile: File | null;
  signedFile: File | null;
  decision: "معلق" | "موافق" | "مرفوض";
  deadline: string;
  dueDate: string;
  isPrivate: boolean;
  message: string;
};

type PaymentFormState = {
  version: string;
  issueDate: string;
  dueDate: string;
  status: PaymentRecord["status"];
  currency: string;
  note: string;
  itemType: string;
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  discount: number;
};

const emptyTaskForm: OfficeTaskFormState = {
  title: "",
  description: "",
  assignee: "",
  status: "قيد التنفيذ",
  priority: "متوسطة",
  dueDate: "",
};

const emptyExpenseForm: ExpenseFormState = {
  date: "",
  amount: "",
  currency: "SAR",
  createdBy: "",
  billable: true,
  category: "",
  receiptFile: null,
  notes: "",
};

const emptyDocumentForm: DocumentFormState = {
  title: "",
  category: "",
  visibility: "للعميل",
  file: null,
  notes: "",
};

const emptyRequiredDataForm: RequiredDataFormState = {
  fromTemplate: false,
  template: "",
  message: "",
  dueDate: "",
  isPrivate: false,
  sentBy: "",
  sentAt: "",
};

const emptyAppointmentForm: AppointmentFormState = {
  status: "قيد الانتظار",
  availableFrom: "",
  availableTo: "",
  dayStart: "09:00",
  dayEnd: "17:00",
  clientAppointment: "",
  location: "",
  dueDate: "",
  message: "",
  isPrivate: false,
};

const emptyApprovalForm: ApprovalFormState = {
  subject: "",
  requestedFile: null,
  signedFile: null,
  decision: "معلق",
  deadline: "",
  dueDate: "",
  isPrivate: false,
  message: "",
};

const emptyPaymentForm: PaymentFormState = {
  version: "INV-001",
  issueDate: "",
  dueDate: "",
  status: "مسودة",
  currency: "SAR",
  note: "",
  itemType: "خدمة قانونية",
  itemDescription: "",
  qty: 1,
  unitPrice: 0,
  tax: 15,
  discount: 0,
};

function statusTone(status: string) {
  if (status.includes("نشط") || status.includes("مكتمل") || status.includes("مدفوع")) {
    return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  }
  if (status.includes("قيد") || status.includes("انتظار") || status.includes("مسودة")) {
    return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  }
  return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
}

function EmptyState({ text }: Readonly<{ text: string }>) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center text-sm text-[#718aa9] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#9ab2cf]">
      {text}
    </div>
  );
}

function SectionCard({ title, action, children }: Readonly<{ title: string; action?: React.ReactNode; children: React.ReactNode }>) {
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

function AppModal({ open, title, onClose, children, footer, width = "max-w-5xl" }: Readonly<{ open: boolean; title: string; onClose: () => void; children: React.ReactNode; footer?: React.ReactNode; width?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#07101d]/55 px-3 py-6">
      <div ref={ref} className={clsx("w-full rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6", width)}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6a84a7] hover:bg-[#eff5fc] dark:text-[#95abc7] dark:hover:bg-[#182a43]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[68vh] overflow-y-auto">{children}</div>
        {footer ? <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}

export function OperationsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, t, translateText } = useOfficePreferences();
  const [query, setQuery] = useState("");
  const [mainTab, setMainTab] = useState<MainTab>("info");
  const [secondaryTab, setSecondaryTab] = useState<SecondaryTab>("documents");
  const [selected, setSelected] = useState<OrderRecord | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [requiredDataModalOpen, setRequiredDataModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [statusForm, setStatusForm] = useState<OrderStatus>("قيد الانتظار");
  const [taskForm, setTaskForm] = useState<OfficeTaskFormState>(emptyTaskForm);
  const [expenseForm, setExpenseForm] = useState<ExpenseFormState>(emptyExpenseForm);
  const [documentForm, setDocumentForm] = useState<DocumentFormState>(emptyDocumentForm);
  const [requiredDataForm, setRequiredDataForm] = useState<RequiredDataFormState>(emptyRequiredDataForm);
  const [appointmentForm, setAppointmentForm] = useState<AppointmentFormState>(emptyAppointmentForm);
  const [approvalForm, setApprovalForm] = useState<ApprovalFormState>(emptyApprovalForm);
  const [paymentForm, setPaymentForm] = useState<PaymentFormState>(emptyPaymentForm);
  const [secondarySearch, setSecondarySearch] = useState("");

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const fromRows = (page.rows ?? []).map((row, index) => ({
      id: Number.parseInt((row.number ?? "").replace(/\D/g, ""), 10) || index + 1,
      service: row.service ?? "-",
      client: row.client ?? "-",
      status: ((row.status ?? "قيد الانتظار") as OrderStatus),
      startedAt: row.createdAt ?? "-",
      completedAt: "-",
      assignees: "أ. فواز",
      notes: "",
    }));

    return fromRows.length > 0
      ? fromRows
      : [
          { id: 14, service: "توثيق عقد", client: "Fatmahf", status: "قيد الانتظار", startedAt: "14 مايو 2026", completedAt: "-", assignees: "أ. فواز", notes: "" },
        ];
  });

  const [extrasByOrder, setExtrasByOrder] = useState<Record<number, OrderExtrasStore>>({});

  const currentExtras = useMemo<OrderExtrasStore>(() => {
    if (!selected) {
      return { officeTasks: [], expenses: [], documents: [], requiredData: [], appointments: [], approvals: [], payments: [] };
    }
    return extrasByOrder[selected.id] ?? { officeTasks: [], expenses: [], documents: [], requiredData: [], appointments: [], approvals: [], payments: [] };
  }, [extrasByOrder, selected]);

  const filteredOrders = useMemo(() => {
    if (!query.trim()) return orders;
    const q = query.trim().toLowerCase();
    return orders.filter((order) => `${order.id} ${order.service} ${order.client} ${order.status}`.toLowerCase().includes(q));
  }, [orders, query]);

  const updateExtras = (updater: (current: OrderExtrasStore) => OrderExtrasStore) => {
    if (!selected) return;
    setExtrasByOrder((prev) => {
      const current = prev[selected.id] ?? { officeTasks: [], expenses: [], documents: [], requiredData: [], appointments: [], approvals: [], payments: [] };
      return { ...prev, [selected.id]: updater(current) };
    });
  };

  const mainTabs: Array<{ key: MainTab; label: string }> = [
    { key: "info", label: "معلومات" },
    { key: "requiredData", label: "قائمة التحقق" },
    { key: "officeTasks", label: "مهام المكتب" },
    { key: "expenses", label: "المصروفات" },
  ];

  const secondaryTabs: Array<{ key: SecondaryTab; label: string }> = [
    { key: "documents", label: "المستندات" },
    { key: "appointments", label: "المواعيد" },
    { key: "approvals", label: "التوقيعات / الموافقات" },
    { key: "payments", label: "المدفوعات" },
  ];

  if (!selected) {
    return (
      <section className="space-y-6">
        <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
          <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("الطلبات / القائمة")}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("الطلبات")}</h1>
            <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0d3258]">
              <Plus className="h-4 w-4" />
              {translateText("إضافة طلب")}
            </button>
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
            <table dir={dir} className="min-w-[980px] w-full text-sm">
              <thead className="bg-[#f3f8ff] text-[#5b7594] dark:bg-[#13233a] dark:text-[#9bb1cd]">
                <tr>
                  <th className="px-4 py-3"><input type="checkbox" /></th>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">{translateText("الخدمة")}</th>
                  <th className="px-4 py-3">{translateText("العميل")}</th>
                  <th className="px-4 py-3">{translateText("الحالة")}</th>
                  <th className="px-4 py-3">{translateText("البداية")}</th>
                  <th className="px-4 py-3">{translateText("النهاية")}</th>
                  <th className="px-4 py-3">{translateText("المهام")}</th>
                  <th className="px-4 py-3">{translateText("الإجراءات")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                    <td className="px-4 py-3"><input type="checkbox" /></td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{order.id}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{order.service}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{order.client}</td>
                    <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", statusTone(order.status))}>{order.status}</span></td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{order.startedAt}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{order.completedAt}</td>
                    <td className="px-4 py-3 text-[#17395f] dark:text-[#e8f0ff]">{currentExtras.officeTasks.length}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <button type="button" onClick={() => { setSelected(order); setStatusForm(order.status); }} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]"><Eye className="h-3.5 w-3.5" />{translateText("عرض")}</button>
                        <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]"><Pencil className="h-3.5 w-3.5" />{translateText("تعديل")}</button>
                        <button type="button" onClick={() => setOrders((current) => current.filter((r) => r.id !== order.id))} className="inline-flex items-center gap-1 rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]"><Trash2 className="h-3.5 w-3.5" />{t.delete}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9f5] bg-[#fbfdff] px-4 py-3 text-sm text-[#5f7898] dark:border-[#24405f] dark:bg-[#122136] dark:text-[#9db5cf]">
            <span>{translateText("إجمالي النتائج")}: {filteredOrders.length}</span>
            <div className="flex items-center gap-2"><button className="rounded-lg border border-[#d9e4f4] px-3 py-1">1</button></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText(`الطلبات / ${selected.id} / عرض`)}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText(`عرض ${selected.id}`)}</h1>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setStatusModalOpen(true)} className="rounded-xl bg-[#103a67] px-4 py-2.5 text-sm font-medium text-white">{translateText("تحديث الحالة")}</button>
            <button type="button" className="rounded-xl bg-[#d8aa5a] px-4 py-2.5 text-sm font-medium text-[#223248]">{translateText("تحويل إلى قضية")}</button>
            <button type="button" onClick={() => setSelected(null)} className="rounded-xl border border-[#d5e1ef] bg-white px-4 py-2 text-sm text-[#40658f] hover:bg-[#f4f8fd] dark:border-[#28405c] dark:bg-[#102038] dark:text-[#a7bfdc]">{translateText("رجوع")}</button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <div className="inline-flex min-w-max gap-2">
          {mainTabs.map((tab) => (
            <button key={tab.key} type="button" onClick={() => setMainTab(tab.key)} className={clsx("rounded-xl px-4 py-2 text-sm", mainTab === tab.key ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff] dark:text-[#a4bad2] dark:hover:bg-[#15253b]")}>{translateText(tab.label)}</button>
          ))}
        </div>
      </div>

      {mainTab === "info" ? (
        <SectionCard title={translateText("الملخص")}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["الخدمة", selected.service],
              ["العميل", selected.client],
              ["الحالة", selected.status],
              ["تاريخ البدء", selected.startedAt],
              ["تاريخ الإكمال", selected.completedAt],
              ["الموظفون/المحامون المكلفون", selected.assignees],
              ["ملاحظات", selected.notes || "-"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-3 dark:border-[#243953] dark:bg-[#122136]">
                <p className="text-xs text-[#7891b0] dark:text-[#8fa6c4]">{translateText(label)}</p>
                {label === "الحالة" ? <span className={clsx("mt-1 inline-flex rounded-full px-2.5 py-1 text-xs", statusTone(value))}>{value}</span> : <p className="mt-1 text-sm text-[#1f4f7f] dark:text-[#dfeaff]">{value}</p>}
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}

      {mainTab === "requiredData" ? (
        <SectionCard title={translateText("البيانات المطلوبة")} action={<button type="button" onClick={() => setRequiredDataModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("طلب بيانات")}</button>}>
          {currentExtras.requiredData.length === 0 ? <EmptyState text={translateText("لا توجد طلبات بيانات بعد.")} /> : <div className="space-y-2">{currentExtras.requiredData.map((item) => <div key={item.id} className="rounded-xl border border-[#e7eef8] px-3 py-2 text-sm dark:border-[#223752]">{item.template}</div>)}</div>}
        </SectionCard>
      ) : null}

      {mainTab === "officeTasks" ? (
        <SectionCard title={translateText("مهام المكتب")} action={<button type="button" onClick={() => setTaskModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة مهمة مكتبية")}</button>}>
          {currentExtras.officeTasks.length === 0 ? <EmptyState text={translateText("لا توجد مهام بعد.")} /> : <div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-[#f3f8ff]"><tr><th className="px-3 py-2">{translateText("العنوان")}</th><th className="px-3 py-2">{translateText("مسندة إلى")}</th><th className="px-3 py-2">{translateText("الحالة")}</th><th className="px-3 py-2">{translateText("الأولوية")}</th><th className="px-3 py-2">{translateText("الاستحقاق")}</th></tr></thead><tbody>{currentExtras.officeTasks.map((row) => <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]"><td className="px-3 py-2">{row.title}</td><td className="px-3 py-2">{row.assignee}</td><td className="px-3 py-2">{row.status}</td><td className="px-3 py-2">{row.priority}</td><td className="px-3 py-2">{row.dueDate}</td></tr>)}</tbody></table></div>}
        </SectionCard>
      ) : null}

      {mainTab === "expenses" ? (
        <SectionCard title={translateText("المصروفات")} action={<button type="button" onClick={() => setExpenseModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة مصروف")}</button>}>
          {currentExtras.expenses.length === 0 ? <EmptyState text={translateText("لا توجد مصروفات بعد.")} /> : <div className="space-y-2">{currentExtras.expenses.map((item) => <div key={item.id} className="rounded-xl border border-[#e7eef8] px-3 py-2 text-sm dark:border-[#223752]">{item.date} - {item.amount} {item.currency}</div>)}</div>}
        </SectionCard>
      ) : null}

      <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {secondaryTabs.map((tab) => (
              <button key={tab.key} type="button" onClick={() => setSecondaryTab(tab.key)} className={clsx("rounded-xl px-3 py-2 text-sm", secondaryTab === tab.key ? "bg-[#e9f2ff] text-[#123d6a]" : "text-[#5f7898] hover:bg-[#f5f9ff]")}>{translateText(tab.label)}</button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
            <input value={secondarySearch} onChange={(e) => setSecondarySearch(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
          </div>
        </div>

        {secondaryTab === "documents" ? <SectionCard title={translateText("المستندات")} action={<button type="button" onClick={() => setDocumentModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة مستند")}</button>}>{currentExtras.documents.length === 0 ? <EmptyState text={translateText("لا توجد مستندات بعد.")} /> : <div className="space-y-2">{currentExtras.documents.map((item) => <div key={item.id} className="rounded-xl border border-[#e7eef8] px-3 py-2 text-sm dark:border-[#223752]">{item.title}</div>)}</div>}</SectionCard> : null}
        {secondaryTab === "appointments" ? <SectionCard title={translateText("المواعيد")} action={<button type="button" onClick={() => setAppointmentModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة موعد")}</button>}>{currentExtras.appointments.length === 0 ? <EmptyState text={translateText("لا توجد مواعيد بعد.")} /> : <div className="space-y-2">{currentExtras.appointments.map((item) => <div key={item.id} className="rounded-xl border border-[#e7eef8] px-3 py-2 text-sm dark:border-[#223752]">{item.location}</div>)}</div>}</SectionCard> : null}
        {secondaryTab === "approvals" ? <SectionCard title={translateText("التوقيعات / الموافقات")} action={<button type="button" onClick={() => setApprovalModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة توقيع أو موافقة")}</button>}>{currentExtras.approvals.length === 0 ? <EmptyState text={translateText("لا توجد موافقات بعد.")} /> : <div className="space-y-2">{currentExtras.approvals.map((item) => <div key={item.id} className="rounded-xl border border-[#e7eef8] px-3 py-2 text-sm dark:border-[#223752]">{item.subject}</div>)}</div>}</SectionCard> : null}
        {secondaryTab === "payments" ? <SectionCard title={translateText("المدفوعات")} action={<button type="button" onClick={() => setPaymentModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة فاتورة")}</button>}>{currentExtras.payments.length === 0 ? <EmptyState text={translateText("لا توجد مدفوعات بعد.")} /> : <div className="space-y-2">{currentExtras.payments.map((item) => <div key={item.id} className="rounded-xl border border-[#e7eef8] px-3 py-2 text-sm dark:border-[#223752]">{item.version} - {item.total}</div>)}</div>}</SectionCard> : null}
      </div>

      <AppModal open={statusModalOpen} onClose={() => setStatusModalOpen(false)} title={translateText("تحديث الحالة")} width="max-w-xl" footer={<><button type="button" onClick={() => { if (!selected) return; setOrders((current) => current.map((row) => row.id === selected.id ? { ...row, status: statusForm } : row)); setSelected((current) => current ? { ...current, status: statusForm } : current); setStatusModalOpen(false); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إرسال")}</button><button type="button" onClick={() => setStatusModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button></>}>
        <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">{translateText("الحالة")} <span className="text-[#d14b4b]">*</span></span><select value={statusForm} onChange={(e) => setStatusForm(e.target.value as OrderStatus)} className="w-full rounded-xl border border-[#d9e4f4] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#123f6f] dark:border-[#2b3f5c] dark:bg-[#112038]"><option>مسودة</option><option>نشط</option><option>قيد الانتظار</option><option>مكتمل</option><option>ملغي</option></select></label>
      </AppModal>

      <AppModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} title={translateText("إضافة مهمة مكتبية")} footer={<><button type="button" onClick={() => setTaskModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, officeTasks: [...current.officeTasks, { id: Date.now(), ...taskForm, createdBy: t.userName }] })); setTaskModalOpen(false); setTaskForm(emptyTaskForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, officeTasks: [...current.officeTasks, { id: Date.now(), ...taskForm, createdBy: t.userName }] })); setTaskForm(emptyTaskForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="grid gap-4 md:grid-cols-2"><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">العنوان <span className="text-[#d14b4b]">*</span></span><input value={taskForm.title} onChange={(e) => setTaskForm((c) => ({ ...c, title: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الوصف</span><textarea rows={3} value={taskForm.description} onChange={(e) => setTaskForm((c) => ({ ...c, description: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">مسندة إلى</span><input value={taskForm.assignee} onChange={(e) => setTaskForm((c) => ({ ...c, assignee: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={taskForm.status} onChange={(e) => setTaskForm((c) => ({ ...c, status: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm"><option>قيد التنفيذ</option><option>مجدولة</option><option>مكتملة</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الأولوية</span><select value={taskForm.priority} onChange={(e) => setTaskForm((c) => ({ ...c, priority: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm"><option>منخفضة</option><option>متوسطة</option><option>عالية</option><option>عاجل</option></select></label></div>
      </AppModal>

      <AppModal open={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} title={translateText("إضافة مصروف")} footer={<><button type="button" onClick={() => setExpenseModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, expenses: [...current.expenses, { id: Date.now(), date: expenseForm.date, amount: expenseForm.amount, currency: expenseForm.currency, createdBy: expenseForm.createdBy || t.userName, billable: expenseForm.billable, category: expenseForm.category, receiptName: expenseForm.receiptFile?.name ?? "-", notes: expenseForm.notes }] })); setExpenseModalOpen(false); setExpenseForm(emptyExpenseForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, expenses: [...current.expenses, { id: Date.now(), date: expenseForm.date, amount: expenseForm.amount, currency: expenseForm.currency, createdBy: expenseForm.createdBy || t.userName, billable: expenseForm.billable, category: expenseForm.category, receiptName: expenseForm.receiptFile?.name ?? "-", notes: expenseForm.notes }] })); setExpenseForm(emptyExpenseForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التاريخ</span><input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm((c) => ({ ...c, date: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">المبلغ</span><input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm((c) => ({ ...c, amount: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العملة</span><input value={expenseForm.currency} onChange={(e) => setExpenseForm((c) => ({ ...c, currency: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تم بواسطة</span><input value={expenseForm.createdBy} onChange={(e) => setExpenseForm((c) => ({ ...c, createdBy: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={expenseForm.billable} onChange={(e) => setExpenseForm((c) => ({ ...c, billable: e.target.checked }))} />{translateText("قابل للفوترة")}</label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التصنيف</span><input value={expenseForm.category} onChange={(e) => setExpenseForm((c) => ({ ...c, category: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الإيصال</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setExpenseForm((c) => ({ ...c, receiptFile: e.target.files?.[0] ?? null }))} /></div></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={expenseForm.notes} onChange={(e) => setExpenseForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label></div>
      </AppModal>

      <AppModal open={documentModalOpen} onClose={() => setDocumentModalOpen(false)} title={translateText("إضافة مستند")} footer={<><button type="button" onClick={() => setDocumentModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, documents: [...current.documents, { id: Date.now(), title: documentForm.title, category: documentForm.category || "عام", visibility: documentForm.visibility, uploadedAt: new Date().toLocaleString(isArabic ? "ar" : "en"), uploadedBy: t.userName, notes: documentForm.notes }] })); setDocumentModalOpen(false); setDocumentForm(emptyDocumentForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, documents: [...current.documents, { id: Date.now(), title: documentForm.title, category: documentForm.category || "عام", visibility: documentForm.visibility, uploadedAt: new Date().toLocaleString(isArabic ? "ar" : "en"), uploadedBy: t.userName, notes: documentForm.notes }] })); setDocumentForm(emptyDocumentForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="grid gap-4 md:grid-cols-2"><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">العنوان <span className="text-[#d14b4b]">*</span></span><input value={documentForm.title} onChange={(e) => setDocumentForm((c) => ({ ...c, title: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التصنيف</span><input value={documentForm.category} onChange={(e) => setDocumentForm((c) => ({ ...c, category: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الظهور</span><select value={documentForm.visibility} onChange={(e) => setDocumentForm((c) => ({ ...c, visibility: e.target.value as DocumentFormState["visibility"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm"><option>للعميل</option><option>خاص</option><option>داخلي</option></select></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الملف</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 text-center"><FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" /><p className="mb-2 text-xs text-[#6f89ab]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p><input type="file" onChange={(e) => setDocumentForm((c) => ({ ...c, file: e.target.files?.[0] ?? null }))} /></div></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={documentForm.notes} onChange={(e) => setDocumentForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label></div>
      </AppModal>

      <AppModal open={requiredDataModalOpen} onClose={() => setRequiredDataModalOpen(false)} title={translateText("إضافة طلب بيانات")} footer={<><button type="button" onClick={() => setRequiredDataModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, requiredData: [...current.requiredData, { id: Date.now(), template: requiredDataForm.template || "نموذج مخصص", sentBy: requiredDataForm.sentBy || t.userName, sentAt: requiredDataForm.sentAt || new Date().toLocaleString(isArabic ? "ar" : "en"), dueDate: requiredDataForm.dueDate, isPrivate: requiredDataForm.isPrivate }] })); setRequiredDataModalOpen(false); setRequiredDataForm(emptyRequiredDataForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, requiredData: [...current.requiredData, { id: Date.now(), template: requiredDataForm.template || "نموذج مخصص", sentBy: requiredDataForm.sentBy || t.userName, sentAt: requiredDataForm.sentAt || new Date().toLocaleString(isArabic ? "ar" : "en"), dueDate: requiredDataForm.dueDate, isPrivate: requiredDataForm.isPrivate }] })); setRequiredDataForm(emptyRequiredDataForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="space-y-4"><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Files className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("النموذج")}</h4></div><p className="mb-3 text-xs text-[#7c93af]">{translateText("إذا تم إيقافه، يمكنك تعريف حقول مخصصة لهذا النموذج فقط.")}</p><div className="grid gap-4 md:grid-cols-2"><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={requiredDataForm.fromTemplate} onChange={(e) => setRequiredDataForm((c) => ({ ...c, fromTemplate: e.target.checked }))} />{translateText("من قالب")}</label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">قالب النموذج</span><select value={requiredDataForm.template} onChange={(e) => setRequiredDataForm((c) => ({ ...c, template: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option value="">{translateText("اختر")}</option><option>نموذج بيانات عميل</option><option>نموذج مستندات شركة</option></select></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Info className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الرسالة")}</h4></div><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={requiredDataForm.dueDate} onChange={(e) => setRequiredDataForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الرسالة</span><textarea rows={3} value={requiredDataForm.message} onChange={(e) => setRequiredDataForm((c) => ({ ...c, message: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Shield className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الخصوصية والمرسل")}</h4></div><div className="grid gap-4 md:grid-cols-3"><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={requiredDataForm.isPrivate} onChange={(e) => setRequiredDataForm((c) => ({ ...c, isPrivate: e.target.checked }))} />{translateText("خاص")}</label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تم الإرسال بواسطة</span><input value={requiredDataForm.sentBy} onChange={(e) => setRequiredDataForm((c) => ({ ...c, sentBy: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت الإرسال</span><input dir="ltr" type="datetime-local" value={requiredDataForm.sentAt} onChange={(e) => setRequiredDataForm((c) => ({ ...c, sentAt: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div></div>
      </AppModal>

      <AppModal open={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} title={translateText("إضافة موعد")} footer={<><button type="button" onClick={() => setAppointmentModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, appointments: [...current.appointments, { id: Date.now(), status: appointmentForm.status, availableFrom: appointmentForm.availableFrom, availableTo: appointmentForm.availableTo, clientAppointment: appointmentForm.clientAppointment, location: appointmentForm.location }] })); setAppointmentModalOpen(false); setAppointmentForm(emptyAppointmentForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, appointments: [...current.appointments, { id: Date.now(), status: appointmentForm.status, availableFrom: appointmentForm.availableFrom, availableTo: appointmentForm.availableTo, clientAppointment: appointmentForm.clientAppointment, location: appointmentForm.location }] })); setAppointmentForm(emptyAppointmentForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="space-y-4"><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><CalendarDays className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الأوقات المتاحة")}</h4></div><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">متاح من</span><input dir="ltr" type="datetime-local" value={appointmentForm.availableFrom} onChange={(e) => setAppointmentForm((c) => ({ ...c, availableFrom: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">متاح إلى</span><input dir="ltr" type="datetime-local" value={appointmentForm.availableTo} onChange={(e) => setAppointmentForm((c) => ({ ...c, availableTo: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">بداية الوقت اليومي</span><input dir="ltr" type="time" value={appointmentForm.dayStart} onChange={(e) => setAppointmentForm((c) => ({ ...c, dayStart: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">نهاية الوقت اليومي</span><input dir="ltr" type="time" value={appointmentForm.dayEnd} onChange={(e) => setAppointmentForm((c) => ({ ...c, dayEnd: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Info className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("معلومات الموعد")}</h4></div><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الموقع</span><input value={appointmentForm.location} onChange={(e) => setAppointmentForm((c) => ({ ...c, location: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={appointmentForm.dueDate} onChange={(e) => setAppointmentForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الرسالة</span><textarea rows={3} value={appointmentForm.message} onChange={(e) => setAppointmentForm((c) => ({ ...c, message: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Shield className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الإجراءات")}</h4></div><div className="grid gap-4 md:grid-cols-3"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={appointmentForm.status} onChange={(e) => setAppointmentForm((c) => ({ ...c, status: e.target.value as AppointmentRecord["status"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>قيد الانتظار</option><option>مؤكد</option><option>مكتمل</option><option>ملغي</option></select></label><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={appointmentForm.isPrivate} onChange={(e) => setAppointmentForm((c) => ({ ...c, isPrivate: e.target.checked }))} />{translateText("خاص")}</label></div></div></div>
      </AppModal>

      <AppModal open={approvalModalOpen} onClose={() => setApprovalModalOpen(false)} title={translateText("إضافة توقيع أو موافقة")} footer={<><button type="button" onClick={() => setApprovalModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, approvals: [...current.approvals, { id: Date.now(), subject: approvalForm.subject, requestedFile: approvalForm.requestedFile?.name ?? "-", signedFile: approvalForm.signedFile?.name ?? "-", decision: approvalForm.decision, deadline: approvalForm.deadline, decisionAt: approvalForm.decision === "معلق" ? "" : new Date().toLocaleString(isArabic ? "ar" : "en"), isPrivate: approvalForm.isPrivate, message: approvalForm.message }] })); setApprovalModalOpen(false); setApprovalForm(emptyApprovalForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, approvals: [...current.approvals, { id: Date.now(), subject: approvalForm.subject, requestedFile: approvalForm.requestedFile?.name ?? "-", signedFile: approvalForm.signedFile?.name ?? "-", decision: approvalForm.decision, deadline: approvalForm.deadline, decisionAt: approvalForm.decision === "معلق" ? "" : new Date().toLocaleString(isArabic ? "ar" : "en"), isPrivate: approvalForm.isPrivate, message: approvalForm.message }] })); setApprovalForm(emptyApprovalForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="space-y-4"><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Signature className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الطلب")}</h4></div><div className="grid gap-4 md:grid-cols-2"><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الملف المطلوب اعتماده</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4"><input type="file" onChange={(e) => setApprovalForm((c) => ({ ...c, requestedFile: e.target.files?.[0] ?? null }))} /></div></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الموضوع</span><input value={approvalForm.subject} onChange={(e) => setApprovalForm((c) => ({ ...c, subject: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الموعد النهائي للموافقة</span><input type="date" value={approvalForm.deadline} onChange={(e) => setApprovalForm((c) => ({ ...c, deadline: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={approvalForm.dueDate} onChange={(e) => setApprovalForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الرسالة</span><textarea rows={3} value={approvalForm.message} onChange={(e) => setApprovalForm((c) => ({ ...c, message: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><CheckCircle2 className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("القرار")}</h4></div><label className="block max-w-sm"><span className="mb-2 block text-sm text-[#6d84a1]">القرار</span><select value={approvalForm.decision} onChange={(e) => setApprovalForm((c) => ({ ...c, decision: e.target.value as ApprovalFormState["decision"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>معلق</option><option>موافق</option><option>مرفوض</option></select></label></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Shield className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الخصوصية")}</h4></div><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={approvalForm.isPrivate} onChange={(e) => setApprovalForm((c) => ({ ...c, isPrivate: e.target.checked }))} />{translateText("خاص")}</label></div></div>
      </AppModal>

      <AppModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} title={translateText("إضافة فاتورة")} footer={<><button type="button" onClick={() => setPaymentModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { const subtotal = paymentForm.qty * paymentForm.unitPrice; const taxValue = (subtotal - paymentForm.discount) * (paymentForm.tax / 100); const total = subtotal - paymentForm.discount + taxValue; updateExtras((current) => ({ ...current, payments: [...current.payments, { id: Date.now(), version: paymentForm.version, issueDate: paymentForm.issueDate, dueDate: paymentForm.dueDate, total: Number(total.toFixed(2)), note: paymentForm.note, status: paymentForm.status }] })); setPaymentModalOpen(false); setPaymentForm(emptyPaymentForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { const subtotal = paymentForm.qty * paymentForm.unitPrice; const taxValue = (subtotal - paymentForm.discount) * (paymentForm.tax / 100); const total = subtotal - paymentForm.discount + taxValue; updateExtras((current) => ({ ...current, payments: [...current.payments, { id: Date.now(), version: paymentForm.version, issueDate: paymentForm.issueDate, dueDate: paymentForm.dueDate, total: Number(total.toFixed(2)), note: paymentForm.note, status: paymentForm.status }] })); setPaymentForm(emptyPaymentForm); }} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}>
        <div className="space-y-4"><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><FilePlus2 className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("تفاصيل الفاتورة")}</h4></div><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">رقم الفاتورة</span><input value={paymentForm.version} onChange={(e) => setPaymentForm((c) => ({ ...c, version: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={paymentForm.status} onChange={(e) => setPaymentForm((c) => ({ ...c, status: e.target.value as PaymentRecord["status"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>مسودة</option><option>مدفوع</option><option>متأخر</option><option>ملغي</option></select></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الإصدار</span><input type="date" value={paymentForm.issueDate} onChange={(e) => setPaymentForm((c) => ({ ...c, issueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={paymentForm.dueDate} onChange={(e) => setPaymentForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العملة</span><input value={paymentForm.currency} onChange={(e) => setPaymentForm((c) => ({ ...c, currency: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={paymentForm.note} onChange={(e) => setPaymentForm((c) => ({ ...c, note: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Files className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("البنود")}</h4></div><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">النوع</span><input value={paymentForm.itemType} onChange={(e) => setPaymentForm((c) => ({ ...c, itemType: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الوصف</span><input value={paymentForm.itemDescription} onChange={(e) => setPaymentForm((c) => ({ ...c, itemDescription: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الكمية</span><input type="number" value={paymentForm.qty} onChange={(e) => setPaymentForm((c) => ({ ...c, qty: Number(e.target.value) }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">سعر الوحدة</span><input type="number" value={paymentForm.unitPrice} onChange={(e) => setPaymentForm((c) => ({ ...c, unitPrice: Number(e.target.value) }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الضريبة %</span><input type="number" value={paymentForm.tax} onChange={(e) => setPaymentForm((c) => ({ ...c, tax: Number(e.target.value) }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label><label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الخصم</span><input type="number" value={paymentForm.discount} onChange={(e) => setPaymentForm((c) => ({ ...c, discount: Number(e.target.value) }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label></div></div><div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4"><div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><CircleDollarSign className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الإجماليات")}</h4></div>{(() => { const subtotal = paymentForm.qty * paymentForm.unitPrice; const taxable = subtotal - paymentForm.discount; const taxValue = taxable * (paymentForm.tax / 100); const total = taxable + taxValue; return <div className="grid gap-2 text-sm text-[#3f6186]"><p>{translateText("الإجمالي قبل الخصم")}: {subtotal.toFixed(2)}</p><p>{translateText("الخصم")}: {paymentForm.discount.toFixed(2)}</p><p>{translateText("إجمالي الضريبة")}: {taxValue.toFixed(2)}</p><p className="font-semibold text-[#12385f]">{translateText("الإجمالي النهائي")}: {total.toFixed(2)}</p></div>; })()}</div></div>
      </AppModal>
    </section>
  );
}
