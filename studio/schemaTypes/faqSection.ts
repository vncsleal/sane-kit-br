import { HelpCircleIcon, InfoOutlineIcon, ComponentIcon } from "@sanity/icons";
import { defineField, defineType, type ValidationContext } from "sanity";

const layoutVariants = [
  { title: "Lado a Lado", value: "sideBySide" },
  { title: "Centralizado", value: "centered" },
];

const buttonIcons = [
  { title: "Nenhum", value: "none" },
  { title: "Telefone", value: "phone" },
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Mais", value: "plus" },
  { title: "Verificar", value: "check" },
];

export const faqSection = defineType({
  name: "faqSection",
  title: "Seção de FAQ",
  type: "object",
  icon: HelpCircleIcon,
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
      icon: ComponentIcon,
    },
    {
      name: "questions",
      title: "Itens do FAQ",
      icon: HelpCircleIcon,
    },
  ],
  fields: [
    defineField({
      name: "variant",
      title: "Variante de Layout",
      type: "string",
      group: "appearance",
      options: {
        list: layoutVariants,
        layout: "radio",
      },
      initialValue: "sideBySide",
    }),
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      description: "Texto exibido no emblema (ex: 'FAQ')",
      initialValue: "FAQ",
      group: "content",
      validation: (rule) =>
        rule
          .max(30)
          .warning("Textos de emblema concisos são mais eficazes (idealmente < 20 caracteres)."),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .error("O título da seção de FAQ é obrigatório.")
          .max(100)
          .warning("Títulos concisos são melhores (idealmente < 80 caracteres)."),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      description: "Texto descritivo que aparece abaixo do título",
      rows: 3,
      group: "content",
      validation: (rule) =>
        rule
          .max(250)
          .warning("Subtítulos concisos são mais eficazes (idealmente < 180 caracteres)."),
    }),
    defineField({
      name: "buttonText",
      title: "Texto do Botão",
      type: "string",
      description: "Texto do botão de chamada para ação (opcional)",
      group: "content",
      validation: (rule) =>
        rule
          .max(50)
          .warning("Textos de botão devem ser curtos e diretos (idealmente < 30 caracteres)."),
    }),
    defineField({
      name: "buttonUrl",
      title: "URL do Botão",
      type: "url",
      description: "Para onde o botão leva (obrigatório se o texto do botão estiver preenchido)",
      hidden: ({ parent }: { parent: { buttonText?: string } }) => !parent?.buttonText,
      group: "content",
      validation: (rule) => 
            rule.required().error("A URL do botão é obrigatória")
            .uri({
				allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"]
            }).error("Formato de URL inválido. Use http://, https://, mailto: ou tel:")
    }),
    defineField({
      name: "buttonIcon",
      title: "Ícone do Botão",
      type: "string",
      options: {
        list: buttonIcons,
      },
      initialValue: "phone",
      hidden: ({ parent }) => !parent?.buttonText,
      group: "content",
    }),
    defineField({
      name: "faqItems",
      title: "Itens do FAQ",
      type: "array",
      description: "Perguntas e respostas para a seção de FAQ",
      group: "questions",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Item do FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .error("A pergunta do FAQ é obrigatória.")
                  .max(200)
                  .warning("Perguntas concisas são mais fáceis de ler (idealmente < 150 caracteres)."),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 3,
              validation: (rule) =>
                rule
                  .required()
                  .error("A resposta do FAQ é obrigatória.")
                  .min(20)
                  .warning("Respostas devem ser informativas (pelo menos 20 caracteres)."),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
            prepare({ title, subtitle }) {
              const answerPreview = subtitle
                ? subtitle.substring(0, 80) + (subtitle.length > 80 ? "..." : "")
                : "Sem resposta";
              return {
                title: title || "Pergunta não definida",
                subtitle: answerPreview,
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.min(1).error("Adicione pelo menos um item (pergunta e resposta) ao FAQ."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      itemCount: "faqItems.length",
      variant: "variant",
    },
    prepare({ title, variant }) {
      const selectedVariant = layoutVariants.find((v) => v.value === variant);
      const variantTitle = selectedVariant ? selectedVariant.title : variant;
      return {
        title: title || "Seção de FAQ",
        subtitle: `${variantTitle || "Padrão"}`,
        media: HelpCircleIcon,
      };
    },
  },
});
