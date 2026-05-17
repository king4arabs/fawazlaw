"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FolderArchive,
  FolderOpen,
  Gavel,
  Grid2x2,
  Landmark,
  LayoutPanelTop,
  ListTodo,
  LogOut,
  Menu,
  Moon,
  NotebookTabs,
  Scale,
  ShieldCheck,
  SunMedium,
  UserCircle2,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { officeNavigation } from "@/features/office/config/navigation";
import { useOfficePreferences } from "@/features/office/components/office-preferences-provider";

function isPathActive(currentPath: string, itemPath: string) {
  if (itemPath === "/office") {
    return currentPath === "/office";
  }

  return currentPath.startsWith(itemPath);
}

function navIcon(label: string) {
  if (label.includes("لوحة التحكم")) return LayoutPanelTop;
  if (label.includes("لوحة المهام")) return Grid2x2;
  if (label.includes("التقويم")) return CalendarDays;
  if (label.includes("القضايا")) return Scale;
  if (label.includes("العمليات")) return BriefcaseBusiness;
  if (label.includes("الاستشارات")) return Clock3;
  if (label.includes("العملاء")) return Users;
  if (label.includes("الدعم")) return CircleHelp;
  if (label.includes("محادثات الدعم")) return NotebookTabs;
  if (label.includes("الأرشيف")) return FolderArchive;
  if (label.includes("المستندات")) return FolderOpen;
  if (label.includes("المهام")) return ListTodo;
  if (label.includes("الخدمات")) return ShieldCheck;
  if (label.includes("الاشتراكات")) return WalletCards;
  if (label.includes("الحضور")) return CalendarDays;
  if (label.includes("الإجازات")) return BookOpen;
  if (label.includes("الفواتير")) return WalletCards;
  if (label.includes("المصروفات")) return Landmark;
  if (label.includes("المحاكم")) return Gavel;
  if (label.includes("المزايا")) return ShieldCheck;
  if (label.includes("المكاتب")) return BriefcaseBusiness;
  if (label.includes("الأقسام")) return Grid2x2;
  if (label.includes("الأدوار")) return ShieldCheck;
  if (label.includes("اشتراك النظام")) return WalletCards;

  return Grid2x2;
}

function handleLogout() {
  fetch("/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  }).finally(() => {
    window.location.href = "/";
  });
}

