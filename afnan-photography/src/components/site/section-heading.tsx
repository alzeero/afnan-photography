import { cn, isArabicText } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Ornament } from "./ornament";

type SectionHeadingProps = {
  heading: string;
  intro?: string;
  className?: string;
};

/** Ornament, display heading and one plain line saying what the section is for. */
export function SectionHeading({ heading, intro, className }: SectionHeadingProps) {
  const arabic = isArabicText(heading);

  return (
    <Reveal className={cn("flex flex-col items-center text-center", className)}>
      <Ornament className="text-bronze" />
      <h2
        className={cn(
          "mt-5 font-display font-normal text-ink",
          arabic
            ? "text-display-ar"
            : "text-display tracking-[-0.015em]"
        )}
      >
        {heading}
      </h2>
      {intro && (
        <p className={cn("mt-4 max-w-[34rem] text-balance text-lead text-ink-soft", !arabic && "font-light")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
