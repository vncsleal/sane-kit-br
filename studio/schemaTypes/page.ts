import {
  DocumentIcon,
  InfoOutlineIcon,
  EarthGlobeIcon,
  StackCompactIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Página",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "basic",
      title: "Informações Básicas",
      icon: InfoOutlineIcon,
      default: true,
    },
    {
      name: "seo",
      title: "SEO & Compartilhamento",
      icon: EarthGlobeIcon,
    },
    {
      name: "content",
      title: "Conteúdo da Página",
      icon: StackCompactIcon,
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => 
        rule.required().error("O título da página é obrigatório")
        .max(70).warning("Títulos muito longos podem ser truncados em resultados de busca"),
      group: "basic",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => 
        rule.required().error("O slug é necessário para gerar a URL da página"),
      group: "basic",
    }),
    defineField({
      name: "description",
      title: "Meta Descrição",
      type: "text",
      description:
        "Esta descrição aparece nos resultados de pesquisa e visualizações de mídia social",
      group: "seo",
      validation: (rule) => 
        rule.max(160).warning("Descrições acima de 160 caracteres podem ser truncadas em resultados de busca"),
    }),
    defineField({
      name: "ogImage",
      title: "Imagem para Mídia Social",
      type: "image",
      description: "Imagem para compartilhamento em mídias sociais (Facebook, Twitter, etc.)",
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
      group: "seo",
    }),
    defineField({
      name: "pageBuilder",
      title: "Construtor de Páginas",
      type: "array",
      description: "Adicione e organize seções para construir sua página",
      group: "content",
      of: [
        { type: "heroSection" },
        { type: "casesSection" },
        { type: "testimonialsSection" },
        { type: "pricingSection" },
        { type: "compareFeaturesSection" },
        { type: "statsSection" },
        { type: "ctaSection" },
        { type: "faqSection" },
        { type: "featureSection" },
        { type: "blogSection" },
        { type: "contactSection" },
        { type: "newsletterSection" },
      ],
      validation: (rule) => 
        rule.min(1).error("Adicione pelo menos uma seção à página"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      description: "description",
    },
    prepare({ title, slug, description }) {
      return {
        title: title || "Página Sem Título",
        subtitle: `/${slug || ""} - ${description || "Sem descrição"}`,
        media: DocumentIcon,
      };
    },
  },
});
