"use client";

import type { NewsletterSection } from "@/sanity/types";
import { SectionHeader, SubscriptionForm } from "./shared";

type HighlightProps = NewsletterSection;

export default function Highlight({
  variant = "highlight",
  badgeText,
  heading,
  subheading,
  inputPlaceholder,
  buttonText,
  buttonIcon,
  successMessage,
  privacyText,
}: HighlightProps) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="rounded-lg bg-primary/5 px-6 py-12 md:px-12 md:py-20">
          <div className="flex flex-col items-center text-center gap-8">
            <SectionHeader 
              badgeText={badgeText} 
              heading={heading} 
              subheading={subheading} 
              isCenter={true} 
            />
            
            <SubscriptionForm
              inputPlaceholder={inputPlaceholder}
              buttonText={buttonText}
              buttonIcon={buttonIcon}
              successMessage={successMessage}
              privacyText={privacyText}
              variant={variant}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
