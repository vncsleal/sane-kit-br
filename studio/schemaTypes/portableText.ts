import { DocumentTextIcon } from "@sanity/icons";
import { defineType, defineArrayMember } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Conteúdo",
  type: "array",
  icon: DocumentTextIcon,
  of: [
    defineArrayMember({
      type: "block",
      title: "Bloco",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Título 1", value: "h1" },
        { title: "Título 2", value: "h2" },
        { title: "Título 3", value: "h3" },
        { title: "Título 4", value: "h4" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Marcadores", value: "bullet" },
        { title: "Numeração", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Ênfase", value: "em" },
          { title: "Código", value: "code" },
          { title: "Sublinhado", value: "underline" },
          { title: "Riscado", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [            {
              name: "href",
              type: "url",
              title: "URL",
              validation: (rule) => 
                rule.required().error("A URL do link é obrigatória")
                .uri({
					allowRelative: true,
                  scheme: ["http", "https", "mailto", "tel"]
                }).error("Formato de URL inválido. Use http://, https://, mailto: ou tel:"),
            },
              {
                name: "blank",
                title: "Abrir em nova aba",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "codeBlock",
      title: "Bloco de Código",
    }),
    defineArrayMember({
      type: "image",
      title: "Imagem",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          validation: (rule) => 
            rule.required().error("O texto alternativo é obrigatório para acessibilidade"),
        },
        {
          name: "caption",
          type: "string",
          title: "Legenda",
        },
      ],
      options: {
        hotspot: true,
      },
    }),
  ],
});
