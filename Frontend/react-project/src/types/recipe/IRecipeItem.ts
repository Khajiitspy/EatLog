import type {ICategoryItem} from "./ICategoryItem.ts";
import type {IRecipeIngredientItem} from "./IRecipeIngredientItem.ts";

export interface IRecipeItem {
	id: number;
	name: string;
	slug: string;
	instruction: string;
	image: string;
  category?: ICategoryItem | null;
  ingredients?: IRecipeIngredientItem[];
}
