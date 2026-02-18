import Card from "../UI/Card.tsx";
import { Link } from "react-router";
import { APP_ENV } from "../../env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons"; // Додав іконку годинника для майбутнього
import type { ICartRecipe } from "../../types/cart/ICartData.ts";

interface CartRecipeCardProps {
    recipe: ICartRecipe
}

const CartRecipeCard = ({ recipe }: CartRecipeCardProps) => {
    return (
        <Link to={`/recipes/${recipe.recipeId}`} className="block group h-full">
            {/* Додано flex flex-col до Card */}
            <Card className="flex flex-col h-full overflow-hidden border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 rounded-3xl p-0">

                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video shrink-0">
                    {recipe.recipeImage ? (
                        <img
                            src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.recipeImage}`}
                            alt={recipe.recipeName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-200 dark:text-gray-700">
                            <FontAwesomeIcon icon={faUtensils} size="3x" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Area - Змінено h-full на flex-1 та flex-col */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-yellow-500 transition-colors">
                        {recipe.recipeName}
                    </h3>

                    {/* Цей блок тепер завжди буде притиснутий до низу */}
                    <div className="flex items-center  mt-auto gap-3">


                        <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-yellow-400/20 flex items-center gap-1.5 whitespace-nowrap">
                            <FontAwesomeIcon icon={faUtensils} className="text-gray-900" />
                            <span className="opacity-70 uppercase tracking-tighter text-[9px]">
                                Рецепт
                            </span>
                        </div>

                        {/* Бадж порцій */}
                        <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-yellow-400/20 flex items-center gap-1.5 whitespace-nowrap">
                            <span>{recipe.portion}</span>
                            <span className="opacity-70 uppercase tracking-tighter text-[9px]">
                                {recipe.portion === 1 ? "порція" : "порції"}
                            </span>
                        </div>

                        <span className="text-lg  ml-auto font-bold text-yellow-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all shrink-0">
                            →
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default CartRecipeCard;