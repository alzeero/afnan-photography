"use client";

import { useLanguage } from "@/components/providers/providers";
import { cn, isArabicText, textDir } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import type { Testimonial } from "@/lib/types";

/**
 * Client messages as printed note cards. On phones they sit in a row you
 * swipe through; from tablet width up they settle into columns. Each note
 * detects its own language, so an Arabic message pasted from WhatsApp keeps
 * its right-to-left layout even when the site is in English.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-8">
        <SectionHeading
          heading={t.testimonials.heading}
          intro={testimonials.length > 0 ? t.testimonials.intro : undefined}
        />
      </div>

      {testimonials.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md px-4 text-center text-ink-mute">{t.testimonials.empty}</p>
      ) : (
        <Reveal className="mx-auto mt-14 max-w-content sm:mt-20 sm:px-8">
          <ul
            className={cn(
              // Phones: a swipeable row of notes that bleeds to the screen edges.
              "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-8 pt-2",
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
                  <figure className="note flex h-full flex-col px-7 pb-7 pt-6 sm:px-8 sm:pb-8">
                    <span aria-hidden className="block h-9 font-display text-[3.25rem] leading-none text-accent/80">
                      &ldquo;
                    </span>
                    <blockquote
                      dir={textDir(testimonial.comment)}
                      className={cn(
                        "mt-3 flex-1 whitespace-pre-line text-on-surface-soft",
                        arabic ? "text-[1.02rem] leading-[1.95]" : "text-[0.98rem] leading-[1.75]"
                      )}
                    >
                      {testimonial.comment}
                    </blockquote>
                    <figcaption
                      dir={textDir(testimonial.customer_name)}
                      className="mt-6 flex items-center gap-3 text-sm text-on-surface"
                    >
                      <span aria-hidden className="h-px w-6 shrink-0 bg-accent/60" />
                      <span className={cn(!arabicName && "latin tracking-[0.06em]")}>{testimonial.customer_name}</span>
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
