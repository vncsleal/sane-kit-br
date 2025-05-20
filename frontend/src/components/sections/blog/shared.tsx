"use client";

import { urlFor } from "@/sanity/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { BlogSection, Author, Category, PortableText } from "@/sanity/types";

// Interface for fetched post data
export interface BlogPostWithData {
  _id: string;
  _type: "blogPost";
  title?: string;
  slug?: { current: string };
  publishedAt?: string;
  excerpt?: string;
  mainImage?: {
    asset?: { _ref: string };
    alt?: string;
    caption?: string;
  };
  body?: PortableText;
  featured?: "true" | "false";
  author: Author;
  categories?: Category[];
  featuredImage?: {
    _ref: string;
    _type: "reference";
  };
}

// Utility functions 
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// Section header component
export const SectionHeader = ({ 
  heading = "Artigos mais recentes", 
  subheading 
}: Pick<BlogSection, 'heading' | 'subheading'>) => (
  <div className="max-w-screen-md">
    <h2 className="text-3xl md:text-5xl tracking-tighter mb-4">{heading}</h2>
    {subheading && (
      <p className="text-xl text-muted-foreground mb-10">{subheading}</p>
    )}
  </div>
);

// View All button component
export const ViewAllButton = ({
  viewAllButton,
  viewAllUrl = "/blog",
  viewAllButtonText = "Ver todos os artigos",
}: Pick<BlogSection, 'viewAllButton' | 'viewAllUrl' | 'viewAllButtonText'>) => {
  if (viewAllButton !== "true") return null;
  
  return (
    <div className="mt-10 flex justify-center">
      <Button variant="outline" size="lg" asChild>
        <Link href={viewAllUrl || "/blog"} className="gap-2 items-center">
          {viewAllButtonText}
          <MoveRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

// Blog post card component
export const BlogPostCard = ({
  post,
  isFeatured = false,
}: {
  post: BlogPostWithData;
  isFeatured?: boolean;
}) => {
  return (
    <div className={`flex flex-col ${isFeatured ? "lg:flex-row gap-10" : ""}`}>
      {/* Featured image */}
      <div className={`relative ${isFeatured ? "lg:w-1/2" : ""}`}>
        <Link href={`/blog/${post.slug?.current || ""}`}>
          <div
            className={`relative overflow-hidden rounded-lg ${
              isFeatured ? "aspect-[16/9]" : "aspect-[16/10]"
            } bg-muted mb-5`}
          >
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage)
                  .width(isFeatured ? 900 : 600)
                  .height(isFeatured ? 600 : 400)
                  .url()}
                alt={post.mainImage.alt || post.title || ""}
                className="object-cover transition-all hover:scale-105"
                fill={true}
                sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className={isFeatured ? "lg:w-1/2" : ""}>
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <Badge key={category._id} variant="outline">
                <Link href={`/blog/category/${category.slug?.current || ""}`}>
                  {category.title || ""}
                </Link>
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug?.current || ""}`}>
          <h3
            className={`font-medium ${
              isFeatured
                ? "text-3xl md:text-4xl mb-4"
                : "text-xl md:text-2xl mb-2"
            } hover:text-primary transition-colors`}
          >
            {post.title || ""}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className={`text-muted-foreground line-clamp-3 ${
              isFeatured ? "text-lg mb-6" : "mb-4"
            }`}
          >
            {post.excerpt}
          </p>
        )}

        {/* Author and date */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {post.author?.avatar ? (
              <AvatarImage
                src={urlFor(post.author.avatar).width(80).height(80).url()}
              />
            ) : null}
            <AvatarFallback>{post.author?.name ? getInitials(post.author.name) : 'NA'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="text-foreground font-medium">
              {post.author?.name || 'Anonymous'}
            </span>
            <span className="text-xs text-muted-foreground">
              {post.publishedAt && formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
