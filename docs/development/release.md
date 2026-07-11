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

1. restore;
2. Release build;
3. publish;
4. подготовка SPA fallback;
5. публикация `publish/wwwroot` в GitHub Pages.

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

## Откат

Предпочтительный откат — revert merge-коммита release PR с последующим merge нового PR в `main`. Не изменяйте ветку `gh-pages` вручную, кроме аварийной ситуации.

## После release

Синхронизировать `develop` с новым состоянием `main`, чтобы следующая задача начиналась от актуальной базы.
