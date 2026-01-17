namespace Core.Constants;

public static class CacheKeys
{
    public const string CategoryListCacheKey = "categories_all";
    public const string CategoryItemCacheKeyPrefix = "category_";

    public const string IngredientListCacheKey = "ingredients_all";
    public const string IngredientItemCacheKeyPrefix = "ingredient_";

    public const string RecipeListCacheKey = "recipes_user_";
    public const string RecipeItemCacheKeyPrefix = "recipe_";
    public const string UnitsCacheKey = "units_all";

    public const int ListCacheTtlMinutes = 10;
    public const int ItemCacheTtlMinutes = 5;
}
