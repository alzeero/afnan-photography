"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/providers";
import { cn } from "@/lib/utils";
import { LazyImage } from "./lazy-image";
import type { GalleryImage } from "@/lib/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Two columns on phones and tablets, three from 1024px up. */
function useColumnCount() {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setCount(query.matches ? 3 : 2);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return count;
}

/**
 * The portfolio as mounted prints laid out on the silk. Every photo keeps its
 * own proportions — nothing is cropped. Photos are dealt into columns in
 * order (1st, 2nd, 3rd across the top row, and so on), so the order set in
 * the dashboard is the order visitors read.
 */
export function Gallery({
  images,
  onOpen,
}: {
  images: GalleryImage[];
  onOpen: (index: number) => void;
}) {
  const { t } = useLanguage();
  const columnCount = useColumnCount();

  if (images.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-[1.25rem] border border-dashed border-ink/20 px-6 text-center text-ink-mute">
        {t.gallery.empty}
      </div>
    );
  }

  const columns: { image: GalleryImage; index: number }[][] = Array.from({ length: columnCount }, () => []);
  images.forEach((image, index) => columns[index % columnCount].push({ image, index }));

  return (
    <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
      {columns.map((column, c) => (
        <div
          key={c}
          // Every other column starts a little lower, so the prints read as
          // laid out by hand rather than stamped on a grid.
          className={cn("flex min-w-0 flex-1 flex-col gap-4 sm:gap-5 md:gap-6", c % 2 === 1 && "pt-10 sm:pt-14 lg:pt-24")}
        >
          {column.map(({ image, index }, row) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: 1, delay: Math.min(c * 0.08 + (row % 2) * 0.04, 0.3), ease: EASE }}
            >
              <button
                type="button"
                onClick={() => onOpen(index)}
                aria-label={image.caption || t.gallery.open}
                className="print group cursor-zoom-in"
              >
                <span className="relative block overflow-hidden">
                  <LazyImage
                    src={image.url}
                    alt={image.caption ?? ""}
                    width={1200}
                    height={1500}
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 47vw"
                    className="block h-auto w-full transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.035]"
                  />
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
