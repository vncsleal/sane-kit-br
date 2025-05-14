"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { SanityBlogPage } from "@/sanity/types/schema";
import type { BlogPostListItem } from "@/app/blog/page"; // Import type from page.tsx

interface BlogIndexPageUIProps {
	config: SanityBlogPage;
	posts: BlogPostListItem[];
}

// Helper function to format date
function formatDate(dateString?: string) {
	if (!dateString) return "Sem data";
	return new Date(dateString).toLocaleDateString("pt-BR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

// Function to get initials for avatar fallback
function getInitials(name?: string) {
	if (!name) return "??";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
}

export default function BlogIndexPageUI({
	config,
	posts,
}: BlogIndexPageUIProps) {
	// For "featured" layout, organize posts
	let featuredPosts: BlogPostListItem[] = [];
	let regularPosts: BlogPostListItem[] = [];

	if (config.layout === "featured") {
		const count = config.featuredPostsCount || 3;
		if (config.showOnlyFeaturedPosts === "true") {
			// Filter posts where featured is "true" (string value from schema)
			featuredPosts = posts.filter(post => post.featured === "true").slice(0, count);
			regularPosts = posts.filter(post => post.featured !== "true");
		} else {
			featuredPosts = posts.slice(0, count);
			regularPosts = posts.slice(count);
		}
	}

	// Featured Layout
	if (config.layout === "featured" && featuredPosts.length > 0) {
		return (
			<main className="container mx-auto px-4 md:px-6 py-12">
				<div className="flex flex-col gap-8 mb-16">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
						{config.title}
					</h1>
					{config.description && (
						<p className="text-xl text-muted-foreground">
							{config.description}
						</p>
					)}
				</div>

				<div className="w-full py-10">
					<div className="flex flex-col gap-14">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Main Featured Post */}
							{featuredPosts.length > 0 &&
								(() => {
									const post = featuredPosts[0];
									return (
										<Link
											href={`/blog/${post.slug.current}`}
											className="flex flex-col gap-4 hover:opacity-75 transition-opacity md:col-span-2"
										>
											<div className="bg-muted rounded-md aspect-video overflow-hidden">
												{post.mainImage?.asset?._ref ? (
													<Image
														src={urlFor(post.mainImage.asset._ref).url()}
														alt={post.mainImage?.alt || post.title || ""}
														width={1200}
														height={675}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full bg-muted flex items-center justify-center">
														<span className="text-muted-foreground">
															Sem imagem
														</span>
													</div>
												)}
											</div>

											<div className="flex flex-row gap-4 items-center flex-wrap">
												{post.categories?.[0] && (
													<Badge>{post.categories[0].title}</Badge>
												)}
												{post.author && (
													<p className="flex flex-row gap-2 text-sm items-center">
														<span className="text-muted-foreground">Por</span>{" "}
														<Avatar className="h-6 w-6">
															{post.author?.avatar?.asset?._ref ? (
																<AvatarImage
																	src={urlFor(
																		post.author.avatar.asset._ref,
																	).url()}
																	alt={post.author.avatar?.alt || post.author.name}
																/>
															) : null}
															<AvatarFallback>
																{getInitials(post.author.name)}
															</AvatarFallback>
														</Avatar>
														<span>{post.author.name}</span>
													</p>
												)}
												{post.publishedAt && (
													<span className="text-sm text-muted-foreground">
														{formatDate(post.publishedAt)}
													</span>
												)}
											</div>

											<div className="flex flex-col gap-2">
												<h3 className="max-w-3xl text-4xl tracking-tight">
													{post.title}
												</h3>
												{post.excerpt && (
													<p className="max-w-3xl text-muted-foreground text-base">
														{post.excerpt}
													</p>
												)}
											</div>
										</Link>
									 );
								 })()}

							{/* Secondary Featured Posts */}
							{featuredPosts.slice(1).map((post) => (
								<Link
									key={post._id}
									href={`/blog/${post.slug.current}`}
									className="flex flex-col gap-4 hover:opacity-75 transition-opacity"
								>
									<div className="bg-muted rounded-md aspect-video overflow-hidden">
										{post.mainImage?.asset?._ref ? (
											<Image
												src={urlFor(post.mainImage.asset._ref).url()}
												alt={post.mainImage?.alt || post.title || ""}
												width={600}
												height={337}
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full bg-muted flex items-center justify-center">
												<span className="text-muted-foreground">
													Sem imagem
												</span>
											</div>
										)}
									</div>

									<div className="flex flex-row gap-4 items-center flex-wrap">
										{post.categories?.[0] && (
											<Badge>{post.categories[0].title}</Badge>
										)}
										{post.author && (
											<p className="flex flex-row gap-2 text-sm items-center">
												<span className="text-muted-foreground">Por</span>{" "}
												<Avatar className="h-6 w-6">
													{post.author?.avatar?.asset?._ref ? (
														<AvatarImage
															src={urlFor(post.author.avatar.asset._ref).url()}
															alt={post.author.avatar?.alt || post.author.name}
														/>
													) : null}
													<AvatarFallback>
														{getInitials(post.author.name)}
													</AvatarFallback>
												</Avatar>
												<span>{post.author.name}</span>
											</p>
										)}
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

						{/* Regular Posts for Featured Layout */}
						{regularPosts.length > 0 && (
							<>
								<h2 className="text-2xl font-semibold mt-10 mb-4">
									Mais Artigos
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
									{regularPosts.map((post) => (
										<Link
											key={post._id}
											href={`/blog/${post.slug.current}`}
											className="flex flex-col gap-4 hover:opacity-75 transition-opacity"
										>
											<div className="bg-muted rounded-md aspect-video overflow-hidden">
												{post.mainImage?.asset?._ref ? (
													<Image
														src={urlFor(post.mainImage.asset._ref).url()}
														alt={post.mainImage?.alt || post.title || ""}
														width={400}
														height={225}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full bg-muted flex items-center justify-center">
														<span className="text-muted-foreground">
															Sem imagem
														</span>
													</div>
												)}
											</div>

											<div className="flex flex-row gap-2 items-center">
												{post.categories?.[0] && (
													<Badge variant="secondary">
														{post.categories[0].title}
													</Badge>
												)}
												<span className="text-sm text-muted-foreground">
													{formatDate(post.publishedAt)}
												</span>
											</div>

											<h3 className="text-lg font-medium line-clamp-2">
												{post.title}
											</h3>
										</Link>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="container mx-auto px-4 md:px-6 py-12">
			<div className="flex flex-col gap-8 mb-16">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
					{config.title}
				</h1>
				{config.description && (
					<p className="text-xl text-muted-foreground">
						{config.description}
					</p>
				)}
			</div>

			{/* Standard Grid Layout */}
			{config.layout === "grid" && posts.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{posts.map((post) => (
						<Link
							key={post._id}
							href={`/blog/${post.slug.current}`}
							className="flex flex-col gap-4 group"
						>
							<div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
								{post.mainImage?.asset?._ref ? (
									<Image
										src={urlFor(post.mainImage.asset._ref).url()}
										alt={post.mainImage?.alt || post.title || ""}
										fill
										className="object-cover transition-transform group-hover:scale-105"
									/>
								) : (
									<div className="w-full h-full bg-muted flex items-center justify-center">
										<span className="text-muted-foreground">Sem imagem</span>
									</div>
								)}
							</div>

							<div className="flex items-center gap-2">
								{post.categories?.[0] && (
									<Badge variant="secondary">{post.categories[0].title}</Badge>
								)}
								<span className="text-sm text-muted-foreground">
									{formatDate(post.publishedAt)}
								</span>
							</div>

							<h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
								{post.title}
							</h2>

							{post.excerpt && (
								<p className="text-muted-foreground line-clamp-2">
									{post.excerpt}
								</p>
							)}

							{post.author && (
							<div className="flex items-center gap-2 mt-auto">
								<Avatar className="h-8 w-8">
									{post.author.avatar?.asset?._ref ? (
										<AvatarImage
											src={urlFor(post.author.avatar.asset._ref).url()}
											alt={post.author.avatar?.alt || post.author.name || ""}
										/>
									) : null}
									<AvatarFallback>
										{getInitials(post.author.name)}
									</AvatarFallback>
								</Avatar>
								<span className="text-sm">
									{post.author.name}
								</span>
							</div>
							)}
						</Link>
					))}
				</div>
			)}

			{/* Compact Layout */}
			{config.layout === "compact" && posts.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{posts.map((post) => (
						<Link
							key={post._id}
							href={`/blog/${post.slug.current}`}
							className="flex gap-4 items-center p-4 rounded-lg hover:bg-muted transition-colors"
						>
							{post.mainImage?.asset?._ref && (
								<div className="w-16 h-16 bg-muted rounded-md overflow-hidden relative shrink-0">
									<Image
										src={urlFor(post.mainImage.asset._ref).url()}
										alt={post.mainImage?.alt || post.title || ""}
										fill
										className="object-cover"
									/>
								</div>
							)}
							<div>
								<h3 className="font-medium">{post.title}</h3>
								<p className="text-sm text-muted-foreground">
									{post.publishedAt
										? formatDate(post.publishedAt)
										: "Sem data"}
								</p>
							</div>
						</Link>
					))}
				</div>
			)}

			{posts.length === 0 && (
				<div className="text-center py-12 text-muted-foreground">
					Nenhum post encontrado.
				</div>
			)}
		</main>
	);
}
