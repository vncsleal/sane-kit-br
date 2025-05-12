import { EnvelopeIcon, InfoOutlineIcon, EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Define variants for consistency and reusability
const variants = [
  { title: "Padrão", value: "default" },
  { title: "Destaque", value: "highlight" },
  { title: "Mínima", value: "minimal" },
  { title: "Completa", value: "full" },
];

// Define button icons for consistency
const buttonIcons = [
  { title: "Nenhum", value: "none" },
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Mais", value: "plus" },
  { title: "Email", value: "mail" },
];

export const newsletterSection = defineType({
  name: "newsletterSection",
  title: "Seção de Newsletter",
  type: "object",
  icon: EnvelopeIcon,
  groups: [
    {
      name: "content",
      title: "Conteúdo",
      icon: InfoOutlineIcon,
      default: true,
    },
    {
      name: "appearance",
      title: "Aparência",
      icon: EarthGlobeIcon,
    },
  ],
  fields: [
    defineField({
      name: "variant",
      title: "Variante",
      type: "string",
      group: "appearance",
      options: {
        list: variants,
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      group: "content",
      description: "Texto opcional do emblema exibido acima do título",
      validation: (rule) => 
        rule.max(30).warning("Textos de emblema concisos são mais eficazes (idealmente < 30 caracteres)."),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      group: "content",
      validation: (rule) => 
        rule.required().error("O título da seção de newsletter é obrigatório."),
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) =>
        rule.max(200)
          .warning("Subtítulos concisos são mais eficazes (idealmente < 120 caracteres)."),
    }),
    defineField({
      name: "inputPlaceholder",
      title: "Placeholder da Entrada",
      type: "string",
      group: "content",
      initialValue: "Digite seu email",
      validation: (rule) =>
        rule.max(50)
          .warning("Placeholders curtos são mais eficazes."),
    }),
    defineField({
      name: "buttonText",
      title: "Texto do Botão",
      type: "string",
      group: "content",
      initialValue: "Inscrever-se",
      validation: (rule) => 
        rule.required().error("O texto do botão é obrigatório.")
          .max(30).warning("Textos de botão concisos são mais eficazes."),
    }),
    defineField({
      name: "buttonIcon",
      title: "Ícone do Botão",
      type: "string",
      group: "appearance",
      options: {
        list: buttonIcons,
        layout: "radio",
      },
      initialValue: "mail",
    }),
    defineField({
      name: "successMessage",
      title: "Mensagem de Sucesso",
      type: "string",
      group: "content",
      initialValue: "Obrigado por se inscrever!",
      validation: (rule) =>
        rule.required().error("A mensagem de sucesso é obrigatória.")
          .max(100).warning("Mensagens de sucesso concisas são mais eficazes."),
    }),
    defineField({
      name: "privacyText",
      title: "Texto de Privacidade",
      type: "text",
      group: "content",
      description: "Texto opcional sobre política de privacidade",
      rows: 2,
      validation: (rule) =>
        rule.max(200)
          .warning("Textos de privacidade concisos são mais eficazes."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      variant: "variant",
    },
    prepare({ title, variant }) {
      const selectedVariant = variants.find((v) => v.value === variant);
      const variantTitle = selectedVariant ? selectedVariant.title : variant;
      
      return {
        title: title || "Seção de Newsletter",
        subtitle: `${variantTitle || "Padrão"}`,
        media: EnvelopeIcon,
      };
    },
  },
});
