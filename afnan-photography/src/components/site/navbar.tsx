"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/providers";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { cn } from "@/lib/utils";

/**
 * Top navigation, laid out like the original template's: logo at the start,
 * links in the middle, language / theme / booking at the end, all in small
 * medium-weight type. Transparent over the hero; once scrolled it becomes a
 * frosted bar with a hairline underneath. It slips away while reading
 * downward and returns on any upward scroll. On phones the links open in a
 * simple panel under the bar.
 */
export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 520);
        lastY = y;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const links = [
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#testimonials", label: t.nav.testimonials },
  ];

  // Over the silk the bar is just type; once it has its own surface (after
  // scrolling, or with the phone menu open) it takes the surface colours.
  const solid = scrolled || menuOpen;
  const tone = solid ? "surface" : "silk";

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color,color] duration-500 ease-premium",
        solid ? "border-line/10 bg-surface/85 text-on-surface backdrop-blur-md" : "border-transparent bg-transparent text-ink",
        hidden && !menuOpen && "-translate-y-full"
      )}
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label={t.nav.home} className="flex shrink-0 items-center">
          <BrandLogo tone={solid ? "surface" : "ink"} priority className="w-[64px] sm:w-[72px]" />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn("text-sm font-medium transition-colors duration-300", solid ? "hover:text-accent" : "hover:text-bronze")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle tone={tone} />
          <ThemeToggle tone={tone} />
          <a
            href="#book"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg shadow-float transition-opacity duration-300 hover:opacity-85"
          >
            {t.nav.book}
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? t.nav.close : t.nav.menu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="p-2 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line/10 bg-surface px-5 pb-6 pt-4 text-on-surface md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="text-base font-medium">
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-fg"
            >
              {t.nav.book}
            </a>
            <div className="mt-2 flex items-center justify-between border-t border-line/10 pt-4">
              <LanguageToggle tone="surface" />
              <ThemeToggle tone="surface" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
