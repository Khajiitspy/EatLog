using Core.Extensions;
using Microsoft.Extensions.FileProviders;

namespace API.Helpers.Extensions
{
    public static class WebApplicationExtensions
    {
        public static WebApplication ConfigureApplication(this WebApplication app)
        {
            var config = app.Configuration;

            // -------------------- CORS --------------------
            app.UseCors("AllowAll");

            // -------------------- Static files (Images) --------------------
            var dir = config["ImagesDir"];
            var path = Path.Combine(Directory.GetCurrentDirectory(), dir!);
            Directory.CreateDirectory(path);

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(path),
                RequestPath = $"/{dir}"
            });

            // -------------------- OpenAPI + Swagger --------------------
            app.MapOpenApi();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
                options.OAuthUsePkce();
            });

            // -------------------- Middleware --------------------
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            // -------------------- Seed --------------------
            app.SeedDataAsync().GetAwaiter().GetResult();

            return app;
        }
    }

}
