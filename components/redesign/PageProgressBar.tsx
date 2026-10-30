"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./PageProgressBar.module.css";

export function PageProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.track} aria-hidden="true">
      <motion.span className={styles.fill} style={{ scaleX }} />
    </div>
  );
}
