import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: {
        accept: "text/html",
        host: "portfolio.example",
        "x-forwarded-host": "portfolio.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete professional portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dheepak Karan — Software &amp; Machine Learning Engineer/);
  assert.match(html, /Software Engineering · Machine Learning · Intelligent Systems/i);
  assert.match(html, /Safety-critical control for a 210 MW generator/i);
  assert.match(html, /Production systems designed for scale/i);
  assert.match(html, /An 8B model adapted for how people actually speak/i);
  assert.match(html, /Evaluating fairness under network congestion/i);
  assert.match(html, /3\.926/);
  assert.match(html, /4,415/);
  assert.match(html, /57\.05 to 12\.40/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /https:\/\/github\.com\/dheepakkaran/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/dheepakkaran/);
  assert.doesNotMatch(html, /857[^<]{0,10}339[^<]{0,10}6410/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("ships optimized assets, metadata and accessibility fallbacks", async () => {
  const [layout, component, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PortfolioExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  for (const asset of [
    "../public/resume.pdf",
    "../public/og.png",
    "../public/icon.png",
    "../public/scenes/neyveli-1280.avif",
    "../public/scenes/neyveli-1920.webp",
    "../public/scenes/chennai-1920.avif",
    "../public/scenes/boston-1920.webp",
    "../public/scenes/language-1920.avif",
  ]) {
    await access(new URL(asset, import.meta.url));
  }

  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(component, /useReducedMotion/);
  assert.match(component, /Skip to selected projects/);
  assert.match(component, /Download résumé/);
  assert.doesNotMatch(component, /AudioContext|Enter silently|Enter with sound/);
  assert.match(component, /loading="lazy"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
