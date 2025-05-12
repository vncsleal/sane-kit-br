import {
  CreditCardIcon,
  InfoOutlineIcon,
  TagIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Extract options to constants
const HIGHLIGHT_OPTIONS = [
  { title: "Sim", value: "true" },
  { title: "Não", value: "false" },
];

const BUTTON_ICONS = [
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Telefone", value: "phone" },
  { title: "Mais", value: "plus" },
];

const BUTTON_VARIANTS = [
  { title: "Padrão", value: "default" },
  { title: "Contorno", value: "outline" },
  { title: "Secundário", value: "secondary" },
];

export const pricingSection = defineType({
  name: "pricingSection",
  title: "Seção de Preços",
  type: "object",
  icon: CreditCardIcon,
  groups: [
    {
      name: "content",
      title: "Conteúdo da Seção",
      icon: InfoOutlineIcon,
      default: true,
    },
    { name: "plans", title: "Planos de Preços", icon: TagIcon },
  ],
  fields: [
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      initialValue: "Preços",
      group: "content",
      validation: (rule) => 
        rule.max(20).warning("O texto do emblema deve ser curto e conciso"),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) => 
        rule.required().error("O título da seção de preços é obrigatório"),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      rows: 2,
      group: "content",
      validation: (rule) =>
        rule.max(160).warning("O subtítulo deve ser conciso (máximo 160 caracteres)"),
    }),
    defineField({
      name: "plans",
      title: "Planos de Preços",
      type: "array",
      group: "plans",
      of: [
        {
          type: "object",
          name: "plan",
          title: "Plano",
          fields: [
            {
              name: "title",
              title: "Título do Plano",
              type: "string",
              validation: (rule) => 
                rule.required().error("O título do plano é obrigatório"),
            },
            {
              name: "description",
              title: "Descrição do Plano",
              type: "text",
              validation: (rule) =>
                rule.max(300).warning("A descrição do plano deve ser concisa"),
            },
            {
              name: "highlighted",
              title: "Destacar Este Plano",
              type: "string",
              description: "Adicionar estilo extra para destacar este plano",
              options: {
                list: HIGHLIGHT_OPTIONS,
                layout: "radio",
              },
              initialValue: "false",
            },
            {
              name: "price",
              title: "Preço",
              type: "string",
              description: "ex: R$40, Grátis, Consulte-nos",
              validation: (rule) => 
                rule.required().error("O preço do plano é obrigatório"),
            },
            {
              name: "billingPeriod",
              title: "Período de Cobrança",
              type: "string",
              description: "ex: /mês, /ano, /usuário",
              validation: (rule) =>
                rule.max(20).warning("O período de cobrança deve ser conciso"),
            },
            {
              name: "features",
              title: "Recursos",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "feature",
                  title: "Recurso",
                  fields: [
                    {
                      name: "title",
                      title: "Título do Recurso",
                      type: "string",
                      validation: (rule) => 
                        rule.required().error("O título do recurso é obrigatório"),
                    },
                    {
                      name: "description",
                      title: "Descrição do Recurso",
                      type: "text",
                      validation: (rule) =>
                        rule.max(200).warning("A descrição do recurso deve ser concisa"),
                    },
                  ],
                  preview: {
                    select: {
                      title: "title",
                      description: "description",
                    },
                    prepare({ title, description }) {
                      return {
                        title: title || "Recurso sem título",
                        subtitle: description ? `${description.substring(0, 50)}...` : "",
                      };
                    },
                  },
                },
              ],
              validation: (rule) =>
                rule.min(1).error("Adicione pelo menos um recurso"),
            },
            {
              name: "buttonText",
              title: "Texto do Botão",
              type: "string",
              validation: (rule) => 
                rule.required().error("O texto do botão é obrigatório"),
            },
            {
              name: "buttonUrl",
              title: "URL do Botão",
              type: "url",
              validation: (rule) => 
                rule.required().error("A URL do botão é obrigatória")
                .uri({
					allowRelative: true,
                  scheme: ["http", "https", "mailto", "tel"]
                }).error("Formato de URL inválido. Use http://, https://, mailto: ou tel:"),
            },
            {
              name: "buttonIcon",
              title: "Ícone do Botão",
              type: "string",
              options: {
                list: BUTTON_ICONS,
                layout: "radio",
              },
              initialValue: "arrowRight",
            },
            {
              name: "buttonVariant",
              title: "Variante do Botão",
              type: "string",
              options: {
                list: BUTTON_VARIANTS,
                layout: "radio",
              },
              initialValue: "default",
            },
          ],
          preview: {
            select: {
              title: "title",
              price: "price",
            },
            prepare({ title, price }) {
              return {
                title: title || "Plano",
                subtitle: price ? `${price}` : "Sem preço",
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error("Adicione pelo menos um plano de preços"),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      plansCount: "plans.length",
    },
    prepare({ title}) {
      return {
        title: title || "Seção de Preços",
        media: CreditCardIcon,
      };
    },
  },
});
