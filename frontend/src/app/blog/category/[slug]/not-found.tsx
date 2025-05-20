import NotFound from "@/components/global/NotFound";
import { blogDictionaries } from "@/lib/dictionaries";

export default function CategoryNotFound() {
  const { categoryTitle, categoryMessage, backToBlog } = blogDictionaries.notFound;
  
  return (
    <NotFound
      title={categoryTitle}
      message={categoryMessage}
      linkHref="/blog"
      linkText={backToBlog}
    />
  );
}
