import {
  BellIcon,
  InfoOutlineIcon,
  BulbOutlineIcon,
  ComponentIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

const sectionVariants = [
  { title: "Padrão", value: "default" },
  { title: "Destaque", value: "highlight" },
  { title: "Mínima", value: "minimal" },
  { title: "Completa", value: "full" },
];

const buttonVariants = [
  { title: "Padrão", value: "default" },
  { title: "Secundário", value: "secondary" },
  { title: "Contorno", value: "outline" },
  { title: "Fantasma", value: "ghost" },
  { title: "Link", value: "link" },
];

const buttonIcons = [
  { title: "Nenhum", value: "none" },
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Telefone", value: "phone" },
  { title: "Mais", value: "plus" },
];

export const ctaSection = defineType({
  name: "ctaSection",
  title: "Seção CTA",
  type: "object",
  icon: BellIcon,
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
      name: "actions",
      title: "Chamadas para Ação",
      icon: BulbOutlineIcon,
    },
  ],
  fields: [
    defineField({
      name: "variant",
      title: "Variante",
      type: "string",
      group: "appearance",
      options: {
        list: sectionVariants,
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      description: "Texto opcional do emblema exibido acima do título",
      group: "content",
      validation: (rule) =>
        rule
          .max(40)
          .warning("Textos de emblema concisos são mais eficazes (idealmente < 30 caracteres)."),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule.required().error("O título da seção CTA é obrigatório.")
        .max(120).warning("Títulos concisos são melhores (idealmente < 100 caracteres)."),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) =>
        rule
          .max(300)
          .warning("Subtítulos concisos são mais eficazes (idealmente < 200 caracteres)."),
    }),
    defineField({
      name: "buttons",
      title: "Botões",
      type: "array",
      group: "actions",
      of: [
        {
          type: "object",
          name: "button",
          title: "Botão",
          fields: [
            defineField({
              name: "label",
              title: "Rótulo",
              type: "string",
              validation: (rule) =>
                rule.required().error("O rótulo do botão é obrigatório.")
                .max(50).warning("Rótulos de botão devem ser curtos e diretos (idealmente < 30 caracteres)."),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().error("A URL do botão é obrigatória.")
                .uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }).error("Forneça uma URL válida ou um link relativo (ex: /contato)."),
            }),
            defineField({
              name: "variant",
              title: "Variante",
              type: "string",
              options: {
                list: buttonVariants,
              },
              initialValue: "default",
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: {
                list: buttonIcons,
                layout: "radio",
              },
              initialValue: "none",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
              variant: "variant",
            },
            prepare({ title, subtitle, variant }) {
              const selectedVariant = buttonVariants.find(v => v.value === variant);
              const variantTitle = selectedVariant ? selectedVariant.title : variant;
              return {
                title: title || "Botão",
                subtitle: `${variantTitle || "Padrão"} | ${subtitle || "URL não definida"}`,
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.min(1).error("Adicione pelo menos um botão à seção CTA."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      variant: "variant",
      buttonCount: "buttons.length",
    },
    prepare({ title, variant}) {
      const selectedVariant = sectionVariants.find(v => v.value === variant);
      const variantTitle = selectedVariant ? selectedVariant.title : variant;
      return {
        title: title || "Seção CTA",
        subtitle: `${variantTitle || "padrão"}`,
        media: BellIcon,
      };
    },
  },
});
