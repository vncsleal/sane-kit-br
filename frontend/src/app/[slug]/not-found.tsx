import NotFound from "@/components/global/NotFound";

// Simple not-found page that uses the global NotFound component
export default function SlugNotFound() {
	return (
		<NotFound
			title="Página não encontrada"
			message="Não conseguimos encontrar a página que você está procurando."
			linkHref="/"
			linkText="Voltar para a página inicial"
		/>
	);
}
