import { useParams } from "react-router";
import { useGetRecipeByIdQuery } from "../../api/recipeService";
import { APP_ENV } from "../../env";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const recipeId = Number(id);

  const { data: recipe, isLoading, error } =
    useGetRecipeByIdQuery(recipeId, { skip: !recipeId });

  if (isLoading) return <p>Loading recipe...</p>;
  if (error || !recipe) return <p>Recipe not found</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1>{recipe.name}</h1>

      {recipe.image && (
        <img
          src={`${APP_ENV.API_BASE_URL}/images/800_${recipe.image}`}
          alt={recipe.name}
          style={{ width: "100%", marginBottom: 16 }}
        />
      )}

      {recipe.category && (
        <p>
          <strong>Category:</strong> {recipe.category.name}
        </p>
      )}

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((ing) => (
          <li key={ing.id}>
            {ing.amount} {ing.unit?.name} {ing.ingredient?.name}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p style={{ whiteSpace: "pre-line" }}>{recipe.instruction}</p>
    </div>
  );
}
