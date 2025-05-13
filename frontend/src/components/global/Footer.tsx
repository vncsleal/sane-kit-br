"use client";

import Link from "next/link";
import Image from "next/image";
import type { SanityFooter } from "@/sanity/types/schema";
import { urlFor } from "@/sanity/client";

type FooterProps = SanityFooter;

export default function Footer({
	title,
	logo,
	description,
	address = [],
	legalLinks = [],
	navigationItems = [],
	variant = "simple",
}: FooterProps) {
	// Get site title
	const siteTitle = title;

	// Get description
	const siteDescription = description;

	// Get logo alt text
	const logoAlt = logo?.alt || siteTitle;

	// All rights reserved text
	const allRightsReservedText = "All rights reserved.";

	// Logo or site name component to reuse
	const LogoOrSiteTitle = ({ className = "" }) => (
		<>
			{logo?.asset?._ref ? (
				<Image
					src={urlFor(logo.asset._ref).url()}
					alt={logoAlt || ""}
					width={140}
					height={40}
					className={`object-contain max-h-10 ${className}`}
				/>
			) : (
				<p className={className}>{siteTitle}</p>
			)}
		</>
	);

	// For tiny variant (ultra-compact footer with light background)
	if (variant === "tiny") {
		return (
			<footer className="w-full py-6 bg-background border-t">
				<div className="container mx-auto ">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
						<LogoOrSiteTitle className="font-medium" />

						{/* Legal links in a row */}
						{legalLinks.length > 0 && (
							<div className="flex gap-4 flex-wrap justify-center">
								{legalLinks.map((link) => (
									<Link
										key={link._key}
										href={link.url.startsWith("/") ? link.url : `/${link.url}`}
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
											{link.title}
									</Link>
								))}
							</div>
						)}

						{/* Copyright */}
						<div className="flex items-center gap-4">
							<p className="text-muted-foreground">
								© {new Date().getFullYear()} {siteTitle}. {allRightsReservedText}
							</p>
						</div>
					</div>
				</div>
			</footer>
		);
	}

	// For minimal variant (condensed footer with just essential info)
	if (variant === "minimal") {
		return (
			<footer className="w-full py-8 bg-foreground text-background">
				<div className="container mx-auto ">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<LogoOrSiteTitle className="font-semibold text-lg" />

						{/* Legal links in a row */}
						{legalLinks.length > 0 && (
							<div className="flex gap-6">
								{legalLinks.map((link) => (
									<Link
										key={link._key}
										href={link.url.startsWith("/") ? link.url : `/${link.url}`}
										className="text-sm text-background/75 hover:text-background"
									>
										{link.title}
									</Link>
								))}
							</div>
						)}

						{/* Copyright */}
						<div className="flex items-center gap-4">
							<p className="text-sm text-background/60">
								© {new Date().getFullYear()} {siteTitle}. {allRightsReservedText}
							</p>
						</div>
					</div>
				</div>
			</footer>
		);
	}

	// Simple variant (default)
	return (
		<footer className="w-full pt-10 lg:pt-20 bg-foreground text-background">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid lg:grid-cols-2 gap-10 items-start">
					{/* Left Column - Branding and Info */}
					<div className="flex gap-8 flex-col items-start">
						<div className="flex gap-2 flex-col">
							<div className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
								<LogoOrSiteTitle />
							</div>
								{description && (
								<p className="text-lg max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
									{siteDescription}
								</p>
							)}
						</div>

						<div className="flex gap-10 md:gap-20 flex-col md:flex-row">
							{/* Address */}
							{address.length > 0 && (
								<div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
									{address.map((line) => (
										<p key={`address-${line}`}>{line}</p>
									))}
								</div>
							)}

							{/* Legal Links */}
							{legalLinks.length > 0 && (
								<div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
									{legalLinks.map((link) => (
										<Link
											key={link._key}
											href={
												link.url.startsWith("/") ? link.url : `/${link.url}`
											}
											className="hover:text-background"
										>
												{link.title}
										</Link>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Right Column - Navigation */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
						{navigationItems.map((item) => (
							<div
								key={item._key}
								className="flex text-base gap-1 flex-col items-start"
							>
								<div className="flex flex-col gap-2">
									{item.href ? (
										<Link
											href={
												item.href.startsWith("/") ? item.href : `/${item.href}`
											}
											className="flex justify-between items-center hover:text-background/80"
										>
											<span className="text-xl">
												{item.title}
											</span>
										</Link>
									) : (
										<p className="text-xl">
											{item.title}
										</p>
									)}
									{item.items?.map((subItem) => (
										<Link
											key={subItem._key}
											href={
												subItem.href.startsWith("/")
													? subItem.href
													: `/${subItem.href}`
											}
											className="flex justify-between items-center hover:text-background/80"
										>
											<span className="text-background/75">
												{subItem.title}
											</span>
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Copyright text */}
				<div className="mt-16 py-8 border-t border-background/10">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm text-background/60">
							© {new Date().getFullYear()} {siteTitle}. {allRightsReservedText}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
