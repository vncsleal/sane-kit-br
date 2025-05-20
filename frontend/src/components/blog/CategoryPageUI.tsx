"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/client";
import type { 
  Author,
  Category,
  PortableText,
  SanityImageHotspot,
  SanityImageCrop
} from "@/sanity/types";

// Define the post interface using official Sanity types
interface BlogPostData {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    asset?: { _ref: string; _type: string };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    caption?: string;
    _type: string;
  };
  body?: PortableText;
  featured?: string | boolean;
  authors?: Author[];
  author: Author;
  categories?: Category[];
}

interface CategoryPageUIProps {
	category: Category;
	posts: BlogPostData[];
}

// Helper function to format date
function formatDate(dateString?: string) {
	if (!dateString) return "";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

// Function to get author initials for avatar fallback
function getInitials(name?: string) {
	if (!name) return "??";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
}

export default function CategoryPageUI({
	category,
	posts,
}: CategoryPageUIProps) {
	// Static text in English
	const staticText = {
		noArticlesFound: "Nenhum artigo encontrado nesta categoria",
		viewAllBlogPosts: "Ver todos os posts",
		noImage: "Sem imagem",
	};

	return (
		<main className="container mx-auto px-4 md:px-6 py-12">
			<div className="flex flex-col gap-12">
				{/* Category Header */}
				<div className="flex flex-col gap-4 max-w-3xl">
					<Badge className="w-fit">{category.title}</Badge>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
						{category.title}
					</h1>
					{category.description && (
						<p className="text-xl text-muted-foreground">
							{category.description}
						</p>
					)}
				</div>

				{/* Category Posts */}
				<div className="flex flex-col gap-8">
					{posts.length === 0 ? (
						<div className="text-center py-20">
							<p className="text-muted-foreground text-lg">
									{staticText.noArticlesFound}
							</p>
							<Button asChild className="mt-8">
								<Link href="/blog">{staticText.viewAllBlogPosts}</Link>
							</Button>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{posts.map((post: BlogPostData) => (
									<Link
										href={`/blog/${post.slug.current}`}
										key={post._id}
										className="flex flex-col gap-4 group hover:opacity-80 transition-opacity"
									>
										<div className="bg-muted rounded-md aspect-video overflow-hidden relative">
											{post.mainImage?.asset?._ref ? (
												<Image
													src={urlFor(post.mainImage.asset._ref).url()}
													alt={post.mainImage?.alt || post.title || ""}
													fill
													className="object-cover transition-transform group-hover:scale-105"
												/>
											) : (
												<div className="w-full h-full bg-muted flex items-center justify-center">
													<span className="text-muted-foreground">
														{staticText.noImage}
													</span>
												</div>
											)}
										</div>

										<div className="flex flex-row gap-4 items-center">
											<span className="text-sm text-muted-foreground">
												{formatDate(post.publishedAt)}
											</span>
										</div>

										<h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
											{post.title}
										</h2>

										{post.excerpt && (
											<p className="text-muted-foreground line-clamp-2">
												{post.excerpt}
											</p>
										)}

										{post.author?.name && (
											<div className="flex items-center gap-2 mt-auto">
												<Avatar className="h-8 w-8">
													{post.author?.avatar?.asset?._ref ? (
														<AvatarImage
															src={urlFor(post.author.avatar.asset._ref).url()}
															alt={post.author.name}
														/>
													) : null}
													<AvatarFallback>
														{getInitials(post.author.name)}
													</AvatarFallback>
												</Avatar>
												<span className="text-sm">{post.author.name}</span>
											</div>
										)}
									</Link>
								))}
							</div>

							<div className="flex justify-center pt-8">
								<Button asChild>
									<Link href="/blog">{staticText.viewAllBlogPosts}</Link>
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</main>
	);
}
