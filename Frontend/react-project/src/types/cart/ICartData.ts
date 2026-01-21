export interface ICartUnit {
    unitId: number;
    unitName: string;
    unitSlug: string;
    amount: number;
}

export interface ICartIngredient {
    ingredientId: number;
    ingredientName: string;
    units: ICartUnit[];
}

export interface ICartRecipe {
    recipeId: number;
    recipeName: string;
    portion: number;
}

export interface ICartData {
    id: number;
    recipes: ICartRecipe[];
    ingredients: ICartIngredient[];
}