import type { Page } from "@/sanity/types";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import RenderSection from "@/components/sections/RenderSection";
import { urlFor } from "@/sanity/client";
import type { Metadata } from "next";

// Enhanced GROQ query with better feature reference handling
const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  description,
  ogImage,
  pageBuilder[]{
    ...,
    _type == "compareFeaturesSection" => {
      ...,
      "features": features[]{
        "_ref": _ref,
        "_key": _key,
        "_type": _type
      },
      "plans": plans[]{
        ...,
        "featureValues": featureValues[]{
          ...,
          "featureRef": {
            "_ref": featureRef._ref,
            "_type": featureRef._type
          }
        }
      }
    }
  }
}`;

// Define the PageProps interface with params
interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string): Promise<Page | null> {
  const page = await client.fetch(pageQuery, { slug });
  return page;
}

// Generate metadata using direct values
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: "Não Encontrado",
      description: "A página que você está procurando não existe.",
    };
  }

  const metadata: Metadata = {
    title: page.title || "Página",
  };

  if (page.description) {
    metadata.description = page.description;
  }

  // Add Open Graph image if available
  if (page.ogImage?.asset?._ref) {
    metadata.openGraph = {
      images: [urlFor(page.ogImage.asset._ref).width(1200).height(630).url()],
    };
  }

  return metadata;
}

// Page component with simplified logic
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      {page.pageBuilder?.map((section) => (
        <RenderSection key={section._key} section={section} />
      ))}
    </main>
  );
}
