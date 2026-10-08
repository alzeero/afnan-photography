"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/providers";
import { buttonStyles } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";
import { cn, isArabicText, textDir } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import type { SiteSettings } from "@/lib/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The opening frame: the logo resolves on the silk like a lens pulling focus,
 * then the optional statement, the descriptor line and the booking call to
 * action follow. When a hero photo is set in the dashboard it sits beside the
 * logo as a mounted print — the silk is never covered.
 */
export function Hero({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();

  const title = settings.hero_title?.trim() ?? "";
  const subtitle = settings.hero_subtitle?.trim() ?? "";
  const hasPhoto = Boolean(settings.hero_image_url);
  // A short Latin descriptor is set like the logo's own tagline: widely
  // tracked capitals. Anything longer, or Arabic, reads as a normal line.
  const subtitleAsBrandLine = subtitle.length > 0 && subtitle.length <= 42 && !isArabicText(subtitle);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.95, ease: EASE },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 pb-28 pt-28 sm:px-8 sm:pt-32 lg:pb-24"
    >
      <div
        className={cn(
          "mx-auto w-full max-w-content",
          hasPhoto
            ? "grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20"
            : "flex justify-center"
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center text-center",
            hasPhoto && "lg:items-start lg:text-start"
          )}
        >
          <h1 id="hero-logo" className="m-0">
            <motion.span
              className="block"
              initial={{ opacity: 0, filter: "blur(18px)", scale: 1.06 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 0.1, duration: 1.8, ease: EASE }}
            >
              <BrandLogo
                tone="ink"
                priority
                alt={BRAND.name}
                // Width is also capped by screen height, so the logo never crowds out
                // the rest of the hero on short or landscape screens.
                className={hasPhoto ? "w-[min(76vw,440px,62svh)]" : "w-[min(80vw,560px,72svh)]"}
              />
            </motion.span>
          </h1>

          {title && (
            <motion.p
              {...rise(0.9)}
              dir={textDir(title)}
              className={cn(
                "mt-9 max-w-[22ch] font-display text-ink",
                isArabicText(title)
                  ? "text-statement-ar"
                  : "text-statement italic tracking-[-0.01em]"
              )}
            >
              {title}
            </motion.p>
          )}

          <motion.span
            aria-hidden
            className="hairline-gold mt-8 block h-px w-24 origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
          />

          {subtitle && (
            <motion.p
              {...rise(1.25)}
              dir={textDir(subtitle)}
              className={cn(
                "mt-7 text-ink-soft",
                subtitleAsBrandLine
                  ? "latin text-[0.74rem] font-normal uppercase tracking-[0.24em] min-[380px]:text-[0.78rem] min-[380px]:tracking-couture sm:text-[0.86rem]"
                  : "max-w-[34rem] text-lead"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            {...rise(1.45)}
            className={cn(
              "mt-11 flex w-full max-w-xs flex-col items-stretch gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-7",
              hasPhoto && "lg:justify-start"
            )}
          >
            <a href="#book" className={buttonStyles({ variant: "primary", size: "lg", className: "sm:min-w-[13rem]" })}>
              {t.hero.cta}
            </a>
            <a href="#portfolio" className="link-underline self-center py-1 text-[0.95rem] text-ink">
              {t.hero.secondary}
            </a>
          </motion.div>
        </div>

        {hasPhoto && settings.hero_image_url && (
          <motion.figure
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.3, ease: EASE }}
            className="relative mx-auto w-full max-w-[400px] sm:max-w-[430px] lg:max-w-[460px]"
          >
            {/* A fine frame line set off behind the print, like a second mount. */}
            <span
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 border border-bronze/30 rtl:-translate-x-4"
            />
            <div className="relative bg-surface p-2.5 shadow-print transition-colors duration-500 sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand/40">
                <Image
                  src={settings.hero_image_url}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 430px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.figure>
        )}
      </div>

      <motion.a
        href="#portfolio"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-3 text-ink-mute [@media(max-height:640px)]:hidden"
      >
        <span className="text-micro">{t.hero.scroll}</span>
        <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-ink/60 motion-reduce:hidden" />
        </span>
      </motion.a>
    </section>
  );
}
