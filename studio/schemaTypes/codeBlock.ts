import { CodeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Bloco de Código",
  type: "object",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: "Título opcional para este trecho de código",
      validation: (rule) =>
        rule
          .max(80)
          .warning("Um título conciso é recomendado (idealmente < 80 caracteres)."),
    }),
    defineField({
      name: "code",
      title: "Código",
      type: "code",
      options: {
        language: "typescript",
        languageAlternatives: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "SCSS", value: "scss" },
          { title: "JSX", value: "jsx" },
          { title: "TSX", value: "tsx" },
          { title: "Shell", value: "shell" },
          { title: "Markdown", value: "markdown" },
          { title: "JSON", value: "json" },
          { title: "Python", value: "python" },
          { title: "Ruby", value: "ruby" },
          { title: "PHP", value: "php" },
          { title: "Go", value: "go" },
          { title: "Java", value: "java" },
          { title: "C", value: "c" },
          { title: "C++", value: "cpp" },
          { title: "C#", value: "csharp" },
          { title: "Texto Simples", value: "text" },
        ],
        withFilename: true,
      },
      validation: (rule) =>
        rule.required().error("O campo de código não pode estar vazio."),
    }),
    defineField({
      name: "highlightLines",
      title: "Destacar Linhas",
      type: "string",
      description:
        "Lista de números de linha ou intervalos separados por vírgula (ex: 1,3,5-8)",
    }),
    defineField({
      name: "showLineNumbers",
      title: "Mostrar Números das Linhas",
      type: "string",
      options: {
        list: [
          { title: "Sim", value: "true" },
          { title: "Não", value: "false" },
        ],
        layout: "radio",
      },
      initialValue: "true",
    }),
    defineField({
      name: "caption",
      title: "Legenda",
      type: "string",
      description:
        "Texto de legenda opcional para exibir abaixo do bloco de código",
      validation: (rule) =>
        rule
          .max(150)
          .warning("Legendas concisas são mais eficazes (idealmente < 100 caracteres)."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      code: "code",
    },
    prepare({ title, code }) {
      const language = code?.language || "text";
      const shortCode = code?.code
        ? code.code.length > 50
          ? `${code.code.slice(0, 50)}...`
          : code.code
        : "";
      return {
        title: title || "Bloco de Código",
        subtitle: `${language}: ${shortCode}`,
        media: CodeIcon,
      };
    },
  },
});
