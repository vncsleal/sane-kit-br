"use client"; // Ensure this is a client component

import { client } from "@/sanity/client";
import type {
	SanityBlogSection,
	SanityBlogPost,
	SanityAuthor,
	SanityCategory,
} from "@/sanity/types/schema";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import { MoveRight } from "lucide-react";
import { useState, useEffect } from "react";

// Interface for fetched post data
export interface BlogPostWithData
	extends Omit<SanityBlogPost, "author" | "categories"> {
	author: SanityAuthor;
	categories?: SanityCategory[];
}

// Function to format date
function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("pt-BR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

// Function to get author initials
function getInitials(name: string) {
	if (!name) return "";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
}

// Main component remains a Client Component
export default function BlogSection(props: SanityBlogSection) {
	const {
		heading = "Artigos mais recentes", // Default value
		subheading,
		postsToShow = 3,
		showFeaturedPostLarge = true,
		featuredPostsOnly = false,
		variant = "default",
		viewAllButton = false,
		viewAllUrl = "/blog",
		viewAllButtonText = "Ver todos", // Default value
	} = props;

	const [posts, setPosts] = useState<BlogPostWithData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			setError(null);
			let query = `*[_type == "blogPost"] | order(publishedAt desc, _updatedAt desc)`;
			if (featuredPostsOnly) {
				query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc, _updatedAt desc)`;
			}

			try {
				const fetchedPosts: BlogPostWithData[] = await client.fetch(`
                    ${query}[0...${postsToShow}]{
                        _id,
                        title,
                        slug,
                        publishedAt,
                        excerpt,
                        mainImage{
                            ...
                        },
                        featured,
                        "author": author->{
                            _id,
                            name,
                            slug,
                            avatar{
                                ...
                            },
                            bio
                        },
                        "categories": categories[]->{
                            _id,
                            title,
                            slug,
                            description
                        }
                    }
                `);
				setPosts(fetchedPosts);
			} catch (err) {
				console.error("Error fetching blog posts:", err);
				setError("Failed to load posts.");
				setPosts([]); // Ensure posts is empty on error
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [postsToShow, featuredPostsOnly]); // Re-fetch if these props change

	const hasPosts = !isLoading && !error && posts.length > 0;
	const featuredPost =
		variant === "default" && showFeaturedPostLarge && hasPosts
			? posts[0]
			: null;
	const regularPosts =
		variant === "default" && showFeaturedPostLarge && hasPosts
			? posts.slice(1)
			: posts;

	// --- Render Logic (similar to BlogSectionUI but integrated here) ---

	if (isLoading) {
		// Optional: Render a loading state
		return (
			<section className="w-full py-20 lg:py-40">
				<div className="container mx-auto px-4 md:px-6 text-center">
					Carregando posts...
				</div>
			</section>
		);
	}

	if (error) {
		// Optional: Render an error state
		return (
			<section className="w-full py-20 lg:py-40">
				<div className="container mx-auto px-4 md:px-6 text-center text-destructive">
					{error}
				</div>
			</section>
		);
	}

	// Grid variant (Blog1 style)
	if (variant === "grid") {
		return (
			<section className="w-full py-20 lg:py-40">
				<div className="container mx-auto flex flex-col gap-14">
					<div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
						<h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
							{heading}
						</h2>
						{viewAllButton && (
							<Button className="gap-4" asChild>
								<Link
									href={
										viewAllUrl.startsWith("/") ? viewAllUrl : `/${viewAllUrl}`
									}
								>
									{viewAllButtonText}
									<MoveRight className="w-4 h-4" />
								</Link>
							</Button>
						)}
					</div>

					{!hasPosts ? (
						<div className="text-center py-20 text-muted-foreground">
							Nenhum post encontrado.
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
							{posts.map((post) => (
								<Link
									key={post._id}
									href={`/blog/${post.slug.current}`}
									className="flex flex-col gap-2 hover:opacity-75 transition-opacity group"
								>
									<div className="bg-muted rounded-md aspect-video mb-4 overflow-hidden">
										{post.mainImage?.asset?._ref ? (
											<Image
												src={urlFor(post.mainImage).url()}
												alt={post.mainImage.alt || ""}
												width={400}
												height={225}
												className="w-full h-full object-cover transition-transform group-hover:scale-105"
											/>
										) : null}
									</div>
									<h3 className="text-xl tracking-tight group-hover:text-primary transition-colors">
										{post.title}
									</h3>
									{post.excerpt && (
										<p className="text-muted-foreground text-base line-clamp-2">
											{post.excerpt}
										</p>
									)}
								</Link>
							))}
						</div>
					)}
				</div>
			</section>
		);
	}

	// Default variant (existing layout)
	return (
		<section className="w-full py-20 lg:py-40">
			<div className="container mx-auto px-4 md:px-6 flex flex-col gap-14">
				<div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
					{/* Heading and Subheading */}
					<div className="flex flex-col gap-2">
						<h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
							{heading}
						</h2>
						{subheading && (
							<p className="text-lg text-muted-foreground max-w-md">
								{subheading}
							</p>
						)}
					</div>
					{/* View All Button */}
					{viewAllButton && (
						<Button className="gap-4" asChild>
							<Link
								href={
									viewAllUrl.startsWith("/") ? viewAllUrl : `/${viewAllUrl}`
								}
							>
								{viewAllButtonText}
								<MoveRight className="w-4 h-4" />
							</Link>
						</Button>
					)}
				</div>

				{!hasPosts ? (
					<div className="text-center py-20 text-muted-foreground">
						Nenhum post encontrado.
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Featured Post */}
						{featuredPost && (
							<Link
								href={`/blog/${featuredPost.slug.current}`}
								className="flex flex-col gap-4 hover:opacity-75 transition-opacity md:col-span-2"
							>
								<div className="bg-muted rounded-md aspect-video overflow-hidden">
									{featuredPost.mainImage?.asset?._ref ? (
										<Image
											src={urlFor(featuredPost.mainImage).url()}
											alt={featuredPost.mainImage.alt || ""}
											width={1200}
											height={675}
											className="w-full h-full object-cover"
										/>
									) : null}
								</div>
								<div className="flex flex-row gap-4 items-center flex-wrap">
									{featuredPost.categories?.length ? (
										<Badge>
											{featuredPost.categories[0].title}
										</Badge>
									) : null}
									<p className="flex flex-row gap-2 text-sm items-center">
										<span className="text-muted-foreground">Por</span>{" "}
										<Avatar className="h-6 w-6">
											{featuredPost.author.avatar?.asset?._ref ? (
												<AvatarImage
													src={urlFor(featuredPost.author.avatar).url()}
													alt={featuredPost.author.name}
												/>
											) : null}
											<AvatarFallback>
												{getInitials(featuredPost.author.name || "")}
											</AvatarFallback>
										</Avatar>
										<span>{featuredPost.author.name}</span>
									</p>
									{featuredPost.publishedAt && (
										<span className="text-sm text-muted-foreground">
											{formatDate(featuredPost.publishedAt)}
										</span>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="max-w-3xl text-4xl tracking-tight">
										{featuredPost.title}
									</h3>
									{featuredPost.excerpt && (
										<p className="max-w-3xl text-muted-foreground text-base">
											{featuredPost.excerpt}
										</p>
									)}
								</div>
							</Link>
						)}

						{/* Regular Posts */}
						{regularPosts.map((post) => (
							<Link
								href={`/blog/${post.slug.current}`}
								key={post._id}
								className="flex flex-col gap-4 hover:opacity-75 transition-opacity"
							>
								<div className="bg-muted rounded-md aspect-video overflow-hidden">
									{post.mainImage?.asset?._ref ? (
										<Image
											src={urlFor(post.mainImage).url()}
											alt={post.mainImage.alt || ""}
											width={600}
											height={337}
											className="w-full h-full object-cover"
										/>
									) : null}
								</div>
								<div className="flex flex-row gap-4 items-center flex-wrap">
									{post.categories?.length ? (
										<Badge>{post.categories[0].title}</Badge>
									) : null}
									<p className="flex flex-row gap-2 text-sm items-center">
										<span className="text-muted-foreground">Por</span>{" "}
										<Avatar className="h-6 w-6">
											{post.author.avatar?.asset?._ref ? (
												<AvatarImage
													src={urlFor(post.author.avatar).url()}
													alt={post.author.name}
												/>
											) : null}
											<AvatarFallback>
												{getInitials(post.author.name || "")}
											</AvatarFallback>
										</Avatar>
										<span>{post.author.name}</span>
									</p>
									{post.publishedAt && (
										<span className="text-sm text-muted-foreground">
											{formatDate(post.publishedAt)}
										</span>
									)}
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="max-w-3xl text-2xl tracking-tight">
										{post.title}
									</h3>
									{post.excerpt && (
										<p className="max-w-3xl text-muted-foreground text-base">
											{post.excerpt}
										</p>
									)}
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
