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
    // Lista de variações para garantir diversidade
    const variations = [
      "tradicional",
      "moderna",
      "ao forno",
      "grelhada",
      "em molho",
      "com legumes",
      "gratinado",
      "em salada"
    ];
    
    const variation = variations[index! % variations.length];
    
    prompt = `Cria a receita número ${index! + 1} DIFERENTE das anteriores, usando principalmente: ${ingredients}.

IMPORTANTE: 
- Esta é a receita #${index! + 1} - TEM que ser DIFERENTE das outras
- Usa os ingredientes "${ingredients}" como base
- Variação sugerida: ${variation}
- Cria receitas TRADICIONAIS e POPULARES conhecidas
- VARIA o nome e preparação para não repetir

Exemplos de receitas DIFERENTES com bacalhau e natas:
1. Bacalhau com Natas (tradicional)
2. Bacalhau à Gomes de Sá
3. Bacalhau Gratinado com Natas
4. Bacalhau à Brás
5. Pataniscas de Bacalhau com Molho de Natas
6. Bacalhau Espiritual
7. Açorda de Bacalhau
8. Salada de Bacalhau

Responde APENAS em formato JSON válido:
{
  "title": "nome DIFERENTE e TRADICIONAL da receita #${index! + 1}",
  "description": "descrição apetitosa e realista",
  "category": "categoria (bacalhau/frango/porco/peixe/marisco/sopa/doce/massa)",
  "ingredients": ["ingrediente com quantidade 1 (deve incluir ${ingredients})", "ingrediente 2", ...],
  "instructions": ["passo detalhado 1", "passo detalhado 2", ...],
  "prep_time": tempo de preparação em minutos (número),
  "cook_time": tempo de cozedura em minutos (número),
  "servings": número de doses (número)
}

Não incluas nenhum texto extra, apenas o JSON válido.`;
  }

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "És um chef profissional que conhece receitas TRADICIONAIS e POPULARES. Crias receitas CONHECIDAS e REALISTAS, não inventas combinações estranhas. Responde sempre com JSON válido.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7, // Reduzido para mais consistência e tradicionalidade
    max_tokens: 2048,
    top_p: 0.85, // Reduzido para respostas mais previsíveis
  });

  let response = chatCompletion.choices[0]?.message?.content || "";
  
  // Limpar a resposta removendo markdown code blocks se existirem
  response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  const recipe = JSON.parse(response);
  
  // Não adicionar imagens aqui - deixar o frontend buscar imagens específicas
  // baseadas no nome da receita através do Unsplash
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
