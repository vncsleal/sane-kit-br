# Sane-Kit: Template Inicial Next.js & Sanity

[![Next.js](https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js)](https://nextjs.org/) [![Sanity](https://img.shields.io/badge/Sanity-20232A?style=for-the-badge&logo=sanity&logoColor=F97316)](https://www.sanity.io/) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=319795)](https://tailwindcss.com/) [![Shadcn](https://img.shields.io/badge/shadcn/ui-20232A?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBjbGFzcz0iaC02IHctNiI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9Im5vbmUiPjwvcmVjdD48bGluZSB4MT0iMjA4IiB5MT0iMTI4IiB4Mj0iMTI4IiB5Mj0iMjA4IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiPjwvbGluZT48bGluZSB4MT0iMTkyIiB5MT0iNDAiIHgyPSI0MCIgeTI9IjE5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMyIj48L2xpbmU+PC9zdmc+&logoColor=ffffff)](https://ui.shadcn.com/)

<!-- Opcional: Adicione um link para sua demonstração -->
<!-- [Demo](YOUR_DEMO_URL) -->

<!-- Opcional: Adicione uma captura de tela -->
<!-- ![Captura de tela do Sane-Kit](YOUR_SCREENSHOT_URL) -->

Um template inicial rico em recursos combinando Next.js 15 (com Turbopack) para o frontend e Sanity v3 para o CMS de backend. Projetado para desenvolvimento rápido com componentes pré-construídos.

Este template utiliza componentes inspirados pelo [TWBlocks](https://twblocks.com/) (construído com Shadcn/ui e Tailwind CSS) para uma interface moderna e personalizável. O idioma padrão de todo o projeto é Português Brasileiro.

## Recursos

- **Construtor de Página Abrangente**: Crie páginas complexas com mais de 12 tipos de seções pré-construídas
- **Biblioteca de Componentes Poderosa**: Componentes responsivos e ricos em recursos para todos os padrões comuns de UI
- **Schema Totalmente Tipado**: Definições completas de TypeScript para todos os tipos de schema do Sanity
- **Framework de UI Moderno**: Construído com componentes Shadcn/ui e Tailwind CSS
- **Analytics Integrado**: Google Analytics e PostHog integrados para rastreamento abrangente de usuários
- **Performance Otimizada**: Next.js App Router e Turbopack para builds rápidos de desenvolvimento e produção
- **Otimizado para SEO**: Metadados estruturados, suporte a OpenGraph e mais

## Componentes de Seção Pré-construídos

O kit inclui os seguintes tipos de seções para construir páginas:

- **Seções de Hero**: Múltiplas variantes incluindo Banner com Botões, Banner com Badges e Galeria em Grid
- **Seções de Recursos**: 9 variantes de layout (Padrão, Com Imagem, Imagem à Esquerda/Direita, Cards de Imagem, etc.)
- **Seções de Blog**: Exiba seus posts de blog com múltiplas opções de layout
- **Seções de Estatísticas**: Exiba métricas-chave e estatísticas com indicadores de tendência
- **Depoimentos**: Apresente depoimentos de clientes com várias opções de exibição
- **Seções de Preços**: Crie planos de preços com comparações de recursos
- **CTA (Chamadas para Ação)**: Engaje usuários com botões de ação proeminentes
- **Seções de FAQ**: Seções organizadas de perguntas e respostas
- **Cases/Logos**: Exiba logotipos de clientes ou estudos de caso
- **Comparação de Recursos**: Crie tabelas detalhadas de comparação de recursos
- **Seções de Contato**: Formulários com campos e validação personalizáveis
- **Seções de Newsletter**: Formulários de inscrição por e-mail com múltiplas variantes

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) 15 (App Router & Turbopack)
  - [React](https://reactjs.org/) 18
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - Componentes [Shadcn/ui](https://ui.shadcn.com/)
  - Designs de Componentes [TWBlocks](https://twblocks.com/)
  - [next-sanity](https://www.sanity.io/docs/connect-your-content-to-next-js) para integração com Sanity
  - [PostHog](https://posthog.com/) para análise de produtos
  - [Google Analytics](https://analytics.google.com/) para insights de tráfego do site
- **Studio (CMS):**
  - [Sanity](https://www.sanity.io/) v3
  - [TypeScript](https://www.typescriptlang.org/)
  - [Styled Components](https://styled-components.com/)

## Estrutura de Pastas

```plaintext
├── frontend/          # Aplicação frontend Next.js 15
├── studio/            # Sanity Studio v3
└── package.json       # Configuração do workspace raiz
```

## Introdução

### 1. Clone o Repositório

Clone o repositório do template para sua máquina local:

```bash
git clone https://github.com/vncsleal/sane-kit.git
cd sane-kit
```

### 2. Instale as Dependências

Instale as dependências para todo o monorepo a partir do diretório raiz:

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` no diretório `frontend` (`frontend/.env.local`) com as seguintes variáveis:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID="SEU_ID_DE_PROJETO"
NEXT_PUBLIC_SANITY_DATASET="production" # ou o nome do seu dataset
# Opcional: Adicione um token de leitura para rascunhos, se necessário para visualização prévia
# SANITY_API_READ_TOKEN="SEU_TOKEN_DE_LEITURA"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX" # Seu ID de medição do Google Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_XXXXXXXXXXXX" # Sua chave de API do projeto PostHog
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com" # Ou a URL da sua instância PostHog auto-hospedada
```

Substitua os valores de espaço reservado por seus IDs de projeto e chaves de API reais. Você pode encontrar seu ID de projeto Sanity nas configurações do seu projeto Sanity ou executando `sanity manage` no diretório `studio`.

### 4. Execute os Servidores de Desenvolvimento

Inicie tanto o frontend Next.js quanto os servidores de desenvolvimento do Sanity Studio simultaneamente a partir do diretório raiz:

```bash
npm run dev
```

- Seu aplicativo Next.js estará rodando em [http://localhost:3000](http://localhost:3000)
- Seu Sanity Studio estará rodando em [http://localhost:3333](http://localhost:3333) (ou na porta especificada no `package.json` raiz)

Faça login no Studio usando sua conta Sanity.

## Gerenciamento de Conteúdo

### Construção de Páginas

1. Crie novas páginas no Sanity Studio adicionando novos documentos de Página
2. Use o campo Page Builder para construir sua página com vários componentes de seção
3. Cada tipo de seção oferece múltiplas variantes e opções de personalização
4. Crie componentes reutilizáveis como Headers e Footers que podem ser compartilhados entre páginas



## Deploy

### Deploy do Studio

Para fazer deploy do seu Sanity Studio:

1.  Certifique-se de estar logado em sua conta Sanity:
    ```bash
    cd studio
    npx sanity login
    ```
2.  Faça o deploy do studio a partir do diretório raiz:
    ```bash
    npm run deploy:studio
    ```

### Deploy do Frontend (Exemplo: Vercel)

1.  Envie seu código para um provedor Git (por exemplo, GitHub).
2.  Crie um [novo projeto Vercel](https://vercel.com/new) e conecte-o ao seu repositório Git.
3.  **Importante:** Defina o **Diretório Raiz** nas configurações do projeto Vercel como `frontend`.
4.  Adicione as variáveis de ambiente de `frontend/.env.local` às configurações do seu projeto Vercel (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` e `SANITY_API_READ_TOKEN` se utilizado).
5.  Clique em Deploy!

### Configure o CORS

Lembre-se de adicionar a URL do seu frontend publicado (por exemplo, `https://your-app.vercel.app`) às configurações de origens CORS do seu projeto Sanity no console de gerenciamento do Sanity ([sanity.io/manage](https://sanity.io/manage)).

## Resumo das Variáveis de Ambiente

Localizadas em `frontend/.env.example`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Seu ID de projeto Sanity.
- `NEXT_PUBLIC_SANITY_DATASET`: Nome do seu dataset Sanity (por exemplo, `production`).
- `SANITY_API_READ_TOKEN` (Opcional): Seu token de leitura da API Sanity, necessário para buscar conteúdo de rascunho se você implementar a funcionalidade de visualização prévia.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Seu ID de medição do Google Analytics.
- `NEXT_PUBLIC_POSTHOG_KEY`: Sua chave de API do projeto PostHog.
- `NEXT_PUBLIC_POSTHOG_HOST`: A URL da sua instância PostHog (o padrão é https://app.posthog.com).

## Capacidades de Analytics

O Sane-Kit vem com implementações tanto do Google Analytics quanto do PostHog:

### Google Analytics
- Rastreamento de visualização de página em todo o seu site
- Capacidades de rastreamento de eventos
- Configurado para conformidade com privacidade
- Compatível com Google Analytics 4 (GA4)

### PostHog
- Plataforma de analytics de código aberto
- Recursos de feature flags e testes A/B
- Gravações de sessão e mapas de calor
- Identificação de usuário e rastreamento de propriedades personalizadas
- Auto-hospedável para propriedade completa dos dados

Para desativar qualquer plataforma de analytics, simplesmente remova as variáveis de ambiente correspondentes ou defina-as como strings vazias.

## Contribuindo

Contribuições são bem-vindas! Por favor, consulte as diretrizes de contribuição (se disponíveis) ou abra uma issue/pull request.

## Licença

Este projeto está licenciado sob o arquivo [LICENSE](./LICENSE).
