# Editorial landing concept (v1)

**Status:** design exploration / interactive reference, **not an approved production page**.

This folder preserves a standalone interactive HTML prototype of a proposed Luiza Estate homepage in the *Modern Editorial Luxury* direction.

## Files

- [index.html](index.html) — standalone HTML prototype with embedded CSS, JavaScript and example images. No build or local server required. Google Fonts are an optional online dependency; fallback fonts work offline.
- [desktop.jpg](desktop.jpg) and [mobile.jpg](mobile.jpg) — compressed screenshots for quick review.

## Preview

![Desktop preview](desktop.jpg)

![Mobile preview](mobile.jpg)

Download `index.html` and open it in a desktop or mobile browser. The GitHub source viewer does not execute HTML, so use the downloaded file to see the layout and interactions.

The prototype includes responsive navigation, service details, an interactive deal timeline, FAQ and a contact dialog. The contact form uses a `mailto:` draft rather than a backend endpoint and does **not** submit or store personal data. The timeline shares a single CSS coordinate (`--track-y`) for the line and dots.

## Limitations

- Copy, imagery, offers and visual styling are **proposals**. Verify facts, positioning, contacts and legal wording before production use.
- Interior images are illustrative and **do not depict verified real estate listings**.
- This is deliberately separate from Astro source and is **not deployed** at `luiza.estate`.
- A future implementation should use Astro components and the existing site's accessibility, performance, consent and analytics conventions instead of treating the HTML mockup as production-ready code.

## Relationship to project documentation

- [Homepage and site structure](../../../product/site-structure.md)
- [Product vision](../../../product/vision.md)
- [Implementation issue](https://github.com/Brutich/LuizaEstate.Web/issues/49)

Review visual and content decisions first. Only then create a separate implementation Issue/PR for the actual Astro homepage.
