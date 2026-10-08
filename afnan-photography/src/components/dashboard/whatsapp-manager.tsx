"use client";

import { useState, useTransition, type FormEvent } from "react";
import { updateWhatsappSettings } from "@/lib/actions/content";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Input, Label, Textarea, FieldError, FieldSuccess } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { ManagerHeading } from "./manager-ui";
import type { SiteSettings } from "@/lib/types";

export function WhatsappManager({ settings }: { settings: SiteSettings }) {
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [phone, setPhone] = useState(settings.whatsapp_phone ?? "");
  const [message, setMessage] = useState(settings.whatsapp_message ?? "");
  const [instagramUrl, setInstagramUrl] = useState(settings.instagram_url ?? "");
  const [tiktokUrl, setTiktokUrl] = useState(settings.tiktok_url ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setBusy(true);
    startTransition(async () => {
      try {
        await updateWhatsappSettings({
          whatsapp_phone: phone,
          whatsapp_message: message,
          instagram_url: instagramUrl,
          tiktok_url: tiktokUrl,
        });
        setSuccess("تم تحديث الإعدادات بنجاح.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ ما.");
      } finally {
        setBusy(false);
      }
    });
  }

  return (
    <div className="max-w-lg space-y-8">
      <ManagerHeading
        title="التواصل والحجز"
        description="رقم واتساب يشغّل زر الحجز في قسم «احجزي جلستك» وزر واتساب العائم. الروابط تتحكم في أيقونات إنستغرام وتيك توك. أي حقل فارغ يختفي عنصره من الموقع."
      />

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-5">
          <div>
            <Label htmlFor="wa-phone">رقم الهاتف (واتساب)</Label>
            <Input
              id="wa-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9665XXXXXXXX"
              inputMode="tel"
              autoComplete="off"
              dir="ltr"
            />
            <p className="mt-2 text-xs leading-relaxed text-on-surface-mute">
              بالصيغة الدولية بدون + أو أصفار في البداية، مثل 9665 ثم بقية الرقم.
            </p>
          </div>
          <div>
            <Label htmlFor="wa-message">الرسالة الافتراضية</Label>
            <Textarea
              id="wa-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              dir="rtl"
              className="min-h-40"
            />
            <p className="mt-2 text-xs leading-relaxed text-on-surface-mute">
              تُكتب تلقائيًا في محادثة واتساب عندما تضغط الزائرة على زر الحجز.
            </p>
          </div>
        </div>

        <div className="h-px bg-line/10" />

        <div className="space-y-5">
          <p className="text-sm font-medium text-on-surface">روابط السوشيال ميديا (اختياري)</p>
          <div>
            <Label htmlFor="instagram-url">رابط إنستغرام</Label>
            <Input
              id="instagram-url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/..."
              inputMode="url"
              dir="ltr"
            />
          </div>
          <div>
            <Label htmlFor="tiktok-url">رابط تيك توك</Label>
            <Input
              id="tiktok-url"
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
              placeholder="https://tiktok.com/@..."
              inputMode="url"
              dir="ltr"
            />
          </div>
          <p className="text-xs text-on-surface-mute">اتركي الحقل فارغًا لإخفاء أيقونته من الموقع.</p>
        </div>

        <div>
          <Button type="submit" disabled={busy} className="w-full sm:w-auto">
            حفظ الإعدادات
          </Button>
          <FieldError>{error}</FieldError>
          <FieldSuccess>{success}</FieldSuccess>
        </div>
      </form>

      {phone && (
        <a
          href={buildWhatsAppUrl(phone, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-block text-sm text-accent"
        >
          معاينة الرابط على واتساب
        </a>
      )}
    </div>
  );
}
