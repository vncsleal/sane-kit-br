"use client";

import { PhoneCall, MoveRight, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import type { SanityFAQSection } from "@/sanity/types/schema";

// Map of icon names to components
const IconMap = {
	phone: PhoneCall,
	arrowRight: MoveRight,
	plus: Plus,
	check: Check,
	none: null,
};

export default function FAQSection({
	variant = "sideBySide",
	badgeText = "FAQ",
	heading,
	subheading,
	buttonText,
	buttonUrl = "#",
	buttonIcon = "phone",
	faqItems = [],
}: SanityFAQSection) {
	// Get icon component if one is specified
	const Icon = buttonIcon && buttonIcon !== "none" ? IconMap[buttonIcon] : null;

	// Render the FAQ accordion
	const renderAccordion = () => (
		<Accordion type="single" collapsible className="w-full">
			{faqItems.map((item) => (
				<AccordionItem key={item._key} value={item._key}>
					<AccordionTrigger>{item.question}</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);

	// Render the content section (badge, heading, subheading, button)
	const renderContent = (isCenter = false) => (
		<div
			className={`flex gap-4 flex-col ${isCenter ? "items-center text-center" : ""}`}
		>
				{badgeText && (
				<div>
					<Badge variant="outline">{badgeText}</Badge>
				</div>
			)}
			<div className={`flex gap-2 flex-col ${isCenter ? "items-center" : ""}`}>
				<h4
					className={`text-3xl md:text-5xl tracking-tighter ${isCenter ? "text-center" : "text-left"} max-w-xl font-regular`}
				>
						{heading}
				</h4>
				{subheading && (
					<p
						className={`text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl ${isCenter ? "text-center" : "text-left"}`}
					>
						{subheading}
					</p>
				)}
			</div>
			{buttonText && (
				<div>
					<Button className="gap-4" variant="outline" asChild>
						<Link href={buttonUrl}>
							{buttonText}
							{Icon && <Icon className="w-4 h-4" />}
						</Link>
					</Button>
				</div>
			)}
		</div>
	);

	// Return the appropriate layout based on the variant
	if (variant === "centered") {
		return (
			<div className="w-full py-20 lg:py-40">
				<div className="container mx-auto">
					<div className="flex flex-col gap-10">
						{/* Centered content section */}
						<div className="flex text-center justify-center items-center gap-4 flex-col">
							{renderContent(true)}
						</div>

						{/* Centered accordion */}
						<div className="max-w-3xl w-full mx-auto">{renderAccordion()}</div>
					</div>
				</div>
			</div>
		);
	}

	// Default side-by-side layout
	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="grid lg:grid-cols-2 gap-10">
					{/* Left column with content */}
					<div className="flex gap-10 flex-col">{renderContent()}</div>

					{/* Right column with accordion */}
					{renderAccordion()}
				</div>
			</div>
		</div>
	);
}
