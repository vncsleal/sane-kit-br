"use client";

import { Check, MoveRight, PhoneCall, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type {
	SanityPricingSection,
	SanityPricingFeature,
	SanityPricingPlan,
} from "@/sanity/types/schema";
import Link from "next/link";

// Icon mapping
const IconMap = {
	arrowRight: MoveRight,
	phone: PhoneCall,
	plus: Plus,
};

export default function PricingSection({
	badgeText = "Pricing",
	heading,
	subheading,
	plans = [],
}: SanityPricingSection) {
	// Header section
	const HeaderSection = () => (
		<>
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
		</>
	);

	// Standard card-based pricing layout
	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="flex text-center justify-center items-center gap-4 flex-col">
					<HeaderSection />
					<div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
						{plans.map((plan: SanityPricingPlan) => (
							<Card
								key={plan._key}
								className={`w-full rounded-md ${plan.highlighted ? "shadow-2xl" : ""}`}
							>
								<CardHeader>
									<CardTitle>
										<span className="flex flex-row gap-4 items-center font-normal">
											{plan.title}
										</span>
									</CardTitle>
									{plan.description && (
										<CardDescription>
											{plan.description}
										</CardDescription>
									)}
								</CardHeader>
								<CardContent>
									<div className="flex flex-col gap-8 justify-start">
										<p className="flex flex-row items-center gap-2 text-xl">
											<span className="text-4xl">{plan.price}</span>
											{plan.billingPeriod && (
												<span className="text-sm text-muted-foreground">
													{" "}
													{plan.billingPeriod}
												</span>
											)}
										</p>
										<div className="flex flex-col gap-4 justify-start">
											{plan.features.map((feature: SanityPricingFeature) => (
												<div
													key={feature._key}
													className="flex flex-row gap-4"
												>
													<Check className="w-4 h-4 mt-2 text-primary" />
													<div className="flex flex-col">
														<p>{feature.title}</p>
														{feature.description && (
															<p className="text-muted-foreground text-sm">
																{feature.description}
															</p>
														)}
													</div>
												</div>
											))}
										</div>
										<Button
											variant={
												plan.buttonVariant ||
												(plan.highlighted ? "default" : "outline")
											}
											className="gap-4"
											asChild
										>
											<Link href={plan.buttonUrl}>
												{plan.buttonText}
												{plan.buttonIcon &&
													(() => {
														const Icon = plan.buttonIcon
															? IconMap[plan.buttonIcon]
															: null;
														return Icon ? <Icon className="w-4 h-4" /> : null;
													})()}
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
