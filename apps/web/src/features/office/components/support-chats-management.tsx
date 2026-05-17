"use client";

import clsx from "clsx";
import { ExternalLink, Paperclip, Search, SendHorizontal } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";
import type { OfficePageData } from "@/features/office/types";

type SupportConversation = {
  id: string;
  title: string;
  customer: string;
  updatedAt: string;
  status: "مفتوحة" | "مغلقة" | "بانتظار ردك" | "قيد المعالجة";
  priority: "منخفضة" | "عادية" | "عالية" | "عاجلة";
  assignee: string;
  unread: number;
};

type SupportMessage = {
  id: number;
  from: "admin" | "client";
  senderName: string;
  text: string;
  time: string;
  attachmentName?: string;
  attachmentUrl?: string;
};

function statusTone(value: string) {
  if (value.includes("مفتوحة") || value.includes("معالجة")) return "bg-[#e9f1ff] text-[#1e60ad] dark:bg-[#1a2e49] dark:text-[#9ec3ee]";
  if (value.includes("بانتظار")) return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
  return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
}

function priorityTone(value: string) {
  if (value.includes("عاجلة") || value.includes("عالية")) return "bg-[#fff0f0] text-[#c74747] dark:bg-[#351f25] dark:text-[#f0a6a6]";
  if (value.includes("منخفضة")) return "bg-[#ebfff1] text-[#14954c] dark:bg-[#163025] dark:text-[#90dfb2]";
  return "bg-[#fff5df] text-[#bf6f00] dark:bg-[#3a2b18] dark:text-[#f4c689]";
}

