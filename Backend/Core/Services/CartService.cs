
using AutoMapper;
using Core.Interfaces;
using Core.Model.Cart;
using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CartService(IMapper mapper, IAuthService authService,
    AppDbContext context) : ICartService
{
    public async Task<CartItemModel> CreateAsync(CartCreateModel model)
    {
        var userId = await authService.GetUserId();
        var entity = await context.Carts.Include(c => c.Recipes)
            .FirstOrDefaultAsync(c => c.UserId == userId);
        if (entity == null)
        {
            entity = new CartEntity()
            {
                UserId = userId
            };
            await context.Carts.AddAsync(entity);
            await context.SaveChangesAsync();
        }
        else
            entity.Recipes!.Clear();

        foreach (var recipe in model.Recipes!)
            {
                entity.Recipes.Add(new CartRecipeEntity
                {
                    RecipeId = recipe.RecipeId,
                    Portion = recipe.Portion
                });
            }
        await context.SaveChangesAsync();
        return await GetCartAsync();
    }

    public async Task<CartItemModel> GetCartAsync()
    {
        var userId = await authService.GetUserId();
        var cart = await context.Carts.Where(c => c.UserId == userId)
            .Select(c => new CartItemModel
            {
                Id = c.Id,
                Recipes = c.Recipes!.Select(cr => new CartRecipeModel
                {
                    RecipeId = cr.RecipeId,
                    RecipeName = cr.Recipe!.Name,
                    Portion = cr.Portion
                }).ToList(),

                Ingredients = c.Recipes!
                .SelectMany(cr => cr.Recipe!.RecipeIngredients!.Select(ri => new
                {
                    ri.IngredientId,
                    ri.Ingredient!.Name,
                    UnitName = ri.Unit!.Name,
                    UnitId = ri.Unit!.Id,
                    Amount = ri.Amount * cr.Portion
                }))
                .GroupBy(x => new { x.IngredientId, x.Name })
                .Select(g => new CartIngredientGroupModel
                {
                    IngredientId = g.Key.IngredientId,
                    IngredientName = g.Key.Name,

                    Units = g
                    .GroupBy(x=>new {x.UnitId, x.UnitName})
                    .Select(i=>new CartIngredientUnitModel
                    {
                        UnitId = i.Key.UnitId,
                        UnitName = i.Key.UnitName,
                        Amount = i.Sum(a=>a.Amount)
                    }).ToList()
                })
                .ToList()


            }).FirstOrDefaultAsync();
        return cart ?? new CartItemModel();
    }
}
