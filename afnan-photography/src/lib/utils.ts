import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the project's custom font sizes and shadows (see
// tailwind.config.ts). Without this it reads e.g. `text-lead` as a text
// *color* and would silently drop it when merged with `text-ink-soft`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["micro", "lead", "heading", "statement", "display", "statement-ar", "display-ar"] },
      ],
      shadow: [{ shadow: ["print", "print-lift", "note", "float"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ARABIC_RANGE = /[\u0600-\u06FF]/;

/** Detects whether a free-text string (e.g. admin-entered testimonial) is Arabic,
 *  so it can be rendered with the correct font + text direction regardless of
 *  which UI language is currently active. */
export function isArabicText(text: string): boolean {
  return ARABIC_RANGE.test(text);
}

export function textDir(text: string): "rtl" | "ltr" {
  return isArabicText(text) ? "rtl" : "ltr";
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digitsOnly = phone.replace(/[^\d]/g, "");
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${digitsOnly}?${params.toString()}`;
}

/** Converts a stored international Saudi number (pattern "9665XXXXXXXX")
 *  into its local display format ("05XXXXXXXX"). Falls back to showing the
 *  digits as-is if they don't match that pattern, so it never shows
 *  something broken. */
export function formatLocalPhone(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.startsWith("966") && digits.length === 12) {
    return "0" + digits.slice(3);
  }
  return digits;
}
