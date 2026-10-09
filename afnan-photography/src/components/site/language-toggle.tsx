"use client";

import { useLanguage } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

type Tone = "silk" | "surface";

// Hover colours that stay readable on the silk vs. on a card/menu surface.
const tones: Record<Tone, string> = {
  silk: "border-ink/20 hover:border-bronze hover:text-bronze",
  surface: "border-line/20 hover:border-accent hover:text-accent",
};

/** The original template's small bordered "EN / عربي" pill. */
export function LanguageToggle({ className, tone = "surface" }: { className?: string; tone?: Tone }) {
  const { lang, t, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.lang.label}
      title={t.lang.label}
      lang={lang === "ar" ? "en" : "ar"}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300",
        tones[tone],
        lang === "ar" ? "latin font-sans tracking-wide" : "font-arabic",
        className
      )}
    >
      {t.lang.toggle}
    </button>
  );
}
