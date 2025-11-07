
# 🚀 Task Pilot - Gerenciamento de Prazos PJe

O Task Pilot é uma aplicação moderna construída com Next.js (App Router) e TypeScript, projetada para simplificar a vida de advogados e escritórios jurídicos, automatizando a busca e o agendamento de comunicações e prazos diretamente do sistema PJe (Processo Judicial Eletrônico).

---

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **Arquitetura Baseada em Features (Feature-Based Architecture)**, onde o código é organizado por funcionalidade de negócio (Feature) e não por tipo de arquivo (`/components`, `/pages`).

### Estrutura de Pastas

```
/task-pilot-app
├── app/                  # Rotas e Layouts do Next.js
│   ├── (main)/           # Grupo de rotas principais (Landing Page)
│   ├── widget/           # Rota da funcionalidade embedável
│   └── layout.tsx        # Layouts e Metadata globais
├── features/             # Onde reside a lógica de negócio (Features)
│   ├── landing-page/     # Feature: Home, Benefícios, Clientes, etc.
│   │   ├── components/
│   │   └── data.tsx
│   ├── search-widget/    # Feature: Formulário de Busca, Lógica de API, Hook
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── api.ts
├── lib/                  # Utilitários e Helpers (ICS, Utils, Constantes)
│   ├── ics.ts
│   ├── constants.ts
│   └── utils.ts
├── public/               # Assets estáticos (imagens, favicon, etc.)
├── components/           # Componentes UI/Layout reusáveis globalmente (Ex: Footer)
└── types/                # Tipos TypeScript Globais (Ex: ProcessoResumo)
```

---

## 📦 Features Principais

O projeto é dividido nas seguintes funcionalidades de negócio:

### 1\. 🏡 Landing Page (`/app/(main)`)

* Página inicial, responsável pela apresentação do produto.
* Consome dados estáticos de `/features/landing-page/data.tsx`.
* Monta a interface de usuário com seções (Hero, Clientes, Benefícios, etc.).

### 2\. 🔍 Search Widget (Componente Principal da Busca)

* **Lógica Centralizada:** A busca é controlada pelo *Custom Hook* `useTaskSearch.ts`.
* **Estado e Side Effects:** O hook gerencia o estado do formulário, a persistência de OAB em *cookies* e o estado da busca (`IDLE`, `LOADING`, `RESULTS`, `ERROR`).
* **Comunicação com API:** A lógica de `fetch` está isolada em `/features/search-widget/api.ts` e trata dos parâmetros e erros específicos da API PJe.

### 3\. 🧩 Widget Embedável (`/app/widget/embed`)

* Rota simplificada, isolada do layout principal, que permite que o `TaskSearchForm` seja carregado via `<iframe>` em websites externos.

---

## 🛠️ Configuração e Instalação

### Pré-requisitos

* Node.js (versão 18+)
* npm ou yarn

### Início Rápido

1. **Clone o repositório:**

   ```bash
   git clone [SEU REPOSITÓRIO] task-pilot
   cd task-pilot
   ```
2. **Instale as dependências:**

   ```bash
   npm install
   # ou yarn install
   ```
3. **Inicie o servidor de desenvolvimento:**
   Use o flag `--no-turbo` se encontrar erros internos do Turbopack (compilador experimental).

   ```bash
   npm run dev -- --no-turbo
   ```

O aplicativo estará disponível em: **`http://localhost:3000`**

---

## ⚙️ Notas Técnicas Importantes

* **Tipagem Forte:** O projeto utiliza TypeScript e toda a comunicação de dados é fortemente tipada (tipos globais em `/types`).
* **Aliases de Caminho:** É altamente recomendado configurar e usar Path Aliases (`@/features`, `@/lib`, etc.) no `tsconfig.json` para evitar problemas com caminhos relativos (`../../..`) no Next.js App Router.
* **API Base:** A URL base da API do PJe está definida em `/lib/constants.ts` para fácil manutenção.

---

## 📧 Contato

Para dúvidas, sugestões ou contribuições, entre em contato com [Seu Nome/Time de Desenvolvimento].
