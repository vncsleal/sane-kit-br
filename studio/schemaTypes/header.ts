import {
  MenuIcon,
  InfoOutlineIcon,
  ComponentIcon,
  LinkIcon,
} from "@sanity/icons";
import { defineField, defineType, type ValidationContext, type Reference } from "sanity";

const headerVariants = [
  { title: "Padrão", value: "default" },
  { title: "Centralizado", value: "centered" },
  { title: "Mínimo", value: "minimal" },
  { title: "Transparente", value: "transparent" },
];

const buttonVariants = [
  { title: "Padrão", value: "default" },
  { title: "Contorno", value: "outline" },
  { title: "Secundário", value: "secondary" },
  { title: "Fantasma", value: "ghost" },
  { title: "Link", value: "link" },
];

export const header = defineType({
  name: "header",
  title: "Cabeçalho",
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
      name: "navigation",
      title: "Navegação",
      icon: MenuIcon,
    },
    {
      name: "actions",
      title: "Ações",
      icon: LinkIcon,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nome do Site",
      type: "string",
      description: "O nome exibido no cabeçalho",
      validation: (rule) =>
        rule.required().error("O nome do site no cabeçalho é obrigatório."),
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
      description: "Selecione o estilo de layout do cabeçalho",
      options: {
        list: headerVariants,
        layout: "radio",
      },
      initialValue: "default",
      group: "appearance",
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
              description: "Deixe em branco para menus suspensos",
              validation: (rule) =>
                rule
                  .uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  })
                  .error("Forneça uma URL válida ou um link relativo."),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              description: "Exibido em menus suspensos",
              validation: (rule) =>
                rule
                  .max(150)
                  .warning(
                    "Descrições concisas são melhores para menus suspensos (idealmente < 100 caracteres).",
                  ),
            }),
            defineField({
              name: "items",
              title: "Itens Suspensos",
              type: "array",
              description: "Itens para mostrar no menu suspenso",
              of: [
                defineField({
                  type: "object",
                  name: "subItem",
                  title: "Subitem",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Título",
                      type: "string",
                      validation: (rule) =>
                        rule.required().error("O título do subitem é obrigatório."),
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      type: "url",
                      validation: (rule) =>
                        rule
                          .required()
                          .error("O link do subitem é obrigatório.")
                          .uri({
                            allowRelative: true,
                            scheme: ["http", "https", "mailto", "tel"],
                          })
                          .error(
                            "Forneça uma URL válida ou um link relativo para o subitem.",
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
                        title: title || "Subitem",
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
              href: "href",
              itemCount: "items.length",
            },
            prepare({ title, href, itemCount = 0 }) {
              const isDropdown = itemCount > 0;
              return {
                title: title || "Item de Navegação",
                subtitle: isDropdown
                  ? `Suspenso com ${itemCount} item${itemCount === 1 ? "" : "s"}`
                  : href
                    ? `Link para: ${href}`
                    : "Sem link (apenas suspenso)",
                media: MenuIcon,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaButtons",
      title: "Botões CTA",
      type: "array",
      description: "Botões exibidos no cabeçalho",
      group: "actions",
      of: [
        defineField({
          type: "object",
          name: "button",
          title: "Botão",
          fields: [
            defineField({
              name: "label",
              title: "Rótulo do Botão",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .error("O rótulo do botão CTA é obrigatório.")
                  .max(30)
                  .warning(
                    "Rótulos de botão concisos são mais eficazes (idealmente < 20 caracteres).",
                  ),
            }),
            defineField({
              name: "url",
              title: "URL do Botão",
              type: "url",
              validation: (rule) =>
                rule
                  .required()
                  .error("A URL do botão CTA é obrigatória.")
                  .uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  })
                  .error("Forneça uma URL válida ou um link relativo para o botão CTA."),
            }),
            defineField({
              name: "variant",
              title: "Estilo do Botão",
              type: "string",
              options: {
                list: buttonVariants,
              },
              initialValue: "default",
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
                title: title || "Botão CTA",
                subtitle: `${variantTitle || "Padrão"} | ${subtitle || "URL não definida"}`,
                media: LinkIcon,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "dropdownCTALabel",
      title: "Rótulo do Botão CTA Suspenso",
      type: "string",
      description:
        "Rótulo para o botão de chamada para ação exibido em menus suspensos",
      initialValue: "Agende uma ligação hoje",
      group: "actions",
      validation: (rule) =>
        rule
          .max(40)
          .warning(
            "Rótulos de CTA suspenso concisos são melhores (idealmente < 30 caracteres).",
          ),
    }),
    defineField({
      name: "dropdownCTAUrl",
      title: "URL do Botão CTA Suspenso",
      type: "url",
      description: "URL para o botão de chamada para ação exibido em menus suspensos",
      initialValue: "/contato",
      group: "actions",
      validation: (rule) =>
        rule
          .uri({
            allowRelative: true,
            scheme: ["http", "https", "mailto", "tel"],
          })
          .error("Forneça uma URL válida ou um link relativo para o CTA suspenso."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
      itemCount: "navigationItems.length",
    },
    prepare({ title, variant}) {
      const selectedVariant = headerVariants.find(v => v.value === variant);
      const variantTitle = selectedVariant ? selectedVariant.title : variant;
      return {
        title: title || "Cabeçalho do Site",
        subtitle: `${variantTitle || "Padrão"}`,
        media: MenuIcon,
      };
    },
  },
});
