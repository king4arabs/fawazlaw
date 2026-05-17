"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  officeCopy,
  officeDirection,
  type OfficeLocale,
  type OfficeTheme,
  translateOfficeText,
} from "@/features/office/lib/office-i18n";

type OfficePreferencesContextValue = {
  locale: OfficeLocale;
  theme: OfficeTheme;
  dir: "rtl" | "ltr";
  isArabic: boolean;
  setLocale: (locale: OfficeLocale) => void;
  setTheme: (theme: OfficeTheme) => void;
  toggleTheme: () => void;
  t: typeof officeCopy.ar;
  translateText: (value: string) => string;
};

const OfficePreferencesContext =
  createContext<OfficePreferencesContextValue | null>(null);

const LOCALE_KEY = "fawaz-office-locale";
const THEME_KEY = "fawaz-office-theme";

function getStoredLocale(): OfficeLocale {
  if (typeof window === "undefined") {
    return "ar";
  }

  const value = window.localStorage.getItem(LOCALE_KEY);
  return value === "en" ? "en" : "ar";
}

function getStoredTheme(): OfficeTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  const value = window.localStorage.getItem(THEME_KEY);
  return value === "dark" ? "dark" : "light";
}

export function OfficePreferencesProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, setLocale] = useState<OfficeLocale>(getStoredLocale);
  const [theme, setTheme] = useState<OfficeTheme>(getStoredTheme);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);

    const root = document.documentElement;
    root.lang = locale;
    root.dir = officeDirection(locale);
    root.classList.toggle("dark", theme === "dark");
    document.body.style.colorScheme = theme;
  }, [locale, theme]);

  const value = useMemo<OfficePreferencesContextValue>(
    () => ({
      locale,
      theme,
      dir: officeDirection(locale),
      isArabic: locale === "ar",
      setLocale,
      setTheme,
      toggleTheme: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
      t: officeCopy[locale],
      translateText: (text) => translateOfficeText(text, locale),
    }),
    [locale, theme],
  );

  return (
    <OfficePreferencesContext.Provider value={value}>
      {children}
    </OfficePreferencesContext.Provider>
  );
}

export function useOfficePreferences() {
  const context = useContext(OfficePreferencesContext);

  if (!context) {
    throw new Error(
      "useOfficePreferences must be used within OfficePreferencesProvider",
    );
  }

  return context;
}
