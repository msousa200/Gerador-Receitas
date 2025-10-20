# 📁 Estrutura do Projeto - Gerador de Receitas

```
Gerador_Receitas/
│
├── 📱 app/                          # App Router do Next.js
│   ├── api/                         # API Routes (Backend)
│   │   └── generate/
│   │       └── route.ts             # API para gerar receitas com Groq IA
│   │
│   ├── auth/                        # Páginas de autenticação
│   │   └── login/
│   │       └── page.tsx             # Login e Sign Up
│   │
│   ├── buscar/
│   │   └── page.tsx                 # 🔍 Busca por ingredientes
│   │
│   ├── criar/
│   │   └── page.tsx                 # ➕ Criar receita personalizada
│   │
│   ├── favoritos/
│   │   └── page.tsx                 # ⭐ Ver receitas guardadas
│   │
│   ├── random/
│   │   └── page.tsx                 # 🎲 Receita aleatória
│   │
│   ├── globals.css                  # Estilos globais + Tailwind + DaisyUI
│   ├── layout.tsx                   # Layout raiz (Navbar, Footer)
│   └── page.tsx                     # Página inicial (Hero)
│
├── 🧩 components/                   # Componentes React reutilizáveis
│   └── Navbar.tsx                   # Barra de navegação
│
├── 📚 lib/                          # Bibliotecas e utilidades
│   └── supabase/
│       ├── client.ts                # Cliente Supabase (browser)
│       └── server.ts                # Cliente Supabase (server)
│
├── 🗄️ supabase/                    # Configuração Supabase
│   └── schema.sql                   # Schema da base de dados (3 tabelas)
│
├── 🎨 types/                        # TypeScript Types
│   └── database.ts                  # Types das tabelas (Recipe, Favorite, etc)
│
├── ⚙️ Ficheiros de Configuração
│   ├── .env.local                   # Variáveis de ambiente (SECRETO!)
│   ├── .env.local.example           # Template das variáveis
│   ├── .gitignore                   # Ficheiros a ignorar no Git
│   ├── next.config.ts               # Configuração do Next.js
│   ├── package.json                 # Dependências e scripts
│   ├── tsconfig.json                # Configuração TypeScript
│   └── next-env.d.ts                # Types do Next.js (auto-gerado)
│
└── 📖 Documentação
    ├── README.md                    # Visão geral do projeto
    └── SETUP.md                     # Guia de configuração passo-a-passo
```

## 🎯 Funcionalidades por Ficheiro

### 📱 Frontend (Páginas)

| Ficheiro | Rota | Descrição |
|----------|------|-----------|
| `app/page.tsx` | `/` | Página inicial com Hero e cards de features |
| `app/random/page.tsx` | `/random` | Gera receita aleatória com IA |
| `app/buscar/page.tsx` | `/buscar` | Busca receitas por ingredientes |
| `app/criar/page.tsx` | `/criar` | Formulário para criar receita própria |
| `app/favoritos/page.tsx` | `/favoritos` | Lista receitas guardadas do utilizador |
| `app/auth/login/page.tsx` | `/auth/login` | Login e Sign Up |

### 🔧 Backend (APIs)

| Ficheiro | Endpoint | Descrição |
|----------|----------|-----------|
| `app/api/generate/route.ts` | `POST /api/generate` | Gera receitas usando Groq (Llama 3.3) |

### 🗄️ Base de Dados (Supabase)

| Tabela | Descrição | RLS |
|--------|-----------|-----|
| `recipes` | Receitas públicas (incluindo IA) | ✅ Public read, Auth write |
| `user_recipes` | Receitas criadas por utilizadores | ✅ Owner only |
| `favorites` | Favoritos dos utilizadores | ✅ Owner only |

## 🔐 Autenticação

- **Supabase Auth**: Email/Password
- **Row Level Security (RLS)**: Ativo em todas as tabelas
- **Políticas**:
  - `recipes`: Qualquer pessoa pode ler, autenticados podem criar
  - `user_recipes`: Apenas o dono pode CRUD
  - `favorites`: Apenas o dono pode CRUD

