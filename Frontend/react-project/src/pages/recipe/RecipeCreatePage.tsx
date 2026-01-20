import { useState, useEffect } from "react";
import { useCreateRecipeMutation } from "../../api/recipeService";
import { useGetCategoriesQuery } from "../../api/categoryService";
// @ts-ignore
import type { IRecipeIngredientCreate } from "../../types/recipe/IRecipeCreate";
import IngredientInputs from "../../Components/Recipe/IngredientInputs";
import {slugify} from "../../utils/slugify.ts"
import PageContainer from "../../Components/layout/PageContainer";
import Card from "../../Components/UI/Card";
import PageHeader from "../../Components/layout/PageHeader";
import { Select, ConfigProvider } from 'antd';
import { HiChevronDown } from "react-icons/hi";

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
      <PageContainer>
        <div className="max-w-5xl  mx-auto py-6">
          <Card className="shadow-sm  border-slate-100">
            <PageHeader
                title="Створення рецепту"
                subtitle="Поділіться своїм кулінарним шедевром"
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* Головна сітка на дві колонки */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">

                {/* ЛІВА КОЛОНКА: Назва, Категорія, Фото */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Назва рецепта</label>
                    <input
                        className={`w-full px-4 py-3 rounded-xl border border-slate-200 outline-none
                  focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all
                  ${errors.Name ? "border-red-500 bg-red-50" : "bg-white"}`}
                        placeholder="Наприклад: Гарбузовий суп"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 w-fit">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">URL:</span>
                      <span className="text-xs font-mono text-amber-600 truncate max-w-[200px]">{slug || "..."}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Категорія</label>
                    <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: '#fbbf24',
                            borderRadius: 12,
                            controlHeight: 48,
                          },
                        }}
                    >
                      <Select
                          placeholder="Оберіть категорію"
                          className="w-full"
                          suffixIcon={<HiChevronDown className="text-slate-400" />} // іконка з react-icons
                          options={categories.map(c => ({ value: c.id, label: c.name }))}
                          onChange={(value) => setCategoryId(value)}
                      />
                    </ConfigProvider>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Фото страви</label>
                    <input
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 file:mr-4 file:py-1 file:px-3
                file:rounded-full file:border-0 file:text-xs file:font-bold
                file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                {/* ПРАВА КОЛОНКА: Інструкції (високе поле) */}
                <div className="flex flex-col h-full">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Інструкція приготування</label>
                  <textarea
                      className={`w-full flex-grow px-4 py-3 rounded-xl border border-slate-200 outline-none
                focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all resize-none
                ${errors.Instruction ? "border-red-500" : ""}`}
                      placeholder="Крок за кроком опишіть процес..."
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      required
                  />
                </div>
              </div>

              {/* НИЖНЯ ЧАСТИНА: Інгредієнти (на всю ширину) */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-4 ml-1">Список інгредієнтів</label>
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200">
                  <IngredientInputs ingredients={ingredients} setIngredients={setIngredients} />
                </div>
              </div>

              {/* Кнопка створення */}
              <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full lg:w-1/3 bg-amber-300 hover:bg-amber-500 active:scale-[0.98]
                    text-white font-bold py-4 rounded-xl shadow-lg
                    shadow-red-200 transition-all duration-200 mt-6 flex justify-center items-center gap-2"
                >
                  {isLoading ? "Створюємо..." : "Опублікувати рецепт"}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </PageContainer>

  );
}
