export interface IRecipeIngredientItem {
	id: number;
	ingredient?: IIngredientItem | null;
	unit?: IUnitItem | null;
	amount: number;
}
