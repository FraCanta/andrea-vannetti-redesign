"use client";

import { usePathname } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
import type { ReactNode } from "react";

export function LegacyFooterSwitch({ homeFooter }: { homeFooter: ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? homeFooter : <Footer />;
}
