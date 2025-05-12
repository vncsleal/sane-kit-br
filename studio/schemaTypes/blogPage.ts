import { DocumentTextIcon, EarthGlobeIcon, ThLargeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define field groups
const blogPageGroups = [
	{
		name: "content",
		title: "Conteúdo",
		icon: DocumentTextIcon,
		default: true,
	},
	{
		name: "display",
		title: "Opções de Exibição",
		icon: ThLargeIcon,
	},
	{
		name: "seo",
		title: "Configurações de SEO",
		icon: EarthGlobeIcon,
	},
];

const layoutOptions = [
	{ title: "Grade Padrão", value: "grid" },
	{ title: "Posts em Destaque", value: "featured" },
	{ title: "Lista Compacta", value: "compact" },
];

export const blogPage = defineType({
	name: "blogPage",
	title: "Página do Blog",
	type: "document",
	icon: DocumentTextIcon,
	groups: blogPageGroups,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Título da Página",
			description: "Título para a página de índice do blog",
			initialValue: "Blog",
			validation: (rule) =>
				rule.required().error("O título da página do blog é obrigatório."),
			group: "content",
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Descrição da Página",
			description: "Subtítulo ou breve descrição para a página do blog",
			rows: 2,
			initialValue: "Artigos, notícias e insights mais recentes",
			group: "content",
		}),
		defineField({
			name: "layout",
			type: "string",
			description: "Escolha o layout para a listagem do blog",
			group: "display",
			options: {
				list: layoutOptions,
				layout: "radio",
			},
			initialValue: "grid",
		}),
		defineField({
			name: "postsPerPage",
			type: "number",
			title: "Posts por Página",
			description: "Número de posts para exibir por página",
			initialValue: 9,
			validation: (rule) => rule.min(1).max(24),
			group: "display",
		}),
		defineField({
			name: "featuredPostsCount",
			type: "number",
			description:
				"Número de posts para destacar (aplica-se apenas ao layout de Posts em Destaque)",
			initialValue: 3,
			hidden: ({ parent }) => parent?.layout !== "featured",
			validation: (rule) => rule.min(1).max(6),
			group: "display",
		}),
		defineField({
			name: "showOnlyFeaturedPosts",
			type: "string",
			title: "Exibir Somente Posts Marcados como Destaque",
			description:
				"Quando habilitado, apenas posts com a marcação de destaque serão exibidos como destaque.",
			initialValue: "false",
			options: {
				list: [
					{ title: "Sim", value: "true" },
					{ title: "Não", value: "false" },
				],
				layout: "radio",
			},
			hidden: ({ parent }) => parent?.layout !== "featured",
			group: "display",
		}),
		defineField({
			name: "seo",
			type: "object",
			title: "Configurações de SEO",
			description: "Configurações de SEO para a página do blog",
			group: "seo",
			fields: [
				{
					name: "metaTitle",
					type: "string",
					title: "Título Meta",
					description: "Título usado para a aba do navegador e resultados de busca",
					validation: (rule) =>
						rule.warning(
							"Títulos meta concisos são melhores para SEO (idealmente < 60 caracteres).",
						),
				},
				{
					name: "metaDescription",
					type: "text",
					title: "Descrição Meta",
					description: "Descrição para os resultados de motores de busca",
					validation: (rule) =>
						rule.warning(
							"Descrições meta devem resumir o conteúdo da página (idealmente < 160 caracteres).",
						),
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			layout: "layout",
		},
		prepare({ title, layout }) {
			const selectedLayout = layoutOptions.find((opt) => opt.value === layout);
			const layoutTitle = selectedLayout ? selectedLayout.title : layout;
			return {
				title: title || "Página do Blog",
				subtitle: `Layout: ${layoutTitle || "padrão"}`,
				media: DocumentTextIcon,
			};
		},
	},
});
