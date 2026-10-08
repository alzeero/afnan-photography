"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Brings a block into view once, the first time it enters the viewport, with
 * a short, slow rise. For visitors who prefer reduced motion, the global
 * <MotionConfig reducedMotion="user"> turns this into a plain fade. (No
 * filter animation on purpose: a leftover `filter` would break backdrop blur
 * on anything inside.)
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
