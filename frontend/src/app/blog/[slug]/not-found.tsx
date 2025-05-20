import NotFound from "@/components/global/NotFound";
import { blogDictionaries } from "@/lib/dictionaries";

export default function BlogNotFound() {
  const { postTitle, postMessage, backToBlog } = blogDictionaries.notFound;
  
  return (
    <NotFound
      title={postTitle}
      message={postMessage}
      linkHref="/blog"
      linkText={backToBlog}
    />
  );
}
