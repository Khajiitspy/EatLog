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
import AnimatedPage from "../../Components/layout/AnimatedPage";
// @ts-ignore
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import { Select, ConfigProvider } from 'antd';
import { HiChevronDown } from "react-icons/hi";


export default function RecipeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipeId = Number(id);

  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);
  const [updateRecipe, { isLoading: isSaving }] = useUpdateRecipeMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [name, setName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!recipe) return;

    setName(recipe.name);
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
      setImagePreview(`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`);
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

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <AnimatedPage>
      <PageContainer>
        <div className="max-w-5xl mx-auto py-6">
          <Card className="shadow-sm border-slate-100">
            <PageHeader
              title="Редагування рецепту"
              subtitle="Оновіть інформацію про свій рецепт"
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">

                {/* LEFT */}
                <div className="space-y-6">
                  {/* NAME */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                      Назва рецепта
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={clsx(
                        "w-full px-4 py-3 rounded-xl border border-slate-200 outline-none",
                        "focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all",
                        errors.Name && "border-red-500 bg-red-50"
                      )}
                    />
                    {errors.Name && (
                      <p className="text-sm text-red-500 mt-1">{errors.Name[0]}</p>
                    )}
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                      Категорія
                    </label>
                    <select
                      value={categoryId ?? ""}
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                      className={clsx(
                        "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white",
                        "focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10",
                        errors.CategoryId && "border-red-500"
                      )}
                    >
                      <option value="">Оберіть категорію</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* IMAGE */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                      Фото страви
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200
                        file:mr-4 file:py-1 file:px-3 file:rounded-full
                        file:border-0 file:text-xs file:font-bold
                        file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="rounded-xl mt-4 w-full"
                      />
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col h-full">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                    Інструкція приготування
                  </label>
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    className={clsx(
                      "w-full flex-grow px-4 py-3 rounded-xl border border-slate-200 resize-none",
                      "focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all",
                      errors.Instruction && "border-red-500"
                    )}
                  />
                </div>
              </div>

              {/* INGREDIENTS */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-4 ml-1">
                  Список інгредієнтів
                </label>
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200">
                  <IngredientInputs
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                  />
                </div>
              </div>

              {/* ACTION */}
              <div className="flex justify-end pt-4">
                <button
                  disabled={isSaving}
                  className="w-full lg:w-1/3 bg-amber-300 hover:bg-amber-500
                    text-white font-bold py-4 rounded-xl shadow-lg
                    transition-all active:scale-[0.98]"
                >
                  {isSaving ? "Зберігаємо..." : "Зберегти зміни"}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </PageContainer>
    </AnimatedPage>
  );
}
