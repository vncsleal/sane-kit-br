"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import type { BlogSection } from "@/sanity/types";
import { BlogPostWithData, SectionHeader, ViewAllButton } from "./shared";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";


export default function Grid({
  heading = "Artigos mais recentes",
  subheading,
  postsToShow = 6,
  featuredPostsOnly = "false",
  viewAllButton,
  viewAllUrl = "/blog", 
  viewAllButtonText = "Ver todos os artigos",
}: BlogSection) {
  // State for posts
  const [posts, setPosts] = useState<BlogPostWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from Sanity
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // GROQ query to fetch posts with related data
        const query = `*[_type == "blogPost" && defined(slug.current)${
          featuredPostsOnly === "true" ? ' && featured == "true"' : ''
        }] | order(publishedAt desc, _updatedAt desc)[0...${postsToShow}]{
          _id,
          _type,
          title,
          slug,
          excerpt,
          mainImage,
          publishedAt,
          featured,
          "author": authors[0]->{
            _id,
            name,
            slug,
            avatar,
            bio,
            role
          },
          "categories": categories[]->{
            _id,
            title,
            slug,
            description
          }
        }`;

        // Fetch data
        const fetchedPosts = await client.fetch(query);
        setPosts(fetchedPosts || []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load posts.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [featuredPostsOnly, postsToShow]);

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-20 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 text-center">
          Loading posts...
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-20 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 text-center text-destructive">
          {error}
        </div>
      </section>
    );
  }

  const hasPosts = posts.length > 0;

  // Grid variant (Blog1 style)
  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <SectionHeader heading={heading} subheading={subheading} />
          
          {viewAllButton === "true" && (
            <ViewAllButton 
              viewAllButton={viewAllButton} 
              viewAllUrl={viewAllUrl} 
              viewAllButtonText={viewAllButtonText} 
            />
          )}
        </div>

        {!hasPosts ? (
          <div className="text-center py-20 text-muted-foreground">
            No blog posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug?.current || ""}`}
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
                  {post.title || ""}
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