export function SupportChatsManagement({ page }: Readonly<{ page: OfficePageData }>) {
  const { dir, isArabic, t, translateText } = useOfficePreferences();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(page.chat?.conversations[0]?.id ?? null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [composer, setComposer] = useState("");
  const [composerAttachment, setComposerAttachment] = useState<File | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const conversations = useMemo<SupportConversation[]>(() => {
    return (page.chat?.conversations ?? []).map((item, index) => ({
      id: item.id,
      title: item.title,
      customer: item.customer,
      updatedAt: item.updatedAt,
      status: index % 4 === 0 ? "بانتظار ردك" : index % 3 === 0 ? "قيد المعالجة" : index % 2 === 0 ? "مغلقة" : "مفتوحة",
      priority: index % 4 === 0 ? "عاجلة" : index % 3 === 0 ? "عالية" : index % 2 === 0 ? "منخفضة" : "عادية",
      assignee: index % 2 === 0 ? "أ. فواز" : "أ. خالد",
      unread: index === 0 ? 2 : 0,
    }));
  }, [page.chat?.conversations]);

  const [messagesByConversation, setMessagesByConversation] = useState<Record<string, SupportMessage[]>>(() => {
    const seed = page.chat?.messages ?? [];
    const seededMessages: SupportMessage[] = seed.map((m, index) => ({
      id: index + 1,
      from: m.from,
      senderName: m.from === "admin" ? "أ. فواز" : "العميل",
      text: m.text,
      time: m.time,
    }));

    return Object.fromEntries((page.chat?.conversations ?? []).map((conversation) => [conversation.id, seededMessages]));
  });

  const filteredConversations = useMemo(() => {
    if (!query.trim()) return conversations;
    const q = query.toLowerCase();
    return conversations.filter((conversation) => `${conversation.id} ${conversation.title} ${conversation.customer}`.toLowerCase().includes(q));
  }, [conversations, query]);

  const selectedConversation = useMemo(() => conversations.find((conversation) => conversation.id === selectedId) ?? null, [conversations, selectedId]);
  const currentMessages = useMemo(() => (selectedConversation ? messagesByConversation[selectedConversation.id] ?? [] : []), [messagesByConversation, selectedConversation]);

  const onSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileView("chat");
    setSendError(null);
  };

  const submitMessage = async () => {
    if (!selectedConversation) return;
    if (!composer.trim() && !composerAttachment) {
      setSendError(translateText("الرجاء إدخال رسالة أو إرفاق ملف."));
      return;
    }

    setSendError(null);
    setIsSending(true);

    const optimistic: SupportMessage = {
      id: Date.now(),
      from: "admin",
      senderName: "أ. فواز",
      text: composer.trim() || "(مرفق)",
      time: new Date().toLocaleTimeString(isArabic ? "ar" : "en", { hour: "2-digit", minute: "2-digit" }),
      attachmentName: composerAttachment?.name,
      attachmentUrl: composerAttachment ? "#" : undefined,
    };

    setMessagesByConversation((current) => ({
      ...current,
      [selectedConversation.id]: [...(current[selectedConversation.id] ?? []), optimistic],
    }));

    setComposer("");
    setComposerAttachment(null);

    await new Promise((resolve) => setTimeout(resolve, 250));
    setIsSending(false);
  };

  return (
    <section dir={dir} className="space-y-6">
      <div className="rounded-2xl border border-[#dce6f3] bg-white p-5 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]">
        <h1 className="text-3xl font-semibold text-[#0f2f54] dark:text-[#eef4ff]">{translateText("محادثات الدعم")}</h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
        <section
          className={clsx(
            "rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]",
            mobileView === "chat" ? "hidden xl:block" : "block",
          )}
        >
          <div className="relative mb-4">
            <Search className={clsx("pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#7891b0]", dir === "rtl" ? "right-3" : "left-3")} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={translateText("ابحث بالعنوان أو رقم الطلب...")}
              className={clsx("w-full rounded-xl border border-[#d9e4f4] bg-[#fbfdff] py-2.5 text-sm outline-none focus:border-[#123f6f]", dir === "rtl" ? "pr-10 pl-3" : "pl-10 pr-3")}
            />
          </div>

          <div className="max-h-[64vh] space-y-2 overflow-y-auto pe-1">
            {filteredConversations.map((conversation) => {
              const active = selectedConversation?.id === conversation.id;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => onSelectConversation(conversation.id)}
                  className={clsx(
                    "w-full rounded-xl border px-3 py-3 text-start transition",
                    active
                      ? "border-[#2f5f93] bg-[#edf4ff] dark:border-[#3a5f8c] dark:bg-[#16304d]"
                      : "border-[#e1e9f5] bg-[#fbfdff] hover:bg-[#f4f8fe] dark:border-[#223752] dark:bg-[#122136] dark:hover:bg-[#162741]",
                  )}
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="max-w-[76%] truncate text-sm font-semibold text-[#153b65] dark:text-[#e5f0ff]">{translateText(conversation.title)}</p>
                    <span className="rounded-full bg-[#d8aa5a] px-2 py-0.5 text-xs text-[#223248]">#{conversation.id}</span>
                  </div>
                  <p className="truncate text-xs text-[#6f86a5] dark:text-[#8ea6c4]">{translateText(conversation.customer)}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[11px] text-[#90a4bf] dark:text-[#7f96b3]">{translateText(conversation.updatedAt)}</p>
                    <div className="flex items-center gap-1">
                      <span className={clsx("rounded-full px-2 py-0.5 text-[10px]", statusTone(conversation.status))}>{translateText(conversation.status)}</span>
                      {conversation.unread > 0 ? <span className="rounded-full bg-[#d8aa5a] px-1.5 py-0.5 text-[10px] text-[#223248]">{conversation.unread}</span> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section
          className={clsx(
            "flex min-h-[68vh] flex-col rounded-2xl border border-[#d6e2f1] bg-white p-4 shadow-[0_10px_24px_rgba(111,145,183,0.08)] dark:border-[#1d2d46] dark:bg-[#0f1b2d]",
            mobileView === "list" ? "hidden xl:flex" : "flex",
          )}
        >
          {selectedConversation ? (
            <>
              <div className="mb-3 rounded-xl border border-[#e0e8f5] bg-[#fbfdff] p-3 dark:border-[#223752] dark:bg-[#122136]">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-[#12385f] dark:text-[#e7f1ff]">{translateText(selectedConversation.title)}</h3>
                    <p className="text-xs text-[#6f86a5] dark:text-[#8ea6c4]">#{selectedConversation.id} • {translateText(selectedConversation.customer)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/office/support/support-tickets?ticket=${selectedConversation.id}`;
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#d7e2f0] bg-white px-3 py-1.5 text-xs text-[#4f7198] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {translateText("تفاصيل التذكرة")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className={clsx("rounded-full px-2 py-0.5", statusTone(selectedConversation.status))}>{translateText("الحالة")}: {translateText(selectedConversation.status)}</span>
                  <span className={clsx("rounded-full px-2 py-0.5", priorityTone(selectedConversation.priority))}>{translateText("الأولوية")}: {translateText(selectedConversation.priority)}</span>
                  <span className="rounded-full bg-[#edf6ff] px-2 py-0.5 text-[#3c6f9f] dark:bg-[#13233a] dark:text-[#a7bfdc]">{translateText("المسند إليه")}: {translateText(selectedConversation.assignee)}</span>
                  <span className="rounded-full bg-[#edf6ff] px-2 py-0.5 text-[#3c6f9f] dark:bg-[#13233a] dark:text-[#a7bfdc]">{translateText("آخر نشاط")}: {translateText(selectedConversation.updatedAt)}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto rounded-xl border border-[#e2eaf5] bg-[#f9fbff] p-3 dark:border-[#223752] dark:bg-[#101d30]">
                {currentMessages.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#d3dfef] bg-white p-8 text-center dark:border-[#29405d] dark:bg-[#132238]">
                    <p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{translateText("لا توجد رسائل بعد")}</p>
                    <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("ابدأ المحادثة بإرسال رسالة.")}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentMessages.map((message) => {
                      const admin = message.from === "admin";
                      return (
                        <div key={message.id} className={clsx("flex", admin ? "justify-end" : "justify-start")}>
                          <article className={clsx("max-w-[85%] rounded-2xl px-4 py-3 text-sm", admin ? "bg-[#0f3a67] text-white dark:bg-[#15375f]" : "border border-[#dfe8f4] bg-white text-[#21486f] dark:border-[#253b57] dark:bg-[#122136] dark:text-[#dce8f8]")}>
                            <div className={clsx("mb-1 flex items-center gap-2 text-[11px]", admin ? "text-[#d2dff0]" : "text-[#8399b5] dark:text-[#97aecb]")}>
                              <span>{translateText(message.senderName)}</span>
                              <span>•</span>
                              <span>{translateText(message.time)}</span>
                            </div>
                            <p className="whitespace-pre-wrap break-words leading-6">{translateText(message.text)}</p>
                            {message.attachmentName ? (
                              <a href={message.attachmentUrl ?? "#"} className={clsx("mt-2 inline-block text-xs underline", admin ? "text-[#f7d59a]" : "text-[#346596] dark:text-[#9ec3ee]")}>{message.attachmentName}</a>
                            ) : null}
                          </article>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-3 rounded-xl border border-[#d9e4f4] bg-[#fbfdff] p-3 dark:border-[#1d2d46] dark:bg-[#122136]">
                <div className="flex items-end gap-2">
                  <textarea
                    rows={2}
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isSending) void submitMessage();
                      }
                    }}
                    placeholder={t.typeMessage || translateText("اكتب رسالة...")}
                    className="min-h-[44px] flex-1 resize-y rounded-xl border border-[#d9e4f4] bg-white px-3 py-2 text-sm outline-none focus:border-[#123f6f] dark:border-[#2a3f5c] dark:bg-[#112038]"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl border border-[#d7e2f0] bg-white p-2.5 text-[#4f7198] dark:border-[#2c3f5b] dark:bg-[#0f1b2e] dark:text-[#9cb3ce]"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => setComposerAttachment(e.target.files?.[0] ?? null)} />
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={() => void submitMessage()}
                    className="inline-flex items-center gap-1 rounded-xl bg-[#103a67] px-4 py-2.5 text-sm text-white disabled:opacity-60"
                  >
                    <SendHorizontal className="h-4 w-4" />
                    {isSending ? translateText("جاري الإرسال...") : t.send}
                  </button>
                </div>
                {composerAttachment ? <p className="mt-2 text-xs text-[#6f86a5] dark:text-[#8ea6c4]">{translateText("مرفق")}: {composerAttachment.name}</p> : null}
                {sendError ? <p className="mt-2 text-xs text-[#c74747]">{sendError}</p> : null}
                <div className="mt-2 xl:hidden">
                  <button type="button" onClick={() => setMobileView("list")} className="text-xs text-[#4f7198] underline dark:text-[#9cb3ce]">{translateText("العودة إلى المحادثات")}</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#d3dfef] bg-[#f8fbff] p-8 text-center dark:border-[#29405d] dark:bg-[#132238]">
              <div>
                <p className="text-sm font-medium text-[#5d7da3] dark:text-[#a8c0dc]">{translateText("اختر محادثة")}</p>
                <p className="mt-1 text-xs text-[#7f95b1] dark:text-[#8ea7c5]">{translateText("اختر محادثة من القائمة لعرض الرسائل.")}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
