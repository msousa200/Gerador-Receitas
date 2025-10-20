import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Tipos de pratos portugueses para garantir variedade
const recipeTypes = [
  "Bacalhau (à Brás, com natas, espiritual, etc.)",
  "Carne (cozido, rojões, picanha, bife)",
  "Frango (assado, grelhado, piri-piri)",
  "Porco (à alentejana, febras, costeletas)",
  "Peixe (caldeirada, sardinhas, robalo)",
  "Marisco (arroz de marisco, ameijoas, polvo)",
  "Sopas (caldo verde, açorda, gaspacho)",
  "Doces (pastéis de nata, arroz doce, toucinho do céu)"
];

// Função para gerar uma receita única com variedade
async function generateSingleRecipe(
  type: string,
  ingredients?: string,
  index?: number
): Promise<any> {
  let prompt = "";

  if (type === "random") {
    // Selecionar tipo de prato baseado no índice para garantir variedade
    const recipeType = recipeTypes[index! % recipeTypes.length];
    
    prompt = `Gera uma receita portuguesa do tipo: ${recipeType}. Tem que ser ÚNICA e DIFERENTE.
    
    IMPORTANTE: Cria uma receita CRIATIVA e ORIGINAL deste tipo. Não repitas nomes ou ideias.
    
    Responde APENAS em formato JSON válido com a seguinte estrutura:
    {
      "title": "nome criativo e único da receita",
      "description": "descrição apetitosa e detalhada (2-3 frases)",
      "category": "categoria (bacalhau/frango/porco/peixe/marisco/sopa/doce)",
      "ingredients": ["ingrediente com quantidade 1", "ingrediente com quantidade 2", ...],
      "instructions": ["passo detalhado 1", "passo detalhado 2", ...],
      "prep_time": tempo de preparação em minutos (número),
      "cook_time": tempo de cozedura em minutos (número),
      "servings": número de doses (número)
    }
    
    Não incluas nenhum texto extra, apenas o JSON válido.`;
  } else if (type === "search" && ingredients) {
    const recipeType = recipeTypes[index! % recipeTypes.length];
    
    prompt = `Gera uma receita portuguesa ÚNICA usando: ${ingredients}. Tipo sugerido: ${recipeType}.
    
    IMPORTANTE: Tem que ser DIFERENTE das outras. Usa os ingredientes: ${ingredients} de forma CRIATIVA.
    
    Responde APENAS em formato JSON válido com a seguinte estrutura:
    {
      "title": "nome criativo e único da receita",
      "description": "descrição apetitosa com os ingredientes ${ingredients}",
      "category": "categoria (bacalhau/frango/porco/peixe/marisco/sopa/doce)",
      "ingredients": ["ingrediente com quantidade 1 (inclui ${ingredients})", "ingrediente 2", ...],
      "instructions": ["passo detalhado 1", "passo detalhado 2", ...],
      "prep_time": tempo de preparação em minutos (número),
      "cook_time": tempo de cozedura em minutos (número),
      "servings": número de doses (número)
    }
    
    Certifica-te que ${ingredients} está nos ingredientes principais.
    Não incluas nenhum texto extra, apenas o JSON válido.`;
  }

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "És um chef criativo especializado em culinária portuguesa tradicional e moderna. Geras SEMPRE receitas ÚNICAS e DIFERENTES. Nunca repetes nomes ou ideias. Responde apenas com JSON válido.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 1.2, // Aumentado para mais criatividade
    max_tokens: 2048,
    top_p: 0.95,
  });

  let response = chatCompletion.choices[0]?.message?.content || "";
  
  // Limpar a resposta removendo markdown code blocks se existirem
  response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  const recipe = JSON.parse(response);
  
  // Imagens de alta qualidade fixas do Unsplash organizadas por categoria
  const categoryImages: Record<string, string[]> = {
    'bacalhau': [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop',
    ],
    'frango': [
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop',
    ],
    'porco': [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    ],
    'peixe': [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop',
    ],
    'marisco': [
      'https://images.unsplash.com/photo-1559737558-2f5a552caaf5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1615750185825-9c5c7fa8e8d1?w=400&h=300&fit=crop',
    ],
    'sopa': [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=400&h=300&fit=crop',
    ],
    'doce': [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop',
    ],
    'carne': [
      'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1615750185825-9c5c7fa8e8d1?w=400&h=300&fit=crop',
    ],
  };
  
  // Imagem padrão para qualquer categoria
  const defaultImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
  ];
  
  const category = recipe.category?.toLowerCase() || 'food';
  const images = categoryImages[category] || defaultImages;
  recipe.image_url = images[index! % images.length];
  recipe.is_ai_generated = true;

  return recipe;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, type = "random", count = 8 } = body;

    if (type !== "random" && type !== "search") {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    if (type === "search" && !ingredients) {
      return NextResponse.json(
        { error: "Ingredients required for search" },
        { status: 400 }
      );
    }

    // Gerar receitas com controle de rate limit (sequencialmente em grupos de 4)
    const recipes: any[] = [];
    const batchSize = 4; // Processar 4 de cada vez para evitar rate limit
    
    for (let i = 0; i < count; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, count - i) }, 
        (_, j) => generateSingleRecipe(type, ingredients, i + j + 1)
          .catch(error => {
            console.error(`Error generating recipe ${i + j + 1}:`, error);
            return null;
          })
      );
      
      const batchResults = await Promise.all(batch);
      recipes.push(...batchResults.filter(r => r !== null));
      
      // Pequeno delay entre batches para respeitar rate limit
      if (i + batchSize < count) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (recipes.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate any recipes" },
        { status: 500 }
      );
    }

    return NextResponse.json({ recipes: recipes });
  } catch (error) {
    console.error("Error generating recipes:", error);
    return NextResponse.json(
      { error: "Failed to generate recipes" },
      { status: 500 }
    );
  }
}