function SidebarContent({
  pathname,
  closeMobileMenu,
}: Readonly<{
  pathname: string;
  closeMobileMenu: () => void;
}>) {
  const { dir, isArabic, theme, translateText } = useOfficePreferences();

  const chevron = isArabic ? (
    <ChevronRight className="h-4 w-4 text-[#9aaac1] dark:text-[#6f86ab]" />
  ) : (
    <ChevronLeft className="h-4 w-4 text-[#9aaac1] dark:text-[#6f86ab]" />
  );

  return (
    <div dir={dir} className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-[#e5edf7] px-5 py-5 dark:border-[#1c2d47]">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[#dce7f4] bg-white dark:border-[#2a3b56] dark:bg-[#0f1b2d]">
          <Image
            src={theme === "dark" ? "/office-logo-dark.png" : "/office-logo-light.svg"}
            alt={translateText("شركة فواز للمحاماة")}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1 text-right">
          <p className="truncate text-lg font-semibold text-[#0f2138] dark:text-[#eef4ff]">
            {translateText("شركة فواز للمحاماة")}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        {officeNavigation.map((group) => (
          <section key={group.label}>
            <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9caabd] dark:text-[#6f84a7]">
              {chevron}
              <span className="text-[11px]">
                {translateText(group.label)}
              </span>
            </div>

            <div className="space-y-1.5">
              {group.items.map((item) => {
                const active = isPathActive(pathname, item.path);
                const Icon = navIcon(item.label);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMobileMenu}
                    className={clsx(
                      "flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-[#103a67] text-[#f0b44f] shadow-[0_14px_28px_rgba(16,58,103,0.18)] dark:bg-[#15375f] dark:text-[#f6c15d]"
                        : "text-[#344a67] hover:bg-[#f4f8fe] dark:text-[#d3dff0] dark:hover:bg-[#14243a]",
                    )}
                  >
                    <Icon
                      className={clsx(
                        "h-5 w-5 shrink-0",
                        active
                          ? "text-[#f0b44f] dark:text-[#f6c15d]"
                          : "text-[#91a4bf] dark:text-[#7388aa]",
                      )}
                      strokeWidth={1.9}
                    />
                    <span className="min-w-0 flex-1 text-right">
                      {translateText(item.label)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </div>
  );
}

function UserMenu({
  open,
  onClose,
}: Readonly<{
  open: boolean;
  onClose: () => void;
}>) {
  const {
    dir,
    isArabic,
    locale,
    setLocale,
    theme,
    setTheme,
    t,
  } = useOfficePreferences();

  if (!open) {
    return null;
  }

  return (
    <div
      dir={dir}
      className={clsx(
        "absolute top-[calc(100%+0.75rem)] z-50 w-72 rounded-3xl border border-[#dbe6f3] bg-white p-3 shadow-[0_25px_45px_rgba(16,42,78,0.18)] dark:border-[#243550] dark:bg-[#0f1b2d]",
        isArabic ? "left-0" : "right-0",
      )}
    >
      <div className="flex items-center gap-3 rounded-2xl px-3 py-2">
        <UserCircle2 className="h-9 w-9 text-[#94a5bf] dark:text-[#7f93b1]" />
        <div className="min-w-0 flex-1 text-right">
          <p className="truncate text-sm font-semibold text-[#16314f] dark:text-[#eef4ff]">
            {t.userName}
          </p>
          <p className="text-xs text-[#7d8fa9] dark:text-[#8aa0bf]">
            {t.companyName}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[#f5f8fd] p-1 dark:bg-[#13233a]">
        <div className="mb-2 px-2 pt-1 text-xs font-semibold text-[#8aa0bc] dark:text-[#748cb0]">
          {isArabic ? "المظهر" : "Theme"}
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={clsx(
              "flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm",
              theme === "light"
                ? "bg-white text-[#123455] shadow-sm dark:bg-[#20314a] dark:text-[#eff5ff]"
                : "text-[#6b7f9b] dark:text-[#90a4c3]",
            )}
          >
            <SunMedium className="h-4 w-4" />
            {t.themeLight}
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={clsx(
              "flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm",
              theme === "dark"
                ? "bg-white text-[#123455] shadow-sm dark:bg-[#20314a] dark:text-[#eff5ff]"
                : "text-[#6b7f9b] dark:text-[#90a4c3]",
            )}
          >
            <Moon className="h-4 w-4" />
            {t.themeDark}
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-[#f5f8fd] p-1 dark:bg-[#13233a]">
        <div className="mb-2 px-2 pt-1 text-xs font-semibold text-[#8aa0bc] dark:text-[#748cb0]">
          {isArabic ? "اللغة" : "Language"}
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setLocale("ar")}
            className={clsx(
              "rounded-xl px-3 py-2 text-sm",
              locale === "ar"
                ? "bg-white text-[#123455] shadow-sm dark:bg-[#20314a] dark:text-[#eff5ff]"
                : "text-[#6b7f9b] dark:text-[#90a4c3]",
            )}
          >
            {t.languageArabic}
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={clsx(
              "rounded-xl px-3 py-2 text-sm",
              locale === "en"
                ? "bg-white text-[#123455] shadow-sm dark:bg-[#20314a] dark:text-[#eff5ff]"
                : "text-[#6b7f9b] dark:text-[#90a4c3]",
            )}
          >
            {t.languageEnglish}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          onClose();
          handleLogout();
        }}
        className="mt-3 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm text-[#324b68] hover:bg-[#f5f8fd] dark:text-[#dbe6f8] dark:hover:bg-[#13233a]"
      >
        <LogOut className="h-4 w-4 text-[#91a4bf] dark:text-[#8196b5]" />
        <span>{t.logout}</span>
      </button>
    </div>
  );
}

export function OfficeShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { dir, isArabic, t, toggleTheme, theme } = useOfficePreferences();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!userMenuOpen) {
      return;
    }

    const handlePointer = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  const shellColumns = useMemo(
    () => "min-h-screen lg:grid lg:grid-cols-[19.5rem_minmax(0,1fr)]",
    [],
  );

  return (
    <div dir={dir} className="min-h-screen bg-[#eef3f9] text-[#14253d] dark:bg-[#08111f] dark:text-[#eef4ff]">
      <div className={shellColumns}>
        <aside className="hidden h-screen border-s border-[#e2ebf5] bg-white dark:border-[#1c2d47] dark:bg-[#0d1727] lg:sticky lg:top-0 lg:block">
          <SidebarContent pathname={pathname} closeMobileMenu={() => undefined} />
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-[#dbe6f3] bg-white/90 backdrop-blur dark:border-[#1d2d46] dark:bg-[#0d1727]/90">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={mobileOpen ? t.closeMenu : t.openMenu}
                  onClick={() => setMobileOpen((current) => !current)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dbe6f3] bg-white text-[#1c3e63] shadow-sm dark:border-[#243550] dark:bg-[#0f1b2d] dark:text-[#eff4ff] lg:hidden"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dbe6f3] bg-white text-[#1c3e63] shadow-sm dark:border-[#243550] dark:bg-[#0f1b2d] dark:text-[#eff4ff]"
                >
                  {theme === "dark" ? (
                    <SunMedium className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-[#7d90ab] dark:text-[#8ca0bd]">
                    {t.companyName}
                  </p>
                  <p className="text-lg font-semibold text-[#0f2138] dark:text-[#eef4ff]">
                    {t.dashboard}
                  </p>
                </div>

                <div ref={userMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((current) => !current)}
                    className="flex items-center gap-2 rounded-2xl border border-[#dbe6f3] bg-white px-3 py-2 shadow-sm dark:border-[#243550] dark:bg-[#0f1b2d]"
                  >
                    <ChevronDown className="h-4 w-4 text-[#91a4bf] dark:text-[#8196b5]" />
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold text-[#17314f] dark:text-[#eef4ff]">
                        {t.userName}
                      </p>
                    </div>
                    <UserCircle2 className="h-8 w-8 text-[#94a5bf] dark:text-[#8095b5]" />
                  </button>

                  <UserMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 px-4 py-6 sm:px-6 xl:px-8">
            {children}
          </main>
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-[#07101d]/45 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={clsx(
          "fixed inset-y-0 z-50 w-[19.5rem] max-w-[86vw] border-s border-[#dbe6f3] bg-white shadow-[0_20px_40px_rgba(8,23,41,0.22)] transition-transform dark:border-[#1d2d46] dark:bg-[#0d1727] lg:hidden",
          isArabic ? "right-0" : "left-0",
          mobileOpen
            ? "translate-x-0"
            : isArabic
              ? "translate-x-full"
              : "-translate-x-full",
        )}
      >
        <SidebarContent
          pathname={pathname}
          closeMobileMenu={() => setMobileOpen(false)}
        />
      </aside>
    </div>
  );
}
