import {
	DocumentTextIcon,
	InfoOutlineIcon,
	ImageIcon,
	TagIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define field groups
const blogPostGroups = [
	{
		name: "basic",
		title: "Informações Básicas",
		icon: InfoOutlineIcon,
		default: true,
	},
	{
		name: "content",
		title: "Conteúdo",
		icon: DocumentTextIcon,
	},
	{
		name: "metadata",
		title: "Metadados",
		icon: TagIcon,
	},
	{
		name: "media",
		title: "Mídia",
		icon: ImageIcon,
	},
];

export const blogPost = defineType({
	name: "blogPost",
	title: "Post do Blog",
	type: "document",
	icon: DocumentTextIcon,
	groups: blogPostGroups,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Título",
			validation: (rule) =>
				rule.required().error("O título do post é obrigatório."),
			group: "basic",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (rule) =>
				rule.required().error("O slug do post é obrigatório."),
			group: "basic",
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
			title: "Publicado em",
			initialValue: () => new Date().toISOString(),
			group: "basic",
		}),
		defineField({
			name: "excerpt",
			type: "text",
			title: "Resumo",
			description: "Um breve resumo do artigo",
			validation: (rule) => [
				rule.max(300).error("O resumo não pode exceder 300 caracteres."),
				rule
					.min(50)
					.warning("Um resumo ideal deve ter pelo menos 50 caracteres."),
			],
			group: "basic",
		}),
		defineField({
			name: "authors",
			type: "array",
			title: "Autores",
			of: [{ type: "reference", to: [{ type: "author" }] }],
			validation: (rule) =>
				rule
					.required()
					.min(1)
					.error("Pelo menos um autor deve ser selecionado para o post."),
			group: "metadata",
		}),
		defineField({
			name: "mainImage",
			type: "image",
			title: "Imagem Principal",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Texto Alternativo",
					validation: (rule) =>
						rule
							.required()
							.error(
								"O texto alternativo é importante para acessibilidade. Descreva a imagem.",
							),
				}),
				defineField({
					name: "caption",
					type: "string",
					title: "Legenda",
				}),
			],
			group: "media",
		}),
		defineField({
			name: "categories",
			type: "array",
			title: "Categorias",
			of: [{ type: "reference", to: { type: "category" } }],
			group: "metadata",
		}),
		defineField({
			name: "body",
			title: "Conteúdo",
			type: "portableText",
			group: "content",
		}),
		defineField({
			name: "featured",
			type: "string",
			title: "Post em Destaque",
			description: "Marcar este post como um artigo em destaque",
			initialValue: "false",
			options: {
				list: [
					{ title: "Sim", value: "true" },
					{ title: "Não", value: "false" },
				],
				layout: "radio",
			},
			group: "metadata",
		}),
	],
	preview: {
		select: {
			title: "title",
			authorName: "authors.0.name",
			media: "mainImage",
			date: "publishedAt",
		},
		prepare(selection) {
			const { title, authorName, media, date } = selection;
			const formattedDate = date
				? new Date(date).toLocaleDateString("pt-BR", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})
				: "Não publicado";

			return {
				title,
				subtitle: `Por ${authorName || "Autor desconhecido"} · ${formattedDate}`,
				media: media || DocumentTextIcon,
			};
		},
	},
});
