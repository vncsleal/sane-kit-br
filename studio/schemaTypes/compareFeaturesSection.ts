import {
  CheckmarkCircleIcon,
  CloseCircleIcon,
  InfoOutlineIcon,
  TagIcon,
  ComposeIcon,
} from "@sanity/icons";
import {
  defineField,
  defineType,
  type ValidationContext,
} from "sanity";

const highlightedOptions = [
  { title: "Sim", value: "true" },
  { title: "Não", value: "false" },
];

const featureValueOptions = [
  { title: "✓ Incluído", value: "true" },
  { title: "✗ Não incluído", value: "false" },
  { title: "Texto Personalizado", value: "custom" },
];

const buttonIconOptions = [
  { title: "Seta para Direita", value: "arrowRight" },
  { title: "Telefone", value: "phone" },
  { title: "Mais", value: "plus" },
];

const buttonVariantOptions = [
  { title: "Padrão", value: "default" },
  { title: "Secundário", value: "secondary" },
  { title: "Contorno", value: "outline" },
  { title: "Fantasma", value: "ghost" },
  { title: "Link", value: "link" },
];

export const compareFeaturesSection = defineType({
  name: "compareFeaturesSection",
  title: "Seção de Comparação de Características",
  type: "object",
  icon: ComposeIcon,
  groups: [
    {
      name: "content",
      title: "Conteúdo",
      icon: InfoOutlineIcon,
      default: true,
    },
    {
      name: "features",
      title: "Características",
      icon: CheckmarkCircleIcon,
    },
    {
      name: "plans",
      title: "Planos",
      icon: TagIcon,
    },
  ],
  fields: [
    defineField({
      name: "badgeText",
      title: "Texto do Emblema",
      type: "string",
      initialValue: "Preços",
      group: "content",
      validation: (rule) =>
        rule
          .max(30)
          .warning("Textos de emblema concisos são mais eficazes (idealmente < 20 caracteres)."),
    }),
    defineField({
      name: "heading",
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule.required().error("O título da seção de comparação é obrigatório."),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      rows: 2,
      group: "content",
      validation: (rule) =>
        rule
          .max(200)
          .warning("Subtítulos concisos são mais eficazes (idealmente < 150 caracteres)."),
    }),
    defineField({
      name: "features",
      title: "Características para Comparar",
      type: "array",
      description: "Selecione características que serão comparadas entre os planos",
      group: "features",
      of: [
        {
          type: "reference",
          to: [{ type: "compareFeature" }],
        },
      ],
      validation: (rule) =>
        rule.min(1).error("Selecione pelo menos uma característica para comparar."),
    }),
    defineField({
      name: "plans",
      title: "Planos para Comparar",
      type: "array",
      group: "plans",
      of: [
        {
          type: "object",
          name: "plan",
          title: "Plano",
          fields: [
            defineField({
              name: "title",
              title: "Título do Plano",
              type: "string",
              validation: (rule) =>
                rule.required().error("O título do plano é obrigatório."),
            }),
            defineField({
              name: "description",
              title: "Descrição do Plano",
              type: "text",
              rows: 3,
              validation: (rule) =>
                rule
                  .max(250)
                  .warning("Descrições de plano concisas são recomendadas (idealmente < 200 caracteres)."),
            }),
            defineField({
              name: "price",
              title: "Preço",
              type: "string",
              description: "ex: R$40, Grátis, Entre em Contato",
              validation: (rule) =>
                rule.required().error("O preço do plano é obrigatório."),
            }),
            defineField({
              name: "billingPeriod",
              title: "Período de Cobrança",
              type: "string",
              description: "ex: /mês, /ano, /usuário",
              validation: (rule) =>
                rule
                  .max(20)
                  .warning("Períodos de cobrança devem ser curtos (ex: '/mês')."),
            }),
            defineField({
              name: "highlighted",
              title: "Destacar Este Plano",
              type: "string",
              description: "Adicionar estilo extra para destacar este plano",
              options: {
                list: highlightedOptions,
                layout: "radio",
              },
              initialValue: "false",
            }),
            defineField({
              name: "featureValues",
              title: "Valores das Características",
              type: "array",
              description:
                "Defina o status ou valor de cada característica para este plano.",
              of: [
                {
                  type: "object",
                  name: "featureValue",
                  title: "Valor da Característica",
                  fields: [
                    defineField({
                      name: "featureRef",
                      title: "Característica",
                      type: "reference",
                      to: [{ type: "compareFeature" }],
                      validation: (rule) =>
                        rule.required().error("A referência à característica é obrigatória."),
                      options: {
                        filter: ({ document, parent }) => {
                          if (!document || !Array.isArray(parent)) {
                            return { filter: "" };
                          }

                          const existingRefs = parent
                            .filter(item => {
                              return item && typeof item === 'object' && 
                                     'featureRef' in item && 
                                     item.featureRef && 
                                     typeof item.featureRef === 'object' && 
                                     '_ref' in item.featureRef;
                            })
                            .map(item => {
                              const typedItem = item as { featureRef: { _ref: string } };
                              return typedItem.featureRef._ref;
                            });

                          return {
                            filter: existingRefs.length > 0 ? "!(_id in $existingRefs)" : "",
                            params: { existingRefs },
                          };
                        },
                      },
                    }),
                    defineField({
                      name: "value",
                      title: "Status / Valor",
                      type: "string",
                      description:
                        "Selecione o status ou forneça um valor personalizado para esta característica.",
                      options: {
                        list: featureValueOptions,
                        layout: "radio",
                      },
                      initialValue: "true",
                      validation: (rule) =>
                        rule.required().error("O valor/status da característica é obrigatório."),
                    }),
                    defineField({
                      name: "customText",
                      title: "Texto Personalizado",
                      type: "string",
                      description:
                        "Insira o texto personalizado (ex: '5 usuários', 'Suporte básico') se estiver usando o status 'Texto Personalizado'.",
                      hidden: ({ parent }) => parent?.value !== "custom",
                      validation: (rule) =>
                        rule
                          .max(100)
                          .warning("Textos personalizados concisos são mais eficazes (idealmente < 70 caracteres)."),
                    }),
                  ],
                  preview: {
                    select: {
                      featureTitle: "featureRef.title",
                      value: "value",
                      customText: "customText",
                    },
                    prepare({ featureTitle, value, customText }) {
                      let subtitle = "";
                      let media = InfoOutlineIcon;

                      const selectedOption = featureValueOptions.find(opt => opt.value === value);

                      if (selectedOption) {
                        subtitle = selectedOption.title;
                        if (value === "true") media = CheckmarkCircleIcon;
                        else if (value === "false") media = CloseCircleIcon;
                        else if (value === "custom") subtitle = customText || selectedOption.title;
                      } else {
                        subtitle = customText || "Valor não especificado";
                      }

                      return {
                        title: featureTitle || "Característica",
                        subtitle: subtitle,
                        media: media,
                      };
                    },
                  },
                },
              ],
              validation: (rule) =>
                rule
                  .required()
                  .min(1)
                  .error("Defina o valor para pelo menos uma característica.")
                  .unique()
                  .custom((featureValues, context: ValidationContext) => {
                    const pageBuilder = context.document
                      ?.pageBuilder as unknown;
                    const currentPath = context.path;

                    if (
                      !Array.isArray(pageBuilder) ||
                      !currentPath ||
                      currentPath.length < 2
                    ) {
                      return true;
                    }

                    const parentPathSegment = currentPath[1];
                    const parentSectionKey =
                      typeof parentPathSegment === "object" &&
                      parentPathSegment !== null &&
                      "_key" in parentPathSegment
                        ? parentPathSegment._key
                        : undefined;

                    if (!parentSectionKey) {
                      return true;
                    }

                    const parentSection = pageBuilder.find(
                      (
                        section: unknown,
                      ): section is {
                        _key?: string;
                        _type?: string;
                        features?: { _ref: string }[];
                      } =>
                        typeof section === "object" &&
                        section !== null &&
                        "_key" in section &&
                        section._key === parentSectionKey,
                    );

                    const allFeaturesRefs =
                      parentSection?.features?.map((f) => f._ref) || [];

                    if (allFeaturesRefs.length === 0) return true;

                    const definedFeatureRefs = (
                      featureValues as
                        | { featureRef?: { _ref: string } }[]
                        | undefined
                    )?.map((fv) => fv.featureRef?._ref);

                    const missingRefs = allFeaturesRefs.filter(
                      (ref) => !definedFeatureRefs?.includes(ref),
                    );

                    if (missingRefs.length > 0) {
                      return `Valores ausentes para algumas características. Por favor, defina um status/valor para todas as características listadas na aba 'Características para Comparar'. Refs de características ausentes: ${missingRefs.join(", ")}`;
                    }

                    const refs = definedFeatureRefs?.filter(
                      Boolean,
                    ) as string[];
                    if (new Set(refs).size !== refs.length) {
                      return "Cada característica só pode ser listada uma vez por plano.";
                    }

                    return true;
                  }),
            }),
            defineField({
              name: "buttonText",
              title: "Texto do Botão",
              type: "string",
              validation: (rule) =>
                rule.required().error("O texto do botão é obrigatório.")
                .max(40).warning("Textos de botão devem ser curtos e diretos (idealmente < 30 caracteres)."),
            }),
            defineField({
              name: "buttonUrl",
              title: "URL do Botão",
              type: "url",
              validation: (rule) =>
                rule.required().error("A URL do botão é obrigatória.")
                .uri({ allowRelative: true, scheme: ['http', 'https'] }).error("Forneça uma URL válida (http ou https)."),
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
            }),
            defineField({
              name: "buttonVariant",
              title: "Variante do Botão",
              type: "string",
              options: {
                list: buttonVariantOptions,
              },
              initialValue: "default",
            }),
          ],
          preview: {
            select: {
              title: "title",
              price: "price",
              highlighted: "highlighted",
            },
            prepare({ title, price, highlighted }) {
              return {
                title: `${highlighted === "true" ? "🌟 " : ""}${title || "Plano"}`,
                subtitle: price ? `${price}` : "Sem preço",
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.min(1).error("Adicione pelo menos um plano para comparação."),
    }),
    defineField({
      name: "footnote",
      title: "Nota de Rodapé",
      type: "text",
      rows: 2,
      description:
        "Texto opcional de nota de rodapé na parte inferior da tabela de comparação",
      group: "content",
      validation: (rule) =>
        rule
          .max(300)
          .warning("Notas de rodapé concisas são preferíveis (idealmente < 200 caracteres)."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      plansCount: "plans.length",
      featuresCount: "features.length",
    },
    prepare({ title }) {
      return {
        title: title || "Seção de Comparação de Características",
        media: ComposeIcon,
      };
    },
  },
});
