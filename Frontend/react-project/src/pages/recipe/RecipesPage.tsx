import { useGetRecipesQuery } from "../../api/recipeService";

export default function RecipesPage() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p>Failed to load recipes</p>;

  return (
    <div>
      <h1>Recipes</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {recipes?.map(recipe => (
          <div key={recipe.id} style={{ border: "1px solid #ddd", padding: 16 }}>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            )}

            <h3>{recipe.name}</h3>

            {recipe.category && (
              <small>Category: {recipe.category.name}</small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
