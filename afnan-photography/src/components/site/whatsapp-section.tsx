"use client";

import { useLanguage } from "@/components/providers/providers";
import { buttonStyles } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Ornament } from "./ornament";
import { WhatsAppIcon } from "./whatsapp-icon";
import { InstagramIcon } from "./instagram-icon";
import { TikTokIcon } from "./tiktok-icon";
import type { SiteSettings } from "@/lib/types";

// Same treatment as the original template: the plain Instagram/TikTok glyphs at
// 24px, soft white, turning gold on hover, about 20px apart. The padding
// only enlarges the tap area; it doesn't change how they look.
const socialLink = "p-2 text-on-noir/70 transition-colors duration-300 hover:text-champagne";

/**
 * Booking — "the darkroom": the page's one black panel, arched like a
 * window, with white type and champagne gold. Everything in it (number,
 * pre-filled message, Instagram, TikTok) comes from the dashboard; links
 * without a value simply don't render.
 */
export function WhatsAppSection({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const href = settings.whatsapp_phone
    ? buildWhatsAppUrl(settings.whatsapp_phone, settings.whatsapp_message)
    : undefined;

  const hasSocialLinks = Boolean(settings.instagram_url || settings.tiktok_url);

  return (
    <section id="book" className="px-5 py-24 sm:px-8 sm:py-30">
      <Reveal className="mx-auto max-w-[56rem]">
        <div className="darkroom px-6 pb-14 pt-24 text-center sm:px-12 sm:pb-20 sm:pt-40">
          <Ornament className="mx-auto text-champagne" />

          <h2 className="mt-5 text-balance text-heading-lg font-medium text-on-noir">{t.contact.heading}</h2>

          <p className="mx-auto mt-4 max-w-[30rem] text-balance text-lg text-on-noir/80 sm:text-xl">{t.contact.body}</p>

          <div className="mt-10 flex flex-col items-center gap-6">
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
              <div className="flex items-center justify-center gap-1">
                {settings.tiktok_url && (
                  <a
                    href={settings.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className={socialLink}
                  >
                    <TikTokIcon className="h-6 w-6" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={socialLink}
                  >
                    <InstagramIcon className="h-6 w-6" />
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
