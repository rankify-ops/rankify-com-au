"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 },
};

export function Reveal({
  children,
  delay = 0,
  scale = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  scale?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={scale ? scaleVariants : variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -5% 0px" }}
      transition={{ duration: scale ? 0.9 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
