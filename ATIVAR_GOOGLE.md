# 🔐 Como Ativar Login com Google (5 minutos)

## ⚠️ Erro: "provider is not enabled"
Isto significa que o Google OAuth não está ativado no Supabase. Vamos ativar!

---

## 🚀 Passo a Passo RÁPIDO

### 1️⃣ Ativar no Supabase (1 min)
1. Vai a https://app.supabase.com
2. Abre o teu projeto: **mhshmidhhgjebepisavv**
3. Menu lateral: **Authentication > Providers**
4. Procura **Google** na lista
5. Clica para expandir
6. Liga o toggle **"Enable Sign in with Google"**
7. **NÃO CLIQUES EM SAVE AINDA!** Precisas das credenciais do Google primeiro

---

### 2️⃣ Criar credenciais no Google (3 min)

#### A. Criar projeto Google Cloud
1. Vai a https://console.cloud.google.com/
2. Clica no dropdown do projeto (topo) → **"New Project"**
3. Nome: **Gerador de Receitas**
4. Clica **"Create"**
5. Espera 10 segundos e seleciona o novo projeto

#### B. Configurar OAuth Consent Screen
1. Menu lateral: **APIs & Services > OAuth consent screen**
2. Escolhe: **External**
3. Clica **"Create"**
4. Preenche:
   - App name: **Gerador de Receitas**
   - User support email: **(teu email)**
   - Developer contact: **(teu email)**
5. Clica **"Save and Continue"** 3x (deixa resto em branco)
6. Clica **"Back to Dashboard"**

#### C. Criar OAuth Client ID
1. Menu lateral: **APIs & Services > Credentials**
2. Clica **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Application type: **Web application**
4. Name: **Gerador de Receitas Web**
5. **Authorized JavaScript origins**: Adiciona estas 2 linhas:
   ```
   http://localhost:3000
   https://mhshmidhhgjebepisavv.supabase.co
   ```
6. **Authorized redirect URIs**: Adiciona esta linha:
   ```
   https://mhshmidhhgjebepisavv.supabase.co/auth/v1/callback
   ```
7. Clica **"CREATE"**
8. 🎉 Vai aparecer um popup com:
   - **Client ID** (começa com algo como `123456789-abc...apps.googleusercontent.com`)
   - **Client Secret** (tipo `GOCSPX-...`)
9. **COPIA AMBOS!**

---

### 3️⃣ Voltar ao Supabase e configurar (30 seg)
1. Volta a https://app.supabase.com
2. **Authentication > Providers > Google**
3. Cola:
   - **Client ID** no campo "Client ID"
   - **Client Secret** no campo "Client Secret"
4. Clica **"Save"**

---

## ✅ PRONTO! Testa agora:

1. Vai a http://localhost:3000/auth/login
2. Clica **"Continuar com Google"**
3. Escolhe a tua conta Google
4. Autoriza
5. 🎉 Login automático!

---

## 🆘 Problemas?

### Erro "redirect_uri_mismatch"
- Volta ao Google Cloud Console
- Verifica que adicionaste EXATAMENTE este URI:
  ```
  https://mhshmidhhgjebepisavv.supabase.co/auth/v1/callback
  ```

### Erro "access_denied"
- Normal na primeira vez
- Tenta novamente, deve funcionar

### Continua a dar "provider is not enabled"
- Certifica-te que clicaste **"Save"** no Supabase
- Refresh na página do login
- Tenta novamente

---

## 📝 Resumo do que fizeste:
✅ Ativaste Google OAuth no Supabase  
✅ Criaste projeto no Google Cloud  
✅ Configuraste OAuth consent screen  
✅ Geraste Client ID e Secret  
✅ Ligaste tudo no Supabase  

**Agora tens 2 opções de login**: Email + Password OU Google! 🚀
