import { TagIcon, InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define field groups
const categoryGroups = [
	{
		name: "basic",
		title: "Informações Básicas", 
		icon: InfoOutlineIcon,
		default: true,
	},
];

export const category = defineType({
	name: "category",
	title: "Categoria", 
	type: "document",
	icon: TagIcon,
	groups: categoryGroups,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Título", 
			validation: (rule) =>
				rule.required().error("O título da categoria é obrigatório."), 
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
				rule.required().error("O slug da categoria é obrigatório."), 
			group: "basic",
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Descrição", 
			validation: (rule) =>
				rule
					.max(200)
					.warning("Uma descrição concisa é recomendada (idealmente < 150 caracteres)."),
			group: "basic",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
		},
		prepare({ title, subtitle }) {
			return {
				title,
				subtitle: subtitle || "Sem descrição", 
				media: TagIcon,
			};
		},
	},
});
