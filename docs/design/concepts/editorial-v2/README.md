# Editorial v2 — personal-brand landing concept

> **Design exploration / Draft.** This is not the production Astro homepage and not an approved marketing copy deck.

## Why v2

Editorial v1 demonstrated the visual language (warm ivory, deep green, copper details, editorial serif headlines). V2 keeps that foundation but prioritizes **the person behind the service**: Luiza Alinisedova, her verified 25+ years of experience, real estate and legal expertise, direct personal contact, and links to independent public profiles.

## Preview

Download [index.html](index.html) and open it in a modern browser; no build or app runtime required. The **official approved portrait** is embedded directly in the HTML. The About section uses a full-resolution **real interior photograph** from Unsplash (loaded over HTTPS); internet access is required to display this decorative photo. Google Fonts improves typography when online; system font fallback works offline.

The prototype features responsive navigation, expandable service descriptions, tabs for example customer situations, an interactive 4-step timeline, FAQ accordions and direct Telegram/telephone/email links.

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
4. The three situation tabs illustrate *possible client questions*, **not actual completed cases**.
5. The interactive process uses one CSS coordinate for timeline dots and the connecting line; they are centrally aligned.
6. Direct calls/Telegram replace the earlier non-submitting sample contact form. The mockup does not collect or process form data.
7. A persistent mobile contact bar reduces friction.

## Limitations and follow-up

- No invented client stories, promises, prices, case outcomes or review quotes.
- Service descriptions and process are still editorial proposals, not approved detailed terms of engagement.
- Do not use this HTML as an Astro drop-in or deploy directly. Any implementation requires separate scope and product approval, legal copy verification, accessibility/performance review, and analytics.
- Portrait is approved; decorative interior photography is **illustrative**, not a verified listing.
- About-section photograph: [Caroline Badran, “Dining table with vase and flowering branches”](https://unsplash.com/photos/dining-table-with-vase-and-flowering-branches-AH1qU8YkyaQ), published under the [Unsplash License](https://unsplash.com/license) (commercial reuse permitted, attribution appreciated). It is a third-party CDN asset for the standalone **prototype**, not yet a locally optimized production asset. During Astro migration, download the licensed image, optimize it and serve it locally, retaining this source credit.
- Suggested next stage: validate segment and preferred service priorities with Luiza, collect permissioned reviews and factual case studies; then implement the chosen structure as Astro components.

## Validation

Browser smoke checks at 1440px and 390px:
- No horizontal document overflow.
- Service expansion, situation tabs, 4-step timeline and mobile navigation respond to user actions.
- FAQ is built with native details/summary.
- Official portrait is embedded in the repository version of the prototype (the independent local preview may load that image from the production site).

Related: [Issue #51](https://github.com/Brutich/LuizaEstate.Web/issues/51), [Editorial v1 PR #50](https://github.com/Brutich/LuizaEstate.Web/pull/50).
