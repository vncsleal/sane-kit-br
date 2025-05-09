import type { SanityPage } from "@/sanity/types/schema";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import RenderSection from "@/components/sections/RenderSection";
import { urlFor } from "@/sanity/client";
import { getLocalizedValueServer } from "@/lib/localization-server";
import { headers } from "next/headers";
import type { Metadata } from "next"; // Import Metadata type

// Update query to fetch i18n fields for metadata
const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  i18n_title, // Fetch i18n title for metadata
  description, // Fetch description for metadata
  i18n_description, // Fetch i18n description for metadata
  ogImage, // Fetch ogImage for metadata
  pageBuilder[]{
    ...,
    _type == "compareFeaturesSection" => {
      ...,
      "features": features[]->{
        _id,
        _key,
        _type,
        title, // Fetch title instead of name if that's the field
        i18n_title // Fetch i18n title
        // Add other fields needed for compareFeaturesSection
      },
      "plans": plans[]{
        ...,
        "featureValues": featureValues[]{
          ...,
          "featureRef": featureRef->{
            _id,
            _type,
            _key,
            title, // Fetch title instead of name if that's the field
            i18n_title // Fetch i18n title
             // Add other fields needed for compareFeaturesSection featureRef
          }
        }
      }
    }
    // Add specific expansions for other section types if needed
  }
}`;

// Define the PageProps interface with params as a Promise
interface PageProps {
	params: Promise<{ slug: string }>;
	// searchParams?: { [key: string]: string | string[] | undefined }; // Optional
}

async function getPage(slug: string): Promise<SanityPage | null> {
	// Ensure the client fetch uses appropriate settings
	return client.fetch(
		pageQuery,
		{ slug }
		// Removed revalidation - will use webhooks instead
	);
}

// Use PageProps and await params in generateMetadata
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params; // Await the promise here
	const page = await getPage(slug);

	if (!page) {
		return {
			title: "Not Found",
			description: "The page you are looking for does not exist.",
		};
	}

	// Determine language key within generateMetadata
	const headersList = await headers();
	const acceptLanguage = headersList.get("accept-language");
	const preferredLanguage = acceptLanguage?.split(",")[0].split(";")[0];
	let langKey = "en"; // Default language
	if (preferredLanguage?.startsWith("pt")) {
		langKey = "pt_BR";
	}
	// Add more language mappings as needed

	// Use synchronous server-side helper with the determined language key
	const localizedTitle = getLocalizedValueServer(
		page.i18n_title,
		page.title,
		langKey,
	);
	const localizedDescription = getLocalizedValueServer(
		page.i18n_description,
		page.description,
		langKey,
	);

	// Ensure the return type matches Metadata or Promise<Metadata>
	const metadata: Metadata = {
		title: localizedTitle || "Page", // Fallback title
	};

	if (localizedDescription) {
		metadata.description = localizedDescription;
	}

	// Add Open Graph image if available
	if (page.ogImage?.asset?._ref) {
		metadata.openGraph = {
			images: [urlFor(page.ogImage.asset._ref).width(1200).height(630).url()],
		};
	}

	return metadata;
}

// Use PageProps and await params in the Page component
export default async function Page({ params }: PageProps) {
	const { slug } = await params; // Await the promise here
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
