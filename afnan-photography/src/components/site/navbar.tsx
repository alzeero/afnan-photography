"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/providers";
import { buttonStyles } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { cn, isArabicText } from "@/lib/utils";

/**
 * Floating navigation.
 *  - At the top of the page it is just type on the silk; the hero's large
 *    logo is the brand mark, so the small one stays hidden until that hero
 *    logo has scrolled away.
 *  - Once scrolled it gathers into a glass capsule, slips away while reading
 *    downward and returns the moment the visitor scrolls back up.
 *  - On phones the menu opens as a full-screen sheet.
 */
export function Navbar() {
  const { t, lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
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

  useEffect(() => {
    const heroLogo = document.getElementById("hero-logo");
    if (!heroLogo) {
      setShowLogo(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setShowLogo(!entry.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const links = [
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#testimonials", label: t.nav.testimonials },
  ];

  const onSurface = scrolled || menuOpen;

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-premium sm:px-5 sm:pt-4",
          hidden && !menuOpen && "-translate-y-[130%]"
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 rounded-full ps-4 pe-2 transition-[background-color,border-color,box-shadow,color] duration-500 ease-premium sm:h-16 sm:ps-6 sm:pe-3",
            onSurface ? "glass shadow-float" : "border border-transparent text-ink"
          )}
        >
          <a
            href="#top"
            aria-label={t.nav.home}
            tabIndex={showLogo ? 0 : -1}
            className={cn(
              "flex shrink-0 items-center transition-[opacity,transform] duration-500 ease-premium",
              showLogo ? "opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
            )}
          >
            <BrandLogo tone={onSurface ? "surface" : "ink"} className="w-[70px] sm:w-[82px]" />
          </a>

          {/* Centred on the capsule itself, whatever the widths on either side. */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[0.95rem] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-premium hover:after:scale-x-100",
                  !isArabicText(link.label) && "font-light tracking-[0.04em]"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <LanguageToggle />
            <ThemeToggle />
            <a href="#book" className={buttonStyles({ variant: "primary", size: "sm", className: "ms-2 rounded-full px-5" })}>
              {t.nav.book}
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-premium",
                  menuOpen && "translate-y-[5.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 h-px bg-current transition-all duration-500 ease-premium",
                  menuOpen ? "inset-x-0 -translate-y-[5.5px] -rotate-45" : "end-0 w-4"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45] flex flex-col bg-surface/[0.96] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 text-on-surface md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {[...links, { href: "#book", label: t.nav.book }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "border-b border-line/10 py-4 font-display text-on-surface",
                    lang === "ar" ? "text-[2.1rem] leading-[1.5]" : "text-[2.4rem] leading-tight"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex items-center justify-between text-on-surface"
            >
              <BrandLogo tone="surface" className="w-[92px]" />
              <div className="flex items-center gap-1">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
