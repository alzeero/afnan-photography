"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Trash2, Pencil, ArrowUp, ArrowDown, Upload } from "lucide-react";
import {
  createGalleryImageRecord,
  updateGalleryImage,
  deleteGalleryImage,
  reorderGalleryImage,
} from "@/lib/actions/content";
import { uploadImageToStorage, removeImageFromStorage } from "@/lib/upload-image";
import { Input, Label, Textarea, FieldError } from "@/components/ui/form-fields";
import { FilePicker } from "@/components/ui/file-picker";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ManagerHeading, iconButton } from "./manager-ui";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploadCaption, setUploadCaption] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editCaption, setEditCaption] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);

  async function run(action: () => Promise<void>, onDone?: () => void) {
    setError(null);
    setBusy(true);
    try {
      await action();
      onDone?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ ما.");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("يرجى اختيار صورة للرفع أولاً.");
      return;
    }

    setError(null);
    setBusy(true);

    let uploaded: { path: string; url: string } | null = null;
    try {
      uploaded = await uploadImageToStorage(file, "gallery");
      await createGalleryImageRecord({
        storage_path: uploaded.path,
        url: uploaded.url,
        caption: uploadCaption || null,
      });
      setUploadCaption("");
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      // If the file made it to storage but the database record failed,
      // don't leave an orphaned file behind.
      if (uploaded) await removeImageFromStorage(uploaded.path).catch(() => {});
      setError(err instanceof Error ? err.message : "حدث خطأ ما.");
    } finally {
      setBusy(false);
    }
  }

  function openEdit(image: GalleryImage) {
    setEditingImage(image);
    setEditCaption(image.caption ?? "");
  }

  function saveEdit() {
    if (!editingImage) return;
    run(
      () => updateGalleryImage(editingImage.id, { caption: editCaption || null }),
      () => setEditingImage(null)
    );
  }

  return (
    <div className="space-y-10">
      <FieldError>{error}</FieldError>

      {/* Upload */}
      <section>
        <ManagerHeading
          title="رفع صورة"
          description="تُرفع الصورة بجودتها ودقتها الأصلية بالكامل — بدون أي ضغط أو تصغير. تظهر الصور في الموقع بترتيبها هنا، وبنسبها الأصلية دون قص."
        />
        <form onSubmit={handleUpload} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="file">ملف الصورة</Label>
            <FilePicker ref={fileInputRef} id="file" fileName={fileName} onFileChange={setFileName} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="upload-caption">وصف الصورة (اختياري)</Label>
            <Input id="upload-caption" value={uploadCaption} onChange={(e) => setUploadCaption(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy} className="w-full sm:col-span-2 sm:w-fit">
            <Upload size={16} strokeWidth={1.5} /> {busy ? "جارٍ الرفع…" : "رفع الصورة"}
          </Button>
        </form>
      </section>

      <div className="h-px bg-line/10" />

      {/* Existing images */}
      <section>
        <ManagerHeading title={`المعرض (${images.length})`} />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={image.id} className="overflow-hidden rounded-[3px] bg-surface p-1.5 shadow-print">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand/40">
                <Image
                  src={image.url}
                  alt={image.caption ?? ""}
                  fill
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 px-1.5 pb-1 pt-3">
                {image.caption && <p className="truncate text-sm text-on-surface-mute">{image.caption}</p>}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="تحريك لأعلى"
                    aria-label="تحريك لأعلى"
                    disabled={index === 0 || busy}
                    onClick={() => run(() => reorderGalleryImage(image.id, "up", image.sort_order))}
                    className={iconButton}
                  >
                    <ArrowUp size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    title="تحريك لأسفل"
                    aria-label="تحريك لأسفل"
                    disabled={index === images.length - 1 || busy}
                    onClick={() => run(() => reorderGalleryImage(image.id, "down", image.sort_order))}
                    className={iconButton}
                  >
                    <ArrowDown size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    title="تعديل"
                    aria-label="تعديل"
                    onClick={() => openEdit(image)}
                    className={iconButton}
                  >
                    <Pencil size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    title="حذف"
                    aria-label="حذف"
                    onClick={() => setDeleteTarget(image)}
                    className={cn(iconButton, "ms-auto hover:bg-danger/10 hover:text-danger")}
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <p className="text-sm text-on-surface-mute">لا توجد صور بعد — ارفعي أول صورة أعلاه.</p>
          )}
        </div>
      </section>

      {/* Edit dialog */}
      <Dialog open={!!editingImage} onClose={() => setEditingImage(null)} title="تعديل الصورة">
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-caption">وصف الصورة</Label>
            <Textarea id="edit-caption" value={editCaption} onChange={(e) => setEditCaption(e.target.value)} />
          </div>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setEditingImage(null)}>
              إلغاء
            </Button>
            <Button onClick={saveEdit} disabled={busy}>
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete image confirm */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="هل تريدين حذف هذه الصورة؟"
        description="لا يمكن التراجع عن هذا الإجراء. سيتم حذف الملف نهائيًا من التخزين."
      >
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            إلغاء
          </Button>
          <Button
            variant="danger"
            disabled={busy}
            onClick={() =>
              deleteTarget &&
              run(() => deleteGalleryImage(deleteTarget.id, deleteTarget.storage_path), () =>
                setDeleteTarget(null)
              )
            }
          >
            حذف
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
