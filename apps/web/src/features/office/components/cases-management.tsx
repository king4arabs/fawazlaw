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
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { OfficePageData } from "@/features/office/types";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";

type CaseRecord = {
  id: number;
  reference: string;
  client_name: string;
  case_type: string;
  court_name: string;
  status: string;
  owner_name: string;
  opened_at: string | null;
  notes: string | null;
};

type CasesApiResponse = {
  data: CaseRecord[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

type CaseFormState = {
  reference: string;
  client_name: string;
  case_type: string;
  court_name: string;
  status: string;
  owner_name: string;
  opened_at: string;
  notes: string;
};

type CaseMainTab =
  | "info"
  | "parties"
  | "timeline"
  | "sessions"
  | "officeTasks"
  | "expenses"
  | "analysis";

type SecondaryTab =
  | "documents"
  | "requiredData"
  | "appointments"
  | "approvals"
  | "payments";

type PartyRecord = {
  id: number;
  name: string;
  role: string;
  nationalId: string;
  email: string;
  phone: string;
};

type TimelineRecord = {
  id: number;
  occurredAt: string;
  source: string;
  type: string;
  title: string;
  details: string;
};

type SessionRecord = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  judge: string;
  location: string;
  status: string;
  result: string;
  notes: string;
};

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
  category: string;
  amount: string;
  currency: string;
  createdBy: string;
  billable: boolean;
  receiptName: string;
  notes: string;
};

type PartyFormState = Omit<PartyRecord, "id">;
type TimelineFormState = Omit<TimelineRecord, "id">;
type SessionFormState = Omit<SessionRecord, "id">;
type OfficeTaskFormState = Omit<OfficeTaskRecord, "id" | "createdBy">;
type ExpenseFormState = Omit<ExpenseRecord, "id" | "receiptName"> & {
  receiptFile: File | null;
};

type CaseExtrasStore = {
  parties: PartyRecord[];
  timeline: TimelineRecord[];
  sessions: SessionRecord[];
  officeTasks: OfficeTaskRecord[];
  expenses: ExpenseRecord[];
  documents: DocumentRecord[];
  requiredData: RequiredDataRecord[];
  appointments: AppointmentRecord[];
  approvals: ApprovalRecord[];
  payments: PaymentRecord[];
};

type DocumentRecord = {
  id: number;
  title: string;
  category: string;
  format: "PDF" | "صورة" | "مستند";
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

type FileRequestFormState = {
  fileName: string;
  hint: string;
  dueDate: string;
  message: string;
};

type AppointmentFormState = {
  availableFrom: string;
  availableTo: string;
  dayStart: string;
  dayEnd: string;
  location: string;
  dueDate: string;
  message: string;
  status: "قيد الانتظار" | "مؤكد" | "مكتمل" | "ملغي";
  isPrivate: boolean;
  clientAppointment: string;
};

type ApprovalFormState = {
  requestedFile: File | null;
  signedFile: File | null;
  subject: string;
  deadline: string;
  dueDate: string;
  message: string;
  decision: "معلق" | "موافق" | "مرفوض";
  isPrivate: boolean;
};

type InvoiceItem = {
  id: number;
  type: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
};

type PaymentFormState = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: "مسودة" | "مدفوع" | "متأخر" | "ملغي";
  currency: string;
  note: string;
  discount: number;
  items: InvoiceItem[];
};

const emptyForm: CaseFormState = {
  reference: "",
  client_name: "",
  case_type: "",
  court_name: "",
  status: "مفتوحة",
  owner_name: "",
  opened_at: "",
  notes: "",
};

const emptyPartyForm: PartyFormState = {
  name: "",
  role: "",
  nationalId: "",
  email: "",
  phone: "",
};

const emptyTimelineForm: TimelineFormState = {
  occurredAt: "",
  source: "النظام",
  type: "تحديث",
  title: "",
  details: "",
};

const emptySessionForm: SessionFormState = {
  date: "",
  startTime: "",
  endTime: "",
  judge: "",
  location: "",
  status: "مجدولة",
  result: "",
  notes: "",
};

const emptyOfficeTaskForm: OfficeTaskFormState = {
  title: "",
  description: "",
  assignee: "",
  status: "قيد التنفيذ",
  priority: "متوسطة",
  dueDate: "",
};

const emptyExpenseForm: ExpenseFormState = {
  date: "",
  category: "",
  amount: "",
  currency: "SAR",
  createdBy: "",
  billable: false,
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
  fromTemplate: true,
  template: "",
  message: "",
  dueDate: "",
  isPrivate: false,
  sentBy: "",
  sentAt: "",
};

const emptyFileRequestForm: FileRequestFormState = {
  fileName: "",
  hint: "",
  dueDate: "",
  message: "",
};

const emptyAppointmentForm: AppointmentFormState = {
  availableFrom: "",
  availableTo: "",
  dayStart: "",
  dayEnd: "",
  location: "",
  dueDate: "",
  message: "",
  status: "قيد الانتظار",
  isPrivate: false,
  clientAppointment: "",
};

const emptyApprovalForm: ApprovalFormState = {
  requestedFile: null,
  signedFile: null,
  subject: "",
  deadline: "",
  dueDate: "",
  message: "",
  decision: "معلق",
  isPrivate: false,
};

const createEmptyInvoiceItem = (): InvoiceItem => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  type: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  tax: 0,
});

const emptyPaymentForm: PaymentFormState = {
  invoiceNumber: "",
  issueDate: "",
  dueDate: "",
  status: "مسودة",
  currency: "SAR",
  note: "",
  discount: 0,
  items: [createEmptyInvoiceItem()],
};

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClose: () => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active, onClose, ref]);
}

function badgeClasses(value: string) {
  if (value.includes("مفتوحة") || value.includes("نشط")) return "bg-[#f8e7be] text-[#7a5208]";
  if (value.includes("انتظار") || value.includes("مجدولة")) return "bg-[#fff5df] text-[#d47a00]";
  if (value.includes("مغلقة") || value.includes("مكتملة")) return "bg-[#ebfff1] text-[#14954c]";
  return "bg-[#edf5ff] text-[#2769b8]";
}

function priorityBadgeClasses(value: string) {
  if (value.includes("عاجل") || value.includes("عالية")) return "bg-[#ffe9e9] text-[#b23b3b]";
  if (value.includes("متوسطة")) return "bg-[#fff5df] text-[#a96b0f]";
  return "bg-[#ebfff1] text-[#1f7f4c]";
}

function EmptyState({ text }: Readonly<{ text: string }>) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d7e2f1] bg-[#f8fbff] px-4 py-10 text-center text-sm text-[#718aa9] dark:border-[#29405d] dark:bg-[#132238] dark:text-[#9ab2cf]">
      {text}
    </div>
  );
}

