import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "outline-surface" | "ghost" | "danger" | "champagne";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "btn-sheen inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-premium active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Black with white type in the light theme, champagne gold with black type
  // in the dark theme (see --primary in globals.css).
  primary: "bg-primary text-primary-fg hover:shadow-float",
  // For buttons placed directly on the silk.
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink/[0.04]",
  // For buttons placed on a card, menu or dialog surface.
  "outline-surface":
    "border border-line/25 text-on-surface hover:border-line/70 hover:bg-line/[0.05]",
  ghost: "text-on-surface-soft hover:bg-line/[0.06] hover:text-on-surface",
  danger: "bg-danger text-danger-fg hover:shadow-float",
  // The gold call to action inside the black booking panel.
  champagne: "bg-champagne text-noir hover:bg-champagne-light hover:shadow-float",
};

// Same sizes and type as the original template's buttons.
const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-14 px-9 text-base",
};

/** Class names for anything that should look like a button — including
 *  plain <a> links such as the booking calls to action. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={buttonStyles({ variant, size, className })} {...props} />
    );
  }
);
Button.displayName = "Button";
