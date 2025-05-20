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

  // Fetch posts from Sanity
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // GROQ query to fetch posts with related data
        const query = `*[_type == "blogPost" && defined(slug.current)${
          featuredPostsOnly === "true" ? ' && featured == true' : ''
        }] | order(publishedAt desc)[0...${postsToShow}]{
          _id,
          title,
          slug,
          excerpt,
          featuredImage,
          publishedAt,
          "author": author->{
            _id,
            name,
            slug,
            avatar,
            role
          },
          "categories": categories[]->{
            _id,
            title,
            slug
          }
        }`;

        // Fetch data
        const result = await client.fetch(query);
        setPosts(result || []);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [featuredPostsOnly, postsToShow]);

  if (loading) {
    return (
      <div className="container py-20">
        <p className="text-center">Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container py-20">
        <p className="text-center">No posts found.</p>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container">
        {/* Header */}
        <SectionHeader heading={heading} subheading={subheading} />

        {/* Blog posts */}
        <div className="mt-10">
          {showFeaturedPostLarge === "true" && posts.length > 0 && (
            <div className="mb-16">
              <BlogPostCard post={posts[0]} isFeatured={true} />
            </div>
          )}

          {/* Grid of regular posts */}
          {posts.length > (showFeaturedPostLarge === "true" ? 1 : 0) && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts
                .slice(showFeaturedPostLarge === "true" ? 1 : 0)
                .map((post) => (
                  <BlogPostCard key={post._id} post={post} />
                ))}
            </div>
          )}

          {/* View all button */}
          <ViewAllButton 
            viewAllButton={viewAllButton} 
            viewAllUrl={viewAllUrl} 
            viewAllButtonText={viewAllButtonText} 
          />
        </div>
      </div>
    </section>
  );
}
