"use client";

import { useLanguage } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, t, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.lang.label}
      title={t.lang.label}
      lang={lang === "ar" ? "en" : "ar"}
      className={cn(
        "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-2 text-[0.8125rem] font-medium transition-opacity duration-300 hover:opacity-60",
        lang === "ar" && "latin tracking-airy",
        className
      )}
    >
      {t.lang.toggle}
    </button>
  );
}
