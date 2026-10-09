"use client";

import { useLanguage } from "@/components/providers/providers";
import { BRAND } from "@/lib/brand";
import { BrandLogo } from "./brand-logo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#book", label: t.nav.book },
  ];

  return (
    <footer className="px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-5 text-center">
        <a href="#top" aria-label={t.nav.home} className="transition-opacity duration-300 hover:opacity-70">
          <BrandLogo tone="ink" className="w-[150px] sm:w-[176px]" />
        </a>

        <p className="text-sm font-medium text-ink">{t.footer.tagline}</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-ink-soft">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-premium hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span aria-hidden className="hairline-gold block w-full max-w-xs" />

        <p className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-ink-mute">
          <span dir="ltr" className="latin font-sans">
            © {year} {BRAND.name}
          </span>
          <span>{t.footer.rights}</span>
        </p>
      </div>
    </footer>
  );
}
