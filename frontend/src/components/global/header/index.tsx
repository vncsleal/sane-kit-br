"use client";

import type { Header } from "@/sanity/types";
import Default from "./default";
import Centered from "./centered";
import Minimal from "./minimal";
import Transparent from "./transparent";

export default function HeaderRouter(props: Header) {
  const { variant = "default" } = props;
  
  // Route to the appropriate variant component
  switch (variant) {
    case "centered":
      return <Centered {...props} />;
    case "minimal":
      return <Minimal {...props} />;
    case "transparent":
      return <Transparent {...props} />;
    case "default":
    default:
      return <Default {...props} />;
  }
}

// Re-export the main component types for convenience
export type { Header };
