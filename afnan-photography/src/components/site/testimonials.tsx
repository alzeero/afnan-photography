"use client";

import { useLanguage } from "@/components/providers/providers";
import { cn, isArabicText, textDir } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import type { Testimonial } from "@/lib/types";

/**
 * Client messages as printed note cards, with the original template's review
 * typography (0.95rem text, medium-weight gold name, a short gold rule on
 * top). On phones they sit in a row you swipe through; from tablet width up
 * they settle into columns. Each note detects its own language, so an Arabic
 * message pasted from WhatsApp keeps its font and right-to-left layout even
 * when the site is in English.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-24 sm:py-30">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          heading={t.testimonials.heading}
          intro={testimonials.length > 0 ? t.testimonials.intro : undefined}
        />
      </div>

      {testimonials.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md px-5 text-center text-ink-mute">{t.testimonials.empty}</p>
      ) : (
        <Reveal className="mx-auto mt-14 max-w-content sm:px-8">
          <ul
            className={cn(
              // Phones: a swipeable row of notes that bleeds to the screen edges.
              "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-8 pt-2",
              // Tablet and up: notes flow into balanced columns.
              "sm:block sm:columns-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:columns-3"
            )}
          >
            {testimonials.map((testimonial) => {
              const arabic = isArabicText(testimonial.comment);
              const arabicName = isArabicText(testimonial.customer_name);
              return (
                <li
                  key={testimonial.id}
                  className="w-[84%] max-w-[22rem] shrink-0 snap-start sm:mb-6 sm:w-auto sm:max-w-none sm:break-inside-avoid"
                >
                  <figure className="note flex h-full flex-col p-7">
                    <span aria-hidden className="hairline-gold mb-5 block w-10" />
                    <blockquote
                      dir={textDir(testimonial.comment)}
                      className={cn(
                        "flex-1 whitespace-pre-line text-[0.95rem] leading-relaxed text-on-surface-soft",
                        arabic ? "font-arabic" : "font-sans"
                      )}
                    >
                      {testimonial.comment}
                    </blockquote>
                    <figcaption
                      dir={textDir(testimonial.customer_name)}
                      className={cn(
                        "mt-6 text-sm font-medium text-accent",
                        arabicName ? "font-arabic" : "latin font-sans uppercase tracking-widest2"
                      )}
                    >
                      {testimonial.customer_name}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
