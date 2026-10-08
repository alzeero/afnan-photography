"use client";

import { useState, useTransition } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { updateGeneralSettings } from "@/lib/actions/content";
import { FieldError, FieldSuccess } from "@/components/ui/form-fields";
import { ManagerHeading } from "./manager-ui";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

const OPTIONS = [
  { value: "light" as const, label: "فاتح", hint: "بطاقات بيضاء وأزرار سوداء", icon: Sun },
  { value: "dark" as const, label: "داكن", hint: "بطاقات سوداء بلمسات ذهبية", icon: Moon },
  { value: "system" as const, label: "تلقائي", hint: "حسب إعداد جهاز الزائرة", icon: Monitor },
];

export function SettingsManager({ settings }: { settings: SiteSettings }) {
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark" | "system">(settings.default_theme);

  function choose(value: "light" | "dark" | "system") {
    setTheme(value);
    setError(null);
    setSuccess(null);
    setBusy(true);
    startTransition(async () => {
      try {
        await updateGeneralSettings({ default_theme: value });
        setSuccess("تم تحديث المظهر الافتراضي بنجاح.");
      } catch (e) {
        setError(e instanceof Error ? e.message : "حدث خطأ ما.");
      } finally {
        setBusy(false);
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-7">
      <ManagerHeading
        title="المظهر الافتراضي"
        description="يحدد ما تراه الزائرة أول مرة. الخلفية الحريرية ثابتة في كل المظاهر — المظهر الداكن يحوّل البطاقات والقوائم إلى الأسود مع لمسات ذهبية. تحتفظ الزائرة العائدة بآخر اختيار قامت به من زر المظهر في الموقع."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {OPTIONS.map(({ value, label, hint, icon: Icon }) => (
          <button
            key={value}
            type="button"
            disabled={busy}
            onClick={() => choose(value)}
            aria-pressed={theme === value}
            className={cn(
              "flex flex-col items-center gap-2 rounded-[4px] border px-4 py-6 text-center transition-colors duration-300 disabled:opacity-60",
              theme === value ? "border-accent bg-accent/10" : "border-line/15 hover:border-line/40"
            )}
          >
            <Icon size={20} strokeWidth={1.5} className={theme === value ? "text-accent" : "text-on-surface-mute"} />
            <span className="text-[0.95rem] font-medium text-on-surface">{label}</span>
            <span className="text-xs text-on-surface-mute">{hint}</span>
          </button>
        ))}
      </div>

      <FieldError>{error}</FieldError>
      <FieldSuccess>{success}</FieldSuccess>
    </div>
  );
}
