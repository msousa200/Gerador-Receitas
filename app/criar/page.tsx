"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CriarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    prep_time: "",
    cook_time: "",
    servings: "",
  });

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: newInstructions });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const supabase = createClient();
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError("Precisas de fazer login primeiro!");
        router.push("/auth/login");
        return;
      }

      // Filter out empty ingredients and instructions
      const ingredients = formData.ingredients.filter((i) => i.trim() !== "");
      const instructions = formData.instructions.filter((i) => i.trim() !== "");

      if (ingredients.length === 0) {
        setError("Adiciona pelo menos um ingrediente!");
        return;
      }

      if (instructions.length === 0) {
        setError("Adiciona pelo menos um passo!");
        return;
      }

      const { error: insertError } = await supabase.from("user_recipes").insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        ingredients,
        instructions,
        prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
        cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
        servings: formData.servings ? parseInt(formData.servings) : null,
        is_ai_generated: false,
      });

      if (insertError) {
        console.error("Erro ao inserir receita:", insertError);
        throw new Error(`Erro ao guardar receita: ${insertError.message}`);
      }

      setSuccess(true);
      // Reset form
      setFormData({
        title: "",
        description: "",
        ingredients: [""],
        instructions: [""],
        prep_time: "",
        cook_time: "",
        servings: "",
      });

      setTimeout(() => {
        router.push("/favoritos");
      }, 2000);
    } catch (err: any) {
      console.error("Erro completo:", err);
      setError(err.message || "Erro ao criar receita. Verifica se a tabela está configurada no Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">➕ Criar Nova Receita</h1>
        <Link href="/" className="btn btn-ghost">
          ← Voltar
        </Link>
      </div>

      {success && (
        <div className="alert alert-success mb-6">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Receita criada com sucesso! A redirecionar...</span>
        </div>
      )}

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Informações Básicas</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Título *</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Bacalhau à Brás"
                className="input input-bordered"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Descrição</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Breve descrição da receita..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Prep (min)</span>
                </label>
                <input
                  type="number"
                  placeholder="15"
                  className="input input-bordered"
                  value={formData.prep_time}
                  onChange={(e) =>
                    setFormData({ ...formData, prep_time: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cozedura (min)</span>
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="input input-bordered"
                  value={formData.cook_time}
                  onChange={(e) =>
                    setFormData({ ...formData, cook_time: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Doses</span>
                </label>
                <input
                  type="number"
                  placeholder="4"
                  className="input input-bordered"
                  value={formData.servings}
                  onChange={(e) =>
                    setFormData({ ...formData, servings: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">📝 Ingredientes *</h2>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: 500g de bacalhau"
                    className="input input-bordered flex-1"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="btn btn-error btn-outline"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="btn btn-outline btn-sm"
              >
                + Adicionar Ingrediente
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">👨‍🍳 Modo de Preparação *</h2>
            <div className="space-y-2">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="badge badge-primary mt-3">{index + 1}</div>
                  <textarea
                    placeholder="Descreve este passo..."
                    className="textarea textarea-bordered flex-1"
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                  ></textarea>
                  {formData.instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="btn btn-error btn-outline"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addInstruction}
                className="btn btn-outline btn-sm"
              >
                + Adicionar Passo
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "✅ Criar Receita"
            )}
          </button>
          <Link href="/" className="btn btn-ghost btn-lg">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
