/**
 * Brand constants — the single place that names the studio and points at
 * its supplied artwork. Business details (WhatsApp number, social links,
 * hero text…) are NOT here: they are edited from the admin dashboard and
 * stored in Supabase.
 */
export const BRAND = {
  name: "Afnan Photography",
  /** The client's silk photograph, used unaltered as the site background. */
  background: "/brand/afnan-silk-background.jpg",
  logo: {
    /** The supplied logo in its original black, on a transparent background. */
    dark: "/brand/afnan-logo.png",
    /** The same artwork in white, for black surfaces. */
    light: "/brand/afnan-logo-white.png",
    /** Intrinsic pixel size of both files — keeps the aspect ratio exact. */
    width: 1035,
    height: 627,
  },
} as const;
