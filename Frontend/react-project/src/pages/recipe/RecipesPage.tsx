import { useGetRecipesQuery } from "../../api/recipeService";
import { APP_ENV } from "../../env";
import { Link } from "react-router";
import PageContainer from "../../Components/layout/PageContainer";
import PageHeader from "../../Components/layout/PageHeader";
import Card from "../../Components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RecipesPage() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load recipes</p>;

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title="My Recipes"
          subtitle="Create, edit and manage your recipes"
        />

        <Link
          to="/recipes/create"
          className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl
                     font-semibold hover:bg-slate-800 transition shadow"
        >
          <FontAwesomeIcon icon={faPlus} />
          Create recipe
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes?.map((recipe) => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <Card>
              {recipe.image && (
                <img
                  src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`}
                  alt={recipe.name}
                  className="rounded-xl w-full h-44 object-cover mb-4"
                />
              )}

              <h3 className="text-xl font-semibold text-slate-800">
                {recipe.name}
              </h3>

              {recipe.category && (
                <p className="text-slate-500 mt-1 text-sm">
                  {recipe.category.name}
                </p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
