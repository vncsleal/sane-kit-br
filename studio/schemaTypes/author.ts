import { UserIcon, InfoOutlineIcon, BookIcon, LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define field groups
const authorGroups = [
	{
		name: "identity",
		title: "Identidade", 
		icon: InfoOutlineIcon,
		default: true,
	},
	{
		name: "biography",
		title: "Biografia", 
		icon: BookIcon,
	},
	{
		name: "contact",
		title: "Contato e Redes Sociais", 
		icon: LinkIcon,
	},
];

export const author = defineType({
	name: "author",
	title: "Autor", 
	type: "document",
	icon: UserIcon, 
	groups: authorGroups, 
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Nome", 
			validation: (rule) => rule.required().error("O nome do autor é obrigatório."),
			group: "identity", 
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (rule) => rule.required().error("O slug do autor é obrigatório."),
			group: "identity",
		}),
		defineField({
			name: "avatar",
			type: "image",
			options: {
				hotspot: true,
			},
			group: "identity", 
		}),
		defineField({
			name: "role",
			type: "string",
			title: "Cargo", 
			description: "Cargo ou função na organização", 
			group: "identity", 
		}),
		defineField({
			name: "bio",
			type: "text",
			description: "Biografia curta para pré-visualizações e cartões", 
			rows: 3,
			group: "biography", 
		}),
		defineField({
			name: "fullBio",
			type: "array",
			title: "Biografia Completa", 
			description: "Biografia mais longa para a página do autor", 
			of: [{ type: "block" }],
			group: "biography", 
		}),
		defineField({
			name: "featuredImage",
			type: "image",
			title: "Imagem de Destaque", 
			description: "Imagem maior usada na página do autor", 
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Texto Alternativo", 
				},
			],
			group: "biography", 
		}),
		defineField({
			name: "socialLinks",
			type: "array",
			title: "Links de Redes Sociais", 
			group: "contact", 
			of: [
				{
					type: "object",
					name: "socialLink",
					fields: [
						defineField({
							name: "platform",
							type: "string",
							title: "Plataforma", 
							options: {
								list: [
									{ title: "Twitter", value: "twitter" },
									{ title: "LinkedIn", value: "linkedin" },
									{ title: "GitHub", value: "github" },
									{ title: "Instagram", value: "instagram" },
									{ title: "Site Pessoal", value: "website" }, 
									{ title: "YouTube", value: "youtube" },
								],
							},
							validation: (rule) => rule.required().error("A plataforma da rede social é obrigatória."),
						}),
						defineField({
							name: "url",
							type: "url",
							validation: (rule) =>
								rule.required().error("A URL da rede social é obrigatória."),
						}),
						defineField({
							name: "username",
							type: "string",
							title: "Nome de Usuário", 
							description: "Nome de exibição ou nome de usuário (sem '@')", 
						}),
					],
				},
			],
		}),
		defineField({
			name: "email",
			type: "string",
			validation: (rule) => rule.email().error("Forneça um endereço de e-mail válido."),
			group: "contact", 
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "role",
			media: "avatar",
		},
	},
});