function CaseSectionCard({
  title,
  action,
  children,
}: Readonly<{
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}>) {
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

function CaseModal({
  open,
  title,
  width = "max-w-3xl",
  onClose,
  footer,
  children,
}: Readonly<{
  open: boolean;
  title: string;
  width?: string;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}>) {
  const { dir } = useOfficePreferences();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose, open);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#081b34]/50 p-4">
      <div
        ref={ref}
        dir={dir}
        className={clsx(
          "w-full rounded-3xl border border-[#d9e3f1] bg-white p-5 shadow-[0_25px_60px_rgba(12,34,62,0.24)] dark:border-[#2a3d58] dark:bg-[#0f1b2e] sm:p-6",
          width,
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0f3258] dark:text-[#edf4ff]">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6f84a0] hover:bg-[#f1f6fc] dark:text-[#93a8c4] dark:hover:bg-[#192a42]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div>{children}</div>
        {footer ? <div className="mt-6 flex flex-wrap items-center justify-start gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}

export function CasesManagement({ page: _page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, t, translateText } = useOfficePreferences();
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState<CasesApiResponse["meta"] | null>(null);
  const [form, setForm] = useState<CaseFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [mainTab, setMainTab] = useState<CaseMainTab>("info");
  const [secondaryTab, setSecondaryTab] = useState<SecondaryTab>("documents");
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [partyModalOpen, setPartyModalOpen] = useState(false);
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [officeTaskModalOpen, setOfficeTaskModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [requiredDataModalOpen, setRequiredDataModalOpen] = useState(false);
  const [fileRequestModalOpen, setFileRequestModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
  const [partyForm, setPartyForm] = useState<PartyFormState>(emptyPartyForm);
  const [timelineForm, setTimelineForm] = useState<TimelineFormState>(emptyTimelineForm);
  const [sessionForm, setSessionForm] = useState<SessionFormState>(emptySessionForm);
  const [officeTaskForm, setOfficeTaskForm] = useState<OfficeTaskFormState>(emptyOfficeTaskForm);
  const [expenseForm, setExpenseForm] = useState<ExpenseFormState>(emptyExpenseForm);
  const [documentForm, setDocumentForm] = useState<DocumentFormState>(emptyDocumentForm);
  const [requiredDataForm, setRequiredDataForm] = useState<RequiredDataFormState>(emptyRequiredDataForm);
  const [fileRequestForm, setFileRequestForm] = useState<FileRequestFormState>(emptyFileRequestForm);
  const [appointmentForm, setAppointmentForm] = useState<AppointmentFormState>(emptyAppointmentForm);
  const [approvalForm, setApprovalForm] = useState<ApprovalFormState>(emptyApprovalForm);
  const [paymentForm, setPaymentForm] = useState<PaymentFormState>(emptyPaymentForm);
  const [secondarySearch, setSecondarySearch] = useState("");
  const [extras, setExtras] = useState<Record<number, CaseExtrasStore>>({});
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const selectedCase = useMemo(
    () => cases.find((item) => item.id === selectedCaseId) ?? null,
    [cases, selectedCaseId],
  );

  const currentExtras: CaseExtrasStore = useMemo(() => {
    if (!selectedCaseId) {
      return { parties: [], timeline: [], sessions: [], officeTasks: [], expenses: [] };
    }
    return (
      extras[selectedCaseId] ?? {
        parties: [],
        timeline: [],
        sessions: [],
        officeTasks: [],
        expenses: [],
        documents: [],
        requiredData: [],
        appointments: [],
        approvals: [],
        payments: [],
      }
    );
  }, [extras, selectedCaseId]);

  const loadCases = async (query = "") => {
    const url = new URL("/api/office/cases", window.location.origin);
    if (query.trim()) url.searchParams.set("search", query.trim());
    const response = await fetch(url.toString(), { method: "GET", cache: "no-store" });
    if (!response.ok) throw new Error("تعذر تحميل القضايا.");
    const payload = (await response.json()) as CasesApiResponse;
    setCases(payload.data);
    setMeta(payload.meta);
  };

  useEffect(() => {
    startTransition(() => {
      loadCases().catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "حدث خطأ غير متوقع.");
      });
    });
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const openCreateCase = () => {
    resetForm();
    setCaseModalOpen(true);
  };

  const openEditCase = (caseRecord: CaseRecord) => {
    setEditingId(caseRecord.id);
    setForm({
      reference: caseRecord.reference,
      client_name: caseRecord.client_name,
      case_type: caseRecord.case_type,
      court_name: caseRecord.court_name,
      status: caseRecord.status,
      owner_name: caseRecord.owner_name,
      opened_at: caseRecord.opened_at ?? "",
      notes: caseRecord.notes ?? "",
    });
    setCaseModalOpen(true);
  };

  const submitForm = async () => {
    setError(null);
    setSuccess(null);
    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/office/cases/${editingId}` : "/api/office/cases";
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        opened_at: form.opened_at || null,
        notes: form.notes || null,
      }),
    });
    const payload = (await response.json()) as { message?: string; errors?: Record<string, string[]> };
    if (!response.ok) {
      if (payload.errors) throw new Error(Object.values(payload.errors)[0]?.[0] ?? "فشل حفظ القضية.");
      throw new Error(payload.message ?? "فشل حفظ القضية.");
    }
    setSuccess(payload.message ?? "تم حفظ القضية.");
    setCaseModalOpen(false);
    resetForm();
    await loadCases(search);
  };

  const removeCase = async (id: number) => {
    setError(null);
    setSuccess(null);
    const response = await fetch(`/api/office/cases/${id}`, { method: "DELETE" });
    const payload = (await response.json()) as { message?: string };
    if (!response.ok) throw new Error(payload.message ?? "فشل حذف القضية.");
    setSuccess(payload.message ?? "تم حذف القضية.");
    if (editingId === id) resetForm();
    if (selectedCaseId === id) setSelectedCaseId(null);
    await loadCases(search);
  };

  const updateExtras = (updater: (current: CaseExtrasStore) => CaseExtrasStore) => {
    if (!selectedCaseId) return;
    setExtras((current) => {
      const nextCurrent = current[selectedCaseId] ?? {
        parties: [],
        timeline: [],
        sessions: [],
        officeTasks: [],
        expenses: [],
        documents: [],
        requiredData: [],
        appointments: [],
        approvals: [],
        payments: [],
      };
      return { ...current, [selectedCaseId]: updater(nextCurrent) };
    });
  };

  const invoiceTotals = useMemo(() => {
    const subtotal = paymentForm.items.reduce(
      (acc, item) => acc + Number(item.quantity || 0) * Number(item.unitPrice || 0),
      0,
    );
    const taxTotal = paymentForm.items.reduce((acc, item) => {
      const line = Number(item.quantity || 0) * Number(item.unitPrice || 0);
      return acc + line * (Number(item.tax || 0) / 100);
    }, 0);
    const finalTotal = subtotal - Number(paymentForm.discount || 0) + taxTotal;
    return { subtotal, taxTotal, finalTotal };
  }, [paymentForm.discount, paymentForm.items]);

  const primaryTabs: Array<{ key: CaseMainTab; label: string }> = [
    { key: "info", label: "معلومات" },
    { key: "parties", label: "الأطراف" },
    { key: "timeline", label: "الخط الزمني" },
    { key: "sessions", label: "الجلسات" },
    { key: "officeTasks", label: "مهام المكتب" },
    { key: "expenses", label: "المصروفات" },
    { key: "analysis", label: "تحليل القضية" },
  ];

  const secondaryTabs: Array<{ key: SecondaryTab; label: string }> = [
    { key: "documents", label: "المستندات" },
    { key: "requiredData", label: "البيانات المطلوبة" },
    { key: "appointments", label: "المواعيد" },
    { key: "approvals", label: "التوقيعات / الموافقات" },
    { key: "payments", label: "المدفوعات" },
  ];

  const textAlign = dir === "rtl" ? "text-right" : "text-left";

  return (
    <div dir={dir} className={clsx("space-y-6 rounded-[1.8rem] bg-[#f2f6fc] p-4 dark:bg-[#0b1728] sm:p-5", textAlign)}>
      {selectedCase ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("القضايا / قضية / عرض")}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("عرض قضية")}</h1>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCaseId(null)}
                  className="rounded-xl border border-[#d5e1ef] bg-white px-4 py-2 text-sm text-[#40658f] hover:bg-[#f4f8fd] dark:border-[#28405c] dark:bg-[#102038] dark:text-[#a7bfdc]"
                >
                  {translateText("رجوع")}
                </button>
                <button
                  type="button"
                  onClick={() => openEditCase(selectedCase)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d3058] dark:bg-[#204d82]"
                >
                  <Pencil className="h-4 w-4" />
                  {t.edit}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#d6e2f1] bg-white p-2 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="inline-flex min-w-full gap-2">
              {primaryTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMainTab(tab.key)}
                  className={clsx(
                    "rounded-xl px-4 py-2 text-sm whitespace-nowrap",
                    mainTab === tab.key
                      ? "bg-[#e7f0fb] text-[#123d6a] dark:bg-[#1a3554] dark:text-[#c8dcf5]"
                      : "text-[#5f7fa3] hover:bg-[#f2f7fd] dark:text-[#98afcc] dark:hover:bg-[#15263d]",
                  )}
                >
                  {translateText(tab.label)}
                </button>
              ))}
            </div>
          </div>

          {mainTab === "info" ? (
            <div className="grid gap-5 xl:grid-cols-2">
              <CaseSectionCard title={translateText("الملخص")}>
                <p className="text-sm leading-7 text-[#567395] dark:text-[#98adca]">{selectedCase.notes || "-"}</p>
              </CaseSectionCard>
              <CaseSectionCard title={translateText("معلومات القضية")}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["المرجع", selectedCase.reference],
                    ["العنوان", selectedCase.reference],
                    ["النوع", selectedCase.case_type],
                    ["العميل", selectedCase.client_name],
                    ["المحكمة", selectedCase.court_name],
                    ["الحالة", selectedCase.status],
                    ["تاريخ الإضافة", selectedCase.opened_at ?? "-"],
                    ["المحامي المسؤول", selectedCase.owner_name],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-[#e1e9f5] bg-[#fbfdff] p-3 dark:border-[#243953] dark:bg-[#122136]">
                      <p className="text-xs text-[#7e93af] dark:text-[#8ea5c2]">{translateText(label)}</p>
                      {label === "الحالة" ? (
                        <span className={clsx("mt-2 inline-flex rounded-full px-3 py-1 text-xs", badgeClasses(String(value)))}>
                          {translateText(String(value))}
                        </span>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-[#173f68] dark:text-[#e3ecfa]">{translateText(String(value))}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CaseSectionCard>
            </div>
          ) : null}

          {mainTab === "parties" ? (
            <CaseSectionCard
              title={translateText("أطراف القضية")}
              action={
                <button type="button" onClick={() => setPartyModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">
                  <Plus className="h-4 w-4" />
                  {translateText("إضافة طرف")}
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#113a68] text-white">
                    <tr>
                      {["الاسم", "الصفة", "الرقم القومي", "البريد الإلكتروني", "الهاتف"].map((col) => (
                        <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentExtras.parties.map((row) => (
                      <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3">{row.name}</td>
                        <td className="px-4 py-3">{row.role}</td>
                        <td className="px-4 py-3">{row.nationalId}</td>
                        <td className="px-4 py-3">{row.email || "-"}</td>
                        <td className="px-4 py-3">{row.phone || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentExtras.parties.length === 0 ? <EmptyState text={translateText("لا توجد بيانات بعد.")} /> : null}
            </CaseSectionCard>
          ) : null}

          {mainTab === "timeline" ? (
            <CaseSectionCard
              title={translateText("الخط الزمني للقضية")}
              action={
                <button type="button" onClick={() => setTimelineModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">
                  <Plus className="h-4 w-4" />
                  {translateText("إضافة حدث")}
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#113a68] text-white">
                    <tr>
                      {["التاريخ والوقت", "مصدر", "النوع", "العنوان", "التفاصيل"].map((col) => (
                        <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentExtras.timeline.map((row) => (
                      <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3">{row.occurredAt}</td>
                        <td className="px-4 py-3">{row.source}</td>
                        <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.type))}>{row.type}</span></td>
                        <td className="px-4 py-3">{row.title}</td>
                        <td className="px-4 py-3">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentExtras.timeline.length === 0 ? <EmptyState text={translateText("لا توجد بيانات بعد.")} /> : null}
            </CaseSectionCard>
          ) : null}

          {mainTab === "sessions" ? (
            <CaseSectionCard
              title={translateText("جلسات المحكمة")}
              action={
                <button type="button" onClick={() => { setEditingSessionId(null); setSessionForm(emptySessionForm); setSessionModalOpen(true); }} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">
                  <Plus className="h-4 w-4" />
                  {translateText("إضافة جلسة")}
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#113a68] text-white">
                    <tr>
                      {["#", "التاريخ", "الوقت", "المكان", "القاضي", "الحالة", "النتيجة", "الإجراءات"].map((col) => (
                        <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentExtras.sessions.map((row, index) => (
                      <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{row.date}</td>
                        <td className="px-4 py-3">{row.startTime} - {row.endTime}</td>
                        <td className="px-4 py-3">{row.location}</td>
                        <td className="px-4 py-3">{row.judge}</td>
                        <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.status))}>{row.status}</span></td>
                        <td className="px-4 py-3">{row.result || "-"}</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSessionId(row.id);
                              setSessionForm({
                                date: row.date,
                                startTime: row.startTime,
                                endTime: row.endTime,
                                judge: row.judge,
                                location: row.location,
                                status: row.status,
                                result: row.result,
                                notes: row.notes,
                              });
                              setSessionModalOpen(true);
                            }}
                            className="rounded-lg bg-[#e8f0fb] px-3 py-1 text-xs text-[#245d9d] dark:bg-[#1a3454] dark:text-[#a4c6ee]"
                          >
                            {t.edit}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentExtras.sessions.length === 0 ? <EmptyState text={translateText("لا توجد بيانات بعد.")} /> : null}
            </CaseSectionCard>
          ) : null}

          {mainTab === "officeTasks" ? (
            <CaseSectionCard
              title={translateText("مهام المكتب")}
              action={
                <button type="button" onClick={() => setOfficeTaskModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">
                  <Plus className="h-4 w-4" />
                  {translateText("إضافة مهمة")}
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#113a68] text-white">
                    <tr>
                      {["المهمة", "الحالة", "الأولوية", "الاستحقاق", "مسندة إلى", "تم الإنشاء بواسطة"].map((col) => (
                        <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentExtras.officeTasks.map((row) => (
                      <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3">{row.title}</td>
                        <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.status))}>{row.status}</span></td>
                        <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", priorityBadgeClasses(row.priority))}>{row.priority}</span></td>
                        <td className="px-4 py-3">{row.dueDate || "-"}</td>
                        <td className="px-4 py-3">{row.assignee}</td>
                        <td className="px-4 py-3">{row.createdBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentExtras.officeTasks.length === 0 ? <EmptyState text={translateText("لا توجد بيانات بعد.")} /> : null}
            </CaseSectionCard>
          ) : null}

          {mainTab === "expenses" ? (
            <CaseSectionCard
              title={translateText("المصروفات")}
              action={
                <button type="button" onClick={() => setExpenseModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">
                  <Plus className="h-4 w-4" />
                  {translateText("إضافة مصروف")}
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#113a68] text-white">
                    <tr>
                      {["التاريخ", "التصنيف", "المبلغ", "العملة", "تم بواسطة", "قابل للفوترة"].map((col) => (
                        <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentExtras.expenses.map((row) => (
                      <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                        <td className="px-4 py-3">{row.date}</td>
                        <td className="px-4 py-3">{row.category}</td>
                        <td className="px-4 py-3">{row.amount}</td>
                        <td className="px-4 py-3">{row.currency}</td>
                        <td className="px-4 py-3">{row.createdBy}</td>
                        <td className="px-4 py-3">
                          <span className={clsx("rounded-full px-3 py-1 text-xs", row.billable ? "bg-[#ebfff1] text-[#14954c]" : "bg-[#edf5ff] text-[#2769b8]")}>
                            {row.billable ? translateText("نعم") : translateText("لا")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentExtras.expenses.length === 0 ? <EmptyState text={translateText("لا توجد مصروفات بعد.")} /> : null}
            </CaseSectionCard>
          ) : null}

          {mainTab === "analysis" ? (
            <CaseSectionCard title={translateText("تحليل القضية بالذكاء الاصطناعي")}>
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-[#e0e8f5] bg-[#fbfdff] p-3 dark:border-[#243953] dark:bg-[#122136]">
                  <p className="text-xs text-[#7a91ad] dark:text-[#8ea5c2]">{translateText("الحالة")}</p>
                  <p className="mt-1 text-sm font-semibold text-[#153d67] dark:text-[#e3ecfa]">{translateText("جاهز")}</p>
                </div>
                <div className="rounded-xl border border-[#e0e8f5] bg-[#fbfdff] p-3 dark:border-[#243953] dark:bg-[#122136]">
                  <p className="text-xs text-[#7a91ad] dark:text-[#8ea5c2]">{translateText("آخر تحديث")}</p>
                  <p className="mt-1 text-sm font-semibold text-[#153d67] dark:text-[#e3ecfa]">{new Date().toLocaleDateString(isArabic ? "ar" : "en")}</p>
                </div>
                <div className="rounded-xl border border-[#e0e8f5] bg-[#fbfdff] p-3 dark:border-[#243953] dark:bg-[#122136]">
                  <p className="text-xs text-[#7a91ad] dark:text-[#8ea5c2]">{translateText("مؤشر القوة")}</p>
                  <p className="mt-1 text-sm font-semibold text-[#153d67] dark:text-[#e3ecfa]">82%</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-[#d7ecd9] bg-[#effaf2] p-4 dark:border-[#2f4f37] dark:bg-[#163025]">
                  <h4 className="mb-2 text-sm font-semibold text-[#1f6d3f] dark:text-[#9ee5bc]">{translateText("نقاط القوة")}</h4>
                  <ul className="space-y-2 text-sm text-[#2f6542] dark:text-[#b5e6c9]">
                    <li>{translateText("توثيق كامل للمستندات.")}</li>
                    <li>{translateText("أدلة داعمة لطلب العميل.")}</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[#f0d8d8] bg-[#fff2f2] p-4 dark:border-[#5a2f35] dark:bg-[#351f25]">
                  <h4 className="mb-2 text-sm font-semibold text-[#9f3e4b] dark:text-[#ffb2bd]">{translateText("نقاط الضعف")}</h4>
                  <ul className="space-y-2 text-sm text-[#7e4f56] dark:text-[#f3c0c8]">
                    <li>{translateText("الحاجة لشهادة خبير فني إضافية.")}</li>
                    <li>{translateText("تأخر في بعض المراسلات السابقة.")}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[translateText("تجهيز مذكرة نهائية قبل الجلسة القادمة."), translateText("التنسيق مع العميل لإرفاق مستندات إضافية.")].map((rec) => (
                  <div key={rec} className="rounded-xl border border-[#e0e8f5] bg-[#fbfdff] p-3 text-sm text-[#395e86] dark:border-[#243953] dark:bg-[#122136] dark:text-[#bad0ea]">
                    {rec}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["نزاع تجاري", "تعويض", "جلسة قادمة"].map((tag) => (
                  <span key={tag} className="rounded-full bg-[#edf4ff] px-3 py-1 text-xs text-[#3d6793] dark:bg-[#1a3352] dark:text-[#b2cbed]">
                    {translateText(tag)}
                  </span>
                ))}
              </div>
            </CaseSectionCard>
          ) : null}

          <div className="rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="overflow-x-auto">
              <div className="mx-auto inline-flex min-w-full justify-center gap-2">
                {secondaryTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSecondaryTab(tab.key)}
                    className={clsx(
                      "rounded-xl px-4 py-2 text-sm whitespace-nowrap",
                      secondaryTab === tab.key
                        ? "bg-[#e7f0fb] text-[#123d6a] dark:bg-[#1a3554] dark:text-[#c8dcf5]"
                        : "text-[#5f7fa3] hover:bg-[#f2f7fd] dark:text-[#98afcc] dark:hover:bg-[#15263d]",
                    )}
                  >
                    {translateText(tab.label)}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              {secondaryTab === "documents" ? (
                <CaseSectionCard
                  title={translateText("المستندات")}
                  action={
                    <button type="button" onClick={() => setDocumentModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white">
                      <Plus className="h-4 w-4" />
                      {translateText("إضافة مستند")}
                    </button>
                  }
                >
                  <div className="mb-3">
                    <label className="relative block w-full max-w-md">
                      <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
                      <input value={secondarySearch} onChange={(e) => setSecondarySearch(e.target.value)} placeholder={translateText("بحث بالمستندات...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
                    </label>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-[980px] w-full text-sm">
                      <thead className="bg-[#113a68] text-white">
                        <tr>
                          {["العنوان", "التصنيف", "الصيغة", "الظهور", "تاريخ الرفع", "تم الرفع بواسطة", "الإجراءات"].map((col) => <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {currentExtras.documents
                          .filter((item) => `${item.title} ${item.category}`.includes(secondarySearch))
                          .map((row) => (
                            <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                              <td className="px-4 py-3">{row.title}</td>
                              <td className="px-4 py-3">{row.category}</td>
                              <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.format))}>{row.format}</span></td>
                              <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.visibility))}>{row.visibility}</span></td>
                              <td className="px-4 py-3">{row.uploadedAt}</td>
                              <td className="px-4 py-3">{row.uploadedBy}</td>
                              <td className="px-4 py-3">
                                <div className="flex flex-wrap items-center gap-1">
                                  <button className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]">{translateText("عرض")}</button>
                                  <button className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{t.edit}</button>
                                  <button className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">{t.delete}</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {currentExtras.documents.length === 0 ? <EmptyState text={translateText("لا توجد مستندات بعد.")} /> : null}
                </CaseSectionCard>
              ) : null}

              {secondaryTab === "requiredData" ? (
                <CaseSectionCard
                  title={translateText("البيانات المطلوبة")}
                  action={
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => setRequiredDataModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("طلب بيانات")}</button>
                      <button type="button" onClick={() => setFileRequestModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-[#d7e2f0] bg-white px-3 py-2 text-sm text-[#456b95]"><Paperclip className="h-4 w-4" />{translateText("طلب ملف")}</button>
                    </div>
                  }
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full text-sm">
                      <thead className="bg-[#113a68] text-white">
                        <tr>
                          {["القالب", "تم الإرسال بواسطة", "وقت الإرسال", "الاستحقاق", "خاص", "الإجراءات"].map((col) => <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {currentExtras.requiredData.map((row) => (
                          <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                            <td className="px-4 py-3">{row.template}</td>
                            <td className="px-4 py-3">{row.sentBy}</td>
                            <td className="px-4 py-3">{row.sentAt}</td>
                            <td className="px-4 py-3">{row.dueDate}</td>
                            <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", row.isPrivate ? "bg-[#f8e7be] text-[#7a5208]" : "bg-[#edf5ff] text-[#2769b8]")}>{row.isPrivate ? translateText("خاص") : translateText("عام")}</span></td>
                            <td className="px-4 py-3"><div className="flex gap-1"><button className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]">{translateText("عرض")}</button><button className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{t.edit}</button><button className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">{t.delete}</button></div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {currentExtras.requiredData.length === 0 ? <EmptyState text={translateText("لا توجد طلبات بيانات بعد.")} /> : null}
                </CaseSectionCard>
              ) : null}

              {secondaryTab === "appointments" ? (
                <CaseSectionCard
                  title={translateText("المواعيد")}
                  action={<button type="button" onClick={() => setAppointmentModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة موعد")}</button>}
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full text-sm">
                      <thead className="bg-[#113a68] text-white">
                        <tr>{["الحالة", "متاح من", "متاح إلى", "موعد العميل", "الموقع", "الإجراءات"].map((col) => <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>)}</tr>
                      </thead>
                      <tbody>
                        {currentExtras.appointments.map((row) => (
                          <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                            <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.status))}>{row.status}</span></td>
                            <td className="px-4 py-3">{row.availableFrom}</td>
                            <td className="px-4 py-3">{row.availableTo}</td>
                            <td className="px-4 py-3">{row.clientAppointment || "-"}</td>
                            <td className="px-4 py-3">{row.location}</td>
                            <td className="px-4 py-3"><button className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{t.edit}</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {currentExtras.appointments.length === 0 ? <EmptyState text={translateText("لا توجد مواعيد بعد.")} /> : null}
                </CaseSectionCard>
              ) : null}

              {secondaryTab === "approvals" ? (
                <CaseSectionCard
                  title={translateText("التوقيعات / الموافقات")}
                  action={<button type="button" onClick={() => setApprovalModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("إضافة موافقة")}</button>}
                >
                  <div className="mb-3">
                    <label className="relative block w-full max-w-md">
                      <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
                      <input value={secondarySearch} onChange={(e) => setSecondarySearch(e.target.value)} placeholder={translateText("بحث...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
                    </label>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-[980px] w-full text-sm">
                      <thead className="bg-[#113a68] text-white">
                        <tr>{["الموضوع", "الملف المطلوب اعتماده", "الملف الموقع", "القرار", "الموعد النهائي", "وقت القرار", "الإجراءات"].map((col) => <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>)}</tr>
                      </thead>
                      <tbody>
                        {currentExtras.approvals
                          .filter((item) => `${item.subject} ${item.decision}`.includes(secondarySearch))
                          .map((row) => (
                            <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                              <td className="px-4 py-3">{row.subject}</td>
                              <td className="px-4 py-3">{row.requestedFile || "-"}</td>
                              <td className="px-4 py-3">{row.signedFile || "-"}</td>
                              <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.decision))}>{row.decision}</span></td>
                              <td className="px-4 py-3">{row.deadline}</td>
                              <td className="px-4 py-3">{row.decisionAt || "-"}</td>
                              <td className="px-4 py-3"><button className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{t.edit}</button></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {currentExtras.approvals.length === 0 ? <EmptyState text={translateText("لا توجد توقيع أو موافقة\nقم بإضافة توقيع أو موافقة للبدء.")} /> : null}
                </CaseSectionCard>
              ) : null}

              {secondaryTab === "payments" ? (
                <CaseSectionCard
                  title={translateText("المدفوعات")}
                  action={<button type="button" onClick={() => setPaymentModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-3 py-2 text-sm text-white"><Plus className="h-4 w-4" />{translateText("طلب دفع")}</button>}
                >
                  <div className="mb-3">
                    <label className="relative block w-full max-w-md">
                      <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
                      <input value={secondarySearch} onChange={(e) => setSecondarySearch(e.target.value)} placeholder={translateText("بحث بالفواتير...")} className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")} />
                    </label>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full text-sm">
                      <thead className="bg-[#113a68] text-white">
                        <tr>{["#", "الإصدار", "الاستحقاق", "الإجمالي", "ملاحظة", "الحالة", "الإجراءات"].map((col) => <th key={col} className="px-4 py-3 font-medium">{translateText(col)}</th>)}</tr>
                      </thead>
                      <tbody>
                        {currentExtras.payments
                          .filter((item) => `${item.version} ${item.status}`.includes(secondarySearch))
                          .map((row, index) => (
                            <tr key={row.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                              <td className="px-4 py-3">{index + 1}</td>
                              <td className="px-4 py-3">{row.issueDate}</td>
                              <td className="px-4 py-3">{row.dueDate}</td>
                              <td className="px-4 py-3">{row.total.toFixed(2)}</td>
                              <td className="px-4 py-3">{row.note || "-"}</td>
                              <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(row.status))}>{row.status}</span></td>
                              <td className="px-4 py-3"><button className="rounded-lg bg-[#e9f1fc] px-2 py-1 text-xs text-[#20518b]">{translateText("عرض")}</button></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {currentExtras.payments.length === 0 ? <EmptyState text={translateText("لا توجد مدفوعات بعد.")} /> : null}
                </CaseSectionCard>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <p className="text-sm text-[#7f95b1] dark:text-[#8ea3c0]">{translateText("القضايا / القائمة")}</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("القضايا")}</h1>
              <button type="button" onClick={openCreateCase} className="inline-flex items-center gap-2 rounded-xl bg-[#103a67] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d3058] dark:bg-[#204d82]">
                <Plus className="h-4 w-4" />
                {t.addCase}
              </button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row">
              <label className="relative block w-full">
                <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={translateText("ابحث في المرجع أو العميل أو المحكمة...")}
                  className={clsx(
                    "w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-3 text-sm text-[#16355e] outline-none focus:border-[#123f6f] focus:ring-2 focus:ring-[#e2ecf8] dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]",
                    dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3",
                  )}
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    loadCases(search).catch((loadError) => {
                      setError(loadError instanceof Error ? loadError.message : "حدث خطأ أثناء البحث.");
                    });
                  })
                }
                className="rounded-xl bg-[#103a67] px-5 py-3 text-sm text-white hover:bg-[#0d3058] dark:bg-[#204d82]"
              >
                {isPending ? translateText("جاري التحميل...") : translateText("بحث")}
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#dce6f3]">
              <table className="min-w-[980px] w-full text-sm">
                <thead className="bg-[#113a68] text-white">
                  <tr>
                    <th className="px-4 py-3 font-medium"><input type="checkbox" className="h-4 w-4 rounded border-white/60 bg-transparent" checked={selectedRows.length > 0 && selectedRows.length === cases.length} onChange={(event) => setSelectedRows(event.target.checked ? cases.map((item) => item.id) : [])} /></th>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">{translateText("العنوان")}</th>
                    <th className="px-4 py-3 font-medium">{translateText("النوع")}</th>
                    <th className="px-4 py-3 font-medium">{translateText("العميل")}</th>
                    <th className="px-4 py-3 font-medium">{translateText("الحالة")}</th>
                    <th className="px-4 py-3 font-medium">{translateText("تاريخ الإضافة")}</th>
                    <th className="px-4 py-3 font-medium">{translateText("الإجراءات")}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#0f1b2d]">
                  {cases.map((caseRecord, index) => (
                    <tr key={caseRecord.id} className="border-t border-[#e7eef8] dark:border-[#223752]">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-[#9eb4cf]"
                          checked={selectedRows.includes(caseRecord.id)}
                          onChange={(event) =>
                            setSelectedRows((current) =>
                              event.target.checked
                                ? [...current, caseRecord.id]
                                : current.filter((id) => id !== caseRecord.id),
                            )
                          }
                        />
                      </td>
                      <td className="px-4 py-3 text-[#1e3553] dark:text-[#e0e8f6]">{index + 1}</td>
                      <td className="px-4 py-3 text-[#1e3553] dark:text-[#e0e8f6]">{caseRecord.reference}</td>
                      <td className="px-4 py-3 text-[#1e3553] dark:text-[#e0e8f6]">{translateText(caseRecord.case_type)}</td>
                      <td className="px-4 py-3 text-[#1e3553] dark:text-[#e0e8f6]">{translateText(caseRecord.client_name)}</td>
                      <td className="px-4 py-3"><span className={clsx("rounded-full px-3 py-1 text-xs", badgeClasses(caseRecord.status))}>{translateText(caseRecord.status)}</span></td>
                      <td className="px-4 py-3 text-[#1e3553] dark:text-[#e0e8f6]">{caseRecord.opened_at ?? "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1">
                          <button type="button" onClick={() => { setSelectedCaseId(caseRecord.id); setMainTab("info"); }} className="inline-flex items-center gap-1 rounded-lg bg-[#e9f1fc] px-3 py-1.5 text-xs text-[#20518b] dark:bg-[#1b3554] dark:text-[#afd0f2]">
                            <Eye className="h-3.5 w-3.5" />
                            {translateText("عرض")}
                          </button>
                          <button type="button" onClick={() => openEditCase(caseRecord)} className="inline-flex items-center gap-1 rounded-lg bg-[#edf5ff] px-3 py-1.5 text-xs text-[#2a67b5] dark:bg-[#13233a] dark:text-[#9ec3ee]">
                            <Pencil className="h-3.5 w-3.5" />
                            {t.edit}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              startTransition(() => {
                                removeCase(caseRecord.id).catch((removeError) => {
                                  setError(removeError instanceof Error ? removeError.message : "فشل حذف القضية.");
                                });
                              })
                            }
                            className="inline-flex items-center gap-1 rounded-lg bg-[#fff0f0] px-3 py-1.5 text-xs text-[#c54040] dark:bg-[#351923] dark:text-[#ff9aa8]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {cases.length === 0 ? <div className="mt-4"><EmptyState text={translateText("لا توجد قضايا مطابقة لنتيجة البحث الحالية.")} /></div> : null}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#dce6f3] bg-[#f8fbff] px-4 py-3 text-sm text-[#6683a5] dark:border-[#263b57] dark:bg-[#122238] dark:text-[#9bb2ce]">
              <span>{translateText("إجمالي السجلات:")} {meta?.total ?? cases.length}</span>
              <span>{translateText("الصفحة")} {meta?.current_page ?? 1} {translateText("من")} {meta?.last_page ?? 1}</span>
            </div>
          </div>
        </div>
      )}

      {error ? <p className="rounded-2xl bg-[#fff1f1] px-4 py-3 text-sm text-[#c33d3d] dark:bg-[#351923] dark:text-[#ff9aa8]">{error}</p> : null}
      {success ? <p className="rounded-2xl bg-[#eefcf2] px-4 py-3 text-sm text-[#14824a] dark:bg-[#123427] dark:text-[#7ce0ac]">{success}</p> : null}

      <CaseModal
        open={caseModalOpen}
        onClose={() => setCaseModalOpen(false)}
        title={editingId ? t.editCase : t.addCase}
        width="max-w-5xl"
        footer={
          <>
            <button type="button" onClick={() => setCaseModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
            <button
              type="button"
              onClick={() =>
                startTransition(() => {
                  submitForm().catch((submitError) => {
                    setError(submitError instanceof Error ? submitError.message : "حدث خطأ غير متوقع.");
                  });
                })
              }
              className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white dark:bg-[#204d82]"
            >
              {isPending ? translateText("جاري الحفظ...") : editingId ? translateText("حفظ التعديلات") : translateText("إنشاء قضية")}
            </button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["reference", "المرجع"],
            ["client_name", "العميل"],
            ["case_type", "نوع القضية"],
            ["court_name", "المحكمة"],
            ["owner_name", "المحامي المسؤول"],
            ["opened_at", "تاريخ الفتح"],
          ].map(([key, label]) => (
            <label key={key} className={clsx("block", key === "reference" ? "md:col-span-2" : "")}>
              <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{translateText(label)} <span className="text-[#d44b4b]">*</span></span>
              <input
                type={key === "opened_at" ? "date" : "text"}
                value={form[key as keyof CaseFormState]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none focus:border-[#123f6f] focus:ring-2 focus:ring-[#e2ecf8] dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.status} <span className="text-[#d44b4b]">*</span></span>
            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none focus:border-[#123f6f] focus:ring-2 focus:ring-[#e2ecf8] dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]">
              <option value="مفتوحة">{t.open}</option>
              <option value="قيد الانتظار">{t.pending}</option>
              <option value="مغلقة">{t.closed}</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-[#6d84a1] dark:text-[#8da0bd]">{t.notes}</span>
            <textarea rows={4} value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] px-4 py-3 text-sm text-[#16355e] outline-none focus:border-[#123f6f] focus:ring-2 focus:ring-[#e2ecf8] dark:border-[#1d2d46] dark:bg-[#122136] dark:text-[#eef4ff]" />
          </label>
        </div>
      </CaseModal>

      <CaseModal
        open={partyModalOpen}
        onClose={() => setPartyModalOpen(false)}
        title={translateText("إضافة طرف للقضية")}
        width="max-w-3xl"
        footer={
          <>
            <button type="button" onClick={() => setPartyModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, parties: [...current.parties, { id: Date.now(), ...partyForm }] })); setPartyModalOpen(false); setPartyForm(emptyPartyForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الاسم <span className="text-[#d44b4b]">*</span></span><input value={partyForm.name} onChange={(e) => setPartyForm((c) => ({ ...c, name: e.target.value }))} placeholder={translateText("الاسم الكامل")} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الصفة / الطرف</span><input value={partyForm.role} onChange={(e) => setPartyForm((c) => ({ ...c, role: e.target.value }))} placeholder={translateText("مدعي / مدعى عليه")} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الرقم القومي</span><input value={partyForm.nationalId} onChange={(e) => setPartyForm((c) => ({ ...c, nationalId: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">البريد الإلكتروني</span><input value={partyForm.email} onChange={(e) => setPartyForm((c) => ({ ...c, email: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الهاتف</span><input value={partyForm.phone} onChange={(e) => setPartyForm((c) => ({ ...c, phone: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={timelineModalOpen}
        onClose={() => setTimelineModalOpen(false)}
        title={translateText("إضافة حدث للخط الزمني")}
        width="max-w-3xl"
        footer={
          <>
            <button type="button" onClick={() => setTimelineModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, timeline: [...current.timeline, { id: Date.now(), ...timelineForm }] })); setTimelineModalOpen(false); setTimelineForm(emptyTimelineForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت الحدث <span className="text-[#d44b4b]">*</span></span><input dir="ltr" type="datetime-local" value={timelineForm.occurredAt} onChange={(e) => setTimelineForm((c) => ({ ...c, occurredAt: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">النوع</span><select value={timelineForm.type} onChange={(e) => setTimelineForm((c) => ({ ...c, type: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option>تحديث</option><option>جلسة</option><option>تنبيه</option></select></label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">العنوان <span className="text-[#d44b4b]">*</span></span><input value={timelineForm.title} onChange={(e) => setTimelineForm((c) => ({ ...c, title: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">التفاصيل</span><textarea rows={4} value={timelineForm.details} onChange={(e) => setTimelineForm((c) => ({ ...c, details: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={sessionModalOpen}
        onClose={() => setSessionModalOpen(false)}
        title={translateText(editingSessionId ? "تعديل جلسة" : "إضافة جلسة")}
        width="max-w-5xl"
        footer={
          <>
            <button type="button" onClick={() => setSessionModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { if (editingSessionId) { updateExtras((current) => ({ ...current, sessions: current.sessions.map((item) => item.id === editingSessionId ? { id: editingSessionId, ...sessionForm } : item) })); } else { updateExtras((current) => ({ ...current, sessions: [...current.sessions, { id: Date.now(), ...sessionForm }] })); } setSessionModalOpen(false); setEditingSessionId(null); setSessionForm(emptySessionForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{isPending ? translateText("جاري الحفظ...") : translateText("حفظ")}</button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الجلسة</span><input type="date" value={sessionForm.date} onChange={(e) => setSessionForm((c) => ({ ...c, date: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={sessionForm.status} onChange={(e) => setSessionForm((c) => ({ ...c, status: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option>مجدولة</option><option>مؤجلة</option><option>منعقدة</option></select></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت البدء</span><input dir="ltr" type="time" value={sessionForm.startTime} onChange={(e) => setSessionForm((c) => ({ ...c, startTime: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت الانتهاء</span><input dir="ltr" type="time" value={sessionForm.endTime} onChange={(e) => setSessionForm((c) => ({ ...c, endTime: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">القاضي</span><input value={sessionForm.judge} onChange={(e) => setSessionForm((c) => ({ ...c, judge: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">المكان</span><input value={sessionForm.location} onChange={(e) => setSessionForm((c) => ({ ...c, location: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">النتيجة</span><input value={sessionForm.result} onChange={(e) => setSessionForm((c) => ({ ...c, result: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={sessionForm.notes} onChange={(e) => setSessionForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={officeTaskModalOpen}
        onClose={() => setOfficeTaskModalOpen(false)}
        title={translateText("إضافة مهمة مكتبية")}
        width="max-w-4xl"
        footer={
          <>
            <button type="button" onClick={() => setOfficeTaskModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, officeTasks: [...current.officeTasks, { id: Date.now(), ...officeTaskForm, createdBy: t.userName }] })); setOfficeTaskModalOpen(false); setOfficeTaskForm(emptyOfficeTaskForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العنوان</span><input value={officeTaskForm.title} onChange={(e) => setOfficeTaskForm((c) => ({ ...c, title: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الوصف</span><textarea rows={3} value={officeTaskForm.description} onChange={(e) => setOfficeTaskForm((c) => ({ ...c, description: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">مسندة إلى</span><input value={officeTaskForm.assignee} onChange={(e) => setOfficeTaskForm((c) => ({ ...c, assignee: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={officeTaskForm.status} onChange={(e) => setOfficeTaskForm((c) => ({ ...c, status: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option>قيد التنفيذ</option><option>مجدولة</option><option>مكتملة</option></select></label>
            <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الأولوية</span><select value={officeTaskForm.priority} onChange={(e) => setOfficeTaskForm((c) => ({ ...c, priority: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option>منخفضة</option><option>متوسطة</option><option>عالية</option><option>عاجل</option></select></label>
          </div>
          <label className="block md:max-w-sm"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={officeTaskForm.dueDate} onChange={(e) => setOfficeTaskForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title={translateText("إضافة مصروف")}
        width="max-w-5xl"
        footer={
          <>
            <button type="button" onClick={() => setExpenseModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, expenses: [...current.expenses, { id: Date.now(), date: expenseForm.date, category: expenseForm.category, amount: expenseForm.amount, currency: expenseForm.currency, createdBy: expenseForm.createdBy, billable: expenseForm.billable, receiptName: expenseForm.receiptFile?.name ?? "-", notes: expenseForm.notes }] })); setExpenseModalOpen(false); setExpenseForm(emptyExpenseForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التاريخ</span><input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm((c) => ({ ...c, date: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التصنيف</span><input value={expenseForm.category} onChange={(e) => setExpenseForm((c) => ({ ...c, category: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">المبلغ</span><input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm((c) => ({ ...c, amount: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العملة</span><select value={expenseForm.currency} onChange={(e) => setExpenseForm((c) => ({ ...c, currency: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option>SAR</option><option>USD</option><option>EUR</option></select></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تم بواسطة</span><input value={expenseForm.createdBy} onChange={(e) => setExpenseForm((c) => ({ ...c, createdBy: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block">
            <span className="mb-2 block text-sm text-[#6d84a1]">قابل للفوترة</span>
            <button type="button" onClick={() => setExpenseForm((c) => ({ ...c, billable: !c.billable }))} className={clsx("inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm", expenseForm.billable ? "border-[#1f7a56] bg-[#ecfaf1] text-[#196447]" : "border-[#d9e4f4] bg-white text-[#567395]")}>
              <CheckCircle2 className="h-4 w-4" />
              {expenseForm.billable ? translateText("نعم") : translateText("لا")}
            </button>
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-[#6d84a1]">الإيصال</span>
            <div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4 dark:border-[#2c4260] dark:bg-[#122238]">
              <input type="file" onChange={(e) => setExpenseForm((c) => ({ ...c, receiptFile: e.target.files?.[0] ?? null }))} />
            </div>
          </label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={expenseForm.notes} onChange={(e) => setExpenseForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={documentModalOpen}
        onClose={() => setDocumentModalOpen(false)}
        title={translateText("إضافة مستند")}
        width="max-w-4xl"
        footer={
          <>
            <button type="button" onClick={() => setDocumentModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, documents: [...current.documents, { id: Date.now(), title: documentForm.title, category: documentForm.category, format: documentForm.file?.type.includes("pdf") ? "PDF" : documentForm.file?.type.includes("image") ? "صورة" : "مستند", visibility: documentForm.visibility, uploadedAt: new Date().toLocaleDateString(isArabic ? "ar" : "en"), uploadedBy: t.userName, notes: documentForm.notes }] })); setDocumentModalOpen(false); setDocumentForm(emptyDocumentForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, documents: [...current.documents, { id: Date.now(), title: documentForm.title, category: documentForm.category, format: documentForm.file?.type.includes("pdf") ? "PDF" : documentForm.file?.type.includes("image") ? "صورة" : "مستند", visibility: documentForm.visibility, uploadedAt: new Date().toLocaleDateString(isArabic ? "ar" : "en"), uploadedBy: t.userName, notes: documentForm.notes }] })); setDocumentForm(emptyDocumentForm); }} className="rounded-xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248]">{translateText("إضافة وبدء إضافة المزيد")}</button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">العنوان <span className="text-[#d44b4b]">*</span></span><input value={documentForm.title} onChange={(e) => setDocumentForm((c) => ({ ...c, title: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التصنيف</span><select value={documentForm.category} onChange={(e) => setDocumentForm((c) => ({ ...c, category: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option value="">{translateText("اختر")}</option><option>عقد</option><option>هوية</option><option>مستند قضائي</option></select></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الظهور</span><select value={documentForm.visibility} onChange={(e) => setDocumentForm((c) => ({ ...c, visibility: e.target.value as DocumentFormState["visibility"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]"><option>للعميل</option><option>خاص</option><option>داخلي</option></select></label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-[#6d84a1]">الملف</span>
            <div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-5 text-center dark:border-[#2c4260] dark:bg-[#122238]">
              <FolderUp className="mx-auto mb-2 h-6 w-6 text-[#6f89ab]" />
              <p className="mb-2 text-sm text-[#567395]">{translateText("اسحب و ادرج ملفك أو تصفح")}</p>
              <input type="file" onChange={(e) => setDocumentForm((c) => ({ ...c, file: e.target.files?.[0] ?? null }))} />
            </div>
          </label>
          <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={3} value={documentForm.notes} onChange={(e) => setDocumentForm((c) => ({ ...c, notes: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm outline-none focus:border-[#123f6f]" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={requiredDataModalOpen}
        onClose={() => setRequiredDataModalOpen(false)}
        title={translateText("إضافة طلب بيانات")}
        width="max-w-5xl"
        footer={
          <>
            <button type="button" onClick={() => setRequiredDataModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, requiredData: [...current.requiredData, { id: Date.now(), template: requiredDataForm.template || "نموذج مخصص", sentBy: requiredDataForm.sentBy || t.userName, sentAt: requiredDataForm.sentAt || new Date().toLocaleString(isArabic ? "ar" : "en"), dueDate: requiredDataForm.dueDate, isPrivate: requiredDataForm.isPrivate }] })); setRequiredDataModalOpen(false); setRequiredDataForm(emptyRequiredDataForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button>
            <button type="button" onClick={() => { updateExtras((current) => ({ ...current, requiredData: [...current.requiredData, { id: Date.now(), template: requiredDataForm.template || "نموذج مخصص", sentBy: requiredDataForm.sentBy || t.userName, sentAt: requiredDataForm.sentAt || new Date().toLocaleString(isArabic ? "ar" : "en"), dueDate: requiredDataForm.dueDate, isPrivate: requiredDataForm.isPrivate }] })); setRequiredDataForm(emptyRequiredDataForm); }} className="rounded-xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248]">{translateText("إضافة وبدء إضافة المزيد")}</button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Files className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("النموذج")}</h4></div>
            <p className="mb-3 text-xs text-[#7c93af]">{translateText("إذا تم إيقافه، يمكنك تعريف حقول مخصصة لهذا النموذج فقط.")}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={requiredDataForm.fromTemplate} onChange={(e) => setRequiredDataForm((c) => ({ ...c, fromTemplate: e.target.checked }))} />{translateText("من قالب")}</label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">قالب النموذج</span><select value={requiredDataForm.template} onChange={(e) => setRequiredDataForm((c) => ({ ...c, template: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option value="">{translateText("اختر")}</option><option>نموذج بيانات عميل</option><option>نموذج مستندات شركة</option></select></label>
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Info className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الرسالة")}</h4></div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={requiredDataForm.dueDate} onChange={(e) => setRequiredDataForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الرسالة</span><textarea rows={3} value={requiredDataForm.message} onChange={(e) => setRequiredDataForm((c) => ({ ...c, message: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Shield className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الخصوصية والمرسل")}</h4></div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={requiredDataForm.isPrivate} onChange={(e) => setRequiredDataForm((c) => ({ ...c, isPrivate: e.target.checked }))} />{translateText("خاص")}</label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تم الإرسال بواسطة</span><input value={requiredDataForm.sentBy} onChange={(e) => setRequiredDataForm((c) => ({ ...c, sentBy: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">وقت الإرسال</span><input dir="ltr" type="datetime-local" value={requiredDataForm.sentAt} onChange={(e) => setRequiredDataForm((c) => ({ ...c, sentAt: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
            </div>
          </div>
        </div>
      </CaseModal>

      <CaseModal
        open={fileRequestModalOpen}
        onClose={() => setFileRequestModalOpen(false)}
        title={translateText("طلب ملف العميل بواسطة طلب")}
        width="max-w-3xl"
        footer={<><button type="button" onClick={() => setFileRequestModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, requiredData: [...current.requiredData, { id: Date.now(), template: fileRequestForm.fileName, sentBy: t.userName, sentAt: new Date().toLocaleString(isArabic ? "ar" : "en"), dueDate: fileRequestForm.dueDate, isPrivate: false }] })); setFileRequestModalOpen(false); setFileRequestForm(emptyFileRequestForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إرسال")}</button></>}
      >
        <div className="space-y-4">
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">اسم الملف المطلوب</span><input value={fileRequestForm.fileName} onChange={(e) => setFileRequestForm((c) => ({ ...c, fileName: e.target.value }))} placeholder={translateText("مثال: صورة جواز السفر، بطاقة الهوية، عقد...")} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">التعليمات / التلميح</span><textarea rows={3} value={fileRequestForm.hint} onChange={(e) => setFileRequestForm((c) => ({ ...c, hint: e.target.value }))} placeholder={translateText("اشرح المطلوب بالضبط والصيغة PDF, JPG...")} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={fileRequestForm.dueDate} onChange={(e) => setFileRequestForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label>
          <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">رسالة للعميل</span><textarea rows={3} value={fileRequestForm.message} onChange={(e) => setFileRequestForm((c) => ({ ...c, message: e.target.value }))} placeholder={translateText("رسالة اختيارية تظهر للعميل مع طلب الملف.")} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-3 text-sm" /></label>
        </div>
      </CaseModal>

      <CaseModal
        open={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        title={translateText("إضافة مواعيد")}
        width="max-w-5xl"
        footer={<><button type="button" onClick={() => setAppointmentModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, appointments: [...current.appointments, { id: Date.now(), status: appointmentForm.status, availableFrom: appointmentForm.availableFrom, availableTo: appointmentForm.availableTo, clientAppointment: appointmentForm.status === "مؤكد" ? appointmentForm.clientAppointment : "", location: appointmentForm.location }] })); setAppointmentModalOpen(false); setAppointmentForm(emptyAppointmentForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, appointments: [...current.appointments, { id: Date.now(), status: appointmentForm.status, availableFrom: appointmentForm.availableFrom, availableTo: appointmentForm.availableTo, clientAppointment: appointmentForm.status === "مؤكد" ? appointmentForm.clientAppointment : "", location: appointmentForm.location }] })); setAppointmentForm(emptyAppointmentForm); }} className="rounded-xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><CalendarDays className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الأوقات المتاحة")}</h4></div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">متاح من</span><input dir="ltr" type="datetime-local" value={appointmentForm.availableFrom} onChange={(e) => setAppointmentForm((c) => ({ ...c, availableFrom: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">متاح إلى</span><input dir="ltr" type="datetime-local" value={appointmentForm.availableTo} onChange={(e) => setAppointmentForm((c) => ({ ...c, availableTo: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">بداية الوقت اليومي</span><input dir="ltr" type="time" value={appointmentForm.dayStart} onChange={(e) => setAppointmentForm((c) => ({ ...c, dayStart: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">نهاية الوقت اليومي</span><input dir="ltr" type="time" value={appointmentForm.dayEnd} onChange={(e) => setAppointmentForm((c) => ({ ...c, dayEnd: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Info className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("معلومات الموعد")}</h4></div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الموقع</span><input value={appointmentForm.location} onChange={(e) => setAppointmentForm((c) => ({ ...c, location: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={appointmentForm.dueDate} onChange={(e) => setAppointmentForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الرسالة</span><textarea rows={3} value={appointmentForm.message} onChange={(e) => setAppointmentForm((c) => ({ ...c, message: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Shield className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الإجراءات")}</h4></div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={appointmentForm.status} onChange={(e) => setAppointmentForm((c) => ({ ...c, status: e.target.value as AppointmentFormState["status"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>قيد الانتظار</option><option>مؤكد</option><option>مكتمل</option><option>ملغي</option></select></label>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={appointmentForm.isPrivate} onChange={(e) => setAppointmentForm((c) => ({ ...c, isPrivate: e.target.checked }))} />{translateText("خاص")}</label>
              {appointmentForm.status === "مؤكد" ? <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">موعد العميل</span><input dir="ltr" type="datetime-local" value={appointmentForm.clientAppointment} onChange={(e) => setAppointmentForm((c) => ({ ...c, clientAppointment: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label> : null}
            </div>
          </div>
        </div>
      </CaseModal>

      <CaseModal
        open={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        title={translateText("إضافة توقيع أو موافقة")}
        width="max-w-5xl"
        footer={<><button type="button" onClick={() => setApprovalModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, approvals: [...current.approvals, { id: Date.now(), subject: approvalForm.subject, requestedFile: approvalForm.requestedFile?.name ?? "-", signedFile: approvalForm.signedFile?.name ?? "-", decision: approvalForm.decision, deadline: approvalForm.deadline, decisionAt: approvalForm.decision === "معلق" ? "" : new Date().toLocaleString(isArabic ? "ar" : "en"), isPrivate: approvalForm.isPrivate, message: approvalForm.message }] })); setApprovalModalOpen(false); setApprovalForm(emptyApprovalForm); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, approvals: [...current.approvals, { id: Date.now(), subject: approvalForm.subject, requestedFile: approvalForm.requestedFile?.name ?? "-", signedFile: approvalForm.signedFile?.name ?? "-", decision: approvalForm.decision, deadline: approvalForm.deadline, decisionAt: approvalForm.decision === "معلق" ? "" : new Date().toLocaleString(isArabic ? "ar" : "en"), isPrivate: approvalForm.isPrivate, message: approvalForm.message }] })); setApprovalForm(emptyApprovalForm); }} className="rounded-xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Signature className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الطلب")}</h4></div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الملف المطلوب اعتماده</span><div className="rounded-xl border border-dashed border-[#c9d9ec] bg-[#f8fbff] p-4"><input type="file" onChange={(e) => setApprovalForm((c) => ({ ...c, requestedFile: e.target.files?.[0] ?? null }))} /></div></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الموضوع</span><input value={approvalForm.subject} onChange={(e) => setApprovalForm((c) => ({ ...c, subject: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الموعد النهائي للموافقة</span><input type="date" value={approvalForm.deadline} onChange={(e) => setApprovalForm((c) => ({ ...c, deadline: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={approvalForm.dueDate} onChange={(e) => setApprovalForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-sm text-[#6d84a1]">الرسالة</span><textarea rows={3} value={approvalForm.message} onChange={(e) => setApprovalForm((c) => ({ ...c, message: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><CheckCircle2 className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("القرار")}</h4></div>
            <p className="mb-3 text-xs text-[#7c93af]">{translateText("عند ضبط القرار على موافق، يمكنك رفع الملف الموقع.")}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">القرار</span><select value={approvalForm.decision} onChange={(e) => setApprovalForm((c) => ({ ...c, decision: e.target.value as ApprovalFormState["decision"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>معلق</option><option>موافق</option><option>مرفوض</option></select></label>
              {approvalForm.decision === "موافق" ? <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الملف الموقع</span><input type="file" onChange={(e) => setApprovalForm((c) => ({ ...c, signedFile: e.target.files?.[0] ?? null }))} /></label> : null}
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Shield className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الخصوصية")}</h4></div>
            <p className="mb-3 text-xs text-[#7c93af]">{translateText("عند التفعيل، لن يرى العميل هذا الطلب داخل التطبيق.")}</p>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={approvalForm.isPrivate} onChange={(e) => setApprovalForm((c) => ({ ...c, isPrivate: e.target.checked }))} />{translateText("خاص")}</label>
          </div>
        </div>
      </CaseModal>

      <CaseModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={translateText("إضافة فواتير")}
        width="max-w-6xl"
        footer={<><button type="button" onClick={() => setPaymentModalOpen(false)} className="rounded-xl border border-[#d7e2f0] bg-white px-4 py-2 text-sm text-[#547094]">{translateText("إلغاء")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, payments: [...current.payments, { id: Date.now(), version: paymentForm.invoiceNumber || `INV-${Date.now()}`, issueDate: paymentForm.issueDate, dueDate: paymentForm.dueDate, total: invoiceTotals.finalTotal, note: paymentForm.note, status: paymentForm.status }] })); setPaymentModalOpen(false); setPaymentForm({ ...emptyPaymentForm, invoiceNumber: `INV-${Date.now()}` }); }} className="rounded-xl bg-[#103a67] px-5 py-2 text-sm font-medium text-white">{translateText("إضافة")}</button><button type="button" onClick={() => { updateExtras((current) => ({ ...current, payments: [...current.payments, { id: Date.now(), version: paymentForm.invoiceNumber || `INV-${Date.now()}`, issueDate: paymentForm.issueDate, dueDate: paymentForm.dueDate, total: invoiceTotals.finalTotal, note: paymentForm.note, status: paymentForm.status }] })); setPaymentForm({ ...emptyPaymentForm, invoiceNumber: `INV-${Date.now()}` }); }} className="rounded-xl bg-[#d8aa5a] px-4 py-2 text-sm font-medium text-[#223248]">{translateText("إضافة وبدء إضافة المزيد")}</button></>}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><FilePlus2 className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("تفاصيل الفاتورة")}</h4></div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">رقم الفاتورة</span><input value={paymentForm.invoiceNumber} onChange={(e) => setPaymentForm((c) => ({ ...c, invoiceNumber: e.target.value }))} placeholder={`INV-${Date.now()}`} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الإصدار</span><input type="date" value={paymentForm.issueDate} onChange={(e) => setPaymentForm((c) => ({ ...c, issueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">تاريخ الاستحقاق</span><input type="date" value={paymentForm.dueDate} onChange={(e) => setPaymentForm((c) => ({ ...c, dueDate: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الحالة</span><select value={paymentForm.status} onChange={(e) => setPaymentForm((c) => ({ ...c, status: e.target.value as PaymentFormState["status"] }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>مسودة</option><option>مدفوع</option><option>متأخر</option><option>ملغي</option></select></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">العملة</span><select value={paymentForm.currency} onChange={(e) => setPaymentForm((c) => ({ ...c, currency: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm"><option>SAR</option><option>USD</option><option>EUR</option></select></label>
              <label className="block md:col-span-3"><span className="mb-2 block text-sm text-[#6d84a1]">ملاحظات</span><textarea rows={2} value={paymentForm.note} onChange={(e) => setPaymentForm((c) => ({ ...c, note: e.target.value }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
            </div>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><Files className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("البنود")}</h4></div>
            <div className="overflow-x-auto">
              <table className="min-w-[920px] w-full text-sm">
                <thead className="bg-[#e9f1fc] text-[#204f7f]">
                  <tr>{["النوع", "الوصف", "الكمية", "سعر الوحدة", "الضريبة %", "الإجمالي", "الإجراءات"].map((col) => <th key={col} className="px-3 py-2 font-medium">{translateText(col)}</th>)}</tr>
                </thead>
                <tbody>
                  {paymentForm.items.map((item, idx) => {
                    const line = item.quantity * item.unitPrice;
                    const lineTotal = line + line * (item.tax / 100);
                    return (
                      <tr key={item.id} className="border-t border-[#e7eef8]">
                        <td className="px-3 py-2"><input value={item.type} onChange={(e) => setPaymentForm((c) => ({ ...c, items: c.items.map((row) => row.id === item.id ? { ...row, type: e.target.value } : row) }))} className="w-28 rounded-lg border border-[#d9e4f4] px-2 py-1.5 text-xs" /></td>
                        <td className="px-3 py-2"><input value={item.description} onChange={(e) => setPaymentForm((c) => ({ ...c, items: c.items.map((row) => row.id === item.id ? { ...row, description: e.target.value } : row) }))} className="w-full min-w-40 rounded-lg border border-[#d9e4f4] px-2 py-1.5 text-xs" /></td>
                        <td className="px-3 py-2"><input type="number" value={item.quantity} onChange={(e) => setPaymentForm((c) => ({ ...c, items: c.items.map((row) => row.id === item.id ? { ...row, quantity: Number(e.target.value) } : row) }))} className="w-20 rounded-lg border border-[#d9e4f4] px-2 py-1.5 text-xs" /></td>
                        <td className="px-3 py-2"><input type="number" value={item.unitPrice} onChange={(e) => setPaymentForm((c) => ({ ...c, items: c.items.map((row) => row.id === item.id ? { ...row, unitPrice: Number(e.target.value) } : row) }))} className="w-24 rounded-lg border border-[#d9e4f4] px-2 py-1.5 text-xs" /></td>
                        <td className="px-3 py-2"><input type="number" value={item.tax} onChange={(e) => setPaymentForm((c) => ({ ...c, items: c.items.map((row) => row.id === item.id ? { ...row, tax: Number(e.target.value) } : row) }))} className="w-20 rounded-lg border border-[#d9e4f4] px-2 py-1.5 text-xs" /></td>
                        <td className="px-3 py-2 text-xs font-medium text-[#1a4f80]">{lineTotal.toFixed(2)}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            <button type="button" onClick={() => setPaymentForm((c) => ({ ...c, items: [...c.items, { ...item, id: Date.now() + idx + 1 }] }))} className="rounded-lg bg-[#edf5ff] px-2 py-1 text-xs text-[#2a67b5]">{translateText("نسخ")}</button>
                            <button type="button" onClick={() => setPaymentForm((c) => ({ ...c, items: c.items.filter((row) => row.id !== item.id) }))} className="rounded-lg bg-[#fff0f0] px-2 py-1 text-xs text-[#c54040]">{translateText("حذف")}</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button type="button" onClick={() => setPaymentForm((c) => ({ ...c, items: [...c.items, createEmptyInvoiceItem()] }))} className="mt-3 rounded-xl bg-[#103a67] px-4 py-2 text-sm text-white">{translateText("إضافة إلى البنود")}</button>
          </div>
          <div className="rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1f4f7f]"><CircleDollarSign className="h-4 w-4" /><h4 className="text-sm font-semibold">{translateText("الإجماليات")}</h4></div>
            <div className="grid gap-4 md:grid-cols-4">
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الإجمالي قبل الخصم</span><input readOnly value={invoiceTotals.subtotal.toFixed(2)} className="w-full rounded-xl border border-[#d9e4f4] bg-[#f4f8fd] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الخصم</span><input type="number" value={paymentForm.discount} onChange={(e) => setPaymentForm((c) => ({ ...c, discount: Number(e.target.value) }))} className="w-full rounded-xl border border-[#d9e4f4] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">إجمالي الضريبة</span><input readOnly value={invoiceTotals.taxTotal.toFixed(2)} className="w-full rounded-xl border border-[#d9e4f4] bg-[#f4f8fd] px-4 py-2.5 text-sm" /></label>
              <label className="block"><span className="mb-2 block text-sm text-[#6d84a1]">الإجمالي النهائي</span><input readOnly value={invoiceTotals.finalTotal.toFixed(2)} className="w-full rounded-xl border border-[#d9e4f4] bg-[#f4f8fd] px-4 py-2.5 text-sm font-semibold text-[#0f3a67]" /></label>
            </div>
          </div>
        </div>
      </CaseModal>
    </div>
  );
}
