# 📝 Configuração do Supabase

## Passos para configurar a base de dados

### 1. Criar a tabela no Supabase

1. Vai a https://app.supabase.com
2. Seleciona o teu projeto **mhshmidhhgjebepisavv**
3. No menu lateral, clica em **SQL Editor**
4. Copia e cola o conteúdo do ficheiro `supabase-setup.sql`
5. Clica em **Run** para executar o script

---

### 2. Configurar Autenticação com Email ✉️

Por padrão, o Supabase já está configurado para enviar emails de confirmação!

#### Para ativar confirmação de email (RECOMENDADO):

1. No Supabase, vai a **Authentication > Settings**
2. Certifica-te que **Enable email confirmations** está **ATIVADO** ✅
3. Em **Email Templates**, podes personalizar os emails (opcional)

#### Fluxo de registro com email:
1. Utilizador cria conta com email e password
2. Supabase envia email de confirmação automaticamente
3. Utilizador clica no link no email
4. Conta é confirmada e pode fazer login

**NOTA**: No plano gratuito, o Supabase usa emails genéricos. Para emails personalizados (com o teu domínio), precisas configurar um serviço SMTP nas Settings.

---

### 3. Configurar Google OAuth 🔐

Para permitir login com conta Google:

1. No teu projeto Supabase, vai a **Authentication > Providers**
2. Procura **Google** na lista e clica para expandir
3. Ativa o toggle **Enable Sign in with Google**

#### Obter credenciais do Google:

4. Vai a [Google Cloud Console](https://console.cloud.google.com/)
5. Cria um novo projeto ou seleciona um existente
6. No menu, vai a **APIs & Services > Credentials**
7. Clica em **+ CREATE CREDENTIALS > OAuth 2.0 Client ID**
8. Se for a primeira vez, terás que configurar o **OAuth consent screen**:
   - User Type: **External**
   - App name: **Gerador de Receitas**
   - User support email: (teu email)
   - Developer contact: (teu email)
   - Clica em **Save and Continue** (podes deixar o resto em branco)

9. Agora volta a **Credentials > + CREATE CREDENTIALS > OAuth 2.0 Client ID**
10. Application type: **Web application**
11. Name: **Gerador de Receitas**
12. **Authorized JavaScript origins**: Adiciona:
    ```
    http://localhost:3000
    https://mhshmidhhgjebepisavv.supabase.co
    ```
13. **Authorized redirect URIs**: Adiciona o URL que o Supabase te forneceu:
    ```
    https://mhshmidhhgjebepisavv.supabase.co/auth/v1/callback
    ```
14. Clica em **CREATE**
15. Copia o **Client ID** e **Client Secret**
16. Volta ao Supabase e cola-os em **Authentication > Providers > Google**
17. Clica em **Save**

✅ Pronto! Agora tens login com Google ativado!

---

### 4. Testar os fluxos de autenticação

#### Opção A: Registro com Email
1. Vai a http://localhost:3000/auth/login
2. Clica em "Não tens conta? Cria aqui"
3. Insere email e password
4. Clica em "Criar Conta"
5. ✉️ **Verifica o teu email** (pode ir para spam!)
6. Clica no link de confirmação
7. Volta ao site e faz login

#### Opção B: Login com Google
1. Vai a http://localhost:3000/auth/login
2. Clica em **"Continuar com Google"**
3. Seleciona a tua conta Google
4. Autoriza a aplicação
5. ✅ Login automático!

---

## ✅ Resumo de funcionalidades

Depois de tudo configurado:
- ✅ Registro com email + password (com confirmação por email)
- ✅ Login com email + password
- ✅ Login com Google (OAuth)
- ✅ Proteção de dados (cada utilizador vê apenas as suas receitas)
- ✅ Guardar receitas favoritas
- ✅ Ver e gerir receitas guardadas

---

## 🔑 Credenciais configuradas

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mhshmidhhgjebepisavv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Já estão no ficheiro `.env.local` ✅

---

## 🆘 Problemas comuns

**Email de confirmação não chega?**
- Verifica a pasta de spam
- No plano gratuito do Supabase, pode demorar alguns minutos
- Verifica em Authentication > Users se o utilizador aparece como "unconfirmed"

**Google login não funciona?**
- Certifica-te que adicionaste os redirect URIs corretos
- Verifica se o projeto Google Cloud está ativo
- Confirma que copiaste bem o Client ID e Secret
