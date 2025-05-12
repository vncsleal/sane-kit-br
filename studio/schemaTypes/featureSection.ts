import {
  SparklesIcon,
  InfoOutlineIcon,
  ImageIcon,
  ComponentIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

const layoutVariants = [
  { title: "Padrão", value: "default" },
  { title: "Com Imagem", value: "withImage" },
  { title: "Imagem à Esquerda", value: "leftImage" },
  { title: "Imagem à Direita", value: "rightImage" },
  { title: "Cartões com Imagem", value: "imageCards" },
  { title: "Grade Masonry", value: "masonryGrid" },
  { title: "Grade Masonry Grande", value: "bigMasonryGrid" },
  { title: "Recurso em Carrossel", value: "carouselFeature" },
  { title: "Comparação Deslizante", value: "slidingComparison" },
];

const featureIcons = [
  { title: "Usuário", value: "user" },
  { title: "Configurações", value: "settings" },
  { title: "Cadeado", value: "lock" },
  { title: "Estrela", value: "star" },
  { title: "Coração", value: "heart" },
  { title: "Gráfico", value: "barChart" },
  { title: "Dólar", value: "dollar" },
  { title: "Calendário", value: "calendar" },
  { title: "Relógio", value: "clock" },
  { title: "Email", value: "mail" },
];

const highlightedOptions = [
  { title: "Sim", value: "true" },
  { title: "Não", value: "false" },
];

export const featureSection = defineType({
  name: "featureSection",
  title: "Seção de Recursos",
  type: "object",
  icon: SparklesIcon,
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
      name: "media",
      title: "Mídia",
      icon: ImageIcon,
    },
    {
      name: "features",
      title: "Recursos",
      icon: SparklesIcon,
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
      },
      initialValue: "default",
    }),
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      description: "Texto opcional para exibir no emblema (ex: 'Plataforma')",
      group: "content",
      validation: (rule) =>
        rule
          .max(40)
          .warning(
            "Textos de emblema concisos são mais eficazes (idealmente < 30 caracteres).",
          ),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule.required().error("O título da seção de recursos é obrigatório."),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      rows: 2,
      group: "content",
      validation: (rule) =>
        rule
          .max(250)
          .warning(
            "Subtítulos concisos são mais eficazes (idealmente < 180 caracteres).",
          ),
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      description:
        "Imagem para exibir na seção de recursos (para variante 'Com Imagem')",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
          validation: (rule) =>
            rule
              .required()
              .error(
                "O texto alternativo é obrigatório para a imagem principal.",
              ),
        }),
      ],
      hidden: ({ parent }) =>
        parent?.variant !== "withImage" &&
        parent?.variant !== "slidingComparison",
      group: "media",
    }),
    defineField({
      name: "comparisonImage",
      title: "Imagem de Comparação",
      type: "image",
      description:
        "Segunda imagem usada para a variante de comparação deslizante (geralmente versão em modo escuro)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
          validation: (rule) =>
            rule
              .required()
              .error(
                "O texto alternativo é obrigatório para a imagem de comparação.",
              ),
        }),
      ],
      hidden: ({ parent }) => parent?.variant !== "slidingComparison",
      group: "media",
    }),
    defineField({
      name: "features",
      title: "Recursos",
      type: "array",
      group: "features",
      of: [
        defineField({
          type: "object",
          name: "feature",
          title: "Recurso",
          fields: [
            defineField({
              name: "title",
              title: "Título do Recurso",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .error("O título do recurso é obrigatório.")
                  .max(100)
                  .warning(
                    "Títulos de recurso concisos são melhores (idealmente < 80 caracteres).",
                  ),
            }),
            defineField({
              name: "description",
              title: "Descrição do Recurso",
              type: "text",
              rows: 2,
              validation: (rule) =>
                rule
                  .max(200)
                  .warning(
                    "Descrições de recurso concisas são mais eficazes (idealmente < 150 caracteres).",
                  ),
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              description:
                "Ícone para exibir para este recurso (usado na variante Grade Masonry)",
              options: {
                list: featureIcons,
                layout: "radio",
              },
              hidden: ({ parent }) => parent?.variant !== "masonryGrid",
            }),
            defineField({
              name: "highlighted",
              title: "Destacado (Cartão Largo)",
              type: "string",
              options: {
                list: highlightedOptions,
                layout: "radio",
              },
              description:
                "Quando habilitado, este cartão de recurso ocupará 2 colunas no layout de grade masonry",
              initialValue: "false",
              hidden: ({ parent }) => parent?.variant !== "masonryGrid",
            }),
            defineField({
              name: "image",
              title: "Imagem do Recurso",
              type: "image",
              description:
                "Imagem para este recurso (necessária para a variante Cartões com Imagem)",
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  title: "Texto Alternativo",
                  type: "string",
                  validation: (rule) =>
                    rule
                      .required()
                      .error(
                        "O texto alternativo é obrigatório para a imagem do recurso.",
                      ),
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
              icon: "icon",
            },
            prepare({ title, subtitle, media, icon }) {
              const selectedIcon = featureIcons.find(i => i.value === icon);
              const iconTitle = selectedIcon ? selectedIcon.title : icon;
              return {
                title: title || "Recurso",
                subtitle: subtitle || (icon ? `Ícone: ${iconTitle}` : "Sem descrição"),
                media: media || SparklesIcon,
              };
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.min(1).error("Adicione pelo menos um recurso."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      variant: "variant",
      featuresCount: "features.length",
    },
    prepare({ title, variant, featuresCount = 0 }) {
      const selectedVariant = layoutVariants.find(v => v.value === variant);
      const variantTitle = selectedVariant ? selectedVariant.title : variant;
      return {
        title: title || "Seção de Recursos",
        subtitle: `${variantTitle || "Padrão"}`,
        media: SparklesIcon,
      };
    },
  },
});
