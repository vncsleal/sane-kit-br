import { client, urlFor } from "@/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostComponent from "@/components/blog/BlogPostPage";
import { ScrollToTopButton } from "@/components/blog/ScrollToTopButton";
import type {
  SanityAuthor,
  SanityCategory,
  SanityImage,
  PortableTextContent,
} from "@/sanity/types/schema";

export interface BlogPostData {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  body?: PortableTextContent;
  featured?: boolean;
  author: SanityAuthor;
  categories?: SanityCategory[];
}

// Update PageProps to use Promise for params
interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string): Promise<BlogPostData | null> {
  return client.fetch(
    `
    *[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body,
      featured,
      "author": author->{
        _id,
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
    { slug }
  );
}

export default async function BlogPostPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPage(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostComponent post={post} />
      <ScrollToTopButton />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPage(slug);

  if (!post) {
    return {
      title: "Post Não Encontrado",
      description: "O post solicitado não foi encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - Leia mais em nosso blog`,
    openGraph: post.mainImage
      ? {
          images: [
            {
              url: urlFor(post.mainImage).width(1200).height(630).url(),
            },
          ],
        }
      : undefined,
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "blogPost"]{ "slug": slug.current }
  `);

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}
