import type { Metadata } from "next";
import { client } from "@/sanity/client";
import type {
  SanityBlogPage,
  SanityCategory,
  SanityImage,
} from "@/sanity/types/schema";
import BlogIndexPageUI from "@/components/blog/BlogIndexPageUI";
import { groq } from "next-sanity";

// Use SanityBlogPage type
type BlogPageConfig = SanityBlogPage;

// Define the list item type without i18n fields
export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  mainImage?: SanityImage;
  featured?: string; // Changed from boolean to string to match schema
  author?: {
    _id: string;
    name: string;
    avatar?: SanityImage;
  };
  categories?: SanityCategory[];
}

// Define pagination metadata
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

// Generate metadata based on config
export async function generateMetadata(): Promise<Metadata> {
  const config = await getBlogPageConfig();

  return {
    title: config.seo?.metaTitle || config.title || "Blog",
    description: config.seo?.metaDescription || config.description,
  };
}

// Define the queries
const BLOG_PAGE_QUERY = groq`*[_type == "blogPage"][0]{
  title,
  description,
  layout,
  postsPerPage,
  featuredPostsCount,
  showOnlyFeaturedPosts,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription
  }
}`;

const COUNT_POSTS_QUERY = groq`count(*[_type == "blogPost"])`;

const COUNT_FEATURED_POSTS_QUERY = groq`count(*[_type == "blogPost" && featured == "true"])`;

// Fetch blog page configuration without i18n fields
async function getBlogPageConfig(): Promise<BlogPageConfig> {
  const config = await client.fetch(BLOG_PAGE_QUERY);

  return (
    config || {
      title: "Blog",
      description: "Artigos, notícias e insights mais recentes",
      layout: "grid",
      postsPerPage: 9,
    }
  );
}

// Fetch blog posts with pagination support
async function getBlogPosts(
  config: BlogPageConfig,
  page: number = 1
): Promise<{ posts: BlogPostListItem[]; pagination: PaginationData }> {
  const postsPerPage = config.postsPerPage || 9; // Default posts per page
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  
  // Determine if we should only show featured posts
  const showOnlyFeatured = config.showOnlyFeaturedPosts === "true";
  
  // Count total posts
  const totalPosts = await client.fetch(
    showOnlyFeatured ? COUNT_FEATURED_POSTS_QUERY : COUNT_POSTS_QUERY
  );
  
  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Fetch posts for the current page
  const posts = await client.fetch(
    `*[_type == "blogPost"${showOnlyFeatured ? ' && featured == "true"' : ''}] | order(publishedAt desc)[${start}...${end}]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      featured,
      "author": authors[0]->{
        _id,
        name,
        avatar
      },
      "categories": categories[]->{
        _id,
        title,
        slug
      }
    }`
  );

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
    }
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get the current page from query params or default to 1
  const pageParam = searchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam) : 1;
  
  const config = await getBlogPageConfig();
  const { posts, pagination } = await getBlogPosts(config, currentPage);

  // Pass fetched data to the client component
  return <BlogIndexPageUI config={config} posts={posts} pagination={pagination} />;
}
