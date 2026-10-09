"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Next.js App Router error boundary for /admin/dashboard and everything
 * under it. Next.js deliberately strips the real error message before it
 * reaches the client in production builds — this component receives the
 * same generic message a default error page would, plus a `digest`, no
 * matter how it's written. That's a Next.js security behavior, not
 * something a component here can override.
 *
 * To see the *real* error:
 *   - Locally: run `npm run dev` and read the terminal — full messages and
 *     stack traces are never hidden in development.
 *   - On Vercel: open the project → Logs (or `vercel logs`) right after
 *     reproducing the error, and search for the digest shown below. The
 *     full server-side console output, including this one's `console.error`
 *     call and the underlying stack trace, is there.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin/dashboard/error.tsx] Server Component error:", error);
  }, [error]);

  return (
    <div dir="rtl" className="dashboard-root flex min-h-[100svh] items-center justify-center px-5 py-16">
      <div className="panel flex w-full max-w-md flex-col items-center gap-4 rounded-[4px] px-7 py-10 text-center shadow-float">
        <p className="text-heading font-medium text-on-surface">حدث خطأ غير متوقع في لوحة التحكم</p>
        <p className="text-sm leading-relaxed text-on-surface-mute">
          {error.message || "لم يتم إرفاق رسالة من الخادم — هذا متوقع في بيئة الإنتاج."}
        </p>
        {error.digest && (
          <p dir="ltr" className="rounded-full border border-line/15 px-4 py-1.5 font-mono text-xs text-on-surface-mute">
            digest: {error.digest}
          </p>
        )}
        <p className="text-xs leading-relaxed text-on-surface-mute">
          ابحثي عن الـ digest أعلاه في Vercel ← مشروعك ← Logs لرؤية تفاصيل الخطأ الكاملة.
        </p>
        <Button onClick={reset} className="mt-2">
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );
}
