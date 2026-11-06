"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./Collaboriamo.module.css";

export type CompetenceItem = {
  number: string;
  title: string;
  body: string;
  tag: string;
};

type CompetenceFieldProps = {
  items: CompetenceItem[];
  diagramLabel: string;
};

export function CompetenceField({ items, diagramLabel }: CompetenceFieldProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <div className={styles.skillComposition}>
      <div className={styles.skillList} role="group" aria-label={diagramLabel}>
        {items.map((item, index) => (
          <button
            className={styles.skillButton}
            type="button"
            key={item.number}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span className={styles.skillNumber}>{item.number}</span>
            <span>{item.title}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.skillDetail} aria-live="polite" aria-atomic="true">
        <div className={styles.skillMap} role="img" aria-label={diagramLabel} />
        <div className={styles.skillDescription}>
          <span className={styles.eyebrow}>{activeItem.number} / {activeItem.tag}</span>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.body}</p>
        </div>
      </div>
    </div>
  );
}
