import { useGetRecipesQuery } from "../../api/recipeService";
import {APP_ENV} from "../../env";
import { Link } from "react-router";

export default function RecipesPage() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p>Failed to load recipes</p>;

  return (
    <div>
      <h1>Recipes</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {recipes?.map(recipe => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ border: "1px solid #ddd", padding: 16 }}>
              {recipe.image && (
                <img
                  src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`}
                  alt={recipe.name}
                  style={{ width: "100%", height: 150, objectFit: "cover" }}
                />
              )}

              <h3>{recipe.name}</h3>

              {recipe.category && (
                <small>Category: {recipe.category.name}</small>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
