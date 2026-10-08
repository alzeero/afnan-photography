"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

/**
 * Switches between the light and dark themes. The silk background is the
 * same in both — the dark theme turns cards, menus and panels black.
 */
export function ThemeToggle({ className }: { className?: string }) {
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
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-opacity duration-300 hover:opacity-60",
        className
      )}
    >
      <Sun
        size={17}
        strokeWidth={1.5}
        className={cn(
          "absolute transition-all duration-500 ease-premium",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
      <Moon
        size={17}
        strokeWidth={1.5}
        className={cn(
          "absolute transition-all duration-500 ease-premium",
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}
