"use client";

import { Check, Minus, MoveRight, PhoneCall, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { CompareFeaturesSection } from "@/sanity/types";

// Icon mapping
export const IconMap = {
  arrowRight: MoveRight,
  phone: PhoneCall,
  plus: Plus,
};

// Section header component
export const SectionHeader = ({ 
  badgeText, 
  heading, 
  subheading 
}: Pick<CompareFeaturesSection, 'badgeText' | 'heading' | 'subheading'>) => (
  <div className="flex text-center justify-center items-center gap-4 flex-col">
    {badgeText && <Badge>{badgeText}</Badge>}
    <div className="flex gap-2 flex-col">
      <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
        {heading}
      </h2>
      {subheading && (
        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
          {subheading}
        </p>
      )}
    </div>
  </div>
);

// Component for rendering feature values
export const FeatureValueCell = ({ 
  value, 
  customText 
}: { 
  value: "true" | "false" | "custom"; 
  customText?: string 
}) => {
  if (value === "custom" && customText) {
    return <span className="text-sm">{customText}</span>;
  }

  if (value === "true") {
    return <Check className="mx-auto h-4 w-4 text-primary" />;
  }
  
  return <Minus className="mx-auto h-4 w-4 text-muted-foreground" />;
};

// Plan button component
export const PlanButton = ({ 
  buttonText, 
  buttonUrl = "#", 
  buttonVariant = "default", 
  buttonIcon 
}: { 
  buttonText?: string; 
  buttonUrl?: string; 
  buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link"; 
  buttonIcon?: "arrowRight" | "phone" | "plus"; 
}) => {
  if (!buttonText) return null;
  
  const Icon = buttonIcon ? IconMap[buttonIcon] : null;
  
  return (
    <Button 
      variant={buttonVariant} 
      className={Icon ? "w-full gap-2" : "w-full"}
      asChild
    >
      <Link href={buttonUrl}>
        {buttonText}
        {Icon && <Icon className="h-4 w-4" />}
      </Link>
    </Button>
  );
};
