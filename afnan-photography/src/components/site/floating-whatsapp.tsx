"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/providers";
import { buildWhatsAppUrl } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Small black WhatsApp button with a champagne ring, fixed bottom-right in
 * both languages. It steps aside while the booking panel (which has its own
 * large button) is on screen, and doesn't render at all until a number has
 * been set in the dashboard.
 */
export function FloatingWhatsApp({ phone, message }: { phone: string; message: string }) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("book");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!phone) return null;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.a
          href={buildWhatsAppUrl(phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.floating.label}
          title={t.floating.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)_+_0.5rem))] right-5 z-40 h-14 w-14 rounded-full sm:bottom-8 sm:right-8"
        >
          {/* The ring sits behind the button face, so it only shows as it
              expands past the edge. */}
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-champagne/45 motion-reduce:hidden" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-noir text-on-noir shadow-float ring-1 ring-champagne/60">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
