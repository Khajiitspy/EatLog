// import { useGetRecipeQuery } from "../../../api/recipeService";
// import CountryCard from "../../../components/country/CountryCardProps.tsx";
import { Link } from "react-router";

const UserHomePage: React.FC = () => {
    // const { data: recipes, isLoading } = useGetRecipesQuery();

    return (
        <div className="w-full flex flex-col">

            <section className="card py-28 px-4 text-center shadow-xl">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-xl">
                    Cooking made Fun
                </h1>
                <p className="text-lg md:text-2xl mb-10 opacity-90">
                    Create and keep recipes and shopping lists with ease!
                </p>
                <button className="
                    bg-white text-blue-700 font-semibold px-10 py-4
                    rounded-xl shadow-lg transition
                    hover:bg-blue-50 hover:shadow-2xl active:scale-95
                ">
                    Explore other user's recipes!
                </button>
            </section>
        </div>
    );
};

export default UserHomePage;
