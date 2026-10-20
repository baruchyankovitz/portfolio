"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { skillCategories } from "@/lib/projects";
import SectionHeading from "./SectionHeading";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Skills() {
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="relative px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.skills.title} subtitle={t.skills.subtitle} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.12)" }}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all duration-300"
            >
              <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider ${category.color}`}>
                {category.name[lang]}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] transition-colors duration-200 group-hover:bg-white/[0.1] group-hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
