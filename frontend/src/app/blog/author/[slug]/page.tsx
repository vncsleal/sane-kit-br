import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Author, BlogPost,Category } from "@/sanity/types";

import AuthorPageUI from "@/components/blog/AuthorPageUI";

// Define a type for blog post with expanded fields
interface ExpandedBlogPost extends Omit<BlogPost, "categories"> {
  categories?: Category[];
}

// Define PageProps with Promise for params
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    return {
      title: "Autor Não Encontrado",
      description: "O autor solicitado não foi encontrado",
    };
  }

  return {
    title: `${author.name} - Perfil do Autor`,
    description: author.bio || `Artigos por ${author.name}`,
  };
}

// Fetch the author by slug
async function getAuthor(slug: string): Promise<Author | null> {
  return client.fetch(
    `
    *[_type == "author" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      role,
      bio,
      fullBio,
      email,
      avatar,
      featuredImage,
      socialLinks
    }
  `,
    { slug }
  );
}

// Fetch recent posts by author - Updated query to use authors[]->_ref
async function getAuthorPosts(authorId: string): Promise<ExpandedBlogPost[]> {
  return client.fetch(
    `
    *[_type == "blogPost" && $authorId in authors[]._ref] | order(publishedAt desc)[0...6]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      "author": authors[0]->{
        _id,
        name,
        slug,
        avatar
      },
      "categories": categories[]->{
        _id,
        title,
        slug
      }
    }
  `,
    { authorId }
  );
}

// Generate static paths for all authors
export async function generateStaticParams() {
  const authors = await client.fetch(`
    *[_type == "author"]{ "slug": slug.current }
  `);

  return authors.map((author: { slug: string }) => ({
    slug: author.slug,
  }));
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  const posts = await getAuthorPosts(author._id);

  // Pass fetched data to the client component
  return <AuthorPageUI author={author} posts={posts} />;
}
