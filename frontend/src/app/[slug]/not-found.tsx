import NotFound from "@/components/global/NotFound";
import { blogDictionaries } from "@/lib/dictionaries";

export default function SlugNotFound() {
	const { pageTitle, pageMessage, backToHome } = blogDictionaries.notFound;

	return (
		<NotFound
			title={pageTitle}
			message={pageMessage}
			linkHref="/"
			linkText={backToHome}
		/>
	);
}
