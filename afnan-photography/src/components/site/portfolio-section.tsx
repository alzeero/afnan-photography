"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/providers";
import { SectionHeading } from "./section-heading";
import { Gallery } from "./gallery";
import { Lightbox } from "./lightbox";
import type { GalleryImage } from "@/lib/types";

export function PortfolioSection({ images }: { images: GalleryImage[] }) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <SectionHeading
          heading={t.portfolio.heading}
          intro={images.length > 0 ? t.portfolio.intro : undefined}
        />

        <div className="mt-14 sm:mt-20">
          <Gallery images={images} onOpen={setLightboxIndex} />
        </div>
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
