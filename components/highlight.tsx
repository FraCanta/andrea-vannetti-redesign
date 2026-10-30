import type { ReactNode } from "react";

export const highlight = (chunks: ReactNode) => (
  <span className="text-primary">{chunks}</span>
);
