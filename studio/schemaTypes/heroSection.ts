import {
  RocketIcon,
  InfoOutlineIcon,
  ComponentIcon,
  ImageIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Extract option lists to constants
const HERO_VARIANTS = [
  { title: "Banner com Botão", value: "buttonBanner" },
  { title: "Banner com Emblema", value: "badgeBanner" },
  { title: "Galeria em Grade", value: "gridGallery" },
];

const BOOLEAN_OPTIONS = [
  { title: "Sim", value: "true" },
  { title: "Não", value: "false" },
];

const BUTTON_VARIANTS = [
  { title: "Padrão", value: "default" },
  { title: "Secundário", value: "secondary" },
  { title: "Contorno", value: "outline" },
  { title: "Fantasma", value: "ghost" },
  { title: "Link", value: "link" },
];

const BUTTON_ICONS = [
  { title: "Telefone", value: "phone" },
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Mais", value: "plus" },
  { title: "Verificar", value: "check" },
  { title: "Coração", value: "heart" },
  { title: "Estrela", value: "star" },
  { title: "Pesquisar", value: "search" },
  { title: "Configurações", value: "settings" },
  { title: "Email", value: "mail" },
  { title: "Calendário", value: "calendar" },
];

const MEDIA_TYPES = [
  { title: "Imagem", value: "image" },
  { title: "Vídeo", value: "video" },
  { title: "Placeholder", value: "placeholder" },
];

export const heroSection = defineType({
  name: "heroSection",
  title: "Seção Hero",
  type: "object",
  icon: RocketIcon,
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
      title: "Ações",
      icon: RocketIcon,
    },
    {
      name: "media",
      title: "Mídia",
      icon: ImageIcon,
    },
  ],
  fields: [
    defineField({
      name: "variant",
      title: "Variante",
      type: "string",
      options: {
        list: HERO_VARIANTS,
        layout: "radio",
      },
      initialValue: "buttonBanner",
      group: "appearance",
      validation: (rule) => 
        rule.required().error("Por favor escolha uma variante para a seção hero"),
    }),
    defineField({
      name: "bannerButton",
      title: "Botão do Banner",
      type: "object",
      hidden: ({ parent }) => parent?.variant !== "buttonBanner",
      group: "actions",
      fields: [
        {
          name: "label",
          title: "Rótulo",
          type: "string",
          validation: (rule) => 
            rule.required().error("O rótulo do botão é obrigatório"),
        },
        {
          name: "url",
          title: "URL",
          type: "url",
          validation: (rule) => 
            rule.required().error("A URL do botão é obrigatória")
            .uri({
				allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"]
            }).error("Formato de URL inválido. Use http://, https://, mailto: ou tel:"),
        },
      ],
    }),
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      group: "content",
      hidden: ({ parent }) =>
        parent?.variant !== "badgeBanner" && parent?.variant !== "gridGallery",
      validation: (rule) => 
        rule.max(30).warning("O texto do emblema deve ser curto e conciso"),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) => 
        rule.required().error("O título da seção Hero é obrigatório")
        .max(70).warning("Títulos muito longos podem prejudicar o layout"),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) =>
        rule.max(200).warning("O subtítulo deve ser conciso (máximo 200 caracteres)"),
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
            {
              name: "label",
              title: "Rótulo",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "string",
            },
            {
              name: "variant",
              title: "Variante",
              type: "string",
              options: {
                list: [
                  { title: "Padrão", value: "default" },
                  { title: "Secundário", value: "secondary" },
                  { title: "Contorno", value: "outline" },
                  { title: "Fantasma", value: "ghost" },
                  { title: "Link", value: "link" },
                ],
              },
              initialValue: "default",
            },
            {
              name: "icon",
              title: "Ícone",
              type: "string",
              options: {
                list: [
                  { title: "Telefone", value: "phone" },
                  { title: "Seta para Direita", value: "arrowRight" },
                  { title: "Mais", value: "plus" },
                  { title: "Verificar", value: "check" },
                  { title: "Coração", value: "heart" },
                  { title: "Estrela", value: "star" },
                  { title: "Pesquisar", value: "search" },
                  { title: "Configurações", value: "settings" },
                  { title: "Email", value: "mail" },
                  { title: "Calendário", value: "calendar" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "media",
      title: "Mídia",
      type: "object",
      description: "Adicione imagens ou vídeos à sua seção hero",
      group: "media",
      fields: [
        {
          name: "type",
          title: "Tipo",
          type: "string",
          options: {
            list: [
              { title: "Imagem", value: "image" },
              { title: "Vídeo", value: "video" },
              { title: "Placeholder", value: "placeholder" },
            ],
          },
          initialValue: "placeholder",
        },
        {
          name: "image",
          title: "Imagem",
          type: "image",
          hidden: ({ parent }) => parent?.type !== "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
            },
          ],
        },
        {
          name: "video",
          title: "Vídeo",
          type: "object",
          hidden: ({ parent }) => parent?.type !== "video",
          fields: [
            {
              name: "url",
              title: "URL do Vídeo",
              type: "url",
              description:
                "Use URLs do Vimeo ou uploadthing para desempenho ideal.",
            },
            {
              name: "autoplay",
              title: "Reprodução Automática",
              type: "string",
              options: {
                list: [
                  { title: "Sim", value: "true" },
                  { title: "Não", value: "false" },
                ],
                layout: "radio",
              },
              initialValue: "false",
            },
            {
              name: "loop",
              title: "Loop",
              type: "string",
              options: {
                list: [
                  { title: "Sim", value: "true" },
                  { title: "Não", value: "false" },
                ],
                layout: "radio",
              },
              initialValue: "true",
            },
            {
              name: "muted",
              title: "Sem Som",
              type: "string",
              options: {
                list: [
                  { title: "Sim", value: "true" },
                  { title: "Não", value: "false" },
                ],
                layout: "radio",
              },
              initialValue: "true",
            },
          ],
        },
        {
          name: "additionalImages",
          title: "Imagens Adicionais",
          type: "array",
          description:
            "Adicione até 3 imagens adicionais para a variante Galeria em Grade (até 4 imagens no total)",
          hidden: ({ parent }) => {
            return parent?.type !== "image";
          },
          of: [
            {
              type: "image",
              title: "Imagem",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Texto Alternativo",
                  type: "string",
                },
              ],
            },
          ],
          validation: (Rule) =>
            Rule.max(3).warning("Você pode adicionar até 3 imagens adicionais"),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "variant",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Seção Hero",
        subtitle: `Variante: ${subtitle || "buttonBanner"}`,
        media: RocketIcon,
      };
    },
  },
});
