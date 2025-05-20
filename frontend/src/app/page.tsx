import type { Page } from "@/sanity/types";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import RenderSection from "@/components/sections/RenderSection";
import { urlFor } from "@/sanity/client";

// Query specifically for the page with slug '/'
const homePageQuery = `*[_type == "page" && slug.current == "/"][0]{
  _id,
  title,
  description,
  ogImage,
  pageBuilder[]{
    ...,
    _type == "compareFeaturesSection" => {
      ...,
      "features": features[]->{
        _id, _key, _type, title
      },
      "plans": plans[]{
        ...,
        "featureValues": featureValues[]{
          ...,
          "featureRef": featureRef->{
            _id, _type, _key, title
          }
        }
      }
    }
  }
}`;

async function getHomePage(): Promise<Page | null> {
  // Fetch the homepage data
  return client.fetch(homePageQuery, {});
}

export async function generateMetadata() {
  const page = await getHomePage();

  if (!page) {
    return {
      title: "Página não encontrada",
      description: "A página que você está procurando não existe.",
    };
  }

  const metadata: {
    title: string;
    description?: string;
    openGraph?: { images: string[] };
  } = {
    title: page.title || "Página Inicial",
  };

  if (page.description) {
    metadata.description = page.description;
  }

  // Add Open Graph image if available
  if (page.ogImage?.asset?._ref) {
    metadata.openGraph = {
      images: [urlFor(page.ogImage).width(1200).height(630).url()],
    };
  }

  return metadata;
}

export default async function HomePage() {
  const page = await getHomePage();

  if (!page) {
    // If the page with slug '/' doesn't exist in Sanity, show 404
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
