import NotFound from "@/components/global/NotFound";

export default function BlogNotFound() {
  return (
    <NotFound
      title="Post Não Encontrado"
      message="Desculpe, o post que você está procurando não existe ou pode ter sido removido."
      linkHref="/blog"
      linkText="Voltar para o Blog"
    />
  );
}
