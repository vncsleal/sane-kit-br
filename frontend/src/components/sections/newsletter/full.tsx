"use client";

import type { NewsletterSection } from "@/sanity/types";
import { SectionHeader, SubscriptionForm } from "./shared";

type FullProps = NewsletterSection;

export default function Full({
  variant = "full",
  badgeText,
  heading,
  subheading,
  inputPlaceholder,
  buttonText,
  buttonIcon,
  successMessage,
  privacyText,
}: FullProps) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="rounded-lg bg-primary/10 dark:bg-primary/20 px-6 py-12 md:px-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            <div className="md:max-w-xl">
              <SectionHeader 
                badgeText={badgeText} 
                heading={heading} 
                subheading={subheading} 
                isCenter={false} 
              />
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0">
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
    </div>
  );
}
