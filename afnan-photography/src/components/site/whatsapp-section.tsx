"use client";

import { useLanguage } from "@/components/providers/providers";
import { buttonStyles } from "@/components/ui/button";
import { buildWhatsAppUrl, cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Ornament } from "./ornament";
import { WhatsAppIcon } from "./whatsapp-icon";
import { InstagramIcon } from "./instagram-icon";
import { TikTokIcon } from "./tiktok-icon";
import type { SiteSettings } from "@/lib/types";

const socialLink =
  "flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 text-champagne transition-colors duration-300 hover:border-champagne hover:bg-champagne hover:text-noir";

/**
 * Booking — "the darkroom": the page's one black panel, arched like a
 * window, with white type and champagne gold. Everything in it (number,
 * pre-filled message, Instagram, TikTok) comes from the dashboard; links
 * without a value simply don't render.
 */
export function WhatsAppSection({ settings }: { settings: SiteSettings }) {
  const { t, lang } = useLanguage();
  const href = settings.whatsapp_phone
    ? buildWhatsAppUrl(settings.whatsapp_phone, settings.whatsapp_message)
    : undefined;

  const hasSocialLinks = Boolean(settings.instagram_url || settings.tiktok_url);

  return (
    <section id="book" className="px-4 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-[56rem]">
        <div className="darkroom px-6 pb-14 pt-24 text-center sm:px-12 sm:pb-20 sm:pt-40">
          <Ornament className="mx-auto text-champagne" />

          <h2
            className={cn(
              "mt-6 font-display text-on-noir",
              lang === "ar"
                ? "text-display-ar"
                : "text-display tracking-[-0.015em]"
            )}
          >
            {t.contact.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-[30rem] text-pretty text-lead text-on-noir/75">{t.contact.body}</p>

          <div className="mt-10 flex flex-col items-center gap-8">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "champagne", size: "lg", className: "w-full max-w-xs sm:w-auto sm:max-w-none" })}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                {t.contact.cta}
              </a>
            ) : (
              <p className="max-w-sm rounded-[2px] border border-dashed border-champagne/40 px-5 py-3 text-sm text-on-noir/70">
                {t.contact.notConfigured}
              </p>
            )}

            {hasSocialLinks && (
              <div className="flex items-center justify-center gap-4">
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={socialLink}
                  >
                    <InstagramIcon className="h-[18px] w-[18px]" />
                  </a>
                )}
                {settings.tiktok_url && (
                  <a
                    href={settings.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className={socialLink}
                  >
                    <TikTokIcon className="h-[18px] w-[18px]" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
