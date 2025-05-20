"use client";

import type { HeroSection } from "@/sanity/types";
import { renderBackgroundMedia, ButtonsGroup } from "./shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function ButtonBanner({
  heading,
  subheading,
  bannerButton,
  buttons = [],
  media,
}: HeroSection) {
  return (
    <div className="w-full relative min-h-[75vh] flex items-center py-20">
      {/* Background media */}
      {renderBackgroundMedia(media)}

      {/* Content */}
      <div className="container mx-auto relative z-20 text-white">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Banner button */}
          {bannerButton?.label && (
            <div>
              <Button
                variant="secondary"
                className="hover:-translate-y-1 transition-transform"
                asChild
              >
                <Link href={bannerButton.url || "#"}>{bannerButton.label}</Link>
              </Button>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {heading}
          </h1>

          {/* Subheading */}
          {subheading && (
            <p className="text-xl text-white/80 max-w-2xl">{subheading}</p>
          )}

          {/* Buttons */}
          <ButtonsGroup buttons={buttons} />
        </div>
      </div>
    </div>
  );
}
