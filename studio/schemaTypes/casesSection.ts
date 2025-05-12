import { CaseIcon, InfoOutlineIcon, ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define field groups
const casesGroups = [
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
		name: "cases",
		title: "Cases",
		icon: CaseIcon,
	},
];

const variants = [
	{ title: "Carrossel de Logos", value: "logoCarousel" },
	{ title: "Slider Compacto", value: "compactSlider" },
];

export const casesSection = defineType({
	name: "casesSection",
	title: "Seção de Cases",
	type: "object",
	icon: CaseIcon,
	groups: casesGroups,
	fields: [
		defineField({
			name: "variant",
			type: "string",
			group: "appearance",
			options: {
				list: variants,
				layout: "radio",
			},
			initialValue: "logoCarousel",
		}),
		defineField({
			name: "heading",
			type: "string",
			title: "Título",
			validation: (rule) =>
				rule.required().error("O título da seção de cases é obrigatório."),
			group: "content",
		}),
		defineField({
			name: "subheading",
			type: "text",
			title: "Subtítulo",
			rows: 2,
			validation: (rule) =>
				rule
					.max(250)
					.warning(
						"Subtítulos concisos são mais eficazes (idealmente < 150 caracteres).",
					),
			group: "content",
		}),
		defineField({
			name: "cases",
			type: "array",
			title: "Cases de Estudo/Logos",
			description: "Adicione logos ou cases de estudo para exibir nesta seção",
			group: "cases",
			validation: (rule) =>
				rule.min(1).error("Adicione pelo menos um case ou logo."),
			of: [
				defineField({
					type: "object",
					name: "caseItem",
					title: "Case",
					fields: [
						defineField({
							name: "name",
							type: "string",
							title: "Nome",
							validation: (rule) =>
								rule.required().error("O nome do case/logo é obrigatório."),
						}),
						defineField({
							name: "logo",
							type: "image",
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
											.error("O texto alternativo do logo é obrigatório."),
								}),
							],
							validation: (rule) => rule.required().error("O logo é obrigatório."),
						}),
						defineField({
							name: "url",
							type: "url",
							title: "URL do Site",
							description: "Link opcional para o site da empresa",
							validation: (rule) =>
								rule.uri({ allowRelative: false }).error("Forneça uma URL válida."),
						}),
					],
					preview: {
						select: {
							title: "name",
							media: "logo",
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "heading",
			variant: "variant",
			casesCount: "cases.length",
		},
		prepare({ title, variant }) {
			const selectedVariant = variants.find((v) => v.value === variant);
			const variantTitle = selectedVariant ? selectedVariant.title : variant;
			return {
				title: title || "Seção de Cases",
				subtitle: `${variantTitle || "logoCarousel"}`,
				media: CaseIcon,
			};
		},
	},
});
