# Локальная разработка

## Требования

- .NET 9 SDK;
- Git;
- современный браузер.

Проверка SDK:

```bash
dotnet --version
```

## Запуск

Из корня репозитория:

```bash
dotnet restore
dotnet watch run
```

Откройте адрес, указанный в консоли. Остановить сервер можно сочетанием `Ctrl+C`.

Обычный запуск без автоматической перезагрузки:

```bash
dotnet run
```

## Проверка перед Pull Request

```bash
dotnet restore ./LuizaEstate.Web.csproj
dotnet build ./LuizaEstate.Web.csproj --configuration Release --no-restore
dotnet publish ./LuizaEstate.Web.csproj --configuration Release -o publish --no-build
```

Каталог `publish` является локальным результатом проверки и не должен коммититься.

## Ручной smoke test

Проверьте:

1. главная страница загружается без ошибок;
2. изображения и стили доступны;
3. телефонные, почтовые и внешние ссылки корректны;
4. изменённые маршруты открываются напрямую;
5. интерфейс читаем на desktop и mobile;
6. в консоли браузера нет новых ошибок;
7. title, description и другие SEO-элементы не ухудшились.

Для визуального PR приложите скриншоты desktop и mobile.
