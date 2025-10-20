# 🍳 Gerador de Receitas

Uma aplicação web moderna para descobrir, criar e guardar receitas. Nunca mais fiques sem saber o que comer!

## ✨ Funcionalidades

- 🎲 **Receitas Aleatórias**: Descobre receitas surpresa geradas por IA
- 🔍 **Busca por Ingredientes**: Encontra receitas baseadas nos ingredientes que tens em casa
- ⭐ **Favoritos**: Guarda as tuas receitas preferidas
- ➕ **Criar Receitas**: Cria e guarda as tuas próprias receitas
- 🤖 **IA Integrada**: Usa Groq AI para gerar receitas personalizadas
- 🎨 **Temas**: Alterna entre modo claro e escuro
- 📱 **Responsivo**: Funciona perfeitamente em todos os dispositivos

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **Backend**: Next.js API Routes
- **Base de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **IA**: Groq (LLM gratuito)
- **Hospedagem**: Vercel

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com)
- Chave API do [Groq](https://console.groq.com)
- Conta no [Vercel](https://vercel.com) (para deploy)

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/msousa200/Gerador-Receitas.git
cd Gerador-Receitas
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Supabase

1. Cria um novo projeto no [Supabase](https://supabase.com)
2. Vai para o SQL Editor e executa o ficheiro `supabase/schema.sql`
3. Copia o URL do projeto e a chave `anon` public

### 4. Configure as variáveis de ambiente

Cria um ficheiro `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

Para obter a chave do Groq:
1. Vai a [https://console.groq.com](https://console.groq.com)
2. Cria uma conta (gratuita)
3. Vai para API Keys e cria uma nova chave

### 5. Execute em modo de desenvolvimento

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no teu navegador.

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🚢 Deploy na Vercel

1. Push do código para GitHub
2. Importa o projeto na [Vercel](https://vercel.com)
3. Adiciona as variáveis de ambiente no painel da Vercel
4. Deploy automático!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/msousa200/Gerador-Receitas)

## 📁 Estrutura do Projeto

```
Gerador-Receitas/
├── app/
│   ├── api/              # API Routes
│   │   └── generate/     # Gerar receitas com IA
│   ├── auth/             # Páginas de autenticação
│   │   └── login/        # Login e Sign Up
│   ├── buscar/           # Busca por ingredientes
│   ├── criar/            # Criar receita
│   ├── favoritos/        # Favoritos do utilizador
│   ├── random/           # Receita aleatória
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── components/
│   └── Navbar.tsx        # Componente de navegação
├── lib/
│   └── supabase/         # Cliente Supabase
├── types/
│   └── database.ts       # Tipos TypeScript
├── supabase/
│   └── schema.sql        # Schema da base de dados
├── public/
│   └── favicon.svg       # Ícone do site
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md             # Este ficheiro
└── SETUP.md              # Guia detalhado de configuração
```

## 🎨 Temas DaisyUI Disponíveis

O projeto vem configurado com vários temas:
- `light` (padrão)
- `dark`
- `cupcake`
- `retro`
- `cyberpunk`
- `valentine`
- `aqua`

## 🔐 Autenticação

A autenticação é gerida pelo Supabase Auth. Os utilizadores podem:
- ✅ Criar conta com email/password (com confirmação por email)
- ✅ Fazer login com email/password
- ✅ Login com Google OAuth (opcional, requer configuração)

Para configurar o Google OAuth, consulta o ficheiro `SETUP.md`.

## 📊 Base de Dados

O schema inclui as seguintes tabelas:
- `user_recipes`: Receitas criadas pelos utilizadores (incluindo favoritos de IA)
  - Suporta tanto receitas personalizadas como receitas geradas por IA que foram guardadas

Todas as tabelas têm Row Level Security (RLS) ativado para proteger os dados dos utilizadores.

## 🤖 Integração com IA

A aplicação usa o Groq para gerar receitas. O Groq oferece:
- ✅ API gratuita
- ✅ Modelos rápidos (Llama, Mixtral)
- ✅ Boa qualidade de respostas

## 📝 Funcionalidades Futuras

- [ ] Sistema de categorias e tags
- [ ] Filtros avançados (tempo, dificuldade)
- [ ] Avaliações e comentários
- [ ] Partilha de receitas
- [ ] Lista de compras automática
- [ ] Modo offline (PWA)
- [ ] Conversão de unidades
- [ ] Tradução multi-idioma
- [ ] Upload de imagens personalizadas

## 🐛 Reportar Bugs

Encontraste um bug? [Abre uma issue no GitHub](https://github.com/msousa200/Gerador-Receitas/issues)!

## 📄 Licença

MIT

## 👨‍💻 Autor

Feito com ❤️ e 🍳 por [msousa200](https://github.com/msousa200)

---

**Nota**: Este projeto foi desenvolvido como demonstração. Sinta-se livre para usar, modificar e contribuir!
