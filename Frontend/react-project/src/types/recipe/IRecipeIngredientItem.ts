import type {IIngredientItem} from "./IIngredientItem.ts";
import type {IUnitItem} from "./IUnitItem.ts";

export interface IRecipeIngredientItem {
	id: number;
	ingredient?: IIngredientItem | null;
	unit?: IUnitItem | null;
	amount: number;
}
