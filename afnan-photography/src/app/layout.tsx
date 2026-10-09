import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { GeistSans } from "geist/font/sans";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Providers } from "@/components/providers/providers";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import "./globals.css";

/*
 * Typography — the same pairing as the original template: Noto Kufi
 * Arabic for Arabic (clean, geometric, no calligraphic forms) and Geist Sans
 * for Latin. The page font follows the document direction (see globals.css);
 * free text entered in the dashboard picks its font per string.
 */
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-kufi-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: `${BRAND.name} | Photography & Videography`,
  description: `${BRAND.name} — photography and videography. Browse the portfolio and book your session.`,
  applicationName: BRAND.name,
  openGraph: {
    title: `${BRAND.name} | Photography & Videography`,
    description: "Browse the portfolio and book your session.",
    siteName: BRAND.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The page always sits on the silk, in both themes.
  themeColor: "#efefef",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const settings = await getSiteSettings(supabase);

  // The silk is the first thing every page paints — fetch it early.
  preload(BRAND.background, { as: "image", fetchPriority: "high" });

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${notoKufiArabic.variable}`}
      style={
        {
          "--font-sans": "var(--font-geist-sans)",
          "--font-arabic": "var(--font-noto-kufi-arabic)",
        } as React.CSSProperties
      }
    >
      <body className="antialiased">
        <div
          aria-hidden
          className="silk-backdrop"
          style={{ backgroundImage: `url(${BRAND.background})` }}
        />
        <Providers defaultTheme={settings.default_theme}>{children}</Providers>
      </body>
    </html>
  );
}
