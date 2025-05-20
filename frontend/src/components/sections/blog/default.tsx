"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import type { BlogSection } from "@/sanity/types";
import { BlogPostWithData, SectionHeader, ViewAllButton, BlogPostCard } from "./shared";

export default function Default({
  heading = "Artigos mais recentes",
  subheading,
  postsToShow = 3,
  showFeaturedPostLarge = "true",
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
  const featuredPost = showFeaturedPostLarge === "true" && hasPosts ? posts[0] : null;
  const regularPosts = showFeaturedPostLarge === "true" && hasPosts ? posts.slice(1) : posts;

  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          {/* Heading and Subheading */}
          <SectionHeader heading={heading} subheading={subheading} />
          
          {/* View All Button */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Post */}
            {featuredPost && <BlogPostCard post={featuredPost} isFeatured={true} />}

            {/* Regular Posts */}
            {regularPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
