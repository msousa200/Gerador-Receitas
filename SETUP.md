# 🚀 Guia de Configuração - Gerador de Receitas

Segue este guia passo-a-passo para configurar e executar o projeto.

## 📋 Pré-requisitos Instalados

✅ Node.js 18+ (já instalado)
✅ Git (já instalado)
✅ npm (já instalado)

## 🔧 Passo 1: Configurar Supabase

### 1.1 Criar Conta e Projeto

1. Vai a [https://supabase.com](https://supabase.com)
2. Clica em "Start your project"
3. Faz login com GitHub (recomendado) ou email
4. Clica em "New Project"
5. Preenche:
   - **Name**: Gerador-Receitas (ou outro nome)
   - **Database Password**: Cria uma password forte e **guarda-a**!
   - **Region**: West EU (Ireland) - mais próximo de Portugal
   - **Pricing Plan**: Free
6. Clica em "Create new project"
7. **Aguarda 2-3 minutos** enquanto o projeto é criado

### 1.2 Obter Credenciais

1. No painel do Supabase, vai para **Settings** (ícone engrenagem) no menu lateral
2. Clica em **API** no submenu
3. Copia os seguintes valores:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public** key (uma string longa começando com `eyJ...`)

### 1.3 Criar Tabelas na Base de Dados

1. No painel do Supabase, vai para **SQL Editor** no menu lateral
2. Clica em "New query"
3. Abre o ficheiro `supabase/schema.sql` do projeto
4. **Copia TODO o conteúdo** do ficheiro
5. **Cola no editor SQL** do Supabase
6. Clica em **"Run"** (ou pressiona Ctrl+Enter)
7. Deverás ver "Success. No rows returned" - está perfeito!

### 1.4 Verificar Tabelas

1. Vai para **Table Editor** no menu lateral
2. Deverás ver 3 tabelas criadas:
   - ✅ `recipes`
   - ✅ `user_recipes`
   - ✅ `favorites`

## 🤖 Passo 2: Configurar Groq (IA Gratuita)

### 2.1 Criar Conta

1. Vai a [https://console.groq.com](https://console.groq.com)
2. Clica em "Sign in"
3. Faz login com Google, GitHub ou email
4. Aceita os termos de serviço

### 2.2 Criar API Key

1. No dashboard do Groq, clica em **"API Keys"** no menu lateral
2. Clica em **"Create API Key"**
3. Dá um nome: `gerador-receitas`
4. Clica em "Submit"
5. **⚠️ IMPORTANTE**: Copia a chave IMEDIATAMENTE e guarda-a (não consegues vê-la novamente!)
6. A chave começa com `gsk_...`

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

1. No teu projeto, **renomeia** ou **copia** o ficheiro `.env.local`
2. Abre o ficheiro `.env.local` num editor
3. Substitui os valores placeholder:

```env
# Substitui com o Project URL do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://teu-projeto.supabase.co

# Substitui com a anon key do Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...tua-chave-completa-aqui

# Substitui com a API key do Groq
GROQ_API_KEY=gsk_...tua-chave-groq-aqui
```

4. **Guarda o ficheiro** (Ctrl+S)

## 🎮 Passo 4: Executar o Projeto

### 4.1 Modo de Desenvolvimento

```bash
# Certifica-te que estás na pasta do projeto
cd /home/msousa/Projetos/Gerador_Receitas

# Inicia o servidor de desenvolvimento
npm run dev
```

Deverás ver:
```
▲ Next.js 15.5.6
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 2.3s
```

### 4.2 Abrir no Navegador

1. Abre o teu navegador
2. Vai para [http://localhost:3000](http://localhost:3000)
3. Deverás ver a página inicial do Gerador de Receitas! 🎉

## 🧪 Passo 5: Testar Funcionalidades

### 5.1 Criar Conta

1. Clica em **"Entrar"** no canto superior direito
2. Clica em **"Não tens conta? Cria aqui"**
3. Insere o teu email e uma password
4. Clica em "Criar Conta"
5. **Vai ao teu email** e confirma a conta (verifica spam!)

### 5.2 Fazer Login

1. Volta à página de login
2. Insere o teu email e password
3. Clica em "Entrar"
4. Deverás ser redirecionado para a página de favoritos

### 5.3 Testar Receita Aleatória

1. Na página inicial, clica em **"🎲 Receita Aleatória"**
2. Aguarda alguns segundos enquanto a IA gera uma receita
3. Deverás ver uma receita completa com ingredientes e instruções!
4. Clica em **"🎲 Gerar Nova Receita"** para obter outra

### 5.4 Buscar por Ingredientes

1. Clica em **"🔍 Buscar"** no menu
2. Escreve ingredientes que tens (ex: "frango, arroz, cenoura")
3. Clica em **"🔍 Buscar"**
4. A IA irá gerar uma receita usando esses ingredientes!

### 5.5 Criar Receita Própria

1. Clica em **"➕ Criar"** no menu
2. Preenche o formulário:
   - Título (ex: "Bolo de Chocolate da Avó")
   - Descrição (opcional)
   - Tempo de preparação e cozedura (opcional)
   - **Ingredientes** (clica + para adicionar mais)
   - **Modo de Preparação** (clica + para adicionar passos)
3. Clica em **"✅ Criar Receita"**
4. Serás redirecionado para a página de favoritos

### 5.6 Ver Favoritos

1. Clica em **"⭐ Favoritos"** no menu
2. Deverás ver todas as tuas receitas criadas
3. Podes eliminar receitas clicando em **"🗑️ Eliminar"**

## 🎨 Passo 6: Alterar Tema

1. Clica no **ícone sol/lua** no canto superior direito
2. O tema alterna entre claro e escuro
3. A preferência é guardada no teu navegador

## 🐛 Resolução de Problemas

### Problema: "Cannot find module..."

**Solução**: Reinstala as dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Failed to generate recipe"

**Causa**: Chave do Groq inválida ou limite de requests atingido

**Solução**:
1. Verifica se a `GROQ_API_KEY` no `.env.local` está correta
2. Aguarda alguns minutos (limite de rate pode estar ativo)
3. Cria uma nova API key no Groq se necessário

### Problema: "User is not authenticated" / Erros de base de dados

**Causa**: Credenciais do Supabase incorretas ou tabelas não criadas

**Solução**:
1. Verifica o `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` correto?
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` correto?
2. Vai ao Supabase > Table Editor e confirma que as tabelas existem
3. Se não existirem, executa novamente o `schema.sql` no SQL Editor

### Problema: Build falha

**Solução**:
```bash
# Limpa o cache do Next.js
rm -rf .next

# Faz build novamente
npm run build
```

## 📦 Passo 7: Build de Produção (Opcional)

```bash
# Fazer build otimizado
npm run build

# Executar versão de produção
npm start
```

O build foi **testado e está a funcionar** corretamente! ✅

## 🚢 Passo 8: Deploy na Vercel (Opcional)

1. Vai a [https://vercel.com](https://vercel.com)
2. Faz login com GitHub
3. Clica em "Add New" > "Project"
4. Importa o repositório do GitHub
5. **Adiciona as variáveis de ambiente**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GROQ_API_KEY`
6. Clica em "Deploy"
7. Aguarda 2-3 minutos
8. Projeto online! 🎉

## ✅ Checklist Final

Antes de considerar tudo concluído, verifica:

- [ ] Consigo ver a página inicial em localhost:3000
- [ ] Consigo criar uma conta
- [ ] Consigo fazer login
- [ ] Receita aleatória funciona e gera receitas
- [ ] Busca por ingredientes funciona
- [ ] Consigo criar uma receita própria
- [ ] Consigo ver as minhas receitas nos favoritos
- [ ] Consigo eliminar receitas
- [ ] O tema claro/escuro alterna
- [ ] `npm run build` executa sem erros

## 🎓 Próximos Passos

Agora que tens tudo a funcionar, podes:

1. **Personalizar o design**: Edita `app/globals.css` e os temas do DaisyUI
2. **Adicionar mais features**: Sistema de favoritos para receitas de IA, comentários, etc.
3. **Melhorar a IA**: Ajustar prompts em `app/api/generate/route.ts`
4. **Adicionar imagens**: Integrar com APIs de imagens (Unsplash, etc.)
5. **Criar mais temas**: Adicionar mais temas do DaisyUI
6. **Fazer deploy**: Colocar online na Vercel

## 📞 Suporte

Se tiveres problemas:

1. Revê este guia cuidadosamente
2. Verifica os logs do terminal para erros específicos
3. Consulta a documentação:
   - [Next.js](https://nextjs.org/docs)
   - [Supabase](https://supabase.com/docs)
   - [Groq](https://console.groq.com/docs)
   - [DaisyUI](https://daisyui.com)

---

**Bom desenvolvimento! 🚀**
