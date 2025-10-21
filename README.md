# wishlist - Aplicação de Wishlist de Produtos

Este repositório contém uma aplicação full-stack simples para demonstrar um catálogo de produtos e uma funcionalidade de "wishlist" (lista de desejos).

## Estrutura do projeto (detalhada)

Abaixo há uma visão mais completa da estrutura do repositório, com os arquivos e pastas mais relevantes para desenvolvimento, testes e deploy.

```
.
├── docker-compose.yml          # orquestra front + api para desenvolvimento/local
├── wishlist-api/                # Backend (Node.js + Express, TypeScript)
│   ├── Dockerfile               # Dockerfile usado atualmente para dev
│   ├── package.json             # scripts: dev, build, start, test, lint, etc.
│   ├── tsconfig.json
│   ├── jest.config.ts
│   ├── src/
│   │   ├── index.ts             # ponto de entrada do servidor (registra rotas, porta default = 3000)
│   │   ├── routes/
│   │   │   └── products.ts      # rota GET /products que serve o fixture JSON
│   │   ├── data/
│   │   │   └── mock-products.json  # fixture usado em desenvolvimento e testes
│   │   └── utils/               # helpers/utis do backend (se houver)
│   └── __tests__/products.test.ts # testes de integração e validação do contrato
├── wishlist-front/              # Frontend (React + Vite, TypeScript)
│   ├── package.json             # scripts: dev, build, test, cypress, lint...
│   ├── vite.config.ts
│   ├── tsconfig.*
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.tsx             # bootstrap da aplicação
│   │   ├── App.tsx              # definição de rotas ("/" e "/wishlist")
│   │   ├── pages/
│   │   │   ├── Home/            # página inicial (lista de produtos)
│   │   │   └── Wishlist/        # página de itens salvos
│   │   ├── components/          # componentes reutilizáveis (ProductCard, NavBar, etc.)
│   │   ├── services/            # chamadas à API (api.ts) e lógica de produtos
│   │   ├── hooks/               # hooks customizados (useProducts, useWishlist)
│   │   ├── utils/               # formatters e normalização de dados
│   │   └── types/               # tipos e DTOs (ex.: Product, ProductsResponse)
│   ├── cypress/                 # testes E2E (fluxos e fixtures)
│   ├── Dockerfile               # Dockerfile usado atualmente para dev
│   └── __tests__/               # testes unitários de componentes
└── README.md
```

## Tecnologias utilizadas

### Backend
- Node.js + Express
- TypeScript
- Jest + Supertest para testes (integração/contrato)
- ESLint, Prettier para qualidade de código

### Frontend
- React 19 (via Vite)
- React Router
- Axios para chamadas HTTP
- SASS (SCSS) para estilos
- Jest + React Testing Library para testes de componentes
- Cypress para testes E2E

## Pré-requisitos

- Node.js (recomendado v18+)
- npm

## Como começar (desenvolvimento local)

1. Clone o repositório:
	```powershell
	git clone <repo-url>
	cd wishlist
	```

2. Iniciar o backend (API):
	```powershell
	cd wishlist-api
	npm install
	npm run dev
	```

	O backend roda por padrão em http://localhost:3000 e expõe a rota `GET /products`.

3. Iniciar o frontend (aplicação):
	```powershell
	cd wishlist-front
	npm install
	npm run dev
	```

	O Vite roda por padrão em http://localhost:5173. A aplicação front busca a API usando a variável de ambiente `VITE_API_BASE_URL` (padrão: `http://localhost:3000`).

> Dica: abra dois terminais — um para o backend e outro para o frontend — para desenvolver localmente.

## Executando com Docker (docker-compose)

Este repositório já inclui um arquivo `docker-compose.yml` na raiz que orquestra dois serviços:

- `api`  — builda e expõe o backend na porta 3000
- `front` — builda e expõe o frontend (Vite) na porta 5173

Comandos úteis (PowerShell):

```powershell
# build e subir os serviços em background
docker compose up --build -d

# seguir logs (ex.: front ou api)
docker compose logs -f front
docker compose logs -f api

# parar e remover containers
docker compose down
```

URLs após o compose subir os serviços:

- Frontend: http://localhost:5173
- API: http://localhost:3000 (endpoint principal: `/products`)


## Executando testes

### Backend

No diretório `wishlist-api`:

```powershell
npm run test
```

### Frontend

No diretório `wishlist-front`:

```powershell
npm run test            # Jest + Testing Library
npm run test:coverage   # Relatório de cobertura
```

E2E (Cypress):

```powershell
npm run cypress:open    # Abrir runner interativo
```

## Documentação da API

- GET /products
  - Retorna um objeto com metadados e um array `products` (fixture em `wishlist-api/src/data/mock-products.json`).
  - Estrutura resumida:
	 - `total` (number)
	 - `pageSize` (number)
	 - `totalPages` (number)
	 - `products` (array de objetos com campos como `code`, `name`, `priceInCents`, `salePriceInCents`, `rating`, `image`, `stockAvailable`, `details`)

## Decisões de desenvolvimento

1. Separação clara entre front e backend para facilitar desenvolvimento independente e deploy separado.
2. Frontend normaliza dados recebidos da API (`src/utils/formatters.ts`) e trata erros com estados de UI (loading, empty, erro).
3. Wishlist persistida em `localStorage` para manter estado entre recarregamentos sem necessidade de autenticação.
4. Estratégia de testes:
	- Backend: testes de integração/contrato com Jest + Supertest.
	- Frontend: testes unitários de componentes com Jest + React Testing Library e testes E2E com Cypress para fluxos principais.