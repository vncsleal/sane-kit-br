import {
  UserIcon,
  InfoOutlineIcon,
  ComponentIcon,
  CogIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

const showFieldOptions = [
  { title: "Sim", value: "true" },
  { title: "Não", value: "false" },
];

const buttonIconOptions = [
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Telefone", value: "phone" },
  { title: "Nenhum", value: "none" },
];

export const contactSection = defineType({
  name: "contactSection",
  title: "Seção de Contato",
  type: "object",
  icon: UserIcon,
  groups: [
    {
      name: "content",
      title: "Conteúdo",
      icon: InfoOutlineIcon,
      default: true,
    },
    {
      name: "features",
      title: "Recursos",
      icon: ComponentIcon,
    },
    {
      name: "form",
      title: "Configurações do Formulário",
      icon: CogIcon,
    },
  ],
  fields: [
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      initialValue: "Contato",
      validation: (rule) =>
        rule
          .required()
          .error("O texto do emblema é obrigatório.")
          .max(30)
          .warning("Textos de emblema concisos são mais eficazes (idealmente < 20 caracteres)."),
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule.required().error("O título da seção de contato é obrigatório.")
        .max(100).warning("Títulos concisos são melhores (idealmente < 80 caracteres)."),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) =>
        rule
          .max(300)
          .warning("Descrições concisas são mais eficazes (idealmente < 200 caracteres)."),
    }),
    defineField({
      name: "features",
      title: "Recursos",
      type: "array",
      group: "features",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Recurso",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) =>
                rule.required().error("O título do recurso é obrigatório.")
                .max(80).warning("Títulos de recurso concisos são melhores (idealmente < 60 caracteres)."),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              rows: 2,
              validation: (rule) =>
                rule
                  .max(150)
                  .warning("Descrições de recurso concisas são mais eficazes (idealmente < 100 caracteres)."),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
      validation: (rule) =>
        rule.min(1).error("Adicione pelo menos um recurso à seção de contato."),
    }),
    defineField({
      name: "formTitle",
      title: "Título do Formulário",
      type: "string",
      initialValue: "Agende uma reunião",
      group: "form",
      validation: (rule) =>
        rule
          .max(80)
          .warning("Títulos de formulário concisos são melhores (idealmente < 60 caracteres)."),
    }),
    defineField({
      name: "formFields",
      title: "Campos do Formulário",
      type: "object",
      group: "form",
      fields: [
        defineField({
          name: "showDate",
          title: "Mostrar Seletor de Data",
          type: "string",
          options: {
            list: showFieldOptions,
            layout: "radio",
          },
          initialValue: "true",
        }),
        defineField({
          name: "showFirstName",
          title: "Mostrar Campo de Nome",
          type: "string",
          options: {
            list: showFieldOptions,
            layout: "radio",
          },
          initialValue: "true",
        }),
        defineField({
          name: "showLastName",
          title: "Mostrar Campo de Sobrenome",
          type: "string",
          options: {
            list: showFieldOptions,
            layout: "radio",
          },
          initialValue: "true",
        }),
        defineField({
          name: "showFileUpload",
          title: "Mostrar Campo de Upload de Arquivo",
          type: "string",
          options: {
            list: showFieldOptions,
            layout: "radio",
          },
          initialValue: "true",
        }),
        defineField({
          name: "fileUploadLabel",
          title: "Rótulo do Upload de Arquivo",
          type: "string",
          initialValue: "Carregar currículo",
          hidden: ({ parent }) => parent?.showFileUpload === "false",
          validation: (rule) =>
            rule
              .max(50)
              .warning("Rótulos de upload de arquivo devem ser curtos (idealmente < 40 caracteres)."),
        }),
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Texto do Botão",
      type: "string",
      initialValue: "Agendar a reunião",
      validation: (rule) =>
        rule.required().error("O texto do botão do formulário é obrigatório.")
        .max(50).warning("Textos de botão devem ser curtos e diretos (idealmente < 30 caracteres)."),
      group: "form",
    }),
    defineField({
      name: "buttonIcon",
      title: "Ícone do Botão",
      type: "string",
      options: {
        list: buttonIconOptions,
        layout: "radio",
      },
      initialValue: "arrowRight",
      group: "form",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "badgeText",
      featuresCount: "features.length",
    },
    prepare({ title, subtitle}) {
      return {
        title: title || "Seção de Contato",
        subtitle: `${subtitle ? `Emblema: ${subtitle}` : "Seção de contato"}`,
        media: UserIcon,
      };
    },
  },
});
