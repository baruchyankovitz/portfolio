"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="mb-16 text-center"
    >
      <h2 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mb-4 h-[2px] w-12 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]" />
      {subtitle && (
        <p className="text-lg text-[var(--color-text-secondary)]">{subtitle}</p>
      )}
    </motion.div>
  );
}
