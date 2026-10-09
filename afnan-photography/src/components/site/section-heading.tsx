import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Ornament } from "./ornament";

type SectionHeadingProps = {
  heading: string;
  intro?: string;
  className?: string;
};

/**
 * Ornament, heading and one plain line saying what the section is for. The
 * heading uses the original template's section-title style (heading-lg, medium
 * weight) in the page font — Noto Kufi Arabic or Geist Sans.
 */
export function SectionHeading({ heading, intro, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex flex-col items-center text-center", className)}>
      <Ornament className="text-bronze" />
      <h2 className="mt-4 text-balance text-heading-lg font-medium text-ink">{heading}</h2>
      {intro && <p className="mt-3 max-w-[34rem] text-balance text-base text-ink-soft">{intro}</p>}
    </Reveal>
  );
}
