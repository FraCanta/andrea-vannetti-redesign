import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#95e600",
        "primary-dark": "#7abf00",
        background: "#0a0a0a",
        "background-elevated": "#111111",
        "background-card": "#141414",
        typography: "#e0e2db",
        "typography-muted": "#8a8c87",
        "typography-dim": "#4a4c47",
        border: "#1e1e1e",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 14vw, 160px)", { lineHeight: "0.9", letterSpacing: "normal" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.95", letterSpacing: "normal" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "normal" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "normal" }],
        "page-title": ["var(--type-page-title)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
        "section-title": ["var(--type-section-title)", { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-display)" }],
        "subsection-title": ["var(--type-subsection-title)", { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-display)" }],
        "card-title": ["var(--type-card-title)", { lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-display)" }],
        "lead": ["var(--type-lead)", { lineHeight: "var(--leading-body)" }],
        "body": ["var(--type-body)", { lineHeight: "1.5" }],
        "caption": ["var(--type-caption)", { lineHeight: "var(--leading-compact)" }],
        "eyebrow": ["var(--type-eyebrow)", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "form-label": ["var(--type-form-label)", { lineHeight: "1.25" }],
        "cta": ["var(--type-cta)", { lineHeight: "1.4", letterSpacing: "0.03em" }],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
