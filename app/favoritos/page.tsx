"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { UserRecipe } from "@/types/database";

export default function FavoritosPage() {
  const [recipes, setRecipes] = useState<UserRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Precisas de fazer login para ver os teus favoritos!");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("user_recipes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setRecipes(data || []);
    } catch (err: any) {
      console.error("Erro ao carregar receitas:", err);
      setError(err.message || "Erro ao carregar receitas");
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id: string) => {
    if (!confirm("Tens a certeza que queres eliminar esta receita?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from("user_recipes").delete().eq("id", id);

      if (error) throw error;

      setRecipes(recipes.filter((r) => r.id !== id));
    } catch (err: any) {
      alert("Erro ao eliminar receita: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-lg">A carregar receitas...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">⭐ As Minhas Receitas</h1>
        <div className="flex gap-2">
          <Link href="/criar" className="btn btn-primary">
            ➕ Criar Nova
          </Link>
          <Link href="/" className="btn btn-ghost">
            ← Voltar
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {recipes.length === 0 && !loading && !error && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-2xl font-bold mb-2">
            Ainda não tens receitas guardadas
          </h3>
          <p className="text-base-content/70 mb-6">
            Cria a tua primeira receita ou adiciona receitas geradas aos
            favoritos!
          </p>
          <Link href="/criar" className="btn btn-primary">
            ➕ Criar Primeira Receita
          </Link>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-xl">{recipe.title}</h3>
                  {recipe.is_ai_generated && (
                    <div className="badge badge-secondary">IA</div>
                  )}
                </div>

                {recipe.description && (
                  <p className="text-base-content/70 text-sm">
                    {recipe.description}
                  </p>
                )}

                <div className="divider my-2"></div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      📝 Ingredientes:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-base-content/50">
                          +{recipe.ingredients.length - 3} mais...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {recipe.prep_time && (
                      <div className="badge badge-outline badge-sm">
                        ⏱️ {recipe.prep_time}min
                      </div>
                    )}
                    {recipe.cook_time && (
                      <div className="badge badge-outline badge-sm">
                        🔥 {recipe.cook_time}min
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="badge badge-outline badge-sm">
                        👥 {recipe.servings}
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="btn btn-error btn-sm"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
