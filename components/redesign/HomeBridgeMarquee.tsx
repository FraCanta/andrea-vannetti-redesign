"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HomeBridgeMarquee.module.css";

const copies = [0, 1, 2] as const;
const baseSpeed = 72;

function wrapOffset(value: number, width: number) {
  return ((value % width) + width) % width - width;
}

export function HomeBridgeMarquee() {
  const t = useTranslations("HomeRedesign.marquee");
  const start = t("start");
  const accent = t("accent");
  const message = `${start} ${accent}`;
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(-1);
  const phaseRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const inRange = useInView(viewportRef, { margin: "100px" });
  const [measurements, setMeasurements] = useState({ text: 0, viewport: 0 });
  const { scrollY, scrollYProgress } = useScroll({
    target: viewportRef,
    offset: ["start end", "end start"],
  });
  const trackX = useMotionValue(0);
  const rawScrollShift = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -measurements.viewport * 0.42],
  );
  const scrollShift = useSpring(rawScrollShift, {
    stiffness: 150,
    damping: 30,
    mass: 0.45,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined || latest === previous) return;
    directionRef.current = latest > previous ? -1 : 1;
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = firstGroupRef.current;
    if (!viewport || !group) return;

    let active = true;
    const measure = () => {
      if (!active) return;
      const text = group.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      setMeasurements((current) =>
        current.text === text && current.viewport === viewportWidth
          ? current
          : { text, viewport: viewportWidth },
      );
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => {
        active = false;
        window.removeEventListener("resize", measure);
      };
    }

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    void document.fonts?.ready.then(() => {
      if (active) measure();
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [start, accent]);

  useAnimationFrame((_, delta) => {
    const { text } = measurements;
    if (!inRange || reducedMotion || text <= 0) return;

    const seconds = Math.min(delta, 32) / 1000;
    phaseRef.current =
      ((phaseRef.current +
        (directionRef.current * baseSpeed * seconds) / text) %
        1 +
        1) %
      1;

    trackX.set(wrapOffset(phaseRef.current * text + scrollShift.get(), text));
  });

  return (
    <div className={styles.marquee}>
      <p className={styles.screenReaderText}>{message}</p>
      <div className={styles.viewport} ref={viewportRef} aria-hidden="true">
        <motion.div className={styles.track} style={{ x: trackX }}>
          {[0, 1].map((group) => (
            <div
              className={styles.group}
              key={group}
              ref={group === 0 ? firstGroupRef : undefined}
            >
              {copies.map((copy) => (
                <span className={styles.phrase} key={copy}>
                  <span>{start}</span>
                  <span className={styles.accent}>{accent}</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
