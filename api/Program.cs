namespace RealEstateAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 1. הוספת שירות ה-CORS עם הפורט המעודכן
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp",
                policy =>
                {
                 policy.WithOrigins("http://localhost:4200", "http://localhost:64030") // מאפשר את שניהם
                .AllowAnyHeader()
                .AllowAnyMethod();
               });
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // 2. הפעלת ה-CORS
            app.UseCors("AllowAngularApp");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}