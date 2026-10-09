# Changelog

## 1.1.0 — Typography, copy and icons

Visual and text changes only. Supabase (client, server, middleware, auth, server actions, schema, storage and uploads), environment variable names and `next.config.ts` are untouched — byte-for-byte the same as 1.0.0.

### Typography

- Arabic is set in **Noto Kufi Arabic** and Latin in **Geist Sans**: the same fonts, sizes, weights and spacing as the original template this site was built from. This applies across the homepage, navigation and menu, gallery and viewer, testimonials, booking panel, footer, admin login, dashboard and upload forms.
- Removed the 1.0.0 fonts (Amiri, Tajawal, Bodoni Moda, Jost). No decorative or calligraphic font remains; the logo artwork is the only display lettering.
- Restored the original template's type scale and hierarchy: section and admin headings, body, navigation and button sizes, and medium-weight headings.
- The page font follows the document direction; text entered in the dashboard picks Arabic or Latin per string.

### Copy

- "قالوا عنّا" → **"آراء العملاء"** (section heading and navigation link). English: "Testimonials".
- Booking panel: the longer sentence is replaced with **"لنوثق لحظتكم القادمة"** only (English: "Let's capture your next moment").

### Navigation and icons

- The navigation is laid out like the original template's: a full-width bar with the small logo always visible, links in the middle, toggles and a rounded booking button at the end. It is frosted once scrolled, and on phones it opens a simple drop-down panel. This replaces the floating capsule and the full-screen menu.
- Instagram and TikTok use the original template's icons in the same style: plain 24px glyphs about 20px apart, soft white turning gold on hover, TikTok first. The gold rings are gone.

### Admin

- Typography only: headings, tab labels, field labels and buttons follow the same scale. Layout and behaviour are unchanged.

## 1.0.0 — Afnan Photography

New client, new identity, same working foundation. Every page, the booking flow, the admin dashboard, authentication, Supabase tables, storage and server actions work exactly as before; what changed is the brand and the entire visual design.

### Brand & assets

- **Logo** — the supplied Afnan Photography logo replaces the previous logo everywhere: navigation, hero, footer, admin login, dashboard header. Used at its original proportions, from transparent black and white versions of the supplied artwork (`public/brand/`).
- **Background** — the supplied silk photograph is the background of every page, public and admin, unaltered (`public/brand/afnan-silk-background.jpg`).
- **Icons & sharing** — favicon, app icon and social share image generated from the logo (and the silk) via Next.js file conventions in `src/app/`.
- **Name** — `lib/brand.ts` holds the studio name and artwork paths; metadata, titles, copyright and package name all read "Afnan Photography".

### Removed: everything from the previous client

- Previous logos, share image, favicon, business name, slogan and pre-filled WhatsApp text.
- Seeded content in `supabase/schema.sql` and the fallback settings in `lib/data.ts`: the hero statement now starts empty, contact details start empty, and the pre-filled WhatsApp message is a neutral "مرحبًا، أرغب في حجز جلسة تصوير." that the studio can rewrite.
- Previous project history (design notes, changelog) containing the old client's details — replaced by these files.
- A stale duplicate of the data layer (`src/app/data.ts`) that nothing imported.
- No phone numbers, social accounts or demo content were added in their place.

### Design

- New palette: the logo's black, white pearl surfaces and champagne/bronze gold on the silk. A dark theme that keeps the silk and turns surfaces black with gold.
- New type: Bodoni Moda + Jost (Latin), Amiri + Tajawal (Arabic) — replacing Geist, Noto Kufi Arabic and Cormorant Garamond.
- Rebuilt every public component: floating capsule navigation with full-screen mobile menu; focus-pull hero with an optional framed hero print; gallery as mounted prints in an order-preserving column layout with no cropping; black full-screen viewer with photo counter; testimonials as note cards (swipeable on phones); arched black booking panel; new footer; black/champagne floating WhatsApp button.
- Restyled the admin: login, dashboard header (new "view site" link and theme toggle), tab bar, panels, forms, dialogs (bottom sheets on phones), buttons, error screen.
- See `DESIGN.md` for the full system.

### Fixes and small improvements made along the way

- **Reduced-motion visitors could see blank sections.** Components used to branch on the "reduce motion" preference during render, so the server sent hidden (opacity 0) markup that the client never un-hid. Motion now goes through Framer Motion's `<MotionConfig reducedMotion="user">` with identical markup on server and client (movement is dropped, gentle fades stay).
- **Dashboard header and tab bar now actually stay pinned.** The wrapper's `overflow-x: hidden` silently disabled `position: sticky`; it is now `overflow-x: clip`.
- Upload fields use an Arabic, on-brand file picker instead of the browser's "Choose File / No file chosen".
- Hero photo now appears as a framed print beside the logo instead of a darkened full-screen background, so the silk is never covered (dashboard copy updated to match).
- Testimonials keep the line breaks of pasted WhatsApp messages.
- Lightbox moves keyboard focus in and back out; viewer, menu and dialogs have proper dialog semantics.
- `tailwind-merge` now knows the custom font sizes and shadows, so merged class names can't silently drop them.
- Missing `sizes` added to dashboard images (removes Next.js console warnings).
- Middleware no longer runs for static brand assets, icons, `robots.txt` or `sitemap.xml`.
- Added `.env.example` (referenced by the README but previously missing) and `.gitignore`.
- New optional `supabase/reset_for_new_client.sql` for reusing an existing Supabase project.

### Technical notes carried over (unchanged behaviour)

- One Supabase client per server render, passed into every read — avoids concurrent session refreshes racing each other.
- Images upload directly from the browser to Supabase Storage (bypasses Vercel's 4.5MB request limit); server actions only receive the resulting path and URL.
- Dashboard saves rely on each server action's `revalidatePath` — no manual `router.refresh()`.
- Form fields are 16px on phones so iOS Safari doesn't zoom into them; iOS form chrome is reset inside the admin only.
- Letter-spacing is reset inside right-to-left content, which keeps Arabic letters joined.
