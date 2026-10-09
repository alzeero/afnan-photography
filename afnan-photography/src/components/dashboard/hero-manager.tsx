"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import Image from "next/image";
import { updateHeroText, updateHeroImageRecord } from "@/lib/actions/content";
import { uploadImageToStorage, removeImageFromStorage } from "@/lib/upload-image";
import { Input, Label, FieldError, FieldSuccess } from "@/components/ui/form-fields";
import { FilePicker } from "@/components/ui/file-picker";
import { Button } from "@/components/ui/button";
import { ManagerHeading } from "./manager-ui";
import type { SiteSettings } from "@/lib/types";

export function HeroManager({ settings }: { settings: SiteSettings }) {
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState(settings.hero_title);
  const [subtitle, setSubtitle] = useState(settings.hero_subtitle);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function run(action: () => Promise<void>, message: string) {
    setError(null);
    setSuccess(null);
    setBusy(true);
    startTransition(async () => {
      try {
        await action();
        setSuccess(message);
      } catch (e) {
        setError(e instanceof Error ? e.message : "حدث خطأ ما.");
      } finally {
        setBusy(false);
      }
    });
  }

  function handleTextSubmit(e: FormEvent) {
    e.preventDefault();
    run(() => updateHeroText({ hero_title: title, hero_subtitle: subtitle }), "تم تحديث النص بنجاح.");
  }

  async function handleImageSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("يرجى اختيار صورة أولاً.");
      return;
    }

    setError(null);
    setSuccess(null);
    setBusy(true);

    let uploaded: { path: string; url: string } | null = null;
    try {
      uploaded = await uploadImageToStorage(file, "hero");
      await updateHeroImageRecord({ storage_path: uploaded.path, url: uploaded.url });
      setSuccess("تم تحديث الصورة بنجاح.");
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      if (uploaded) await removeImageFromStorage(uploaded.path).catch(() => {});
      setError(err instanceof Error ? err.message : "حدث خطأ ما.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10">
      <section>
        <ManagerHeading
          title="نص الواجهة الرئيسية"
          description="يظهر تحت الشعار في أعلى الصفحة. العبارة الرئيسية اختيارية — اتركيها فارغة لإخفائها. يتم اكتشاف اللغة (عربي أو إنجليزي) تلقائيًا."
        />
        <form onSubmit={handleTextSubmit} className="mt-6 max-w-md space-y-5">
          <div>
            <Label htmlFor="hero-title">العبارة الرئيسية (اختياري)</Label>
            <Input id="hero-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">السطر الوصفي</Label>
            <Input id="hero-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy} className="w-full sm:w-auto">
            حفظ النص
          </Button>
        </form>
      </section>

      <div className="h-px bg-line/10" />

      <section>
        <ManagerHeading
          title="صورة الواجهة الرئيسية"
          description="تظهر كصورة مطبوعة داخل إطار بجانب الشعار (وتحته على الجوال)، فوق الخلفية الحريرية. يُفضَّل أن تكون عمودية. تُرفع بجودتها الأصلية بالكامل."
        />

        {settings.hero_image_url && (
          <div className="mt-6 w-full max-w-[220px] bg-surface p-1.5 shadow-print">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand/40">
              <Image src={settings.hero_image_url} alt="الصورة الحالية" fill sizes="220px" className="object-cover" />
            </div>
          </div>
        )}

        <form onSubmit={handleImageSubmit} className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <FilePicker ref={fileInputRef} id="hero-file" fileName={fileName} onFileChange={setFileName} />
          <Button type="submit" disabled={busy} className="w-full shrink-0 sm:w-auto">
            {busy ? "جارٍ الرفع…" : settings.hero_image_url ? "استبدال الصورة" : "رفع الصورة"}
          </Button>
        </form>
      </section>

      <FieldError>{error}</FieldError>
      <FieldSuccess>{success}</FieldSuccess>
    </div>
  );
}
