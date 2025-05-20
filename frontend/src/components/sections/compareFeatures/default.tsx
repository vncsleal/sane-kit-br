"use client";

import type { CompareFeaturesSection } from "@/sanity/types";
import { SectionHeader, FeatureValueCell, PlanButton } from "./shared";
import { CompareFeatureWithTitle } from "./index";

export interface DefaultProps extends Omit<CompareFeaturesSection, 'features'> {
  features: CompareFeatureWithTitle[];
  isLoading: boolean;
}

export default function Default({
  badgeText,
  heading,
  subheading,
  features = [],
  plans = [],
  footnote,
  isLoading,
}: DefaultProps) {
  if (isLoading) {
    return (
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto">
          <p className="text-center">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <SectionHeader badgeText={badgeText} heading={heading} subheading={subheading} />

        <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20">
          {/* First column header (empty) */}
          <div className="col-span-3 lg:col-span-1" />

          {/* Plan headers */}
          {plans.map((plan) => (
            <div
              key={plan._key}
              className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col"
            >
              <h3 className="font-semibold text-lg">{plan.title}</h3>
              {plan.description && (
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              )}
              <div className="mt-1">
                {plan.price && (
                  <div className="flex items-end">
                    <span className="text-3xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.billingPeriod && (
                      <span className="ml-1 text-sm text-muted-foreground">
                        {plan.billingPeriod}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features and values */}
        {features.map((feature) => (
          <div
            key={feature._key}
            className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x border-b last-of-type:border-none"
          >
            {/* Feature name */}
            <div className="col-span-3 lg:col-span-1 px-3 py-2 md:px-6 md:py-4">
              <p className="font-medium">{feature.title}</p>
            </div>

            {/* Feature values for each plan */}
            {plans.map((plan) => {
              // Find the value for this feature in this plan
              const featureValue = plan.featureValues?.find(
                (fv) => fv.featureRef?._ref === feature._id
              );

              return (
                <div
                  key={`${feature._key}-${plan._key}`}
                  className={`px-3 py-2 md:px-6 md:py-4 text-center ${
                    plan.highlighted === "true"
                      ? "bg-primary/5 dark:bg-primary/10"
                      : ""
                  }`}
                >
                  <FeatureValueCell
                    value={featureValue?.value || "false"}
                    customText={featureValue?.customText}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {/* Plan buttons */}
        <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x">
          {/* Empty first cell */}
          <div className="col-span-3 lg:col-span-1" />

          {/* Buttons */}
          {plans.map((plan) => (
            <div
              key={plan._key}
              className={`px-3 py-4 md:px-6 md:py-8 ${
                plan.highlighted === "true" ? "bg-primary/5 dark:bg-primary/10" : ""
              }`}
            >
              <PlanButton
                buttonText={plan.buttonText}
                buttonUrl={plan.buttonUrl}
                buttonVariant={plan.buttonVariant}
                buttonIcon={plan.buttonIcon}
              />
            </div>
          ))}
        </div>

        {/* Footnote */}
        {footnote && (
          <div className="mt-8 text-sm text-center text-muted-foreground max-w-3xl mx-auto">
            {footnote}
          </div>
        )}
      </div>
    </div>
  );
}
