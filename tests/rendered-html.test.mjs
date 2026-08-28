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

test("server-renders the complete academic personal homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dheepak Karan — Research &amp; Engineering/);
  assert.match(html, /Software Engineer · Applied ML · Intelligent Systems/i);
  assert.match(html, /src="\/dheepak-karan\.jpg"/i);
  assert.match(html, /alt="Dheepak Karan"/i);
  assert.match(html, /Northeastern University/i);
  assert.match(html, /src="\/northeastern-monogram\.png"/i);
  assert.match(html, /Anna University/i);
  assert.match(html, /BE, Electrical &amp; Electronics Engineering/i);
  assert.match(html, /Jul 2022/i);
  assert.match(html, /Professional Experience/i);
  assert.match(html, /Software Engineer/i);
  assert.match(html, /Apr 2022 — Jul 2023/i);
  assert.match(html, /85% recommendation accuracy gain/i);
  assert.match(html, /Selected Engineering Work/i);
  assert.match(html, /3D CAD/i);
  assert.match(html, /View all[\s\S]{0,40}4[\s\S]{0,40}projects/i);
  assert.match(html, /href="\/work"/i);
  assert.doesNotMatch(html, /Petrol-to-Electric Vehicle Conversion/i);
  assert.match(html, /Leadership &amp; Honors/i);
  assert.match(html, /AI for India/i);
  assert.match(html, /100,000 aspirants/i);
  assert.match(html, /Community School Volunteer/i);
  assert.match(html, /Departmental Sports Coordinator/i);
  assert.match(html, /Experience &amp; Education/i);
  assert.match(html, /Concentration: Machine Learning, Computer Vision &amp; Algorithms/i);
  assert.match(html, /Graduate Courses/i);
  assert.match(html, /EECE 5644/i);
  assert.match(html, /Introduction to Machine Learning and Pattern Recognition/i);
  assert.match(html, /David Brady/i);
  assert.match(html, /97\.14%/i);
  assert.match(html, /EECE 7205/i);
  assert.match(html, /Naveen Sapavath/i);
  assert.match(html, /95\.25%/i);
  assert.equal((html.match(/Grade\s*(?:<!-- -->)?A/gi) ?? []).length, 2);
  assert.match(html, /EECE 5668/i);
  assert.match(html, /Weiyan Shi/i);
  assert.match(html, /IE 7374/i);
  assert.match(html, /Ramin Mohammadi/i);
  assert.match(html, /Registered/i);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/david-brady-a7191315/i);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/weiyan-s-8b2a3b86/i);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/ramin-madi/i);
  assert.ok(html.indexOf("Graduate Courses") < html.indexOf("Selected Engineering Work"));
  assert.ok(html.indexOf("Graduate Courses") < html.indexOf("Experience &amp; Education"));
  assert.match(html, /Technical Skills/i);
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

test("server-renders the complete engineering work page", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Engineering Work — Dheepak Karan/);
  assert.match(html, /Engineering Work/i);
  assert.match(html, /Northeastern University/i);
  assert.match(html, /3\.926 CGPA/i);
  assert.match(html, /Multilingual LLM Fine-Tuning/i);
  assert.match(html, /FairShare-WiFi/i);
  assert.match(html, /PLC Stator Water Cooling/i);
  assert.match(html, /Petrol-to-Electric Vehicle Conversion/i);
  assert.match(html, /Anna University · Chennai, India/i);
  assert.match(html, /DC\/DC converter/i);
});

test("server-renders the dedicated engineering notes page", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Engineering Notes — Dheepak Karan/);
  assert.match(html, /Engineering notes/i);
  assert.match(html, /Northeastern University/i);
  assert.match(html, /Credly/i);
  assert.match(html, /Short technical essays about practical decisions/i);
  assert.match(html, /Working principle/i);
  assert.match(html, /Fine-tuning an 8B model when compute is the constraint/i);
  assert.match(html, /Performance work starts with the path a request actually takes/i);
  assert.match(html, /Fairness is a system property/i);
});

test("ships the restrained academic layout, metadata and accessibility fallbacks", async () => {
  const [layout, profileHeader, page, work, blog, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/profile-header.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  for (const asset of [
    "../public/resume.pdf",
    "../public/og.png",
    "../public/icon.png",
    "../public/dheepak-karan.jpg",
    "../public/northeastern-monogram.png",
  ]) {
    await access(new URL(asset, import.meta.url));
  }

  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(page, /Skip to content/);
  assert.match(profileHeader, /download/);
  assert.match(profileHeader, /academic-intro/);
  assert.match(profileHeader, /academic-avatar/);
  assert.match(profileHeader, /academic-menu/);
  assert.match(page, /ProfileHeader active="home"/);
  assert.match(work, /ProfileHeader active="work"/);
  assert.match(blog, /ProfileHeader active="notes"/);
  assert.match(page, /highlight-strip/);
  assert.match(page, /project-list/);
  assert.match(work, /projects\.map/);
  assert.match(page, /experience-list/);
  assert.match(page, /skills-list/);
  assert.doesNotMatch(page, /"use client"|useState|type="search"|SkillFlowField|CursorTrails|useMotionTemplate|pointermove|prompt-section|project-card|research-shell/);
  assert.doesNotMatch(blog, /SkillFlowField|CursorTrails|pointermove/);
  assert.doesNotMatch(page, /AudioContext|Enter silently|Enter with sound/);
  assert.doesNotMatch(page, /neyveli|chennai|cinematic/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.academic-page/);
  assert.match(css, /#c8102e/i);
  assert.doesNotMatch(css, /skill-flow-field|--blue|violet|glow|box-shadow/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
