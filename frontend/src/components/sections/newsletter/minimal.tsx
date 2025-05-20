"use client";

import type { NewsletterSection } from "@/sanity/types";
import { SectionHeader, SubscriptionForm } from "./shared";

type MinimalProps = NewsletterSection;

export default function Minimal({
  variant = "minimal",
  badgeText,
  heading,
  subheading,
  inputPlaceholder,
  buttonText,
  buttonIcon,
  successMessage,
  privacyText,
}: MinimalProps) {
  return (
    <div className="w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          <div className="md:max-w-lg">
            <SectionHeader 
              badgeText={badgeText} 
              heading={heading} 
              subheading={subheading} 
              isCenter={false} 
            />
          </div>
          
          <div className="w-full md:w-auto">
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
