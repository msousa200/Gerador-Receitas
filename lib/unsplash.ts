/**
 * Busca uma imagem relevante do Unsplash baseada no nome da receita
 * Usa keywords específicas para melhor correspondência
 */
export function getRecipeImage(recipeName: string, size: { width: number; height: number } = { width: 800, height: 600 }): string {
  // Mapear ingredientes portugueses para termos em inglês (Unsplash funciona melhor com inglês)
  const ingredientMap: Record<string, string> = {
    // Peixes
    'bacalhau': 'cod-fish',
    'robalo': 'sea-bass',
    'sardinha': 'sardines',
    'salmão': 'salmon',
    'atum': 'tuna',
    'peixe': 'fish',
    
    // Carnes
    'frango': 'chicken',
    'porco': 'pork',
    'carne': 'beef',
    'picanha': 'steak',
    'bife': 'beef-steak',
    'vitela': 'veal',
    'borrego': 'lamb',
    
    // Mariscos
    'marisco': 'seafood',
    'ameijoas': 'clams',
    'polvo': 'octopus',
    'lulas': 'squid',
    'camarão': 'shrimp',
    'gambas': 'prawns',
    
    // Massas e Arroz
    'arroz': 'rice',
    'esparguete': 'spaghetti',
    'massa': 'pasta',
    'lasanha': 'lasagna',
    'bolonhesa': 'bolognese',
    
    // Sopas
    'sopa': 'soup',
    'caldo': 'broth',
    'açorda': 'bread-soup',
    'gaspacho': 'gazpacho',
    
    // Doces
    'bolo': 'cake',
    'torta': 'tart',
    'pastel': 'pastry',
    'nata': 'cream',
    'doce': 'dessert',
    'pudim': 'pudding',
    
    // Vegetais
    'tomate': 'tomato',
    'cogumelos': 'mushrooms',
    'espinafre': 'spinach',
    'batata': 'potato',
    'cenoura': 'carrot'
  };
  
  const nameLower = recipeName.toLowerCase();
  
  // Encontrar primeiro match no nome da receita
  let keyword = 'food';
  for (const [pt, en] of Object.entries(ingredientMap)) {
    if (nameLower.includes(pt)) {
      keyword = en;
      break;
    }
  }
  
  // Usar Unsplash Source - cache baseado em keyword para consistência
  return `https://source.unsplash.com/${size.width}x${size.height}/?${keyword},food`;
}

/**
 * Gera URL de imagem aleatória de comida do Unsplash
 */
export function getRandomFoodImage(size: { width: number; height: number } = { width: 800, height: 600 }): string {
  return `https://source.unsplash.com/${size.width}x${size.height}/?food,cuisine`;
}
