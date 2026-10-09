-- ============================================================================
-- OPTIONAL — only for reusing a Supabase project that already holds another
-- studio's content. A brand-new Supabase project does NOT need this file.
--
-- This permanently deletes every gallery record and testimonial and blanks
-- every business detail (WhatsApp number and message, Instagram, TikTok,
-- hero text and photo), so the dashboard starts empty for the new client.
--
-- After running it:
--   1. Storage → media: delete the "gallery" and "hero" folders (the photo
--      files themselves live there, not in these tables).
--   2. Authentication → Users: add the new admin account and remove the
--      previous one.
--
-- If this fails with "column instagram_url does not exist", run
-- migration_add_social_links.sql first, then run this again.
-- ============================================================================

delete from public.gallery_images;
delete from public.testimonials;

update public.site_settings
set hero_title = '',
    hero_subtitle = 'Photography & Videography',
    hero_image_path = null,
    hero_image_url = null,
    whatsapp_phone = '',
    whatsapp_message = 'مرحبًا، أرغب في حجز جلسة تصوير.',
    instagram_url = '',
    tiktok_url = '',
    default_theme = 'light',
    updated_at = now()
where id = 1;
