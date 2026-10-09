# Afnan Photography

A one-page photography & videography portfolio for **Afnan Photography** — Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion and Supabase, with a private single-admin dashboard to manage everything without touching code.

The site is Arabic-first (right-to-left) with an English toggle. The studio's own silk photograph is the background of every page, and its own logo is used everywhere the brand appears. See `DESIGN.md` for the full design system.

## 1. Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- A free [Supabase](https://supabase.com) project — create a **new** one for this site

## 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com/dashboard).
2. Go to **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql`, and run it. This creates the three tables, seeds one empty settings row, enables Row Level Security, and creates the public `media` storage bucket with the right read/write policies.
3. Go to **Authentication → Users → Add user** and create the single admin account (the studio's email + a password). There is no public sign-up screen anywhere in the app — this is the only way in.
4. Go to **Project Settings → API** and copy the **Project URL** and **anon public** key.

> **Reusing a Supabase project that already holds another studio's content?** Run `supabase/reset_for_new_client.sql` once — it deletes the old gallery records and testimonials and blanks every business detail. Then empty the `gallery` and `hero` folders in **Storage → media**, and swap the admin user in **Authentication → Users**. A fresh project doesn't need any of this. (The other `migration_*.sql` files are only for upgrading databases created by older versions of this codebase.)

## 3. Configure the app

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Install & run

```bash
npm install
npm run dev
```

- Public site → `http://localhost:3000`
- Dashboard login → `http://localhost:3000/admin/login`

Sign in with the admin account from step 2.3. Everything about the business is entered there — nothing is hard-coded:

| Tab | Controls |
|---|---|
| **المعرض — Gallery** | Upload (direct to storage, full original quality, no compression), edit caption, delete, reorder images |
| **الواجهة الرئيسية — Hero** | Optional statement under the logo, the descriptor line, and the hero photo (shown as a framed print beside the logo) |
| **آراء العملاء — Testimonials** | Add / edit / delete client messages (paste real WhatsApp messages as-is; line breaks are kept) |
| **التواصل والحجز — Contact & booking** | WhatsApp number and pre-filled message behind every booking button, Instagram and TikTok links |
| **الإعدادات — Settings** | Default theme for first-time visitors: Light, Dark, or Auto (follows the visitor's device) |

Empty fields simply hide their element on the site (no WhatsApp number → booking panel shows a reminder to add one; no Instagram link → no Instagram icon). Changes reflect on the public page within seconds.

## 5. Deploying

A standard Next.js project — deploys cleanly to [Vercel](https://vercel.com) (recommended, zero config) or any Node host that supports Next.js 15:

1. Push the project to a Git repository and import it in Vercel (or run `vercel`).
2. Set the same three environment variables in the host's dashboard, with `NEXT_PUBLIC_SITE_URL` set to the real domain (it's used for the share image, `robots.txt` and `sitemap.xml`).
3. Deploy. Noto Kufi Arabic is fetched from Google Fonts at build time and self-hosted with the site; Geist Sans ships with the `geist` package.

## Project structure

```
public/brand/              the studio's artwork: silk background (unaltered) + logo (black & white)
src/
  app/
    page.tsx               the single public page
    layout.tsx             fonts, metadata, silk background layer, theme/language providers
    icon.png, apple-icon.png, favicon.ico, opengraph-image.jpg   generated from the logo
    admin/login/           admin sign-in
    admin/dashboard/       protected dashboard (tabs live in components/dashboard)
  components/
    site/                  Navbar, Hero, Gallery + Lightbox, Testimonials, booking panel, Footer, logo
    dashboard/             the five management panels
    ui/                    Button, form fields, Dialog — shared primitives
    providers/             theme (next-themes) + language (AR/EN) context
  lib/
    brand.ts               studio name + artwork paths (business details live in Supabase, not here)
    supabase/              browser/server/middleware Supabase clients
    actions/               all Server Actions (auth + every mutation)
    data.ts                read-side data fetching for the public page & dashboard
    i18n.ts                AR/EN interface copy
    types.ts, utils.ts
supabase/schema.sql        tables, RLS policies, storage bucket — run once
```

## Notes

- **One page, by design.** The public site has a single route.
- **Images.** Uploads go straight from the browser to the Supabase `media` bucket, bypassing Vercel's 4.5MB request limit. The gallery shows optimized versions; the full-screen viewer shows the original file.
- **Empty states.** Until content is added from the dashboard, the gallery and testimonials sections show a quiet placeholder line instead of looking broken.
- **No demo content is included.** No photos, testimonials, phone numbers or social accounts ship with the project — the gallery is empty on first run by design.
