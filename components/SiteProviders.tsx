"use client";

import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import "lenis/dist/lenis.css";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="av-theme"
    >
      <ReactLenis
        root
        options={{ autoRaf: true, anchors: true, syncTouch: false }}
      >
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
