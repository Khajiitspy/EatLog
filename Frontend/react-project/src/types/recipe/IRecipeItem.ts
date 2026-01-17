export interface IRecipeItem {
	id: number;
	name: string;
	slug: string;
	instruction: string;
	image: string;
  category?: ICategoryItem | null;
  ingredients?: IRecipeIngredientItem[];
}
