"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RandomPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savingToFavorites, setSavingToFavorites] = useState(false);
  const router = useRouter();

  const generateRandomRecipes = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "random", count: 8 }),
      });

      if (!response.ok) {
        throw new Error("Falha ao gerar receitas");
      }

      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      setError("Erro ao gerar receitas. Tenta novamente!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRandomRecipes();
  }, []);

  const addToFavorites = async (recipe: Recipe) => {
    setSavingToFavorites(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Precisas de fazer login para adicionar aos favoritos!");
        router.push("/auth/login");
        return;
      }

      const { error: insertError } = await supabase.from("user_recipes").insert({
        user_id: user.id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        image_url: recipe.image_url,
        is_ai_generated: true,
      });

      if (insertError) throw insertError;

      alert("✅ Receita adicionada aos favoritos!");
      setSelectedRecipe(null);
    } catch (err: any) {
      console.error("Erro ao adicionar aos favoritos:", err);
      alert("Erro ao adicionar aos favoritos: " + err.message);
    } finally {
      setSavingToFavorites(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="badge badge-primary badge-sm mb-3 animate-pulse">✨ IA Generativa</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Receitas Aleatórias
          </h1>
          <p className="text-base md:text-lg opacity-70 mb-4">Deixe a IA surpreender você com receitas únicas!</p>
          
          <button 
            onClick={generateRandomRecipes}
            className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {loading ? "Gerando..." : "Gerar 8 Novas Receitas"}
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse"></div>
            </div>
            <p className="mt-4 text-lg font-medium animate-pulse">Gerando receitas mágicas... ✨</p>
            <p className="text-xs opacity-60 mt-2">Powered by Groq AI</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        {recipes.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe, index) => (
              <div 
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <figure className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl">🍽️</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="badge badge-primary badge-sm">🤖 IA</div>
                  </div>
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg line-clamp-2">{recipe.title}</h2>
                  <p className="text-sm opacity-70 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex gap-2 mt-2 text-xs">
                    <div className="badge badge-outline badge-sm">
                      ⏱️ {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
                    </div>
                    <div className="badge badge-outline badge-sm">
                      👥 {recipe.servings} porções
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end mt-3">
                    <button className="btn btn-primary btn-sm btn-block">
                      Ver Receita
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para mostrar receita completa */}
      {selectedRecipe && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
            <form method="dialog">
              <button 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setSelectedRecipe(null)}
              >✕</button>
            </form>
            
            <div className="mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg h-64 flex items-center justify-center">
              <div className="text-8xl">🍽️</div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="badge badge-accent badge-sm">🤖 Gerada por IA</div>
              <div className="badge badge-outline badge-sm">{selectedRecipe.servings} porções</div>
            </div>
            <h3 className="font-bold text-2xl mb-3">{selectedRecipe.title}</h3>
            
            {selectedRecipe.description && (
              <p className="text-base opacity-80 mb-4 italic border-l-4 border-primary pl-4">
                {selectedRecipe.description}
              </p>
            )}

            <div className="stats shadow mb-4 stats-vertical sm:stats-horizontal w-full">
              <div className="stat place-items-center">
                <div className="stat-title text-xs">Preparação</div>
                <div className="stat-value text-primary text-xl">{selectedRecipe.prep_time}</div>
                <div className="stat-desc text-xs">minutos</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-xs">Cozedura</div>
                <div className="stat-value text-secondary text-xl">{selectedRecipe.cook_time}</div>
                <div className="stat-desc text-xs">minutos</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-xs">Total</div>
                <div className="stat-value text-accent text-xl">{(selectedRecipe.prep_time || 0) + (selectedRecipe.cook_time || 0)}</div>
                <div className="stat-desc text-xs">minutos</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Ingredientes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-base-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Modo de Preparação
              </h4>
              <div className="space-y-3">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="badge badge-sm badge-primary shrink-0">{index + 1}</div>
                    <p className="text-sm leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-outline gap-2"
                onClick={() => setSelectedRecipe(null)}
              >
                Fechar
              </button>
              <button 
                className="btn btn-primary gap-2"
                onClick={() => addToFavorites(selectedRecipe)}
                disabled={savingToFavorites}
              >
                {savingToFavorites ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    A guardar...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    Adicionar aos Favoritos
                  </>
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedRecipe(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
