# Smoke-checklist публичного сайта

Используйте этот список перед merge release PR `develop → main` и повторите ключевые проверки после production deployment.

## 1. Production build

Из корня репозитория:

```bash
npm ci
npm run check
npm run build
npm run preview
```

Проверить:

- [ ] все команды завершились без ошибок;
- [ ] существуют `dist/index.html`, `dist/404.html`, `dist/robots.txt`, `dist/sitemap.xml` и `dist/CNAME`;
- [ ] основной текст страницы присутствует непосредственно в `dist/index.html`;
- [ ] в `dist/` нет `_framework`, `.wasm`, `.dll` и `blazor.webassembly.js`.

## 2. Страница и адаптивность

В production preview проверить главную:

- [ ] desktop около 1440 px: секции, типографика, изображения и отступы выглядят корректно;
- [ ] mobile около 390 px: нет горизонтального скролла, наложений и обрезанного текста;
- [ ] фотография в блоке «Обо мне» удерживает верхнюю часть кадра при сужении;
- [ ] в консоли браузера нет новых ошибок.

## 3. Маршруты

- [ ] `/` открывает главную страницу;
- [ ] `/service-page` перенаправляет на `/`;
- [ ] `/service-page/бесплатная-консультация` перенаправляет на `/`;
- [ ] legacy-страницы содержат `noindex` и canonical на `https://luiza.estate/`;
- [ ] неизвестный URL показывает статическую страницу 404, а не главную.

## 4. Контакты и CTA

Проверить корректность `href` и действие ссылок:

- [ ] телефон в шапке;
- [ ] кнопка «Позвонить»;
- [ ] кнопка «Написать» в Telegram;
- [ ] email;
- [ ] Telegram, Instagram и VK в footer;
- [ ] ссылка BIMO Tools.

## 5. SEO и служебные файлы

В `dist/index.html` и браузере проверить:

- [ ] `<html lang="ru">`;
- [ ] title, meta description и canonical `https://luiza.estate/`;
- [ ] Open Graph и Twitter metadata;
- [ ] валидный JSON-LD без фиктивного `SearchAction`;
- [ ] отсутствует ссылка на несуществующий RSS;
- [ ] `robots.txt` разрешает индексацию и указывает sitemap;
- [ ] `sitemap.xml` содержит только канонические индексируемые страницы;
- [ ] `CNAME` содержит `luiza.estate`.

## 6. Release PR

- [ ] PR направлен из `develop` в `main`;
- [ ] CI release PR завершился успешно;
- [ ] в описании перечислены изменения, риски и способ отката;
- [ ] результаты этого checklist зафиксированы комментарием в release PR;
- [ ] merge выполняется только после явного решения мейнтейнера.

## 7. Deployment source

После merge release PR проверить GitHub Actions и Pages:

- [ ] production workflow завершил шаг публикации `dist` через `peaceiris/actions-gh-pages`;
- [ ] ветка `gh-pages` получила новый deployment commit после merge в `main`;
- [ ] `gh-pages/index.html` содержит статический Astro HTML;
- [ ] `gh-pages/index.html` не содержит `_framework/blazor.webassembly.js` и Blazor error shell;
- [ ] в `gh-pages` присутствуют `404.html`, `robots.txt`, `sitemap.xml` и `CNAME`;
- [ ] GitHub Pages использует источник `gh-pages`, путь `/` и статус `built`;
- [ ] custom domain в Pages и `gh-pages/CNAME` равен `luiza.estate`.

Настройку Pages можно проверить через GitHub CLI:

```bash
gh api repos/Brutich/LuizaEstate.Web/pages \
  --jq '{build_type, source, cname, status}'
```

Для текущей branch-based конфигурации ожидаются `build_type: legacy`, ветка `gh-pages`, путь `/` и статус `built`.

`gh-pages` генерируется автоматически. Не исправляйте production ручным редактированием этой ветки.

## 8. После production deployment

На `https://luiza.estate` повторить:

- [ ] сайт открывается по HTTPS на custom domain;
- [ ] главная возвращает HTTP 200 и содержит Astro marker либо ожидаемый статический HTML;
- [ ] live HTML не содержит `_framework/blazor.webassembly.js`, `.wasm` или Blazor error shell;
- [ ] главная корректна на desktop и mobile;
- [ ] CTA и контактные ссылки работают;
- [ ] legacy URL перенаправляются, неизвестный URL показывает 404;
- [ ] доступны `/robots.txt` и `/sitemap.xml`;
- [ ] title, canonical и structured data соответствуют release;
- [ ] в консоли браузера нет новых ошибок.

Учитывайте CDN-кэш GitHub Pages. При сомнениях повторите запрос с cache-busting query parameter и заголовком `Cache-Control: no-cache`.

## Фиксация результата

Добавьте в release PR короткий комментарий:

```text
Smoke test: PASS / FAIL
Дата:
Проверил:
Build/CI:
Desktop:
Mobile:
Routes/404:
CTA/contacts:
SEO files/metadata:
gh-pages deployment:
Production check:
Замечания:
```