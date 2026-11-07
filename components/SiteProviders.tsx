"use client";

import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransitionProvider } from "@/components/PageTransition";
import "lenis/dist/lenis.css";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PageTransitionProvider>
        <ReactLenis
          root
          options={{ autoRaf: true, anchors: true, syncTouch: false }}
        >
          {children}
        </ReactLenis>
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
