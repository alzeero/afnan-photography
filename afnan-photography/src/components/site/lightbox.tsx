"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/components/providers/providers";
import type { GalleryImage } from "@/lib/types";

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

const SWIPE_THRESHOLD = 60;

const roundButton =
  "flex h-12 w-12 items-center justify-center rounded-full border border-on-noir/20 bg-noir/40 text-on-noir backdrop-blur-sm transition-colors duration-300 hover:border-champagne hover:text-champagne";

/**
 * Full-screen viewer in the darkroom's black. Shows the original file at full
 * quality; arrow keys, on-screen arrows and swiping all move between photos.
 * Prev/next keep their physical left/right positions in both languages so
 * they always match the arrow keys.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const { t } = useLanguage();
  const open = index !== null;
  const current = index !== null ? images[index] : null;
  const position = index !== null ? index + 1 : 0;
  const closeRef = useRef<HTMLButtonElement>(null);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  function handleDragEnd(_event: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) {
      goPrev();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      goNext();
    }
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, goPrev, goNext]);

  // Move keyboard focus into the viewer when it opens and hand it back to
  // the photo that opened it when it closes.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => opener?.focus?.({ preventScroll: true });
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.lightbox.label}
          className="on-dark fixed inset-0 z-[200] flex flex-col bg-noir/[0.95] text-on-noir"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <div
            dir="ltr"
            className="flex shrink-0 items-center justify-between px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="latin font-sans text-xs tracking-wide text-on-noir/60">
              {position} / {images.length}
            </span>
            <button ref={closeRef} type="button" aria-label={t.lightbox.close} onClick={onClose} className={roundButton}>
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-3 sm:px-24" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={current.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.975 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full touch-pan-y"
            >
              <Image
                src={current.url}
                alt={current.caption ?? ""}
                fill
                sizes="96vw"
                priority
                unoptimized
                draggable={false}
                className="pointer-events-none select-none object-contain"
              />
            </motion.div>
          </div>

          <div className="shrink-0 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4" onClick={(e) => e.stopPropagation()}>
            {current.caption && (
              <p className="mx-auto mb-4 max-w-2xl text-center text-sm text-on-noir/75">{current.caption}</p>
            )}
            {images.length > 1 && (
              <div
                dir="ltr"
                className="flex items-center justify-center gap-4 md:pointer-events-none md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:justify-between md:px-6"
              >
                <button type="button" aria-label={t.lightbox.prev} onClick={goPrev} className={`${roundButton} md:pointer-events-auto`}>
                  <ChevronLeft size={22} strokeWidth={1.5} />
                </button>
                <button type="button" aria-label={t.lightbox.next} onClick={goNext} className={`${roundButton} md:pointer-events-auto`}>
                  <ChevronRight size={22} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
