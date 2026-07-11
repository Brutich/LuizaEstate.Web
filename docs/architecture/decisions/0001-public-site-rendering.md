# ADR 0001: Rendering architecture for the public site

Status: Accepted

Date: 2026-07-11

Related issue: [#16](https://github.com/Brutich/LuizaEstate.Web/issues/16)

## Context

Luiza Estate is currently a standalone Blazor WebAssembly application:

- the project uses `Microsoft.NET.Sdk.BlazorWebAssembly`;
- the app is published to GitHub Pages as static files from `publish/wwwroot`;
- `.github/workflows/deploy.yml` copies `index.html` to `404.html` as an SPA fallback;
- routing is handled by the client-side Blazor `Router`;
- public content is mostly on the home page, with planned service, about, contacts, case, FAQ and legal pages.

This keeps hosting almost free and deployment simple, but it also creates SEO and product limitations:

- the first HTML response mostly contains the app shell and loader instead of full page content;
- route-specific metadata is hard to serve before JavaScript runs;
- unknown URLs can behave like soft 404 pages because the static host fallback returns the app shell;
- each new canonical public page needs reliable HTML, metadata, canonical URL, sitemap entry and predictable direct loading;
- future lead capture, analytics and CRM integration may need backend capabilities, but those needs are not confirmed yet.

The SEO audit recommends moving public pages away from pure client-side rendering or introducing prerendering before building many separate indexed pages.

## Decision drivers

- SEO: crawlers and preview tools should receive useful HTML and route-specific metadata without executing the WebAssembly app.
- Performance: the first meaningful content should not wait for the full WebAssembly payload.
- Hosting cost: the current GitHub Pages setup is nearly free and should not be replaced with paid server hosting before there is a business reason.
- CI/CD complexity: the build should remain understandable for small agent PRs and maintainable by one maintainer.
- Future backend: the architecture should not block later forms, lead routing, CRM integration or server APIs.
- Correct route behavior: canonical pages, redirects and 404 behavior should become explicit instead of relying on SPA fallback.
- Migration risk: the transition should be split into small PRs and should not be coupled to the visual redesign.

## Options considered

### Option A: Blazor Web App with Static SSR

Migrate the public site to a Blazor Web App and use static server-side rendering for public pages, enabling interactive render modes only where needed later.

Benefits:

- strong SEO baseline because public pages are rendered as HTML on the server;
- route-specific metadata and status codes can be handled by the ASP.NET Core pipeline;
- good path to future backend features in the same .NET application;
- keeps Razor components as the primary UI model.

Costs and risks:

- requires an ASP.NET Core server at request time, so the current GitHub Pages hosting model is no longer enough;
- introduces hosting cost, runtime monitoring, deployment environment management and server operations;
- increases CI/CD complexity compared with publishing static files;
- may be premature while the site is mostly marketing content and backend requirements are still unclear.

Fit:

- best long-term option when lead capture, authenticated flows, CRM integration or server-owned redirects become important;
- too large as the immediate next step while the business site is still mostly static public content.

### Option B: Keep Blazor WebAssembly and add prerendering

Keep the current client app and add a prerendering step or hosted wrapper so crawlers receive initial HTML.

Benefits:

- preserves most existing components and app structure;
- can improve first HTML without a full rewrite;
- can keep the browser-side app model for interactive parts.

Costs and risks:

- standalone Blazor WebAssembly does not provide the desired server route semantics by itself;
- robust prerendering likely requires either a server host, custom static prerender tooling or a separate generation step;
- route-specific status codes and redirects remain awkward on GitHub Pages;
- may become a transitional architecture that still needs replacement later.

Fit:

- acceptable as a short migration bridge if it can generate static HTML per public route;
- not recommended as the final architecture if it only keeps the SPA fallback and app-shell-first behavior.

### Option C: Static generation of public pages

Generate physical static HTML for each public canonical route at build time and continue publishing to GitHub Pages. Keep Blazor WebAssembly only for genuinely interactive islands or postpone it until needed.

Benefits:

- gives crawlers useful HTML without requiring a request-time server;
- keeps GitHub Pages and the current low hosting cost;
- makes canonical public URLs explicit files or explicit generated routes;
- keeps CI/CD simpler than server hosting, while still allowing build-time checks for sitemap, metadata and links;
- works well for the next product stages, which are mostly content pages: home, services, about, contacts, cases, legal pages and FAQ.

Costs and risks:

- requires choosing and maintaining a static generation approach;
- dynamic features need separate patterns, such as external forms, serverless endpoints or a later backend;
- redirects remain limited on GitHub Pages compared with server middleware;
- existing Blazor components may need adaptation if they depend on browser-only APIs or runtime interactivity.

Fit:

- best near-term target for Luiza Estate because the public site is content-led, SEO matters now, and preserving low-cost static hosting matters.

### Option D: Keep the current architecture for a limited period

Continue with standalone Blazor WebAssembly and GitHub Pages SPA fallback.

Benefits:

- no migration cost;
- no hosting changes;
- lets the SEO Foundation Sprint finish quickly.

Costs and risks:

- does not solve app-shell-first HTML;
- does not solve route-specific metadata at request time;
- does not solve canonical route and 404 semantics;
- becomes riskier as soon as the site adds indexed service pages.

Fit:

- acceptable only as a short holding state while small SEO fixes and this ADR are completed.

## Decision

Use static generation of public canonical pages as the near-term target architecture.

The public site should move from "one WebAssembly SPA shell for all routes" to "generated static HTML per canonical public route" before adding multiple indexed service pages. GitHub Pages remains the default production host while the site is mostly public marketing content.

Blazor Web App with Static SSR is the preferred future upgrade path when the project needs request-time server behavior, such as backend-owned forms, CRM integration, authenticated flows, dynamic content, server-side redirects or richer status-code handling.

The current standalone Blazor WebAssembly architecture may remain temporarily while the SEO Foundation Sprint is completed, but it should not be treated as the target architecture for the next multi-page public site.

## Consequences

Positive:

- public pages can become crawlable static HTML while preserving cheap static hosting;
- the migration can be split by route instead of forcing a full platform rewrite;
- sitemap, canonical URLs and route-specific metadata can be checked during build or release;
- backend decisions can wait until there is a confirmed product need.

Negative:

- the project must choose and maintain a generation workflow;
- some component patterns may need to degrade gracefully without client-side interactivity;
- GitHub Pages will still be weaker than server hosting for redirects and advanced HTTP behavior;
- a later backend migration may still be required.

Neutral:

- this ADR does not pick the exact generator implementation. That should be decided in the first migration spike after validating constraints with the current components and deployment workflow.

## Transition plan

1. Finish the current SEO Foundation Sprint without changing runtime architecture in this ADR PR.
2. Resolve duplicate route policy in a small PR so the canonical public URL set is explicit.
3. Create a migration spike that generates static HTML for the home page and validates:
   - full first HTML content;
   - route-specific title, description, canonical and structured data;
   - compatibility with MudBlazor styles and current assets;
   - GitHub Pages deployment from generated output;
   - behavior for unknown URLs and `404.html`.
4. Replace the SPA fallback for public canonical pages with generated static output.
5. Add new service pages only after the generation workflow can produce page-specific HTML and metadata.
6. Keep interactive behavior minimal and progressive. If a feature needs runtime logic, decide whether it belongs in a small client-side island, an external service, a serverless endpoint or a future ASP.NET Core backend.
7. Revisit Blazor Web App with Static SSR before implementing first-party backend features.

## Risks

- Static generation may require custom tooling if the existing Blazor WebAssembly components are hard to render at build time.
- Keeping GitHub Pages may limit redirect and status-code behavior compared with ASP.NET Core middleware.
- A content-heavy site can outgrow ad hoc generation if routes, cases, FAQ and articles expand quickly.
- If backend requirements appear soon, the static-generation step could be a short-lived intermediate architecture.
- If analytics or forms are implemented through third-party scripts, privacy and reliability must be reviewed separately.

## Revisit criteria

Reconsider this decision when one or more of the following becomes true:

- the site needs first-party lead forms, CRM integration or server-side validation;
- the maintainer needs server-owned redirects, headers or exact HTTP status behavior that GitHub Pages cannot provide;
- the generated route set grows enough that static generation becomes hard to maintain;
- a confirmed budget exists for server hosting and monitoring;
- the project adds personalized, authenticated or frequently changing content;
- Microsoft Blazor tooling changes enough that a simpler official static output or SSR path becomes available for this use case.

## Validation expectations for future implementation

Any implementation PR that follows this ADR should verify:

- direct loading of every canonical public route;
- route-specific title, description, canonical URL and structured data;
- sitemap entries for all public canonical pages;
- no accidental indexing of duplicate, service, redirect or query-string URLs;
- a real 404 experience for unknown URLs within hosting constraints;
- successful restore, build and publish;
- production smoke checks after release.

## References

- [ASP.NET Core Blazor render modes](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-9.0)
- [ASP.NET Core Blazor hosting models](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-9.0)
- [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
