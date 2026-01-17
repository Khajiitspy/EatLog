
using Core.Model.Recipe;
using Core.Model.Recipe.Unit;
using Core.Model.Search;
using Core.Model.Search.Requests;

namespace Core.Interfaces;

public interface IRecipeService
{
    Task<RecipeItemModel> CreateAsync(RecipeCreateModel model);
    Task<List<RecipeItemModel>> ListAsync();
    Task<PagedResult<RecipeItemModel>> ListAsync(RecipeSearchRequest request);
    Task DeleteAsync(long id);
    Task<RecipeItemModel> UpdateAsync(RecipeUpdateModel model);
    Task<RecipeItemModel> GetByIdAsync(long id);
    Task<List<UnitItemModel>> GetUnitsAsync();
}
