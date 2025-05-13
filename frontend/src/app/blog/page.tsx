import type { Metadata } from "next";
import { client } from "@/sanity/client";
import type {
  SanityBlogPage,
  SanityCategory,
  SanityImage,
} from "@/sanity/types/schema";
import BlogIndexPageUI from "@/components/blog/BlogIndexPageUI";

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
  featured?: boolean;
  author?: {
    _id: string;
    name: string;
    avatar?: SanityImage;
  };
  categories?: SanityCategory[];
}

// Generate metadata based on config
export async function generateMetadata(): Promise<Metadata> {
  const config = await getBlogPageConfig();

  return {
    title: config.seo?.metaTitle || config.title || "Blog",
    description: config.seo?.metaDescription || config.description,
  };
}

// Fetch blog page configuration without i18n fields
async function getBlogPageConfig(): Promise<BlogPageConfig> {
  const config = await client.fetch(`*[_type == "blogPage"][0]{
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
  }`);

  return (
    config || {
      title: "Blog",
      description: "Artigos, notícias e insights mais recentes",
      layout: "grid",
      postsPerPage: 9,
    }
  );
}

// Fetch blog posts without i18n fields
async function getBlogPosts(
  config: BlogPageConfig,
): Promise<BlogPostListItem[]> {
  const postsPerPage = config.postsPerPage || 9; // Default posts per page
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc)[0...${postsPerPage}]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      featured,
      "author": author->{
        _id,
        name,
        avatar
      },
      "categories": categories[]->{
        _id,
        title,
        slug
      }
    }
  `);
}

export default async function BlogIndexPage() {
  const config = await getBlogPageConfig();
  const posts = await getBlogPosts(config);

  // Pass fetched data to the client component
  return <BlogIndexPageUI config={config} posts={posts} />;
}
