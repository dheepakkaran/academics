import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://portfolio.example${path}`, {
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

test("server-renders the complete academic engineering profile", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dheepak Karan — Research &amp; Engineering/);
  assert.match(html, /Software systems/i);
  assert.match(html, /Engineering that moves/i);
  assert.match(html, /Interactive skill field/i);
  assert.match(html, /Skills compress, connect and follow its flow/i);
  assert.match(html, /Research &amp; engineering/i);
  assert.match(html, /Search projects/i);
  assert.match(html, /Education &amp; experience/i);
  assert.match(html, /Engineering notes/i);
  assert.match(html, /Fine-tuning an 8B model when compute is the constraint/i);
  assert.match(html, /3\.926/);
  assert.match(html, /4,415/);
  assert.match(html, /57\.05 to 12\.40/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /https:\/\/github\.com\/dheepakkaran/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/dheepakkaran/);
  assert.doesNotMatch(html, /Zero to Signal|cinematic retelling|What have I built|What do I bring to the table/i);
  assert.doesNotMatch(html, /857[^<]{0,10}339[^<]{0,10}6410/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders the dedicated engineering notes page", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Engineering Notes — Dheepak Karan/);
  assert.match(html, /Technical notebook/i);
  assert.match(html, /Engineering notes/i);
  assert.match(html, /Contents/i);
  assert.match(html, /Working principle/i);
  assert.match(html, /Fine-tuning an 8B model when compute is the constraint/i);
  assert.match(html, /Performance work starts with the path a request actually takes/i);
  assert.match(html, /Fairness is a system property/i);
});

test("ships the skill flow field, metadata and accessibility fallbacks", async () => {
  const [layout, component, skillFlow, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PortfolioExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SkillFlowField.tsx", import.meta.url), "utf8"),
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
  assert.match(component, /SkillFlowField/);
  assert.match(component, /Skip to selected work/);
  assert.match(component, /download: true/);
  assert.match(component, /type="search"/);
  assert.doesNotMatch(component, /CursorTrails|useMotionTemplate|prompt-section|project-card|research-shell/);
  assert.match(skillFlow, /requestAnimationFrame/);
  assert.match(skillFlow, /pointermove/);
  assert.match(skillFlow, /visibilitychange/);
  assert.match(skillFlow, /prefers-reduced-motion/);
  assert.match(skillFlow, /compressionRadius/);
  assert.match(skillFlow, /pointer\.vx/);
  assert.doesNotMatch(component, /AudioContext|Enter silently|Enter with sound/);
  assert.doesNotMatch(component, /neyveli|chennai|cinematic/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /--black:\s*#0a0a0a/);
  assert.doesNotMatch(css, /--blue|violet|glow|box-shadow/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
