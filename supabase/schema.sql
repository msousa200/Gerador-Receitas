-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  is_ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_recipes table (for custom recipes)
CREATE TABLE user_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  image_url TEXT,
  is_ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  user_recipe_id UUID REFERENCES user_recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_favorite UNIQUE (user_id, recipe_id, user_recipe_id),
  CONSTRAINT favorite_recipe_check CHECK (
    (recipe_id IS NOT NULL AND user_recipe_id IS NULL) OR
    (recipe_id IS NULL AND user_recipe_id IS NOT NULL)
  )
);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for recipes table (public read, authenticated write)
CREATE POLICY "Anyone can view recipes" ON recipes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert recipes" ON recipes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own recipes" ON recipes
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own recipes" ON recipes
  FOR DELETE USING (auth.uid() = created_by);

-- Policies for user_recipes table
CREATE POLICY "Users can view own recipes" ON user_recipes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recipes" ON user_recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipes" ON user_recipes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes" ON user_recipes
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for favorites table
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX recipes_created_by_idx ON recipes(created_by);
CREATE INDEX recipes_created_at_idx ON recipes(created_at DESC);
CREATE INDEX user_recipes_user_id_idx ON user_recipes(user_id);
CREATE INDEX user_recipes_created_at_idx ON user_recipes(created_at DESC);
CREATE INDEX favorites_user_id_idx ON favorites(user_id);
CREATE INDEX favorites_recipe_id_idx ON favorites(recipe_id);
CREATE INDEX favorites_user_recipe_id_idx ON favorites(user_recipe_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_recipes_updated_at BEFORE UPDATE ON user_recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample recipes
INSERT INTO recipes (title, description, ingredients, instructions, prep_time, cook_time, servings, is_ai_generated) VALUES
('Arroz de Vaca', 'Um prato tradicional português cheio de sabor', 
 ARRAY['500g de vaca cortada em cubos', '2 chávenas de arroz', '1 cebola picada', '2 dentes de alho', '1 folha de louro', 'Sal e pimenta q.b.', '4 chávenas de água'],
 ARRAY['Refogar a cebola e o alho em azeite', 'Adicionar a vaca e deixar dourar', 'Juntar o arroz e envolver bem', 'Adicionar a água, louro, sal e pimenta', 'Cozinhar em lume brando por 20 minutos'],
 15, 25, 4, false),

('Bacalhau à Brás', 'Clássico português com bacalhau desfiado',
 ARRAY['400g de bacalhau desfiado', '500g de batata palha', '4 ovos', '1 cebola', 'Azeitonas pretas', 'Salsa picada', 'Azeite'],
 ARRAY['Demolhar o bacalhau e desfiar', 'Refogar a cebola em azeite', 'Adicionar o bacalhau', 'Juntar a batata palha', 'Adicionar os ovos batidos e mexer', 'Decorar com azeitonas e salsa'],
 20, 15, 4, false),

('Frango Assado com Batatas', 'Frango suculento com batatas douradas',
 ARRAY['1 frango inteiro', '1kg de batatas', '4 dentes de alho', 'Limão', 'Azeite', 'Sal e pimenta', 'Ervas aromáticas'],
 ARRAY['Temperar o frango com sal, pimenta, alho e limão', 'Colocar num tabuleiro com azeite', 'Adicionar as batatas cortadas em gomos', 'Assar a 180°C durante 1 hora', 'Virar ocasionalmente'],
 15, 60, 4, false);
