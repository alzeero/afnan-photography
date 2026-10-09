"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Wraps next/image with a soft placeholder that fades away once the real
 * image has loaded. next/image already lazy-loads by default (images only
 * start fetching as they approach the viewport) — this only adds the visual
 * loading state on top, with no effect on the delivered image quality.
 * The parent must be `position: relative`.
 */
export function LazyImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-sand/70 via-surface/60 to-sand/70 transition-opacity duration-700",
          loaded ? "opacity-0" : "animate-pulse opacity-100"
        )}
      />
      <Image
        {...props}
        className={cn(className, "transition-opacity duration-700", loaded ? "opacity-100" : "opacity-0")}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
