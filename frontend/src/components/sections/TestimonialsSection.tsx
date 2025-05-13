"use client";

import { useEffect, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { User, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type {
	SanityTestimonialsSection,
	SanityTestimonial,
} from "@/sanity/types/schema";
import { urlFor } from "@/sanity/client";

export default function TestimonialsSection(props: SanityTestimonialsSection) {
	const {
		heading,
		subheading,
		variant = "carousel",
		testimonials = [],
	} = props;

	// Pass testimonials explicitly, defaulting to [] if undefined
	if (variant === "carousel") {
		return (
			<TestimonialsCarousel
				heading={heading || ""}
				subheading={subheading}
				testimonials={testimonials}
			/>
		);
	}
	if (variant === "grid") {
		return (
			<TestimonialsGrid
				heading={heading || ""}
				subheading={subheading}
				testimonials={testimonials}
			/>
		);
	}
	if (variant === "masonry-grid") {
		return (
			<TestimonialsMasonryGrid
				heading={heading || ""}
				subheading={subheading}
				testimonials={testimonials}
			/>
		);
	}

	return (
		<TestimonialsCarousel
			heading={heading || ""}
			subheading={subheading}
			testimonials={testimonials}
		/>
	);
}

interface TestimonialVariantProps {
	heading: string;
	subheading?: string;
	testimonials: SanityTestimonial[];
}

const TestimonialsCarousel = ({
	heading,
	subheading,
	testimonials,
}: TestimonialVariantProps) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api || testimonials.length === 0) {
			return;
		}

		const timer = setTimeout(() => {
			if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
				setCurrent(0);
				api.scrollTo(0);
			} else {
				api.scrollNext();
				setCurrent(current + 1);
			}
		}, 4000);

		return () => clearTimeout(timer);
	}, [api, current, testimonials.length]);

	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
							{heading || "Confiado por milhares de empresas em todo o mundo"}
						</h2>
						{subheading && (
							<p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
								{subheading}
							</p>
						)}
					</div>
					<Carousel setApi={setApi} className="w-full">
						<CarouselContent>
							{testimonials.map((testimonial) => (
								<CarouselItem className="lg:basis-1/2" key={testimonial._key}>
									<div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-video flex justify-between flex-col">
										<User className="w-8 h-8 stroke-1" />
										<div className="flex flex-col gap-4">
											<div className="flex flex-col">
												<h3 className="text-xl tracking-tight">
													{testimonial.title}
												</h3>
												<p className="text-muted-foreground max-w-xs text-base">
													{testimonial.content}
												</p>
											</div>
											<p className="flex flex-row gap-2 text-sm items-center">
												<span className="text-muted-foreground">Por</span>{" "}
												<Avatar className="h-6 w-6">
													{testimonial.avatar ? (
														<AvatarImage
															src={urlFor(testimonial.avatar).url()}
															alt={testimonial.avatar.alt || testimonial.author || ""}
															className="object-cover"
														/>
													) : (
														<AvatarFallback>
															{testimonial.author?.substring(0, 2).toUpperCase()}
														</AvatarFallback>
													)}
												</Avatar>
												<span>{testimonial.author}</span>
												{testimonial.role && (
													<span className="text-muted-foreground text-xs">
														{testimonial.role}
													</span>
												)}
											</p>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</div>
	);
};

const TestimonialsGrid = ({
	heading,
	subheading,
	testimonials,
}: TestimonialVariantProps) => {
	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
							{heading || "Confiado por milhares de empresas em todo o mundo"}
						</h2>
						{subheading && (
							<p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
								{subheading}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial._key}
								className="bg-muted rounded-md p-6 flex flex-col justify-between"
							>
								<Quote className="w-8 h-8 stroke-1 mb-4 text-primary/40" />

								<div className="flex flex-col gap-4">
									<h3 className="text-xl tracking-tight">{testimonial.title}</h3>
									<p className="text-muted-foreground text-base flex-grow">
										{testimonial.content}
									</p>
								</div>

								<div className="mt-6 pt-4 flex items-center gap-3">
									<Avatar className="h-10 w-10">
										{testimonial.avatar ? (
											<AvatarImage
												src={urlFor(testimonial.avatar).url()}
												alt={testimonial.avatar.alt || testimonial.author || ""}
												className="object-cover"
											/>
										) : (
											<AvatarFallback>
												{testimonial.author?.substring(0, 2).toUpperCase()}
											</AvatarFallback>
										)}
									</Avatar>
									<div>
										<p className="font-medium">{testimonial.author}</p>
										{testimonial.role && (
											<p className="text-sm text-muted-foreground">
												{testimonial.role}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const TestimonialsMasonryGrid = ({
	heading,
	subheading,
	testimonials,
}: TestimonialVariantProps) => {
	return (
		<div className="w-full py-20 lg:py-40">
			<div className="container mx-auto">
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
							{heading || "O que nossos clientes estão dizendo"}
						</h2>
						{subheading && (
							<p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
								{subheading}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{testimonials.map((testimonial, i) => {
							const isHighlighted = i === 0 || i === 3;
							const testimonialLength = testimonial.content?.length || 0;

							let heightClass = "aspect-square";
							if (isHighlighted || testimonialLength > 200) {
								heightClass = "";
							}

							return (
								<div
									key={testimonial._key}
									className={`relative bg-muted rounded-lg overflow-hidden ${heightClass} ${
										isHighlighted ? "sm:col-span-2" : ""
									}`}
								>
									<div className="relative z-10 flex flex-col justify-between h-full p-6">
										<Quote className="w-8 h-8 stroke-1 mb-4 text-primary/40" />

										<div className="flex flex-col gap-4">
											<h3 className="text-xl tracking-tight font-medium">
												{testimonial.title}
											</h3>
											<p className="text-muted-foreground">
												{testimonial.content}
											</p>
										</div>

										<div className="mt-6 pt-4 flex items-center gap-3">
											<Avatar className="h-10 w-10">
												{testimonial.avatar ? (
													<AvatarImage
														src={urlFor(testimonial.avatar).url()}
														alt={testimonial.avatar.alt || testimonial.author || ""}
														className="object-cover"
													/>
												) : (
													<AvatarFallback>
														{testimonial.author?.substring(0, 2).toUpperCase()}
													</AvatarFallback>
												)}
											</Avatar>
											<div>
												<p className="font-medium">{testimonial.author}</p>
												{testimonial.role && (
													<p className="text-sm text-muted-foreground">
														{testimonial.role}
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
