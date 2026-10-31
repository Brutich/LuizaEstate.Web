# Editorial v2 — personal-brand landing concept

> **Design exploration / Draft.** This is not the production Astro homepage and not an approved marketing copy deck.

## Why v2

Editorial v1 demonstrated the visual language (warm ivory, deep green, copper details, editorial serif headlines). V2 keeps that foundation but prioritizes **the person behind the service**: Luiza Alinisedova, her verified 25+ years of experience, real estate and legal expertise, direct personal contact, and links to independent public profiles.

## Preview

Download [index.html](index.html) and open it in a modern browser; no build or app runtime required. The **official approved portrait** is embedded directly in the HTML. The About section temporarily uses a user-supplied photo of olive branches via an external CDN for visual evaluation; internet access is required and hotlink availability is not guaranteed. Google Fonts improves typography when online; system font fallback works offline.

The prototype features responsive navigation, expandable service descriptions, a four-step process, FAQ accordions and direct Telegram/telephone/email links.

## Confirmed source facts

- Public name: **Луиза Алиниседова**.
- Role: **риелтор и юрист-брокер**; experience **25+ years**.
- Geography: Moscow and Moscow Oblast; services in Saint Petersburg and Kaliningrad; remote consultations elsewhere in Russia.
- Contact: `+7 495 771-55-14`, `atlas-com@yandex.ru`, [Telegram](https://t.me/Luiza_real_estate).
- Approved public portrait source: `public/img/luiza-02.jpg` (same repository), embedded in the mockup.
- Independent professional profile links: [Циан](https://www.cian.ru/agents/164114/) and [Домклик](https://agencies.domclick.ru/agent/866780). Ratings and quotations from reviews are **deliberately omitted**.

Source of truth: [Founder research](../../../product/discovery/founder-research.md) and public professional profiles (links above).

## Design choices

1. Hero immediately identifies Luiza by name, role, location, experience, with direct ways to reach her.
2. Four client-facing service categories separate selling, buying, complex transactions and legal checks.
3. Professional profiles allow visitors to check credentials and reviews on their respective platforms, without copying potentially stale ratings.
4. The About photo uses a larger circular CSS `clip-path` aligned vertically with the adjacent copy. A duplicate photo layer now uses an image-driven inline SVG alpha mask: a green-channel color key isolates foliage with softly antialiased edges, while a vertical gradient restricts the overlay to upper branches. This avoids the brittle hand-traced silhouette and the earlier curtain-background leak. The plain circular image remains visible if the decorative SVG layer is unavailable. The visual result depends on this particular photo's colors and needs verification against the actual CDN image in target browsers before production use.
5. The dark process and contact sections use two different inline SVG olive-branch silhouettes as decorative backgrounds. The process branch enters from the upper left; the contact branch rises from the lower right behind the contact cards. Both are `aria-hidden`, require no image downloads, and have reduced opacity on mobile.
6. The four-step process is intentionally static and concise.
7. Direct calls/Telegram replace the earlier non-submitting sample contact form. The mockup does not collect or process form data.
8. A persistent mobile contact bar reduces friction.

## Limitations and follow-up

- No invented client stories, promises, prices, case outcomes or review quotes.
- Service descriptions and process are still editorial proposals, not approved detailed terms of engagement.
- Do not use this HTML as an Astro drop-in or deploy directly. Any implementation requires separate scope and product approval, legal copy verification, accessibility/performance review, and analytics.
- The portrait is approved; other imagery is illustrative, not a verified listing.
- About-section image **(visual test only):** [user-supplied olive-branches photo](https://img.ltwebstatic.com/v4/j/spmp/2026/06/07/96/1780826463c519018503ece5ab357674a2667fe6c5_thumbnail_750x999.jpg), displayed from a third-party CDN. Licensing/redistribution rights and permanent availability are **not confirmed**. Do not migrate this source directly to production without permission and a suitable high-quality asset.
- Suggested next stage: validate segment and preferred service priorities with Luiza, collect permissioned reviews and factual case studies; then implement the chosen structure as Astro components.

## Validation

Browser smoke checks at 1440px and 390px:
- No horizontal document overflow.
- Service expansion and mobile navigation respond to user actions; the four-step timeline is static.
- FAQ is built with native details/summary.
- Circular About photo and masked branch overlay are experimental; browser and image-loading verification is needed before production migration.
- Official portrait is embedded in the repository version of the prototype (the independent local preview may load that image from the production site).

Related: [Issue #51](https://github.com/Brutich/LuizaEstate.Web/issues/51), [Editorial v1 PR #50](https://github.com/Brutich/LuizaEstate.Web/pull/50).
