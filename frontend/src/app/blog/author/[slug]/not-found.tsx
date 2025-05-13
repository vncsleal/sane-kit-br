import NotFound from "@/components/global/NotFound";

export default function AuthorNotFound() {
  return (
    <NotFound
      title="Autor Não Encontrado"
      message="Desculpe, o autor que você está procurando não existe ou pode ter sido removido."
      linkHref="/blog"
      linkText="Voltar para o Blog"
    />
  );
}
