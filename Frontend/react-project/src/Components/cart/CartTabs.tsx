import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUtensils} from "@fortawesome/free-solid-svg-icons";

interface TabsProps {
    active: "recipes" | "shopping-list";
    onChange: (tab: "recipes" | "shopping-list") => void;
}

const CartTabs = ({ active, onChange }: TabsProps) => (
    <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl w-full max-w-md mx-auto mb-8 transition-colors duration-300">
        {(["recipes", "shopping-list"] as const).map((tab) => {
            const isActive = active === tab;
            return (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all duration-300
                    ${isActive
                        ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md shadow-black/5"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"}`}
                >
                    <FontAwesomeIcon
                        icon={tab === "recipes" ? faUtensils : faShoppingCart}
                        className={isActive ? "text-yellow-500" : ""}
                    />
                    <span className="text-sm tracking-tight">
                        {tab === "recipes" ? "Обрані рецепти" : "Список продуктів"}
                    </span>
                </button>
            );
        })}
    </div>
);

export default CartTabs;