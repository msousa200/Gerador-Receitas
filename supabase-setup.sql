-- Script de configuração do Supabase para o Gerador de Receitas
-- Execute este script no SQL Editor do Supabase

-- ============================================
-- CONFIGURAÇÃO DE AUTENTICAÇÃO
-- ============================================
-- IMPORTANTE: Depois de executar este script:
-- 1. Vai a Authentication > Providers
-- 2. Ativa "Google" se quiseres login com Google
-- 3. Em Authentication > Settings:
--    - MANTÉM "Enable email confirmations" ATIVADO
--    - Configura o "Email Templates" se quiseres personalizar
-- ============================================

-- Criar tabela para receitas dos utilizadores
CREATE TABLE IF NOT EXISTS user_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  difficulty TEXT,
  image_url TEXT,
  is_ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS user_recipes_user_id_idx ON user_recipes(user_id);
CREATE INDEX IF NOT EXISTS user_recipes_created_at_idx ON user_recipes(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_recipes ENABLE ROW LEVEL SECURITY;

-- Remover policies antigas se existirem (para poder recriar)
DROP POLICY IF EXISTS "Users can view own recipes" ON user_recipes;
DROP POLICY IF EXISTS "Users can insert own recipes" ON user_recipes;
DROP POLICY IF EXISTS "Users can update own recipes" ON user_recipes;
DROP POLICY IF EXISTS "Users can delete own recipes" ON user_recipes;

-- Política: Utilizadores podem ver apenas as suas próprias receitas
CREATE POLICY "Users can view own recipes"
  ON user_recipes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Utilizadores podem inserir as suas próprias receitas
CREATE POLICY "Users can insert own recipes"
  ON user_recipes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Utilizadores podem atualizar as suas próprias receitas
CREATE POLICY "Users can update own recipes"
  ON user_recipes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Utilizadores podem eliminar as suas próprias receitas
CREATE POLICY "Users can delete own recipes"
  ON user_recipes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Remover trigger antigo se existir
DROP TRIGGER IF EXISTS update_user_recipes_updated_at ON user_recipes;

CREATE TRIGGER update_user_recipes_updated_at
  BEFORE UPDATE ON user_recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
