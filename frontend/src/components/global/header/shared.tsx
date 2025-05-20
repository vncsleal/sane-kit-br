"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { Header } from "@/sanity/types";

export type HeaderProps = Header;

export interface HeaderButtonProps {
  label?: string;
  url?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  _key?: string;
}

export function HeaderLogo({
  logo,
  title,
  className,
}: {
  logo?: Header["logo"];
  title?: string;
  className?: string;
}) {
  // Logo or site name component to reuse
  const logoAlt = logo?.alt || title || "Site Logo";

  if (logo?.asset?._ref) {
    return (
      <Image
        src={urlFor(logo.asset._ref).url()}
        alt={logoAlt}
        width={140}
        height={40}
        className={cn("object-contain max-h-10", className)}
      />
    );
  }
  
  return (
    <p className={cn("font-semibold", className)}>
      {title || "Site Name"}
    </p>
  );
}

export function HeaderCTAButton({ label, url, variant = "default" }: HeaderButtonProps) {
  if (!label) return null;
  
  return (
    <Button
      asChild
      variant={variant}
      size="sm"
      className="rounded-full"
    >
      <Link href={url || "#"}>
        {label}
        <MoveRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

export function createHeaderClassName(variant?: string, scrolled?: boolean) {
  return cn("w-full z-40 fixed top-0 left-0", {
    "bg-background":
      variant === "default" || variant === "minimal" || variant === "centered",
    "transition-all duration-300": variant === "transparent",
    "bg-background/80 backdrop-blur-md": variant === "transparent" && scrolled,
    "bg-transparent": variant === "transparent" && !scrolled,
  });
}
