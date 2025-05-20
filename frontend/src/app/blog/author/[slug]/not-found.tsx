import NotFound from "@/components/global/NotFound";
import { blogDictionaries } from "@/lib/dictionaries";

export default function AuthorNotFound() {
  const { authorTitle, authorMessage, backToBlog } = blogDictionaries.notFound;
  
  return (
    <NotFound
      title={authorTitle}
      message={authorMessage}
      linkHref="/blog"
      linkText={backToBlog}
    />
  );
}
