using Core.Model.Search.Requests;
using Domain.Entities;

namespace Core.Builders
{
    public class IngredientBuilder : BaseQueryBuilder<IngredientEntity, IngredientBuilder>
    {
        public IngredientBuilder(IQueryable<IngredientEntity> query) : base(query) { }

        public IngredientBuilder ApplyRequest(IngredientSearchRequest request)
        {
            WithPagination(request);

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                Query = Query.Where(i => i.Name.ToLower().Contains(request.Name.ToLower()));
            }

            return this;
        }
    }
}
