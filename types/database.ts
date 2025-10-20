export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  image_url?: string;
  created_by?: string;
  created_at: string;
  is_ai_generated: boolean;
}

export interface Favorite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
  recipe?: Recipe;
}

export interface UserRecipe extends Recipe {
  user_id: string;
}
