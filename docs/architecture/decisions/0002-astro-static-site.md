# ADR 0002: Astro as the static public-site implementation

Status: Accepted

Date: 2026-07-11

Related issue: [#28](https://github.com/Brutich/LuizaEstate.Web/issues/28)

Supersedes the implementation described by the former Blazor WebAssembly project. Implements the
static-generation direction accepted in [ADR 0001](0001-public-site-rendering.md).

## Context

ADR 0001 selected generated static HTML as the near-term rendering architecture but deliberately
did not choose a generator. The current public site is small, content-led and hosted on GitHub
Pages. Its primary interactions are links to telephone, email and external messengers. It does not
need a request-time server, application state or a client UI framework.

The implementation should also remain understandable for one maintainer and predictable for AI
agents working through narrowly scoped Issues and Pull Requests.

## Decision

Use Astro 6 in static output mode with TypeScript in strict mode and ordinary CSS.

- Astro pages generate physical HTML at build time.
- Node.js 22 is the shared local and CI baseline.
- `package-lock.json` is committed and CI installs dependencies with `npm ci`.
- React, Vue, Svelte and other client UI frameworks are not part of the baseline.
- Client-side JavaScript is added only for a confirmed interactive requirement.
- Public content, navigation and contact actions work without JavaScript.
- GitHub Pages remains the production host and publishes the generated `dist` artifact.
- Route metadata is owned by typed Astro layouts rather than duplicated HTML fragments.
- A post-build script verifies important output contracts.

## Why Astro

Astro directly models the desired architecture: file-based public routes rendered to HTML, small
presentational components and optional client-side enhancement. It avoids shipping the .NET runtime
and a WebAssembly application for a site whose current behavior is primarily static.

The approach is suitable for agent-driven changes because route ownership is visible in the file
tree, component props are typed, builds are fast, and acceptance criteria can inspect deterministic
files under `dist`.

## Redirect and 404 constraints

GitHub Pages cannot provide arbitrary server-owned HTTP redirects. Legacy routes therefore generate
minimal HTML documents with `noindex`, canonical `/`, meta refresh and a normal link to the home
page. A real HTTP 301 requires a hosting or edge-routing change and is not implied by this decision.

Unknown paths use the generated `404.html`; the former SPA copy of `index.html` is removed.

## Consequences

Positive:

- crawlers and link-preview tools receive the primary content and metadata without executing an app;
- the browser no longer downloads Blazor, MudBlazor, `.wasm` or `.dll` assets;
- new public pages can receive their own HTML and metadata;
- the component and CSS foundation can be redesigned later without another platform migration;
- local and CI validation use a small set of deterministic npm commands.

Negative:

- existing Razor/MudBlazor components must be rewritten rather than reused;
- static GitHub Pages redirects remain weaker than HTTP redirects;
- backend-owned forms, authentication and personalized content require a separate service or a
  future hosting decision.

## Guardrails

- Stay on the stable Astro 6 release line for this migration; do not enable experimental features.
- Prefer semantic HTML and CSS over adding a client framework.
- Keep public facts and copy tied to confirmed product sources.
- Keep canonical routes, sitemap entries and metadata aligned.
- Treat a broad visual redesign as a separate Issue with its own product direction and screenshots.

## Validation

Implementation and future route changes must pass:

```bash
npm ci
npm run check
npm run build
```

The build must contain the expected HTML, 404, robots, sitemap and custom-domain files and must not
contain Blazor runtime artifacts.

## Revisit criteria

Revisit the static-only decision when the product needs first-party backend forms, server-side
validation, CRM-owned request handling, authenticated experiences, frequently changing personalized
content or server-controlled redirects and response headers.
