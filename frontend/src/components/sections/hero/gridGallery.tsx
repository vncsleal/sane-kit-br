"use client";

import type { HeroSection } from "@/sanity/types";
import { ButtonsGroup } from "./shared";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/client";
import Image from "next/image";


export default function GridGallery({
  heading,
  subheading,
  badgeText,
  buttons = [],
  media,
}: HeroSection) {
  const additionalImages = media?.additionalImages || [];
  
  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content column */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            {badgeText && (
              <div>
                <Badge variant="outline">{badgeText}</Badge>
              </div>
            )}

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {heading}
            </h1>

            {/* Subheading */}
            {subheading && (
              <p className="text-xl text-muted-foreground max-w-md">
                {subheading}
              </p>
            )}

            {/* Buttons */}
            <ButtonsGroup buttons={buttons} />
          </div>

          {/* Images grid column */}
          <div className="grid grid-cols-2 gap-4">
            {/* Main image */}
            {media?.type === "image" && media.image && (
              <div className="col-span-2 aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={urlFor(media.image).width(800).height(600).url()}
                  alt={media.image.alt || "Hero image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}

            {/* Additional images */}
            {additionalImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="aspect-square relative rounded-lg overflow-hidden"
              >
                <Image
                  src={urlFor(image).width(400).height(400).url()}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
