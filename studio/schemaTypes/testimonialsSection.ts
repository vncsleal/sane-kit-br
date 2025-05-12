import {
  StarIcon,
  InfoOutlineIcon,
  UsersIcon,
  ComponentIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Extract option lists to constants
const TESTIMONIAL_VARIANTS = [
  { title: "Carrossel", value: "carousel" },
  { title: "Grade", value: "grid" },
  { title: "Grade Masonry", value: "masonry-grid" },
];

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Seção de Depoimentos",
  type: "object",
  icon: StarIcon,
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
      name: "quotes",
      title: "Depoimentos",
      icon: UsersIcon,
    },
  ],
  fields: [
    defineField({
      name: "variant",
      title: "Variante",
      type: "string",
      group: "appearance",
      options: {
        list: TESTIMONIAL_VARIANTS,
        layout: "radio", // Use radio layout for fewer than 5 options
      },
      initialValue: "carousel",
      validation: (rule) => 
        rule.required().error("Por favor escolha uma variante para a seção de depoimentos"),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) => 
        rule.required().error("O título da seção de depoimentos é obrigatório"),
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
      name: "testimonials",
      title: "Depoimentos",
      type: "array",
      group: "quotes",
      of: [
        {
          type: "object",
          name: "testimonial",
          title: "Depoimento",
          fields: [
            {
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) => 
                rule.required().error("O título do depoimento é obrigatório"),
            },
            {
              name: "content",
              title: "Conteúdo",
              type: "text",
              rows: 3,
              validation: (rule) => 
                rule.required().error("O conteúdo do depoimento é obrigatório")
                .max(500).warning("Depoimentos muito longos podem prejudicar o layout"),
            },
            {
              name: "author",
              title: "Nome do Autor",
              type: "string",
              validation: (rule) => 
                rule.required().error("O nome do autor do depoimento é obrigatório"),
            },
            {
              name: "role",
              title: "Cargo/Empresa do Autor",
              type: "string",
              validation: (rule) => 
                rule.max(100).warning("Cargo/Empresa deve ser conciso"),
            },
            {
              name: "avatar",
              title: "Avatar do Autor",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Texto Alternativo",
                  type: "string",
                  validation: (rule) => 
                    rule.required().error("O texto alternativo é obrigatório para acessibilidade"),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "author",
              media: "avatar",
              content: "content"
            },
            prepare({ title, subtitle, media, content }) {
              return {
                title: title || "Depoimento sem título",
                subtitle: subtitle ? `${subtitle} - ${content?.substring(0, 30)}...` : "Sem autor",
                media: media || StarIcon,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error("Adicione pelo menos um depoimento"),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      testimonialCount: "testimonials.length",
      variant: "variant",
    },
    prepare({ title, variant }) {
      return {
        title: title || "Seção de Depoimentos",
        subtitle: `Variante: ${variant || "carousel"}`,
        media: StarIcon,
      };
    },
  },
});
