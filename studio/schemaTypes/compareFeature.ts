import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const compareFeature = defineType({
  name: "compareFeature",
  title: "Comparar Característica",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título da Característica",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .error("O título da característica de comparação é obrigatório.")
          .max(80)
          .warning(
            "Títulos de característica concisos são melhores (idealmente < 60 caracteres).",
          ),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 2,
      validation: (rule) =>
        rule
          .max(200)
          .warning(
            "Descrições curtas são mais fáceis de entender na tabela de comparação (idealmente < 150 caracteres).",
          ),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "Comparar Característica",
        subtitle: description
          ? `${description.substring(0, 80)}${description.length > 80 ? "..." : ""}`
          : "Sem descrição",
        media: ComposeIcon,
      };
    },
  },
});
