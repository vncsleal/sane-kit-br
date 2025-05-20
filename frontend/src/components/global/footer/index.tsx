"use client";

import type { Footer } from "@/sanity/types";
import SimpleFooter from "./simple";
import MinimalFooter from "./minimal";
import TinyFooter from "./tiny";

export default function FooterRouter(props: Footer) {
  const { variant = "simple" } = props;
  
  // Route to the appropriate variant component
  switch (variant) {
    case "minimal":
      return <MinimalFooter {...props} />;
    case "tiny":
      return <TinyFooter {...props} />;
    case "simple":
    default:
      return <SimpleFooter {...props} />;
  }
}

// Re-export the main component types for convenience
export type { Footer };
