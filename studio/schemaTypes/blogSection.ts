import {
	DocumentTextIcon,
	InfoOutlineIcon,
	ComponentIcon,
	CogIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define field groups
const blogSectionGroups = [
	{
		name: "content",
		title: "Conteúdo",
		icon: InfoOutlineIcon,
		default: true,
	},
	{
		name: "appearance",
		title: "Aparência",
		icon: ComponentIcon,
	},
	{
		name: "options",
		title: "Opções",
		icon: CogIcon,
	},
];

const variants = [
	{ title: "Padrão com Post em Destaque", value: "default" },
	{ title: "Layout em Grade (4 colunas)", value: "grid" },
];

export const blogSection = defineType({
	name: "blogSection",
	title: "Seção do Blog",
	type: "object",
	icon: DocumentTextIcon,
	groups: blogSectionGroups,
	fields: [
		defineField({
			name: "heading",
			type: "string",
			title: "Título",
			initialValue: "Artigos mais recentes",
			validation: (rule) =>
				rule.required().error("O título da seção de blog é obrigatório."),
			group: "content",
		}),
		defineField({
			name: "variant",
			type: "string",
			title: "Variante de Layout",
			group: "appearance",
			options: {
				list: variants,
				layout: "radio",
			},
			initialValue: "default",
		}),
		defineField({
			name: "subheading",
			type: "text",
			title: "Subtítulo",
			rows: 2,
			hidden: ({ parent }) => parent?.variant === "grid",
			validation: (rule) =>
				rule
					.max(200)
					.warning(
						"Subtítulos concisos são mais eficazes (idealmente < 100 caracteres).",
					),
			group: "content",
		}),
		defineField({
			name: "postsToShow",
			type: "number",
			title: "Número de Posts a Exibir",
			description: "Limite o número de posts exibidos",
			initialValue: 4,
			validation: (rule) =>
				rule
					.min(1)
					.max(12)
					.error("O número de posts deve estar entre 1 e 12."),
			group: "options",
		}),
		defineField({
			name: "showFeaturedPostLarge",
			type: "string",
			title: "Exibir Post em Destaque em Formato Grande",
			description:
				"Se habilitado, o primeiro post será exibido em um formato maior",
			initialValue: "true",
			options: {
				list: [
					{ title: "Sim", value: "true" },
					{ title: "Não", value: "false" },
				],
				layout: "radio",
			},
			hidden: ({ parent }) => parent?.variant === "grid",
			group: "appearance",
		}),
		defineField({
			name: "featuredPostsOnly",
			type: "string",
			title: "Exibir Apenas Posts em Destaque",
			description: "Se habilitado, apenas posts marcados como destaque serão exibidos",
			initialValue: "false",
			options: {
				list: [
					{ title: "Sim", value: "true" },
					{ title: "Não", value: "false" },
				],
				layout: "radio",
			},
			group: "options",
		}),
		defineField({
			name: "viewAllButton",
			type: "string",
			title: "Exibir Botão 'Ver Todos'",
			initialValue: "false",
			options: {
				list: [
					{ title: "Sim", value: "true" },
					{ title: "Não", value: "false" },
				],
				layout: "radio",
			},
			group: "options",
		}),
		defineField({
			name: "viewAllUrl",
			type: "string",
			title: "URL para 'Ver Todos'",
			description: "URL para o botão 'Ver todos os artigos'",
			initialValue: "/blog",
			hidden: ({ parent }) => parent?.viewAllButton === "false",
			group: "options",
		}),
		defineField({
			name: "viewAllButtonText",
			type: "string",
			title: "Texto do Botão 'Ver Todos'",
			description: "Texto a ser exibido no botão 'Ver todos'",
			initialValue: "Ver todos os artigos",
			hidden: ({ parent }) => parent?.viewAllButton === "false",
			group: "content",
		}),
	],
	preview: {
		select: {
			title: "heading",
			variant: "variant",
			posts: "postsToShow",
		},
		prepare({ title, variant }) {
			const selectedVariant = variants.find((v) => v.value === variant);
			const variantTitle = selectedVariant ? selectedVariant.title : variant;
			return {
				title: title || "Seção do Blog",
				subtitle: `${variantTitle || "padrão"}`,
				media: DocumentTextIcon,
			};
		},
	},
});
