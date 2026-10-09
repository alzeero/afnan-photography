"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Images, Home, Quote, MessageCircle, Settings, LogOut, ExternalLink } from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { BrandLogo } from "@/components/site/brand-logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { GalleryManager } from "./gallery-manager";
import { HeroManager } from "./hero-manager";
import { TestimonialsManager } from "./testimonials-manager";
import { WhatsappManager } from "./whatsapp-manager";
import { SettingsManager } from "./settings-manager";
import type { GalleryImage, SiteSettings, Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "gallery" | "hero" | "testimonials" | "whatsapp" | "settings";

const TABS: { id: Tab; label: string; icon: typeof Images }[] = [
  { id: "gallery", label: "المعرض", icon: Images },
  { id: "hero", label: "الواجهة الرئيسية", icon: Home },
  { id: "testimonials", label: "آراء العملاء", icon: Quote },
  { id: "whatsapp", label: "التواصل والحجز", icon: MessageCircle },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

export function DashboardShell({
  images,
  testimonials,
  settings,
}: {
  images: GalleryImage[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}) {
  const [tab, setTab] = useState<Tab>("gallery");

  // Safety net: if someone reaches the dashboard via a client-side
  // navigation from a page where the language toggle had switched
  // <html> to English/LTR, force it back — the dashboard is Arabic/RTL
  // only, it has no language toggle of its own.
  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <div dir="rtl" className="dashboard-root min-h-[100svh] w-full overflow-x-clip text-on-surface">
      <header className="sticky top-0 z-30 px-3 pt-3 sm:px-5">
        <div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full pe-2 ps-5 shadow-float sm:h-16 sm:ps-6">
          <div className="flex min-w-0 items-center gap-3">
            <BrandLogo tone="surface" className="w-[78px] shrink-0 sm:w-[92px]" />
            <span aria-hidden className="hidden h-5 w-px bg-line/15 sm:block" />
            <span className="hidden truncate text-sm font-medium text-on-surface-soft sm:inline">لوحة التحكم</span>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="عرض الموقع"
              className="flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-on-surface-soft transition-colors hover:text-on-surface"
            >
              <ExternalLink size={16} strokeWidth={1.5} />
              <span className="hidden md:inline">عرض الموقع</span>
            </Link>
            <ThemeToggle />
            <form action={signOut} className="shrink-0">
              <button
                type="submit"
                title="تسجيل الخروج"
                className="flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-on-surface-soft transition-colors hover:text-danger"
              >
                <LogOut size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">تسجيل الخروج</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile tab bar — sticky under the header; scrolls sideways within
          itself if needed instead of ever overflowing the page. */}
      <div className="sticky top-[4.25rem] z-20 px-3 pt-3 sm:hidden">
        <div className="glass no-scrollbar flex gap-1 overflow-x-auto rounded-full p-1.5 shadow-float">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                tab === id ? "bg-primary text-primary-fg" : "text-on-surface-soft"
              )}
            >
              <Icon size={15} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-3 py-5 sm:flex-row sm:gap-6 sm:px-5 sm:py-8">
        <nav className="panel hidden w-56 shrink-0 flex-col gap-1 self-start rounded-[4px] p-2 shadow-note sm:sticky sm:top-24 sm:flex">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-[3px] px-3.5 py-2.5 text-start text-sm font-medium transition-colors duration-300",
                tab === id
                  ? "bg-primary text-primary-fg"
                  : "text-on-surface-soft hover:bg-line/[0.06] hover:text-on-surface"
              )}
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </nav>

        <main className="panel w-full min-w-0 flex-1 rounded-[4px] p-5 shadow-note sm:p-8 lg:p-10">
          {tab === "gallery" && <GalleryManager images={images} />}
          {tab === "hero" && <HeroManager settings={settings} />}
          {tab === "testimonials" && <TestimonialsManager testimonials={testimonials} />}
          {tab === "whatsapp" && <WhatsappManager settings={settings} />}
          {tab === "settings" && <SettingsManager settings={settings} />}
        </main>
      </div>
    </div>
  );
}
