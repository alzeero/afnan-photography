import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  /**
   * - "ink": the original black logo — for anything sitting on the silk.
   * - "surface": black on light surfaces, white on dark-theme surfaces.
   * - "light": always white — for permanently black panels.
   */
  tone?: "ink" | "surface" | "light";
  /** Sets the rendered width; height always follows the artwork's own ratio. */
  className?: string;
  priority?: boolean;
  alt?: string;
};

/**
 * The client's supplied logo, served as-is (no re-compression) and always at
 * its original proportions: only a width is ever set, never a height.
 */
export function BrandLogo({ tone = "ink", className, priority, alt = BRAND.name }: BrandLogoProps) {
  const common = {
    width: BRAND.logo.width,
    height: BRAND.logo.height,
    unoptimized: true,
    priority,
    draggable: false,
  };

  if (tone === "surface") {
    return (
      <span className={cn("relative inline-block", className)}>
        <Image {...common} src={BRAND.logo.dark} alt={alt} className="h-auto w-full dark:hidden" />
        <Image {...common} src={BRAND.logo.light} alt={alt} className="hidden h-auto w-full dark:block" />
      </span>
    );
  }

  return (
    <Image
      {...common}
      src={tone === "light" ? BRAND.logo.light : BRAND.logo.dark}
      alt={alt}
      className={cn("h-auto", className)}
    />
  );
}
