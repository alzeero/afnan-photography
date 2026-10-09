"use client";

import { forwardRef } from "react";

type FilePickerProps = {
  id: string;
  /** Name of the currently chosen file ("" when none). */
  fileName: string;
  onFileChange: (fileName: string) => void;
  accept?: string;
  buttonLabel?: string;
  emptyLabel?: string;
};

/**
 * Arabic, on-brand replacement for the browser's own "Choose File / No file
 * chosen" control. The real <input type="file"> stays in the DOM (visually
 * hidden but keyboard-focusable), so the parent keeps reading the file from
 * its ref exactly as before.
 */
export const FilePicker = forwardRef<HTMLInputElement, FilePickerProps>(
  (
    { id, fileName, onFileChange, accept = "image/*", buttonLabel = "اختيار صورة", emptyLabel = "لم يتم اختيار ملف" },
    ref
  ) => (
    <label htmlFor={id} className="group flex min-w-0 cursor-pointer items-center gap-4">
      <input
        ref={ref}
        id={id}
        type="file"
        accept={accept}
        className="peer sr-only"
        onChange={(e) => onFileChange(e.target.files?.[0]?.name ?? "")}
      />
      <span className="inline-flex h-10 shrink-0 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg transition-opacity duration-300 group-hover:opacity-85 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze">
        {buttonLabel}
      </span>
      <span dir="auto" className="min-w-0 truncate text-sm text-on-surface-mute">
        {fileName || emptyLabel}
      </span>
    </label>
  )
);
FilePicker.displayName = "FilePicker";
