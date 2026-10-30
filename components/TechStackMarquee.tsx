"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiWordpress,
  SiFramer,
  SiVite,
  SiMui,
  SiVercel,
  SiFigma,
  SiNodedotjs,
  SiGit,
  SiLeaflet,
  SiWoocommerce,
  SiCanvas,
  SiPayloadcms,
  SiClaude,
} from "react-icons/si";
import { useTranslations } from "next-intl";

const stack = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiWordpress, name: "WordPress", color: "#21759B" },
  { icon: SiFramer, name: "Framer Motion", color: "#0055FF" },
  { icon: SiVite, name: "Vite", color: "#646CFF" },
  { icon: SiMui, name: "MUI", color: "#007FFF" },
  { icon: SiVercel, name: "Vercel", color: "#ffffff" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiLeaflet, name: "Leaflet", color: "#199900" },
  { icon: SiWoocommerce, name: "WooCommerce", color: "#96588A" },
  { icon: SiCanvas, name: "Canva", color: "#00C4CC" },
  { icon: SiPayloadcms, name: "Payload CMS", color: "#FFFFFF" },
  { icon: SiClaude, name: "Claude", color: "#d97757" },
];

export function TechStackMarquee() {
  const t = useTranslations("Home.stack");
  // Duplicate array for seamless loop
  const items = [...stack, ...stack];

  return (
    <section className="py-8 border-y border-border overflow-hidden">
      <div className="mask-fade-x">
        <motion.div
          className="flex gap-24 items-center w-max animate-marquee"
          aria-label={t("ariaLabel")}
        >
          {items.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-3 shrink-0 group cursor-default"
            >
              <tech.icon
                size={28}
                style={{ color: tech.color }}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-sm uppercase tracking-widest text-typography-dim group-hover:text-typography transition-colors duration-300 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
