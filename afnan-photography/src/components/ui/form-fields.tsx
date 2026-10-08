import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// 16px text on phones on purpose: iOS Safari zooms the whole page into any
// focused field smaller than that.
const fieldBase =
  "w-full rounded-[3px] border border-line/15 bg-surface/80 px-4 py-3 text-base text-on-surface placeholder:text-on-surface-mute/70 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 sm:text-[0.95rem]";

export const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-2 block text-[0.8125rem] font-medium text-on-surface-soft", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldBase, className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "min-h-28 resize-y leading-relaxed", className)} {...props} />
  )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldBase, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  )
);
Select.displayName = "Select";

export function FieldError({ children }: { children?: string | null }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 text-sm leading-relaxed text-danger">
      {children}
    </p>
  );
}

export function FieldSuccess({ children }: { children?: string | null }) {
  if (!children) return null;
  return (
    <p role="status" className="mt-2 text-sm text-success">
      {children}
    </p>
  );
}
