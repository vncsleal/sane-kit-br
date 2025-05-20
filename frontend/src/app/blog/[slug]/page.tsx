import { client, urlFor } from "@/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostComponent from "@/components/blog/BlogPostPage";
import { ScrollToTopButton } from "@/components/blog/ScrollToTopButton";
import { Author,Category,PortableText, SanityImageHotspot, SanityImageCrop } from "@/sanity/types";


// Make BlogPostData match the ExpandedBlogPost interface in BlogPostPage.tsx
export interface BlogPostData {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
      asset?: { _ref: string; _type: string};
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      caption?: string;
      _type: string;
    };
  body?: PortableText;
  featured?: string | boolean;
  authors?: Author[];
  author: Author;
  categories?: Category[];
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
      _type,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body,
      featured,
      "authors": authors[]->{
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
      "author": authors[0]->{
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
