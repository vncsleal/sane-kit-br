"use client";

import { MoveUpRight, MoveDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import type { SanityStatsSection, SanityStat } from "@/sanity/types/schema";

export default function StatsSection({
	variant = "grid",
	heading,
	subheading,
	badgeText,
	contentHeading,
	contentText,
	stats = [],
}: SanityStatsSection) {
	// Function to render individual stat cards
	const renderStatCard = (stat: SanityStat) => {
		// Determine icon based on trend direction
		const Icon = stat.trendDirection === "down" ? MoveDownLeft : MoveUpRight;

		// Apply color classes based on stat.color property
		const colorClasses = {
			primary: "text-primary",
			success: "text-emerald-600 dark:text-emerald-500",
			warning: "text-amber-600 dark:text-amber-500",
			destructive: "text-destructive",
			muted: "text-muted-foreground",
		};

		// Use 'primary' as fallback if stat.color is undefined
		const iconColor = colorClasses[stat.color || "primary"];

		return (
			<div
				key={stat._key}
				className="flex gap-0 flex-col justify-between p-6 border rounded-md"
			>
				{stat.trendDirection !== "none" && (
					<Icon className={`w-4 h-4 mb-10 ${iconColor}`} />
				)}
				<h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
					{stat.value}
					{stat.trendValue && (
						<span className="text-muted-foreground text-sm tracking-normal">
							{stat.trendValue}
						</span>
					)}
				</h2>
				<p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
						{stat.label}
				</p>
			</div>
		);
	};

	// Grid layout (original stats layout)
	if (variant === "grid") {
		return (
			<div className="w-full py-20 lg:py-40">
				<div className="container mx-auto">
					{(heading || subheading) && (
						<div className="mb-16 text-center">
							{heading && (
								<h2 className="text-3xl md:text-5xl tracking-tighter mb-4 font-regular">
									{heading}
								</h2>
							)}
							{subheading && (
								<p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl mx-auto">
									{subheading}
								</p>
							)}
						</div>
					)}

					<div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
						{stats.map(renderStatCard)}
					</div>
				</div>
			</div>
		);
	}

	// With content layout (Stats2 variant)
	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					{/* Content column */}
					<div className="flex gap-4 flex-col items-start">
							{badgeText && (
							<div>
								<Badge>{badgeText}</Badge>
							</div>
						)}
						<div className="flex gap-2 flex-col">
							{contentHeading && (
								<h2 className="text-xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
									{contentHeading}
								</h2>
							)}
							{contentText && (
								<p className="text-lg lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
									{contentText}
								</p>
							)}
						</div>
					</div>

					{/* Stats column */}
					<div className="flex justify-center items-center">
						<div className="grid text-left grid-cols-1 sm:grid-cols-2 w-full gap-2">
							{stats.slice(0, 4).map(renderStatCard)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
