import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetRecipeByIdQuery,
  useUpdateRecipeMutation,
} from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import PageHeader from "../../Components/layout/PageHeader";
import { slugify } from "../../utils/slugify";
import clsx from "clsx";
import {APP_ENV} from "../../env";

export default function RecipeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipeId = Number(id);

  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);
  const [updateRecipe, { isLoading: isSaving }] =
    useUpdateRecipeMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /** Prefill data */
  useEffect(() => {
    if (!recipe) return;

    setName(recipe.name);
    setSlug(recipe.slug);
    setInstruction(recipe.instruction);
    setCategoryId(recipe.category?.id);
    setIngredients(
      recipe.ingredients?.map((i) => ({
        ingredientId: i.ingredient?.id,
        ingredientUnitId: i.unit?.id,
        amount: i.amount,
      })) || []
    );
    if (recipe.image) {
      setImagePreview(
        `${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`
      );
    }
  }, [recipe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", recipeId.toString());
    formData.append("Name", name);
    formData.append("Slug", slugify(name));
    formData.append("Instruction", instruction);
    formData.append("CategoryId", String(categoryId ?? ""));
    formData.append("IngredientsJson", JSON.stringify(ingredients));

    if (image) {
      formData.append("Image", image);
    }

    try {
      await updateRecipe(formData).unwrap();
      navigate(`/recipes/${recipeId}`);
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <Card>
          <PageHeader
            title="Edit Recipe"
            subtitle="Update your recipe information"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={clsx(
                "w-full px-4 py-3 rounded-xl border border-slate-200",
                errors.Name && "input-error"
              )}
            />
            {errors.Name && <p className="error">{errors.Name[0]}</p>}

            {/* INSTRUCTION */}
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className={clsx(
                "w-full px-4 py-3 rounded-xl border border-slate-200",
                errors.Instruction && "input-error"
              )}
            />
            {errors.Instruction && (
              <p className="error">{errors.Instruction[0]}</p>
            )}

            {/* CATEGORY */}
            <select
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className={clsx(
                "w-full px-4 py-3 rounded-xl border border-slate-200",
                errors.CategoryId && "input-error"
              )}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* INGREDIENTS */}
            <IngredientInputs
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
            {errors.IngredientsJson && (
              <p className="error">{errors.IngredientsJson[0]}</p>
            )}

            {/* IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
            {errors.Image && <p className="error">{errors.Image[0]}</p>}
            {image && <p className="text-amber-400">New image selected</p>}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Recipe"
                className="rounded-xl w-full mb-4"
              />
            )}

            <button
              disabled={isSaving}
              className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}
