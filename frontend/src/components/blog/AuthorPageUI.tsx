"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import {
	Twitter,
	Linkedin,
	Github,
	Instagram,
	Globe,
	Youtube,
	Mail,
} from "lucide-react";
import type {
	SanityAuthor,
	SanityBlogPost,
	SanityCategory,
	SanityAuthorSocialLink,
} from "@/sanity/types/schema";
import { portableTextComponents } from "./PortableTextComponents";

// Define types for the component props
interface AuthorDetails extends SanityAuthor {
	fullBio?: SanityAuthor["fullBio"];
}

interface ExpandedBlogPost extends Omit<SanityBlogPost, "categories" | "author"> {
	categories?: SanityCategory[];
	author?: SanityAuthor;
}

interface AuthorPageUIProps {
	author: AuthorDetails;
	posts: ExpandedBlogPost[];
}

// Social icon mapping
const SocialIcons = {
	twitter: Twitter,
	linkedin: Linkedin,
	github: Github,
	instagram: Instagram,
	website: Globe,
	youtube: Youtube,
} as const;

// Helper function to format date
function formatDate(dateString?: string) {
	if (!dateString) return "";
	return new Date(dateString).toLocaleDateString("pt-BR", {
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

export default function AuthorPageUI({ author, posts }: AuthorPageUIProps) {
	return (
		<main className="container mx-auto px-4 md:px-6 py-12">
			<div className="flex flex-col gap-16">
				{/* Author Profile */}
				<div className="max-w-4xl mx-auto w-full">
					{/* Author Header */}
					<div className="flex flex-row items-center space-x-6 mb-6">
						<Avatar className="h-24 w-24">
							{author.avatar?.asset?._ref ? (
								<AvatarImage
									src={urlFor(author.avatar.asset._ref).url()}
									alt={author.avatar?.alt || author.name || ""}
									className="object-cover"
								/>
							) : (
								<AvatarFallback className="text-lg">
									{getInitials(author.name)}
								</AvatarFallback>
							)}
						</Avatar>
						<div className="space-y-1">
							<h1 className="text-3xl font-bold">{author.name}</h1>
							{author.role && (
								<p className="text-xl text-muted-foreground">{author.role}</p>
							)}
							{author.bio && (
								<p className="text-sm text-muted-foreground">{author.bio}</p>
							)}
						</div>
					</div>

					{/* Social Links */}
					{author.socialLinks && author.socialLinks.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-6">
							{author.socialLinks.map((link: SanityAuthorSocialLink) => {
								const platform = link.platform as keyof typeof SocialIcons;
								const Icon = SocialIcons[platform];
								return (
									<Button
										key={link._key}
										variant="ghost"
										size="sm"
										className="h-8 px-2"
										asChild
									>
										<Link
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<span className="flex items-center">
												<Icon className="h-4 w-4 mr-2" />
												<span>
													{platform.charAt(0).toUpperCase() + platform.slice(1)}
												</span>
											</span>
										</Link>
									</Button>
								);
							})}
							{author.email && (
								<Button variant="ghost" size="sm" className="h-8 px-2" asChild>
									<Link href={`mailto:${author.email}`}>
										<span className="flex items-center">
											<Mail className="h-4 w-4 mr-2" />
												<span>Email</span>
										</span>
									</Link>
								</Button>
							)}
						</div>
					)}

					{/* Full Bio */}
					{author.fullBio && (
						<div className="prose max-w-none dark:prose-invert mb-3">
							<PortableText
								value={author.fullBio}
								components={portableTextComponents}
							/>
						</div>
					)}
				</div>

				{/* Featured Image */}
				{author.featuredImage?.asset?._ref && (
					<div className="relative w-full max-w-4xl mx-auto aspect-[21/9] rounded-xl overflow-hidden">
						<Image
							src={urlFor(author.featuredImage.asset._ref).url()}
							alt={author.featuredImage?.alt || author.name || ""}
							fill
							className="object-cover"
						/>
					</div>
				)}

				{/* Author's Posts */}
				<div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
					<h2 className="text-3xl font-semibold tracking-tight">
						Artigos de {author.name}
					</h2>

						{!posts || posts.length === 0 ? (
						<p className="text-muted-foreground">Nenhum artigo encontrado.</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{posts.map((post) => (
								<Link
									href={`/blog/${post.slug?.current}`}
									key={post._id}
									className="flex flex-col gap-4 group hover:opacity-80 transition-opacity"
								>
									<div className="bg-muted rounded-md aspect-video overflow-hidden">
										{post.mainImage?.asset?._ref ? (
											<Image
												src={urlFor(post.mainImage).url()}
												alt={post.mainImage?.alt || post.title || ""}
												width={600}
												height={337}
												className="w-full h-full object-cover transition-transform group-hover:scale-105"
											/>
										) : (
											<div className="w-full h-full bg-muted flex items-center justify-center">
												<span className="text-muted-foreground">Sem imagem</span>
											</div>
										)}
									</div>

									<div className="flex flex-row gap-4 items-center">
										{post.categories?.[0] && (
											<Badge variant="secondary">{post.categories[0].title}</Badge>
										)}
										<span className="text-sm text-muted-foreground">
											{formatDate(post.publishedAt)}
										</span>
									</div>

									<h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
										{post.title}
									</h3>

									{post.excerpt && (
										<p className="text-muted-foreground line-clamp-2">
											{post.excerpt}
										</p>
									)}
								</Link>
							))}
						</div>
					)}

					<div className="flex justify-center pt-8">
						<Button asChild>
							<Link href="/blog">Ver todos os artigos</Link>
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
