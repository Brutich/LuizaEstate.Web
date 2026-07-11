# Участие в разработке Luiza Estate

## Базовая модель веток

- `main` — production. Любой merge запускает публикацию сайта.
- `develop` — интеграционная ветка текущего этапа развития.
- `agent/<issue>-<description>` — короткоживущая ветка одной задачи.
- `agent/hotfix-<issue>-<description>` — срочное исправление production от `main`.

Прямые изменения в `main` и `develop` не допускаются. Обычные задачи направляются Pull Request в `develop`. Завершённый этап выпускается через PR `develop → main`.

## Рабочий цикл

1. Создать или выбрать GitHub Issue.
2. Убедиться, что Issue содержит цель, scope, acceptance criteria и способ проверки.
3. Создать ветку от актуального `develop`.
4. Открыть Draft PR и добавить implementation plan.
5. Выполнить задачу без скрытого расширения scope.
6. Запустить локальные проверки.
7. Обновить документацию, если она затронута.
8. Перевести PR в Ready for review.
9. После успешного CI и review выполнить merge.

## Локальные проверки

```bash
dotnet restore ./LuizaEstate.Web.csproj
dotnet build ./LuizaEstate.Web.csproj --configuration Release --no-restore
dotnet publish ./LuizaEstate.Web.csproj --configuration Release -o publish --no-build
```

Для визуального изменения также проверить:

- desktop;
- mobile;
- основные ссылки и CTA;
- отсутствие ошибок в консоли браузера;
- прямое открытие изменённых маршрутов.

## Размер Pull Request

Предпочтителен один логический результат на PR. Не объединяйте продуктовый текст, архитектурную миграцию и несвязанный рефакторинг.

При большой инициативе сначала создаётся исследование или ADR, затем работа разбивается на небольшие Issues.

## Документация

- Продуктовая логика: `docs/product`.
- Процесс разработки: `docs/development`.
- Инструкции для AI-агентов: `AGENTS.md`.
- Принятые продуктовые решения: `docs/product/decisions.md`.

Факты о бизнесе, контактах, квалификации, кейсах и отзывах нельзя менять без подтверждённого источника.

## Выпуск в production

Production-деплой выполняется автоматически после merge в `main`. Подробности находятся в `docs/development/release.md`.
