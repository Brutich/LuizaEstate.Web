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
- [ ] `sitemap.xml` содержит только каноническую главную страницу;
- [ ] `CNAME` содержит `luiza.estate`.

## 6. Release PR

- [ ] PR направлен из `develop` в `main`;
- [ ] CI release PR завершился успешно;
- [ ] в описании перечислены изменения, риски и способ отката;
- [ ] результаты этого checklist зафиксированы комментарием в release PR;
- [ ] merge выполняется только после явного решения мейнтейнера.

## 7. После production deployment

На `https://luiza.estate` повторить:

- [ ] GitHub Actions deployment завершился успешно;
- [ ] сайт открывается по HTTPS на custom domain;
- [ ] главная корректна на desktop и mobile;
- [ ] CTA и контактные ссылки работают;
- [ ] legacy URL перенаправляются, неизвестный URL показывает 404;
- [ ] доступны `/robots.txt` и `/sitemap.xml`;
- [ ] title, canonical и structured data соответствуют release;
- [ ] в консоли браузера нет новых ошибок.

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
Production check:
Замечания:
```
