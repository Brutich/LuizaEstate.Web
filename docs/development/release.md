# Выпуск в production

## Общая схема

```text
agent branch
    ↓ PR
 develop
    ↓ release PR
  main
    ↓ GitHub Actions
GitHub Pages
    ↓
https://luiza.estate
```

## Подготовка release

1. Убедиться, что все выбранные PR слиты в `develop`.
2. Проверить, что CI в `develop` проходит успешно.
3. Выполнить локальный smoke test или проверить preview, если он настроен.
4. Создать PR `develop → main`.
5. В описании перечислить пользовательские изменения, риски и способ отката.
6. После успешного CI и review выполнить merge.

## Production-деплой

Merge в `main` автоматически запускает `.github/workflows/deploy.yml`:

1. `npm ci`;
2. `npm run check`;
3. статическую Astro-сборку и post-build проверки;
4. загрузку каталога `dist` как GitHub Pages artifact;
5. публикацию artifact через GitHub Pages deployment.

Отдельная ручная команда deploy не требуется.

## Проверка после выпуска

Проверить на `https://luiza.estate`:

- главную и изменённые страницы;
- desktop и mobile;
- контакты и CTA;
- изображения и стили;
- прямое открытие маршрутов;
- отсутствие очевидных ошибок в браузере;
- корректность title, description и structured data, если они менялись.

## Sitemap

`public/sitemap.xml` поддерживается вручную. При создании новой публичной канонической страницы её URL необходимо добавить в sitemap; служебные, дублирующиеся и redirect-маршруты не добавляются. После изменения нужно проверить валидность XML и наличие `dist/sitemap.xml`.

Custom domain настраивается в GitHub Pages и дополнительно сохраняется в `public/CNAME`. После
release нужно проверить оба условия и открытие `https://luiza.estate`.

## Откат

Предпочтительный откат — revert merge-коммита release PR с последующим merge нового PR в `main`. Не изменяйте ветку `gh-pages` вручную, кроме аварийной ситуации.

## После release

Синхронизировать `develop` с новым состоянием `main`, чтобы следующая задача начиналась от актуальной базы.
