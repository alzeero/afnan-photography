export type Lang = "ar" | "en";

/**
 * Explicit structural type for the UI dictionary. Leaves are `string`, not
 * string literals — the ar/en objects intentionally hold different text, so
 * both are checked against this same shape instead of against each other.
 *
 * Only interface copy lives here. Everything about the business itself
 * (hero text, WhatsApp number and message, social links, photos,
 * testimonials) is entered from the admin dashboard.
 */
export type Dictionary = {
  nav: {
    portfolio: string;
    testimonials: string;
    book: string;
    menu: string;
    close: string;
    home: string;
  };
  hero: {
    cta: string;
    secondary: string;
    scroll: string;
  };
  portfolio: {
    heading: string;
    intro: string;
  };
  gallery: {
    empty: string;
    open: string;
  };
  lightbox: {
    label: string;
    close: string;
    prev: string;
    next: string;
  };
  testimonials: {
    heading: string;
    intro: string;
    empty: string;
  };
  contact: {
    heading: string;
    body: string;
    cta: string;
    notConfigured: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
  floating: {
    label: string;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
  lang: {
    toggle: string;
    label: string;
  };
};

export const dictionary: Record<Lang, Dictionary> = {
  ar: {
    nav: {
      portfolio: "الأعمال",
      testimonials: "قالوا عنّا",
      book: "احجزي جلستك",
      menu: "فتح القائمة",
      close: "إغلاق القائمة",
      home: "العودة إلى الأعلى",
    },
    hero: {
      cta: "احجزي جلستك",
      secondary: "شاهدي الأعمال",
      scroll: "مرّري للأسفل",
    },
    portfolio: {
      heading: "أعمالنا",
      intro: "مختارات من جلسات التصوير. اضغطي على أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: {
      empty: "ستُضاف الأعمال إلى هذا المعرض قريبًا.",
      open: "عرض الصورة",
    },
    lightbox: {
      label: "عارض الصور",
      close: "إغلاق",
      prev: "الصورة السابقة",
      next: "الصورة التالية",
    },
    testimonials: {
      heading: "قالوا عنّا",
      intro: "رسائل وصلتنا بعد الجلسات.",
      empty: "ستظهر الرسائل هنا قريبًا.",
    },
    contact: {
      heading: "احجزي جلستك",
      body: "أرسلي لنا التاريخ ونوع الجلسة التي تفكرين بها، وسنرد عليكِ عبر واتساب.",
      cta: "راسلينا على واتساب",
      notConfigured: "أضيفي رقم واتساب من لوحة التحكم لتفعيل زر الحجز.",
    },
    footer: {
      tagline: "تصوير فوتوغرافي وفيديو",
      rights: "جميع الحقوق محفوظة",
    },
    floating: {
      label: "راسلينا على واتساب",
    },
    theme: {
      toLight: "التبديل إلى المظهر الفاتح",
      toDark: "التبديل إلى المظهر الداكن",
    },
    lang: {
      toggle: "EN",
      label: "Switch to English",
    },
  },
  en: {
    nav: {
      portfolio: "Portfolio",
      testimonials: "Kind words",
      book: "Book a session",
      menu: "Open menu",
      close: "Close menu",
      home: "Back to top",
    },
    hero: {
      cta: "Book a session",
      secondary: "View the portfolio",
      scroll: "Scroll",
    },
    portfolio: {
      heading: "Portfolio",
      intro: "Selected images from our sessions. Tap any photo to see it full size.",
    },
    gallery: {
      empty: "New work will be added to this gallery soon.",
      open: "View photo",
    },
    lightbox: {
      label: "Photo viewer",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
    },
    testimonials: {
      heading: "Kind words",
      intro: "Messages we received after our sessions.",
      empty: "Client messages will appear here soon.",
    },
    contact: {
      heading: "Book your session",
      body: "Send us your date and the kind of session you have in mind, and we'll reply on WhatsApp.",
      cta: "Message us on WhatsApp",
      notConfigured: "Add a WhatsApp number in the dashboard to turn on booking.",
    },
    footer: {
      tagline: "Photography & Videography",
      rights: "All rights reserved",
    },
    floating: {
      label: "Message us on WhatsApp",
    },
    theme: {
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme",
    },
    lang: {
      toggle: "عربي",
      label: "التبديل إلى العربية",
    },
  },
};
