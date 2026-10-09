# Design system — Afnan Photography

The site is built from the studio's two supplied assets — a white silk photograph and the black "AF" logo — plus the brief's black, white and gold. The idea running through it: **prints and stationery laid out on silk**, with one black "darkroom" panel for booking.

## Principles

1. **The silk is never covered.** The supplied photograph is the background of every page (public site and admin), shown exactly as supplied — no recolouring, darkening or overlays. Sections are not full-width bands; content floats on the silk.
2. **Ink and mount.** Type is the logo's own black. Photographs are mounted like prints (an even mat and a contact shadow), client messages are printed note cards.
3. **Gold is jewellery.** Champagne gold appears as fine lines, the heading flourish, small icons and one call-to-action button — never as large fills.
4. **One motion moment.** The logo resolves on load like a lens pulling focus. Everything else moves quietly: slow rises as sections enter, a silk sheen on buttons, a very slow drift of the background.

## Background

`public/brand/afnan-silk-background.jpg` is byte-for-byte the supplied file. It sits on a fixed layer behind all content (`.silk-backdrop` in `globals.css`):

- `background-size: cover`, centred, on a layer sized to the large viewport (`100lvh`), so it never jumps when mobile browser bars slide in and out (iOS ignores `background-attachment: fixed`, which is why it's a layer).
- A slight overscan (`scale(1.04)`) keeps the photograph's outermost pixel rows — a thin dark scan line along its bottom edge — out of view at every screen ratio.
- A 46-second drift (`silk-drift`) moves it imperceptibly; it is switched off for visitors who prefer reduced motion.

## Logo

The supplied logo is used everywhere the brand appears, always at its original proportions (only a width is ever set). `public/brand/afnan-logo.png` is the artwork with its white paper made transparent so it sits directly on the silk; `afnan-logo-white.png` is the same artwork in white for black surfaces. The favicon crops the "AF" letters from the artwork; the Apple touch icon and share image use the full logo. `BrandLogo` (`components/site/brand-logo.tsx`) picks the right file:

| `tone` | Use |
|---|---|
| `ink` | On the silk — always the original black |
| `surface` | On cards, menus and dialogs — black in the light theme, white in the dark theme |
| `light` | On permanently black panels |

## Colour

Values are HSL triplets in `src/app/globals.css`, consumed as Tailwind colours.

**Silk colours** — anything placed directly on the silk. Identical in both themes, because the silk never changes.

| Token | Value | Use |
|---|---|---|
| `ink` | `#000000` | Headings — the logo's black |
| `ink-soft` | `#383838` | Body text |
| `ink-mute` | `#595959` | Small print (5:1 contrast on the silk's darkest tone) |
| `bronze` | `#73562B` | Gold that stays legible on the silk (ornaments, focus ring) |
| `champagne` | `#CDAE79` | Decorative gold, gold on black |
| `sand` | `#EDE4D4` | Image placeholders |

**Surface colours** — cards, menus, dialogs, admin panels. The only values the theme switches:

| Token | Light theme | Dark theme |
|---|---|---|
| `surface` | white (pearl glass / white mats) | black (onyx glass / black mounts) |
| `on-surface` | black | white |
| `accent` | bronze | light champagne |
| `primary` button | black, white text | champagne, black text |

The dark theme therefore keeps the silk exactly as it is and turns the surfaces black with gold — "black tie" rather than an inverted page. The admin's **Settings** tab chooses which one first-time visitors see (Light, Dark or Auto).

## Typography

The same typefaces, sizes, weights and spacing as the original template this site was built from. There are no decorative or calligraphic fonts; the only display lettering is the logo artwork itself.

| Script | Typeface | Loaded by |
|---|---|---|
| Arabic | Noto Kufi Arabic — clean and geometric (weights 400–800) | `next/font/google`, self-hosted with the site at build time |
| Latin | Geist Sans | the `geist` package |

- **The page font follows the document direction** (`globals.css`): Arabic pages (`dir="rtl"`) are set in Noto Kufi Arabic, English pages in Geist. Text entered in the dashboard (hero lines, testimonials) is language-detected per string and gets the matching font (`font-arabic` / `font-sans`) and direction, whatever language the visitor has chosen.
- **Scale** (`fontSize` in `tailwind.config.ts`): section headings `heading-lg` (28 → 44px, fluid), admin and dialog headings `heading` (22 → 28px), body 16–20px, navigation and buttons 14–16px, labels 12px. Headings and interface type are medium weight (500); body text is regular.
- **Spacing** — letter-spacing is reset inside right-to-left content (tracking breaks Arabic letter joining). Latin-only details that need tracking, such as a Latin testimonial name, opt out with the `latin` class.

## Components

- **Navigation** — laid out like the original template: the small logo at the start, the two section links in the middle, the language and theme toggles and a rounded booking button at the end, all in small medium-weight type. Transparent over the silk at the top of the page; once scrolled it becomes a frosted bar with a hairline underneath. It slips away while reading downward and returns on any upward scroll. On phones the links, booking button and toggles open in a simple panel under the bar.
- **Hero** — the logo pulls into focus, then the optional statement, a gold hairline, the descriptor line and the booking buttons. A hero photo, when set, appears beside the logo as a mounted print with an offset frame line.
- **Gallery** — mounted prints dealt into two (phone/tablet) or three (desktop) columns in dashboard order, every photo at its own proportions, alternate columns set slightly lower. Tapping opens the full-screen viewer.
- **Viewer** — black, with the photo counter, swipe/arrow-key navigation and the original file at full quality.
- **Testimonials ("آراء العملاء")** — note cards with a fine gold inner border, each opening with a short gold hairline; a swipeable row on phones, balanced columns from tablet width.
- **Booking ("the darkroom")** — the page's one black panel, arched at the top like a window: the heading, the line "لنوثق لحظتكم القادمة", the WhatsApp button in champagne, and Instagram/TikTok as the original template's plain line icons (24px, about 20px apart, soft white turning gold on hover).
- **Heading flourish** — a dot setting off a fine sweeping line, taken from the gesture the logo's swash starts with. Used only above section headings and in the booking panel.
- **Buttons** — square-cornered; hover sends a soft band of light across them (the "silk sheen"); tap presses them slightly.

## Motion

Framer Motion, deliberately restrained, and every effect is disabled for visitors who prefer reduced motion:

- One orchestrated hero sequence: logo focus pull (1.8s) → statement → hairline → descriptor → buttons.
- Sections and prints rise once as they enter the viewport.
- The floating WhatsApp button carries the page's one living element: a slow champagne ring.
- Background drift and button sheen are CSS-only and GPU-composited; blur (`backdrop-filter`) is limited to the navigation bar and small admin overlays, never full-screen layers, to keep scrolling smooth on phones.
