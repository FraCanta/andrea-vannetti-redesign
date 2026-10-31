"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const motionElements = {
  article: motion.article,
  button: motion.button,
  div: motion.div,
  h2: motion.h2,
  nav: motion.nav,
  p: motion.p,
  section: motion.section,
} as const;

type RevealTag = keyof typeof motionElements;
type RevealState = "visible" | "pending";

type HomeRevealProps<T extends RevealTag> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "className">;

export function HomeReveal<T extends RevealTag = "div">({
  as,
  children,
  className,
  delay = 0,
  duration = 0.76,
  y = 24,
  ...elementProps
}: HomeRevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<RevealState>("visible");
  const MotionElement = motionElements[as ?? "div"] as React.ElementType;

  useEffect(() => {
    if (
      reduceMotion ||
      typeof IntersectionObserver === "undefined" ||
      !ref.current
    ) {
      return;
    }

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setState("visible");
            observer.disconnect();
          } else {
            setState("pending");
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    } catch {
      // Keep content visible if the observer cannot be initialized.
    }
  }, [reduceMotion]);

  const hidden = state === "pending" && !reduceMotion;

  return (
    <MotionElement
      {...(elementProps as object)}
      ref={ref}
      className={className}
      initial={hidden ? { opacity: 0, y } : false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={{
        duration: hidden || reduceMotion ? 0 : duration,
        delay: hidden || reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionElement>
  );
}
