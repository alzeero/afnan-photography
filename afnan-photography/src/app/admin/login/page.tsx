import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/dashboard/login-form";
import { BrandLogo } from "@/components/site/brand-logo";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `تسجيل الدخول — ${BRAND.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

const AdminLoginPage = () => {
  return (
    <main dir="rtl" className="dashboard-root flex min-h-[100svh] flex-col items-center justify-center px-5 py-16">
      <section className="glass w-full max-w-[400px] rounded-[4px] px-7 pb-9 pt-10 shadow-float sm:px-9">
        <header className="mb-9 flex flex-col items-center text-center">
          <BrandLogo tone="surface" priority className="w-[150px]" />
          <span aria-hidden className="hairline-gold mt-7 block w-16" />
          <h1 className="mt-6 font-display text-[1.65rem] leading-snug text-on-surface">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-on-surface-mute">سجّلي الدخول لإدارة محتوى موقعك.</p>
        </header>

        <LoginForm />
      </section>

      <Link href="/" className="link-underline mt-8 text-sm text-ink-soft">
        العودة إلى الموقع
      </Link>
    </main>
  );
};

export default AdminLoginPage;
