# Stage 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

# Копіюємо проект і відновлюємо залежності
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"

# Копіюємо всі файли і будуємо додаток
COPY . .
WORKDIR /source/API
RUN dotnet publish -c Release -o /app

# Stage 2: Final image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0

# Встановлюємо необхідні пакети для підключення до PostgreSQL
WORKDIR /app

# Копіюємо додаток з етапу побудови
COPY --from=build /app .

# Запускаємо додаток
ENTRYPOINT ["dotnet", "API.dll"]
