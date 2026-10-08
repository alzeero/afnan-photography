import type { Config } from "tailwindcss";

/**
 * Afnan Photography design tokens.
 *
 * Two kinds of color live here:
 *  - "Silk" colors (ink, bronze, champagne…) are for anything sitting directly
 *    on the silk background. They never change with the theme, because the
 *    silk itself never changes.
 *  - "Surface" colors (surface, on-surface, accent, line, primary) belong to
 *    cards, menus, panels and dialogs. These are the only values the
 *    light/dark theme swaps: white pearl surfaces in light, black in dark.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "hsl(var(--ink) / <alpha-value>)",
          soft: "hsl(var(--ink-soft) / <alpha-value>)",
          mute: "hsl(var(--ink-mute) / <alpha-value>)",
        },
        bronze: "hsl(var(--bronze) / <alpha-value>)",
        champagne: {
          DEFAULT: "hsl(var(--champagne) / <alpha-value>)",
          light: "hsl(var(--champagne-light) / <alpha-value>)",
        },
        sand: "hsl(var(--sand) / <alpha-value>)",
        noir: "hsl(var(--noir) / <alpha-value>)",
        "on-noir": "hsl(var(--on-noir) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "on-surface": {
          DEFAULT: "hsl(var(--on-surface) / <alpha-value>)",
          soft: "hsl(var(--on-surface-soft) / <alpha-value>)",
          mute: "hsl(var(--on-surface-mute) / <alpha-value>)",
        },
        accent: "hsl(var(--accent) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          fg: "hsl(var(--primary-fg) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          fg: "hsl(var(--danger-fg) / <alpha-value>)",
        },
        success: "hsl(var(--success) / <alpha-value>)",
      },
      fontFamily: {
        // Latin glyphs come from the first family, Arabic glyphs fall through
        // to the second — so mixed Arabic/English strings render correctly
        // in one element without per-word markup.
        sans: [
          "var(--font-jost)",
          "var(--font-tajawal)",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "sans-serif",
        ],
        display: ["var(--font-bodoni)", "var(--font-amiri)", "Georgia", '"Times New Roman"', "serif"],
      },
      fontSize: {
        micro: ["0.8125rem", { lineHeight: "1.45" }],
        lead: ["clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)", { lineHeight: "1.7" }],
        heading: ["clamp(1.375rem, 1.22rem + 0.7vw, 1.75rem)", { lineHeight: "1.3" }],
        statement: ["clamp(1.625rem, 1.15rem + 2.1vw, 2.875rem)", { lineHeight: "1.2" }],
        display: ["clamp(2.25rem, 1.55rem + 3vw, 4.25rem)", { lineHeight: "1.06" }],
        // Arabic counterparts: Amiri sits visually smaller than Bodoni at the
        // same size and needs taller lines for its marks.
        "statement-ar": ["clamp(1.9rem, 1.4rem + 2.2vw, 3.2rem)", { lineHeight: "1.45" }],
        "display-ar": ["clamp(2.35rem, 1.75rem + 2.6vw, 4.1rem)", { lineHeight: "1.4" }],
      },
      letterSpacing: {
        couture: "0.32em",
        airy: "0.16em",
      },
      maxWidth: {
        content: "1240px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        38: "9.5rem",
      },
      boxShadow: {
        // A print lying on fabric: a tight contact shadow plus a long, soft
        // falloff — never one flat grey blur.
        print:
          "0 1px 1px hsl(0 0% 0% / 0.06), 0 10px 22px -14px hsl(0 0% 0% / 0.32), 0 34px 60px -40px hsl(0 0% 0% / 0.38)",
        "print-lift":
          "0 2px 3px hsl(0 0% 0% / 0.06), 0 18px 32px -16px hsl(0 0% 0% / 0.36), 0 48px 80px -44px hsl(0 0% 0% / 0.42)",
        note: "0 1px 1px hsl(0 0% 0% / 0.05), 0 22px 44px -30px hsl(0 0% 0% / 0.45)",
        float: "0 14px 36px -16px hsl(0 0% 0% / 0.5)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.92)", opacity: "0.55" },
          "80%": { transform: "scale(1.7)", opacity: "0" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-100%)" },
          "60%, 100%": { transform: "translateY(240%)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "scroll-cue": "scroll-cue 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
