import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../dist/", import.meta.url);
const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  "service-page/index.html",
  "service-page/бесплатная-консультация/index.html",
];

await Promise.all(requiredFiles.map((path) => access(new URL(path, root))));

const index = await readFile(new URL("index.html", root), "utf8");
const requiredIndexContent = [
  "Луиза Алиниседова",
  "Юрист-брокер с 25-летним опытом",
  "https://luiza.estate/",
  "application/ld+json",
  "G-9C9EZBF53F",
  "tel:+74957715514",
  "mailto:atlas-com@yandex.ru",
  "https://t.me/Luiza_real_estate",
  "https://t.me/Luiza_estate_official",
  "https://www.instagram.com/luiza_estate/",
  "https://vk.com/lsedova2019",
  "aria-label=\"Написать Луизе в Telegram\"",
  "aria-label=\"Telegram-канал Luiza Estate\"",
];

for (const value of requiredIndexContent) {
  if (!index.includes(value)) {
    throw new Error(`dist/index.html is missing required content: ${value}`);
  }
}

for (const forbidden of [
  "SearchAction",
  "blog-feed.xml",
  "blazor.webassembly.js",
  "https://t.me/+7-Qh5us1_043ZTgy",
]) {
  if (index.includes(forbidden)) {
    throw new Error(`dist/index.html contains forbidden content: ${forbidden}`);
  }
}

const jsonLdScripts = [
  ...index.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
];

if (jsonLdScripts.length === 0) {
  throw new Error("dist/index.html does not contain JSON-LD");
}

let jsonLdDocuments;
try {
  jsonLdDocuments = jsonLdScripts.map((match) => JSON.parse(match[1]));
} catch (error) {
  throw new Error(`dist/index.html contains invalid JSON-LD: ${error.message}`);
}

const graph = jsonLdDocuments.flatMap((document) => document["@graph"] ?? [document]);

function requireEntity(type, id) {
  const entity = graph.find((item) => item["@type"] === type && item["@id"] === id);
  if (!entity) {
    throw new Error(`JSON-LD is missing ${type} with @id ${id}`);
  }
  return entity;
}

const website = requireEntity("WebSite", "https://luiza.estate/#website");
const person = requireEntity("Person", "https://luiza.estate/#luiza-alinisedova");
const realEstateAgent = requireEntity(
  "RealEstateAgent",
  "https://luiza.estate/#real-estate-agent",
);

if (website.publisher?.["@id"] !== realEstateAgent["@id"]) {
  throw new Error("WebSite publisher is not linked to RealEstateAgent");
}

if (person.worksFor?.["@id"] !== realEstateAgent["@id"]) {
  throw new Error("Person is not linked to RealEstateAgent through worksFor");
}

if (realEstateAgent.employee?.["@id"] !== person["@id"]) {
  throw new Error("RealEstateAgent is not linked to Person through employee");
}

if (person.name !== "Луиза Алиниседова") {
  throw new Error("JSON-LD Person name must use the confirmed Russian spelling");
}

const serializedJsonLd = JSON.stringify(jsonLdDocuments);
for (const forbidden of [
  '"address"',
  '"aggregateRating"',
  '"review"',
  "https://t.me/+7-Qh5us1_043ZTgy",
]) {
  if (serializedJsonLd.includes(forbidden)) {
    throw new Error(`JSON-LD contains forbidden or unconfirmed data: ${forbidden}`);
  }
}

const offerCount = realEstateAgent.hasOfferCatalog?.itemListElement?.length ?? 0;
if (offerCount !== 11) {
  throw new Error(`JSON-LD must contain 11 confirmed service offers, found ${offerCount}`);
}

for (const path of requiredFiles.filter((path) => path.startsWith("service-page/"))) {
  const redirect = await readFile(new URL(path, root), "utf8");
  for (const value of ["noindex, follow", "https://luiza.estate/", "url=/", "href=\"/\""]) {
    if (!redirect.includes(value)) {
      throw new Error(`${path} is missing redirect safeguard: ${value}`);
    }
  }
}

async function assertNoBlazorArtifacts(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await assertNoBlazorArtifacts(path);
      continue;
    }

    if (/\.(?:wasm|dll)$/i.test(entry.name) || entry.name === "blazor.webassembly.js") {
      throw new Error(`Unexpected Blazor artifact: ${path}`);
    }
  }
}

await assertNoBlazorArtifacts(fileURLToPath(root));
console.log("Static output, contacts, and JSON-LD verification passed.");
