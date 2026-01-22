import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { APP_ENV } from "../../env";
import { useSearchRecipesQuery } from "../../api/recipeService";
import PageContainer from "../../Components/layout/PageContainer";
import PageHeader from "../../Components/layout/PageHeader";
import Card from "../../Components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import AnimatedPage from "../../Components/layout/AnimatedPage";
import type { RootState } from "../../store";

export default function RecipesPage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("q") || "";
  const initialShowAllPublic = searchParams.get("public") === "true";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [showAllPublic, setShowAllPublic] = useState( false );

  const [searchRequest, setSearchRequest] = useState<{
    SearchTerm?: string;
    IsPublished?: boolean;
    UserId?: number;
  }>({});

  // Update searchRequest whenever relevant state changes
  useEffect(() => {
    const req: {
      SearchTerm?: string;
      IsPublished?: boolean;
      UserId?: number;
    } = {};

    if (searchTerm) req.SearchTerm = searchTerm;

    if (!currentUser) {
      // guest
      req.IsPublished = true;
    } else {
      if (showAllPublic) {
        // logged-in, browsing public
        req.IsPublished = false;
      } else {
        // 🔑 MY RECIPES — use REAL ID
        req.UserId = currentUser.id;
      }
    }

    setSearchRequest(req);
  }, [searchTerm, currentUser, showAllPublic]);

  // Sync input/checkbox with URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchTerm) params.q = searchTerm;
    if (currentUser && showAllPublic) params.public = "true";
    else params.public = "false";

    setSearchParams(params);
  }, [searchTerm, showAllPublic, currentUser, setSearchParams]);

  const { data: recipes, isLoading, error } = useSearchRecipesQuery(searchRequest);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <AnimatedPage>
      <PageContainer>
        {/* Top header + create recipe */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <PageHeader
            title={
              currentUser
                ? showAllPublic
                  ? "Публічні рецепти"
                  : "Мої рецепти"
                : "Всі рецепти"
            }
            subtitle="Переглядайте та керуйте своїми рецептами"
          />

          {currentUser && (
            <Link
              to="/recipes/create"
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-xl font-semibold hover:bg-slate-800 transition shadow"
            >
              <FontAwesomeIcon icon={faPlus} />
              Створити рецепт
            </Link>
          )}
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-6 items-center">
          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Пошук рецептів..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-300"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 top-2.5 text-slate-400"
            />
          </div>

          {currentUser && (
            <label className="flex items-center gap-2 mt-2 sm:mt-0">
              <input
                type="checkbox"
                checked={showAllPublic}
                onChange={(e) => setShowAllPublic(e.target.checked)}
              />
              Показати всі публічні рецепти
            </label>
          )}
        </div>

        {/* Loading / error */}
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Failed to load recipes</p>}

        {/* Empty state */}
        {recipes?.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-slate-500 mb-4">
              {currentUser
                ? "У вас поки що немає створених рецептів"
                : "No recipes found"}
            </p>
            {currentUser && (
              <Link
                to="/recipes/create"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl"
              >
                <FontAwesomeIcon icon={faPlus} />
                Створіть свій перший рецепт
              </Link>
            )}
          </Card>
        )}

        {/* Recipe grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes?.items?.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {recipe.image && (
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={`${APP_ENV.API_BASE_URL}/images/400_${recipe.image}`}
                      alt={recipe.name}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900">
                  {recipe.name}
                </h3>
                {recipe.category && (
                  <p className="text-slate-500 mt-1 text-sm">{recipe.category.name}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </AnimatedPage>
  );
}
