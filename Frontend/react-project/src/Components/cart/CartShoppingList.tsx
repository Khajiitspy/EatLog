import type {ICartIngredient} from "../../types/cart/ICartData.ts";

const CartShoppingList = ({ ingredients }: { ingredients: ICartIngredient[] }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Інгредієнти до покупки</h2>
            <p className="text-slate-500 text-sm">Згруповано на основі обраних рецептів</p>
        </div>
        <div className="divide-y divide-slate-100">
            {ingredients.map((ing) => (
                <div key={ing.ingredientId} className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800 cursor-pointer" />
                        <span className="font-medium text-slate-700 text-lg">{ing.ingredientName}</span>
                    </div>
                    <div className="text-right">
                        {ing.units.map((unit) => (
                            <div key={unit.unitId} className="text-slate-600 font-medium">
                                {unit.amount} <span className="text-slate-400 text-sm">{unit.unitName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default CartShoppingList;