import {
  MenuIcon,
  InfoOutlineIcon,
  ComponentIcon,
  LinkIcon,
} from "@sanity/icons";
import { defineField, defineType, type Reference, type ValidationContext } from "sanity";

const footerVariants = [
  { title: "Simples", value: "simple" },
  { title: "Mínimo", value: "minimal" },
  { title: "Minúsculo", value: "tiny" },
];

export const footer = defineType({
  name: "footer",
  title: "Rodapé",
  type: "document",
  icon: MenuIcon,
  groups: [
    {
      name: "basic",
      title: "Informações Básicas",
      icon: InfoOutlineIcon,
      default: true,
    },
    {
      name: "appearance",
      title: "Aparência",
      icon: ComponentIcon,
    },
    {
      name: "content",
      title: "Conteúdo",
      icon: MenuIcon,
    },
    {
      name: "navigation",
      title: "Navegação",
      icon: LinkIcon,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nome do Site",
      type: "string",
      description: "O nome exibido no rodapé",
      validation: (rule) =>
        rule.required().error("O nome do site no rodapé é obrigatório."),
      group: "basic",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Faça upload de um logo para exibir em vez do nome do site. Se nenhum logo for fornecido, o texto do nome do site será usado.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
          description: "Importante para SEO e acessibilidade",
          validation: (rule) =>
            rule.custom((value, context: ValidationContext) => {
              const parent = context.parent as { asset?: Reference };
              if (parent?.asset && !value) {
                return "O texto alternativo é obrigatório se uma imagem de logo for fornecida.";
              }
              return true;
            }),
        }),
      ],
      group: "basic",
    }),
    defineField({
      name: "variant",
      title: "Variante de Layout",
      type: "string",
      options: {
        list: footerVariants,
        layout: "radio", 
      },
      initialValue: "simple",
      group: "appearance",
    }),
    defineField({
      name: "description",
      title: "Descrição do Rodapé",
      type: "text",
      description: "Uma breve descrição ou tagline para o rodapé",
      rows: 2,
      group: "content",
      validation: (rule) =>
        rule
          .max(200)
          .warning(
            "Descrições de rodapé concisas são mais eficazes (idealmente < 150 caracteres).",
          ),
    }),
    defineField({
      name: "address",
      title: "Linhas de Endereço",
      type: "array",
      of: [{ type: "string" }],
      description: "Insira o endereço linha por linha",
      group: "content",
    }),
    defineField({
      name: "legalLinks",
      title: "Links Legais",
      type: "array",
      group: "navigation",
      of: [
        defineField({
          type: "object",
          name: "link",
          title: "Link",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) =>
                rule.required().error("O título do link legal é obrigatório."),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url", 
              validation: (rule) =>
                rule
                  .required()
                  .error("A URL do link legal é obrigatória.")
                  .uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  })
                  .error(
                    "Forneça uma URL válida ou um link relativo (ex: /privacidade).",
                  ),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "url",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Link Legal",
                subtitle: subtitle || "URL não definida",
                media: LinkIcon,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "navigationItems",
      title: "Itens de Navegação",
      type: "array",
      group: "navigation",
      of: [
        defineField({
          type: "object",
          name: "navigationItem",
          title: "Item de Navegação",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .error("O título do item de navegação é obrigatório."),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "url", 
              description: "Deixe em branco para categorias sem links diretos",
              validation: (rule) =>
                rule
                  .uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  })
                  .error(
                    "Forneça uma URL válida ou um link relativo (ex: /produtos).",
                  ),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              description: "Descrição opcional para esta categoria",
              validation: (rule) =>
                rule
                  .max(150)
                  .warning(
                    "Descrições de categoria concisas são melhores (idealmente < 100 caracteres).",
                  ),
            }),
            defineField({
              name: "items",
              title: "Sub Links",
              type: "array",
              description: "Adicione links sob esta categoria",
              of: [
                defineField({
                  type: "object",
                  name: "subItem",
                  title: "Sub Item",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Título",
                      type: "string",
                      validation: (rule) =>
                        rule
                          .required()
                          .error("O título do sub-link é obrigatório."),
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      type: "url", 
                      validation: (rule) =>
                        rule
                          .required()
                          .error("O link do sub-item é obrigatório.")
                          .uri({
                            allowRelative: true,
                            scheme: ["http", "https", "mailto", "tel"],
                          })
                          .error(
                            "Forneça uma URL válida ou um link relativo.",
                          ),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      subtitle: "href",
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || "Sub Link",
                        subtitle: subtitle || "Link não definido",
                        media: LinkIcon,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "href",
              itemCount: "items.length",
            },
            prepare({ title, subtitle}) {
              return {
                title: title || "Item de Navegação",
                subtitle: `${subtitle || "Sem link direto"}`,
                media: MenuIcon,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
    },
    prepare({ title, variant }) {
      const selectedVariant = footerVariants.find((v) => v.value === variant);
      const variantTitle = selectedVariant ? selectedVariant.title : variant;
      return {
        title: title || "Rodapé do Site",
        subtitle: `Variante: ${variantTitle || "padrão"}`,
        media: MenuIcon,
      };
    },
  },
});
