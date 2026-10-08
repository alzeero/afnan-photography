"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/content";
import { Input, Label, Textarea, FieldError } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ManagerHeading, iconButton } from "./manager-ui";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [editName, setEditName] = useState("");
  const [editComment, setEditComment] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  function run(action: () => Promise<void>, onDone?: () => void) {
    setError(null);
    setBusy(true);
    startTransition(async () => {
      try {
        await action();
        onDone?.();
      } catch (e) {
        setError(e instanceof Error ? e.message : "حدث خطأ ما.");
      } finally {
        setBusy(false);
      }
    });
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    run(() => createTestimonial(name, comment), () => {
      setName("");
      setComment("");
    });
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setEditName(t.customer_name);
    setEditComment(t.comment);
  }

  function saveEdit() {
    if (!editing) return;
    run(() => updateTestimonial(editing.id, editName, editComment), () => setEditing(null));
  }

  return (
    <div className="space-y-10">
      <FieldError>{error}</FieldError>

      <section>
        <ManagerHeading
          title="إضافة رأي عميل"
          description="الصقي رأي العميل الحقيقي كما وصلك — يمكن كتابته بالعربية أو الإنجليزية، وتُحفظ فواصل الأسطر."
        />
        <form onSubmit={handleAdd} className="mt-6 max-w-lg space-y-5">
          <div>
            <Label htmlFor="t-name">اسم العميل</Label>
            <Input id="t-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="t-comment">التعليق</Label>
            <Textarea id="t-comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy} className="w-full sm:w-auto">
            <Plus size={16} strokeWidth={1.5} /> إضافة الرأي
          </Button>
        </form>
      </section>

      <div className="h-px bg-line/10" />

      <section>
        <ManagerHeading title={`جميع الآراء (${testimonials.length})`} />
        <div className="mt-6 space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="note flex items-start justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-accent">{t.customer_name}</p>
                <p className="mt-1 truncate text-sm text-on-surface-mute">{t.comment}</p>
              </div>
              <div className="relative flex shrink-0 gap-1">
                <button type="button" title="تعديل" aria-label="تعديل" onClick={() => openEdit(t)} className={iconButton}>
                  <Pencil size={15} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  title="حذف"
                  aria-label="حذف"
                  onClick={() => setDeleteTarget(t)}
                  className={cn(iconButton, "hover:bg-danger/10 hover:text-danger")}
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && <p className="text-sm text-on-surface-mute">لا توجد آراء بعد.</p>}
        </div>
      </section>

      <Dialog open={!!editing} onClose={() => setEditing(null)} title="تعديل الرأي">
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-t-name">اسم العميل</Label>
            <Input id="edit-t-name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="edit-t-comment">التعليق</Label>
            <Textarea id="edit-t-comment" value={editComment} onChange={(e) => setEditComment(e.target.value)} />
          </div>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setEditing(null)}>
              إلغاء
            </Button>
            <Button onClick={saveEdit} disabled={busy}>
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="هل تريدين حذف هذا الرأي؟"
        description="لا يمكن التراجع عن هذا الإجراء."
      >
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            إلغاء
          </Button>
          <Button
            variant="danger"
            disabled={busy}
            onClick={() =>
              deleteTarget && run(() => deleteTestimonial(deleteTarget.id), () => setDeleteTarget(null))
            }
          >
            حذف
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
