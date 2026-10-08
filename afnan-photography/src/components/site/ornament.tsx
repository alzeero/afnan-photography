import { cn } from "@/lib/utils";

/**
 * The site's one recurring flourish: a dot that sets off a fine sweeping
 * line — the gesture the logo's own swash starts with. Used sparingly, above
 * section headings and inside the booking panel.
 */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[18px] w-[72px] rtl:-scale-x-100", className)}
    >
      <circle cx="6" cy="11.5" r="2.75" fill="currentColor" />
      <path
        d="M10.5 10.2C24 2.4 47 1.6 69 11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
