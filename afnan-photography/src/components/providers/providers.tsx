"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { dictionary, type Dictionary, type Lang } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dictionary;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <Providers>");
  return ctx;
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", t: dictionary[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function Providers({
  children,
  defaultTheme,
}: {
  children: React.ReactNode;
  defaultTheme: "light" | "dark" | "system";
}) {
  // The page background is always the light silk, so the browser's own
  // color-scheme (scrollbars, native controls) stays light in both themes.
  //
  // reducedMotion="user": for visitors who ask their device for less motion,
  // Framer Motion skips movement (transforms) and keeps only gentle fades.
  // Components render the same markup either way, so server and client HTML
  // always match — branching on the preference during render would leave
  // server-rendered "hidden" styles stuck on screen after hydration.
  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} enableSystem enableColorScheme={false}>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>{children}</LanguageProvider>
      </MotionConfig>
    </NextThemesProvider>
  );
}
