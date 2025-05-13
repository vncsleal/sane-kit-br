"use client";

import { Check, Minus, MoveRight, PhoneCall, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import type { SanityCompareFeaturesSection } from "@/sanity/types/schema";

// Icon mapping
const IconMap = {
	arrowRight: MoveRight,
	phone: PhoneCall,
	plus: Plus,
};

export default function CompareFeaturesSection({
	badgeText,
	heading,
	subheading,
	features = [],
	plans = [],
	footnote,
}: SanityCompareFeaturesSection) {
	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
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

					<div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20">
						{/* First column header (empty) */}
						<div className="col-span-3 lg:col-span-1" />

						{/* Plan headers */}
						{plans.map((plan) => (
							<div
								key={plan._key}
								className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col"
							>
								<p className="text-2xl">{plan.title}</p>
								{plan.description && (
									<p className="text-sm text-muted-foreground">
										{plan.description}
									</p>
								)}
								<p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
									<span className="text-4xl">{plan.price}</span>
									{plan.billingPeriod && (
										<span className="text-sm text-muted-foreground">
											{plan.billingPeriod}
										</span>
									)}
								</p>
								<Button
									variant={
										(plan.buttonVariant as VariantProps<
											typeof buttonVariants
										>["variant"]) ||
										(plan.highlighted ? "default" : "outline")
									}
									className="gap-4 mt-8"
									asChild
								>
									<Link href={plan.buttonUrl}>
										{plan.buttonText}{" "}
										{plan.buttonIcon &&
											(() => {
												const Icon = IconMap[plan.buttonIcon];
												return Icon ? <Icon className="w-4 h-4" /> : null;
											})()}
									</Link>
								</Button>
							</div>
						))}

						{/* Features heading */}
						<div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
							<b>Recursos</b>
						</div>
						<div />
						<div />
						<div />

						{/* Feature rows */}
						{features.map((feature) => (
							<React.Fragment key={feature._id}>
								{/* Feature name */}
								<div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-t">
									{feature.title}
								</div>

								{/* Feature values for each plan */}
								{plans.map((plan) => {
									const featureValue = plan.featureValues?.find((fv) => {
										if (!fv.featureRef) return false;
										return fv.featureRef._id === feature._id;
									});

									if (!featureValue || featureValue.value === "false") {
										return (
											<div
												key={`${plan._key}-${feature._id}`}
												className="px-3 py-1 md:px-6 md:py-4 flex justify-center items-center border-t"
											>
												<Minus className="w-4 h-4 text-muted-foreground" />
											</div>
										);
									}

									if (featureValue.value === "true") {
										return (
											<div
												key={`${plan._key}-${feature._id}`}
												className="px-3 py-1 md:px-6 md:py-4 flex justify-center items-center border-t"
											>
												<Check className="w-4 h-4 text-primary" />
											</div>
										);
									}

									return (
										<div
											key={`${plan._key}-${feature._id}`}
											className="px-3 py-1 md:px-6 md:py-4 flex justify-center items-center border-t"
										>
											<p className="text-muted-foreground text-sm">
												{featureValue.customText}
											</p>
										</div>
									);
								})}
							</React.Fragment>
						))}
					</div>

					{/* Footnote */}
					{footnote && (
						<div className="w-full pt-10 mt-10 border-t">
							<p className="text-sm text-muted-foreground text-center">
								{footnote}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
