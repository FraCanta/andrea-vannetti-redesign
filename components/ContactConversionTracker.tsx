"use client";
import { useEffect } from "react";

export const SEND_TO = "AW-17868481765/EvbdCNyH4J4dEOXJrchC";
const CONTACT_LINK = /^(tel:|mailto:)|wa\.me|api\.whatsapp\.com|calendly\.com/;

function getMethod(href: string) {
  if (href.startsWith("tel:")) return "telefono";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("calendly.com")) return "calendly";
  return "whatsapp";
}

export default function ContactConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      const href = link?.getAttribute("href") ?? "";
      if (CONTACT_LINK.test(href)) {
        window.gtag?.("event", "conversion", { send_to: SEND_TO });
        window.gtag?.("event", "generate_lead", { method: getMethod(href) });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
