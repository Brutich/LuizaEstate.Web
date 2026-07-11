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
];

for (const value of requiredIndexContent) {
  if (!index.includes(value)) {
    throw new Error(`dist/index.html is missing required content: ${value}`);
  }
}

for (const forbidden of ["SearchAction", "blog-feed.xml", "blazor.webassembly.js"]) {
  if (index.includes(forbidden)) {
    throw new Error(`dist/index.html contains forbidden content: ${forbidden}`);
  }
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
console.log("Static output verification passed.");
