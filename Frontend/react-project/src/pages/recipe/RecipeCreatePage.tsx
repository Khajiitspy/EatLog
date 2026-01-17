import { useState, useEffect } from "react";
import { useCreateRecipeMutation } from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";
import {slugify} from "../../utils/slugify.ts"

export default function RecipeCreatePage() {
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [ingredients, setIngredients] = useState<IRecipeIngredientCreate[]>([]);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRecipe({
        name,
        slug,
        instruction,
        categoryId,
        image,
        ingredientsJson: JSON.stringify(ingredients),
      }).unwrap();

      alert("Recipe created!");
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Recipe</h1>

      <input className={errors.Name ? "input-error" : ""} 
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {errors.Name && <p className="error">{errors.Name[0]}</p>}

      <input
        placeholder="Slug"
        value={slug}
        disabled
      />

      <textarea className={errors.Instruction ? "input-error" : ""}
        placeholder="Instruction"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        required
      />
      {errors.Instruction && <p className="error">{errors.Instruction[0]}</p>}


      <select className={errors.categoryId ? "input-error" : ""}
        value={categoryId || ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        required
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.categoryId && <p className="error">{errors.categoryId[0]}</p>}

      <IngredientInputs ingredients={ingredients} setIngredients={setIngredients} />
      {errors.IngredientsJson && (
        <p className="error">{errors.IngredientsJson[0]}</p>
      )}


      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      {errors.Image && <p className="error">{errors.Image[0]}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
