import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Amiri, Bodoni_Moda, Jost, Tajawal } from "next/font/google";
import { Providers } from "@/components/providers/providers";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import "./globals.css";

/*
 * Type system
 *  - Bodoni Moda: high-contrast display serif, echoing the logo's "AF".
 *  - Jost: geometric sans for text and UI, echoing the logo's tagline.
 *  - Amiri / Tajawal: their Arabic counterparts (display / text).
 *
 * The Latin faces skip next/font's metric-adjusted Arial fallback on
 * purpose: that fallback contains Arabic glyphs on Windows and would
 * swallow Arabic characters before they reach Amiri/Tajawal in the stack.
 */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: false,
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  adjustFontFallback: false,
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
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
      className={`${bodoni.variable} ${jost.variable} ${amiri.variable} ${tajawal.variable}`}
    >
      <body className="font-sans antialiased">
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
