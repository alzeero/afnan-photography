"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

type Tone = "silk" | "surface";

const tones: Record<Tone, string> = {
  silk: "hover:text-bronze",
  surface: "hover:text-accent",
};

/**
 * Switches between the light and dark themes. The silk background is the
 * same in both — the dark theme turns cards, menus and panels black.
 * Sized like the original template's toggle (18px icon).
 */
export function ThemeToggle({ className, tone = "surface" }: { className?: string; tone?: Tone }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? t.theme.toLight : t.theme.toDark;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full text-current transition-colors duration-300",
        tones[tone],
        className
      )}
    >
      <Sun
        size={18}
        className={cn(
          "absolute transition-all duration-500 ease-premium",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
      <Moon
        size={18}
        className={cn(
          "absolute transition-all duration-500 ease-premium",
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}