## 🎨 Styling

- **Tailwind CSS 4**: Framework CSS utility-first
- **DaisyUI 5**: Componentes pré-estilizados
- **Temas**: 7 temas disponíveis (light, dark, cupcake, retro, cyberpunk, valentine, aqua)
- **Responsivo**: Mobile-first design

## 🤖 IA (Groq)

- **Modelo**: Llama 3.3 70B Versatile
- **Uso**: Geração de receitas personalizadas
- **API**: Gratuita com limites generosos
- **Prompts**: Otimizados para culinária portuguesa

## 📦 Dependências Principais

```json
{
  "next": "^15.1.8",                    // Framework React
  "react": "^19.0.0",                   // UI Library
  "@supabase/supabase-js": "^2.48.1",   // Cliente Supabase
  "@supabase/ssr": "^0.6.0",            // SSR para Supabase
  "groq-sdk": "^0.8.0",                 // Cliente Groq
  "tailwindcss": "^4.0.0",              // CSS Framework
  "daisyui": "^5.0.50",                 // Componentes UI
  "typescript": "^5.7.2"                // Type Safety
}
```

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor desenvolvimento (localhost:3000)
npm run build    # Build de produção (otimizado)
npm start        # Inicia servidor produção
npm run lint     # Verifica código com ESLint
```

## 🌐 Rotas da Aplicação

```
/                    → Página inicial (Hero)
/random              → Receita aleatória (IA)
/buscar              → Busca por ingredientes (IA)
/criar               → Criar receita personalizada
/favoritos           → Ver receitas guardadas (requer login)
/auth/login          → Login / Sign Up
/api/generate        → API de geração de receitas (POST)
```

## 📊 Fluxo de Dados

### 1. Receita Aleatória
```
User → /random → fetch /api/generate → Groq IA → JSON → Display
```

### 2. Busca por Ingredientes
```
User → /buscar → input ingredientes → fetch /api/generate → Groq IA → JSON → Display
```

### 3. Criar Receita
```
User → /criar → form → Supabase → user_recipes table → /favoritos
```

### 4. Favoritos
```
User → /favoritos → Supabase query → user_recipes → Display list
```

## 🔑 Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL      # URL do projeto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY # Chave pública do Supabase
GROQ_API_KEY                   # Chave API do Groq (server-side)
```

## 🎭 Estados da Aplicação

- **Loading**: Enquanto aguarda resposta da IA ou DB
- **Error**: Mensagens de erro com alerts DaisyUI
- **Success**: Confirmações com alerts success
- **Empty**: Estados vazios com ilustrações

## 🎨 Componentes DaisyUI Usados

- `navbar` - Barra de navegação
- `hero` - Seção hero da homepage
- `card` - Cards de receitas
- `btn` - Botões
- `input` / `textarea` - Formulários
- `badge` - Tags (IA, tempo, doses)
- `alert` - Mensagens de erro/sucesso
- `loading` - Spinners de carregamento
- `divider` - Divisores
- `swap` - Toggle de tema
- `menu` - Menu dropdown

## 📈 Performance

- **Build Size**: ~100KB First Load JS
- **Static Pages**: 8/10 páginas pré-renderizadas
- **Dynamic**: Apenas `/api/generate`
- **Otimizações**: Image optimization, Code splitting, Tree shaking

## 🔄 Próximas Features (Roadmap)

- [ ] Sistema de favoritos para receitas de IA
- [ ] Avaliações e comentários
- [ ] Partilha de receitas
- [ ] Upload de imagens
- [ ] Conversão de unidades
- [ ] Timer de cozinha
- [ ] Lista de compras
- [ ] Modo offline (PWA)
- [ ] Multi-idioma

---

**Estrutura criada em: 20/10/2025**
**Última atualização: 20/10/2025**
