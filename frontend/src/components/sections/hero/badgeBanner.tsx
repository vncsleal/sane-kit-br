"use client";

import type { HeroSection } from "@/sanity/types";
import { renderBackgroundMedia, ButtonsGroup } from "./shared";
import { Badge } from "@/components/ui/badge";


export default function BadgeBanner({
  heading,
  subheading,
  badgeText,
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
          {/* Badge */}
          {badgeText && (
            <div>
              <Badge variant="secondary" className="text-sm">
                {badgeText}
              </Badge>
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
