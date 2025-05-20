"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MoveRight, Plus, Mail } from "lucide-react";
import React, { useState } from "react";
import type { NewsletterSection } from "@/sanity/types";

// Map of icon names to components
export const IconMap = {
  arrowRight: MoveRight,
  plus: Plus,
  mail: Mail,
  none: null,
};

// Section header component
export const SectionHeader = ({ 
  badgeText, 
  heading, 
  subheading, 
  isCenter = true
}: Pick<NewsletterSection, 'badgeText' | 'heading' | 'subheading'> & { isCenter?: boolean }) => (
  <div className={`flex gap-4 flex-col ${isCenter ? "items-center text-center" : ""}`}>
    {badgeText && <Badge variant="outline">{badgeText}</Badge>}
    <div className={`flex gap-2 flex-col ${isCenter ? "items-center" : ""}`}>
      <h4 className={`text-3xl md:text-5xl tracking-tighter ${isCenter ? "text-center" : "text-left"} max-w-xl font-regular`}>
        {heading}
      </h4>
      {subheading && (
        <p className={`text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl ${isCenter ? "text-center" : "text-left"}`}>
          {subheading}
        </p>
      )}
    </div>
  </div>
);

// Subscription form component
export const SubscriptionForm = ({
  inputPlaceholder = "Digite seu e-mail",
  buttonText = "Inscrever-se",
  buttonIcon = "mail",
  successMessage = "Obrigado por se inscrever!",
  privacyText,
  variant = "default"
}: Pick<NewsletterSection, 'inputPlaceholder' | 'buttonText' | 'buttonIcon' | 'successMessage' | 'privacyText' | 'variant'>) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, digite um endereço de e-mail válido");
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically call your API endpoint to handle the subscription
      // For example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
    } catch {
      setError("Ocorreu um erro. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get icon if specified
  const Icon = buttonIcon && buttonIcon !== "none" ? IconMap[buttonIcon] : null;

  // Apply different styles based on variant
  const isHighlightVariant = variant === "highlight" || variant === "full";
  const containerClass = isHighlightVariant ? "rounded-md p-1 bg-primary/10 backdrop-blur-sm" : "";
  
  if (submitted) {
    return (
      <div className="mt-2 text-center text-green-600 dark:text-green-400">
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className={`flex flex-col sm:flex-row gap-2 ${containerClass}`}>
        <Input
          type="email"
          placeholder={inputPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className={Icon ? "gap-2" : ""}
        >
          {buttonText}
          {Icon && <Icon className="w-4 h-4" />}
        </Button>
      </div>
      
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      
      {privacyText && (
        <p className="mt-2 text-xs text-muted-foreground">{privacyText}</p>
      )}
    </form>
  );
};
