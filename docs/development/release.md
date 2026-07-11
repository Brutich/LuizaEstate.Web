# Выпуск в production

## Общая схема

```text
agent branch
    ↓ PR
 develop
    ↓ release PR
  main
    ↓ GitHub Actions
npm validation + Astro build
    ↓ publish dist
 gh-pages
    ↓ GitHub Pages
https://luiza.estate
```

`main` хранит production-исходники. Ветка `gh-pages` содержит только сгенерированный результат публикации и обслуживается GitHub Pages из корня `/`.

## Подготовка release

1. Убедиться, что все выбранные PR слиты в `develop`.
2. Проверить, что CI в `develop` проходит успешно.
3. Выполнить [release smoke-checklist](release-smoke-checklist.md) на production build или preview.
4. Создать PR `develop → main`.
5. В описании перечислить пользовательские изменения, риски и способ отката.
6. Зафиксировать результаты smoke test комментарием в release PR.
7. После успешного CI, review и явного решения мейнтейнера выполнить merge.

## Production-деплой

Merge в `main` автоматически запускает `.github/workflows/deploy.yml`:

1. `npm ci`;
2. `npm run check`;
3. `npm run build`, включая post-build проверки содержимого `dist`;
4. публикацию каталога `dist` в ветку `gh-pages` через `peaceiris/actions-gh-pages`;
5. обновление сайта GitHub Pages, настроенного на источник `gh-pages` и путь `/`.

Deploy выполняется только при push в `main`. В Pull Request workflow выполняет сборку и проверки, но не обновляет production.

Ветка `gh-pages` является автоматически генерируемым deployment artifact. Не создавайте в неё обычные PR, не используйте её как рабочую ветку и не редактируйте файлы вручную, кроме аварийной диагностики.

Отдельная ручная команда deploy не требуется.

## Проверка после выпуска

После завершения workflow:

1. убедиться, что deployment step завершился успешно;
2. проверить, что последний commit ветки `gh-pages` создан после merge release PR и соответствует актуальному состоянию `main`;
3. проверить, что GitHub Pages использует `gh-pages` с путём `/` и имеет статус `built`;
4. повторить production-раздел [release smoke-checklist](release-smoke-checklist.md) на `https://luiza.estate`.

Production smoke test включает:

- главную и изменённые страницы;
- desktop и mobile;
- контакты и CTA;
- изображения и стили;
- legacy redirects и 404;
- отсутствие очевидных ошибок в браузере;
- корректность title, description, canonical и structured data;
- доступность `robots.txt` и `sitemap.xml`;
- наличие Astro HTML на live-сайте и отсутствие загрузки Blazor runtime.

## Sitemap и custom domain

`public/sitemap.xml` поддерживается вручную. При создании новой публичной канонической страницы её URL необходимо добавить в sitemap; служебные, дублирующиеся и redirect-маршруты не добавляются. После изменения нужно проверить валидность XML и наличие `dist/sitemap.xml`.

Custom domain настраивается в GitHub Pages и дополнительно сохраняется в `public/CNAME`. При build файл попадает в `dist/CNAME`, а затем публикуется в `gh-pages/CNAME`. После release нужно проверить содержимое CNAME и открытие `https://luiza.estate`.

## Откат

Предпочтительный откат — revert merge-коммита release PR с последующим merge нового PR в `main`. Push в `main` заново соберёт сайт и автоматически опубликует восстановленное состояние в `gh-pages`.

Не изменяйте ветку `gh-pages` вручную, кроме аварийной ситуации: такое изменение будет перезаписано следующим production deployment и не исправляет исходники в `main`.

## После release

Синхронизировать `develop` с новым состоянием `main`, включая production hotfix, чтобы следующая задача начиналась от актуальной базы.