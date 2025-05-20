import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Category, Author,
  PortableText,
  SanityImageHotspot,
  SanityImageCrop } from "@/sanity/types";
import CategoryPageUI from "@/components/blog/CategoryPageUI";

// Define PageProps with Promise for params
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Categoria Não Encontrada",
      description: "A categoria solicitada não foi encontrada",
    };
  }

  return {
    title: `${category.title} - Categoria do Blog`,
    description: category.description || `Veja todos os artigos em ${category.title}`,
  };
}

// Fetch the category by slug
async function getCategory(slug: string): Promise<Category | null> {
  return client.fetch(
    `
    *[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description
    }
  `,
    { slug }
  );
}

// Define the expanded blog post type for server-side
type ExpandedBlogPost = {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: { current: string };
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
  author: Author;
  categories?: Category[];
};

// Fetch posts by category
async function getCategoryPosts(categoryId: string): Promise<ExpandedBlogPost[]> {
  return client.fetch(
    `
    *[_type == "blogPost" && references($categoryId)] | order(publishedAt desc){
      _id,
      _type,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body,
      featured,
      "author": author->{
        _id,
        _type,
        name,
        slug,
        avatar,
        bio,
        email,
        role,
        socialLinks[] {
          _key,
          platform,
          url,
          username
        }
      },
      "categories": categories[]->{
        _id,
        title,
        slug,
        description
      }
    }
  `,
    { categoryId }
  );
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await client.fetch(`
    *[_type == "category"]{ "slug": slug.current }
  `);

  return categories.map((category: { slug: string }) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getCategoryPosts(category._id);

  // Pass fetched data to the client component
  return <CategoryPageUI category={category} posts={posts} />;
}
