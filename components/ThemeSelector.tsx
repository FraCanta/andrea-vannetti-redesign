"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslations } from "next-intl";
import styles from "./redesign/SiteNavigation.module.css";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeSelector() {
  const t = useTranslations("SiteNav.theme");
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return (
    <div className={styles.themeSelector} role="group" aria-label={t("label")}>
      {(["light", "dark", "system"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          aria-pressed={mounted && theme === mode}
          aria-label={t(mode)}
          title={t(mode)}
          onClick={() => setTheme(mode)}
          disabled={!mounted}
        >
          {mode === "light" ? "L" : mode === "dark" ? "D" : "S"}
        </button>
      ))}
    </div>
  );
}
