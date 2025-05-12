import { InfoOutlineIcon, BarChartIcon, ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const statsSection = defineType({
  name: "statsSection",
  title: "Seção de Estatísticas",
  type: "object",
  icon: BarChartIcon,
  groups: [
    {
      name: "content",
      title: "Conteúdo",
      icon: InfoOutlineIcon,
      default: true,
    },
    {
      name: "layout",
      title: "Opções de Layout",
      icon: ComponentIcon,
    },
    {
      name: "stats",
      title: "Estatísticas",
      icon: BarChartIcon,
    },
  ],
  fields: [
    defineField({
      name: "variant",
      title: "Variante de Layout",
      type: "string",
      group: "layout",
      options: {
        list: [
          { title: "Grade de Estatísticas", value: "grid" },
          { title: "Estatísticas com Conteúdo", value: "withContent" },
        ],
      },
      initialValue: "grid",
    }),
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      description: "Texto a ser exibido no emblema (usado no layout Com Conteúdo)",
      hidden: ({ parent }) => parent?.variant !== "withContent",
      group: "content",
    }),
    defineField({
      name: "contentHeading",
      title: "Título do Conteúdo",
      type: "string",
      description:
        "Título principal para a seção de conteúdo (usado no layout Com Conteúdo)",
      hidden: ({ parent }) => parent?.variant !== "withContent",
      group: "content",
    }),
    defineField({
      name: "contentText",
      title: "Texto do Conteúdo",
      type: "text",
      description:
        "Texto descritivo para a seção de conteúdo (usado no layout Com Conteúdo)",
      rows: 4,
      hidden: ({ parent }) => parent?.variant !== "withContent",
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Título da Seção",
      type: "string",
      description:
        "Título opcional acima das estatísticas (usado no layout Grade de Estatísticas)",
      hidden: ({ parent }) => parent?.variant !== "grid",
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo da Seção",
      type: "text",
      description:
        "Subtítulo opcional acima das estatísticas (usado no layout Grade de Estatísticas)",
      rows: 2,
      hidden: ({ parent }) => parent?.variant !== "grid",
      group: "content",
    }),
    defineField({
      name: "stats",
      title: "Estatísticas",
      type: "array",
      description: "Adicione cartões de estatísticas para exibir métricas",
      group: "stats",
      of: [
        {
          type: "object",
          name: "stat",
          title: "Estatística",
          fields: [
            {
              name: "value",
              title: "Valor",
              type: "string",
              description: "A estatística principal (ex: '500.000', 'R$1052')",
              validation: (rule) => rule.required(),
            },
            {
              name: "label",
              title: "Rótulo",
              type: "string",
              description: "Descrição do que a estatística representa",
              validation: (rule) => rule.required(),
            },
            {
              name: "trendDirection",
              title: "Direção da Tendência",
              type: "string",
              options: {
                list: [
                  { title: "Para Cima", value: "up" },
                  { title: "Para Baixo", value: "down" },
                  { title: "Nenhuma", value: "none" },
                ],
                layout: "radio",
              },
              initialValue: "none",
            },
            {
              name: "trendValue",
              title: "Valor da Tendência",
              type: "string",
              description: "Mudança percentual (ex: '+20.1%', '-2%')",
            },
            {
              name: "color",
              title: "Cor do Ícone",
              type: "string",
              options: {
                list: [
                  { title: "Primária", value: "primary" },
                  { title: "Sucesso", value: "success" },
                  { title: "Aviso", value: "warning" },
                  { title: "Destrutiva", value: "destructive" },
                  { title: "Suave", value: "muted" },
                ],
              },
              initialValue: "primary",
            },
          ],
          preview: {
            select: {
              value: "value",
              label: "label",
              trend: "trendValue",
            },
            prepare({ value, label, trend }) {
              return {
                title: value || "Estatística",
                subtitle: `${label || ""}${trend ? ` (${trend})` : ""}`,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error("Adicione pelo menos uma estatística"),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      statsCount: "stats.length",
      variant: "variant",
    },
    prepare({ title, variant }) {
      return {
        title: title || "Seção de Estatísticas",
        subtitle: `${variant || "grid"}`,
        media: BarChartIcon,
      };
    },
  },
});
