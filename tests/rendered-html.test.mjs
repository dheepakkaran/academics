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
  assert.match(html, /<title>Dheepak Karan — Software Engineer &amp; Technical Notes/);
  assert.match(html, /I build software for systems that/i);
  assert.match(html, /What do I bring to the table/i);
  assert.match(html, /What have I built/i);
  assert.match(html, /What am I thinking about/i);
  assert.match(html, /Fine-tuning an 8B model when compute is the constraint/i);
  assert.match(html, /3\.926/);
  assert.match(html, /4,415/);
  assert.match(html, /57\.05 to 12\.40/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /https:\/\/github\.com\/dheepakkaran/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/dheepakkaran/);
  assert.doesNotMatch(html, /Zero to Signal|cinematic retelling/i);
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
  ]) {
    await access(new URL(asset, import.meta.url));
  }

  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(component, /useReducedMotion/);
  assert.match(component, /Skip to selected work/);
  assert.match(component, /Download résumé/);
  assert.match(component, /useMotionTemplate/);
  assert.match(component, /pointermove/);
  assert.doesNotMatch(component, /AudioContext|Enter silently|Enter with sound/);
  assert.doesNotMatch(component, /neyveli|chennai|cinematic/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
