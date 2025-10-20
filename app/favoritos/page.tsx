"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { UserRecipe } from "@/types/database";

export default function FavoritosPage() {
  const [recipes, setRecipes] = useState<UserRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<UserRecipe | null>(null);

  useEffect(() => {
    loadRecipes();
    
    // Escutar mudanças de autenticação
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadRecipes();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    setError("");
    
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
            <div 
              key={recipe.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)}
            >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecipe(recipe.id);
                    }}
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
            
            {selectedRecipe.image_url && (
              <div className="mb-4">
                <img
                  src={selectedRecipe.image_url}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              {selectedRecipe.is_ai_generated && (
                <div className="badge badge-accent badge-sm">🤖 Gerada por IA</div>
              )}
              {selectedRecipe.servings && (
                <div className="badge badge-outline badge-sm">{selectedRecipe.servings} porções</div>
              )}
            </div>
            <h3 className="font-bold text-2xl mb-3">{selectedRecipe.title}</h3>
            
            {selectedRecipe.description && (
              <p className="text-base opacity-80 mb-4 italic border-l-4 border-primary pl-4">
                {selectedRecipe.description}
              </p>
            )}

            {(selectedRecipe.prep_time || selectedRecipe.cook_time) && (
              <div className="stats shadow mb-4 stats-vertical sm:stats-horizontal w-full">
                {selectedRecipe.prep_time && (
                  <div className="stat place-items-center">
                    <div className="stat-title text-xs">Preparação</div>
                    <div className="stat-value text-primary text-xl">{selectedRecipe.prep_time}</div>
                    <div className="stat-desc text-xs">minutos</div>
                  </div>
                )}
                {selectedRecipe.cook_time && (
                  <div className="stat place-items-center">
                    <div className="stat-title text-xs">Cozedura</div>
                    <div className="stat-value text-secondary text-xl">{selectedRecipe.cook_time}</div>
                    <div className="stat-desc text-xs">minutos</div>
                  </div>
                )}
                {selectedRecipe.prep_time && selectedRecipe.cook_time && (
                  <div className="stat place-items-center">
                    <div className="stat-title text-xs">Total</div>
                    <div className="stat-value text-accent text-xl">{selectedRecipe.prep_time + selectedRecipe.cook_time}</div>
                    <div className="stat-desc text-xs">minutos</div>
                  </div>
                )}
              </div>
            )}

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
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRecipe(selectedRecipe.id);
                  setSelectedRecipe(null);
                }}
                className="btn btn-error gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Eliminar Receita
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
