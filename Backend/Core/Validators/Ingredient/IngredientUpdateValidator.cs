
using Core.Model.Recipe.Ingredient;
using Domain.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Ingredient;

public class IngredientUpdateValidator : AbstractValidator<IngredientUpdateModel>
{
    public IngredientUpdateValidator(AppDbContext context)
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id обов'язкове")
            .Must(id => id > 0)
            .WithMessage("Id не може бути від'ємним або 0");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Назва обов'язкова")
            .Must(name => !string.IsNullOrEmpty(name))
            .WithMessage("Назва не може бути empty або null")
            .DependentRules(() =>
            {
                RuleFor(x => x.Name)
                    .MustAsync(async (model, name, cancellationToken) =>
                    !await context.Ingredients.AnyAsync(x => (x.Name.ToLower() == name.ToLower().Trim() && x.Id != model.Id), cancellationToken))
                    .WithMessage("Інгредієнт з такою назвою вже існує");
            })

            .MaximumLength(250)
            .WithMessage("Назва має бути не довшою, ніж 250 символів");
    }
}
