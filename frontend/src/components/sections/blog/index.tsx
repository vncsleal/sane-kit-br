"use client";

import type { BlogSection } from "@/sanity/types";
import Default from "./default";
import Grid from "./grid";

export default function BlogSectionRouter(props: BlogSection) {
  const { variant = "default" } = props;

  // Route to the appropriate variant component
  switch (variant) {
    case "grid":
      return <Grid {...props} />;
    case "default":
    default:
      return <Default {...props} />;
  }
}

// Re-export the main component types for convenience
export type { BlogSection };
