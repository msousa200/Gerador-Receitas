# 🚀 Guia Rápido - Autenticação

## Como criar conta e fazer login

### Opção 1: 📧 Email e Password

**Vantagens:**
- ✅ Mais controlo sobre os teus dados
- ✅ Não depende de serviços externos
- ✅ Email de confirmação para segurança extra

**Passos:**
1. Clica em "Não tens conta? Cria aqui"
2. Insere o teu email e uma password (mínimo 6 caracteres)
3. Clica em "Criar Conta"
4. **IMPORTANTE**: Vai ao teu email e procura por email do Supabase
   - ⚠️ Pode estar no spam/lixo!
5. Clica no link de confirmação
6. Volta ao site e faz login com email + password

---

### Opção 2: 🔐 Login com Google

**Vantagens:**
- ✅ Mais rápido (1 clique!)
- ✅ Não precisas lembrar-te de outra password
- ✅ Confirmação automática (não precisa de email)

**Passos:**
1. Clica em "Continuar com Google"
2. Seleciona a tua conta Google
3. Autoriza a aplicação
4. Pronto! Login automático ✨

**NOTA**: Para ativar o Google login, segue as instruções no ficheiro `SUPABASE_README.md`

---

## 🆘 Problemas?

### "Email not confirmed"
- Verifica o teu email (incluindo spam)
- Pode demorar 1-2 minutos a chegar
- Se não chegou, tenta criar conta novamente

### "Invalid login credentials"
- Confirma que o email e password estão corretos
- Certifica-te que confirmaste o email primeiro

### "Google login não funciona"
- O administrador precisa configurar o Google OAuth
- Usa email + password enquanto isso

---

## 🔒 Segurança

- ✅ Passwords encriptadas
- ✅ Cada utilizador vê apenas as suas receitas
- ✅ Proteção Row Level Security (RLS)
- ✅ Tokens de autenticação seguros
