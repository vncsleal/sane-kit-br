import NotFound from "@/components/global/NotFound";

export default function CategoryNotFound() {
  return (
    <NotFound
      title="Categoria Não Encontrada"
      message="Desculpe, a categoria que você está procurando não existe ou pode ter sido removida."
      linkHref="/blog"
      linkText="Voltar para o Blog"
    />
  );
}
