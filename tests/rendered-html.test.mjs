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
  assert.match(html, /<title>Dheepak Karan — ECE Academic Portfolio/);
  assert.match(html, /Machine Learning · Computer Vision · Algorithms/i);
  assert.match(html, /research and teaching opportunities/i);
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
  assert.match(html, /Fortune 250 US insurance company/i);
  assert.match(html, /3 backend services/i);
  assert.match(html, /20\+ REST endpoints/i);
  assert.match(html, /42% lower p95 latency/i);
  assert.match(html, /80% line coverage/i);
  assert.match(html, /120\+ automated tests/i);
  assert.doesNotMatch(html, /30% API performance gain|25% lower database latency|20% faster response time|85% recommendation accuracy gain/i);
  assert.match(html, /Research &amp; Teaching Interests/i);
  assert.match(html, /Resource-efficient machine learning/i);
  assert.match(html, /Algorithms for networked systems/i);
  assert.match(html, /Intelligent engineering systems/i);
  assert.match(html, /Academic Preparation/i);
  assert.match(html, /Selected Projects/i);
  assert.match(html, /3D CAD/i);
  assert.match(html, /View all[\s\S]{0,40}4[\s\S]{0,40}projects/i);
  assert.match(html, /href="\/projects"/i);
  assert.doesNotMatch(html, /Petrol-to-Electric Vehicle Conversion/i);
  assert.match(html, /Teaching &amp; Academic Service/i);
  assert.match(html, /AI for India/i);
  assert.match(html, /100,000 aspirants/i);
  assert.match(html, /Community School Volunteer/i);
  assert.match(html, /Departmental Sports Coordinator/i);
  assert.match(html, /Academic &amp; Professional Background/i);
  assert.match(html, /Additional Leadership/i);
  assert.match(html, /Concentration: Machine Learning, Computer Vision &amp; Algorithms/i);
  assert.match(html, /Academic Preparation/i);
  assert.match(html, /EECE 5644/i);
  assert.match(html, /Introduction to Machine Learning and Pattern Recognition/i);
  assert.match(html, /EECE 5644 Introduction to Machine Learning and Pattern Recognition \(A\)/i);
  assert.match(html, /97\.14%/i);
  assert.match(html, /EECE 7205/i);
  assert.match(html, /EECE 7205 Fundamentals of Computer Engineering \(A\)/i);
  assert.match(html, /95\.25%/i);
  assert.match(html, /EECE 5668/i);
  assert.match(html, /EECE 5668 Large Language Models/i);
  assert.match(html, /IE 7374/i);
  assert.match(html, /IE 7374 Machine Learning Operations/i);
  assert.ok(html.indexOf("Research &amp; Teaching Interests") < html.indexOf("Academic Preparation"));
  assert.ok(html.indexOf("Academic Preparation") < html.indexOf("Selected Projects"));
  assert.ok(html.indexOf("Teaching &amp; Academic Service") < html.indexOf("Academic &amp; Professional Background"));
  assert.match(html, /Technical Skills/i);
  assert.match(html, /Fine-tuning an 8B model when compute is the constraint/i);
  assert.match(html, /3\.926/);
  assert.match(html, /4,415/);
  assert.match(html, /57\.05 to 12\.40/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /https:\/\/github\.com\/dheepakkaran/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/dheepakkaran/);
  assert.match(html, /GitHub profile/i);
  assert.match(html, /LinkedIn profile/i);
  assert.match(html, /My full name is/i);
  assert.match(html, /Dheepak Karan<br\/>Elumalai Santhakumari/i);
  assert.doesNotMatch(html, /Let(?:&apos;|')s talk about|RA\/TA opportunities and academic collaboration/i);
  assert.match(html, /Have a research or teaching opportunity\? Let(?:&apos;|')s connect\./i);
  assert.doesNotMatch(html, /resume-preview\.png/i);
  assert.match(html, />Resume<\/a>/i);
  assert.doesNotMatch(html, /Resume · PDF/i);
  assert.match(html, /Thanks for considering my work\. Click to download\./i);
  assert.doesNotMatch(html, /\[Résumé\]|>Résumé<\/a>/i);
  assert.doesNotMatch(html, /Certification preview|href="\/academics#certifications"/i);
  assert.equal((html.match(/role="tooltip"/g) ?? []).length, 5);
  assert.doesNotMatch(html, />Credly</i);
  assert.doesNotMatch(html, /Zero to Signal|cinematic retelling|What have I built|What do I bring to the table/i);
  assert.doesNotMatch(html, /857[^<]{0,10}339[^<]{0,10}6410/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders the professor-facing projects page", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Projects — Dheepak Karan/);
  assert.match(html, /Selected Projects/i);
  assert.doesNotMatch(html, /Algorithm &amp; Problem-Solving Practice/i);
  assert.doesNotMatch(html, /LeetCode solved problem statistics/i);
  assert.match(html, /GitHub Activity/i);
  assert.match(html, /\d+ contributions[\s\S]*in the last year/i);
  assert.match(html, /aria-label="\d+ GitHub contributions by dheepakkaran in the last year/i);
  assert.match(html, /href="https:\/\/github\.com\/dheepakkaran"/i);
  assert.ok(html.indexOf("Selected Projects") < html.indexOf("GitHub Activity"));
  assert.match(html, /Northeastern University/i);
  assert.match(html, /3\.926 CGPA/i);
  assert.match(html, /Multilingual LLM Fine-Tuning/i);
  assert.match(html, /FairShare-WiFi/i);
  assert.match(html, /PLC Stator Water Cooling/i);
  assert.match(html, /Petrol-to-Electric Vehicle Conversion/i);
  assert.match(html, /Anna University · Chennai, India/i);
  assert.match(html, /DC\/DC converter/i);
});

test("keeps the previous work URL as a projects alias", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<title>Projects — Dheepak Karan/);
});

test("server-renders the dedicated academics page", async () => {
  const response = await render("/academics");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Academics — Dheepak Karan/);
  assert.match(html, /Graduate Coursework/i);
  assert.match(html, /Teaching &amp; Academic Service/i);
  assert.match(html, /Algorithm &amp; Problem-Solving Practice/i);
  assert.doesNotMatch(html, /Teaching Preparation/i);
  assert.match(html, /97\.14% · A/i);
  assert.match(html, /95\.25% · A/i);
  assert.match(html, /David Brady/i);
  assert.match(html, /Naveen Sapavath/i);
  assert.match(html, /Weiyan Shi/i);
  assert.match(html, /Ramin Mohammadi/i);
  assert.match(html, /Registered/i);
  assert.match(html, /Community School Volunteer/i);
  assert.match(html, /<h2>Certifications<\/h2>/i);
  assert.match(html, /IBM AI Engineering Professional Certificate/i);
  assert.match(html, /IBM Data Science Professional Certificate/i);
  assert.match(html, /AWS Educate Machine Learning Foundations/i);
  assert.match(html, /Cisco Cybersecurity Foundations/i);
  assert.equal((html.match(/role="tooltip"/g) ?? []).length, 9);
  assert.match(html, /src="https:\/\/www\.credly\.com\/embedded_badge\/bd3c360a-3770-4ffd-8a59-e831b1cc8245"/i);
  assert.match(html, /src="https:\/\/www\.credly\.com\/embedded_badge\/a2494e8e-f248-4e97-9a4c-b4bcf836f5b8"/i);
  assert.match(html, /src="https:\/\/www\.credly\.com\/embedded_badge\/362f2ea3-6477-4a34-b022-84106387ffd7"/i);
  assert.match(html, /src="https:\/\/www\.credly\.com\/embedded_badge\/05ecc8a0-69ca-47a9-97c3-d261fa2fa190"/i);
  assert.equal((html.match(/class="credly-badge-frame"/g) ?? []).length, 4);
  assert.doesNotMatch(html, /cdn\.credly\.com\/assets\/utilities\/embed\.js|data-share-badge-id/i);
  assert.match(html, /aria-label="LeetCode solved problem statistics"/i);
  assert.match(html, /Languages:/i);
  assert.match(html, /Frequent topics:/i);
  assert.match(html, /Recent accepted problems/i);
  assert.match(html, /href="https:\/\/leetcode\.com\/u\/___ka__ran___\/"/i);
  assert.ok(html.indexOf("Graduate Coursework") < html.indexOf("<h2>Certifications</h2>"));
  assert.ok(html.indexOf("<h2>Certifications</h2>") < html.indexOf("Teaching &amp; Academic Service"));
  assert.ok(html.indexOf("Teaching &amp; Academic Service") < html.indexOf("Algorithm &amp; Problem-Solving Practice"));
});

test("keeps the previous coursework URL as an academics alias", async () => {
  const response = await render("/coursework");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<title>Academics — Dheepak Karan/);
});

test("server-renders the dedicated engineering notes page", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Engineering Notes — Dheepak Karan/);
  assert.match(html, /Engineering notes/i);
  assert.match(html, /Northeastern University/i);
  assert.doesNotMatch(html, /Certifications/i);
  assert.match(html, /Short technical essays about practical decisions/i);
  assert.match(html, /Working principle/i);
  assert.match(html, /Fine-tuning an 8B model when compute is the constraint/i);
  assert.match(html, /Performance work starts with the path a request actually takes/i);
  assert.match(html, /Fairness is a system property/i);
});

test("ships the professor-focused academic layout, metadata and accessibility fallbacks", async () => {
  const [layout, profileHeader, certificationsComponent, contributions, practice, page, projectsPage, academicsPage, courseworkAlias, courseworkTable, blog, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/profile-header.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/certifications.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/github-contributions.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/leetcode-practice.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/projects/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/academics/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/coursework/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/coursework-table.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  for (const asset of [
    "../public/resume.pdf",
    "../public/og.png",
    "../public/husky-favicon.png",
    "../public/dheepak-karan.jpg",
    "../public/northeastern-monogram.png",
    "../public/signature-arrow-cursor.png",
    "../public/signature-arrow-cursor-small.png",
  ]) {
    await access(new URL(asset, import.meta.url));
  }

  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(layout, /husky-favicon\.png/);
  assert.match(page, /Skip to content/);
  assert.match(profileHeader, /download/);
  assert.match(profileHeader, /academic-intro/);
  assert.match(profileHeader, /academic-avatar/);
  assert.match(profileHeader, /academic-menu/);
  assert.match(profileHeader, /name-thought-trigger/);
  assert.match(profileHeader, /full-name-thought/);
  assert.match(profileHeader, /email-context-preview/);
  assert.match(profileHeader, /github-profile-preview/);
  assert.match(profileHeader, /linkedin-profile-preview/);
  assert.match(profileHeader, /resume-document-preview/);
  assert.match(profileHeader, /resume-preview-message/);
  assert.doesNotMatch(profileHeader, /CertificationPreviewLink|certification-preview/);
  assert.match(profileHeader, />Projects</);
  assert.match(profileHeader, />Academics</);
  assert.doesNotMatch(profileHeader, />Work<|>CV</);
  assert.match(page, /ProfileHeader active="home"/);
  assert.match(projectsPage, /ProfileHeader active="projects"/);
  assert.match(academicsPage, /ProfileHeader active="academics"/);
  assert.match(blog, /ProfileHeader active="notes"/);
  assert.match(page, /highlight-strip/);
  assert.match(page, /project-list/);
  assert.match(projectsPage, /projects\.map/);
  assert.doesNotMatch(projectsPage, /LeetCodePractice/);
  assert.match(projectsPage, /GitHubContributions/);
  assert.match(academicsPage, /LeetCodePractice/);
  assert.match(academicsPage, /Certifications/);
  assert.match(certificationsComponent, /certification-list/);
  assert.match(certificationsComponent, /certification-hover-preview/);
  assert.match(certificationsComponent, /certification-badge-image/);
  assert.match(certificationsComponent, /Provided by Credly/);
  assert.match(certificationsComponent, /credly-badge-frame/);
  assert.doesNotMatch(certificationsComponent, /embed\.js|data-share-badge-id/);
  assert.doesNotMatch(academicsPage, /teachingPreparation|Teaching Preparation/);
  assert.match(courseworkAlias, /academics\/page/);
  assert.match(courseworkTable, /coursework\.filter/);
  assert.match(contributions, /github\.com\/users\/\$\{username\}\/contributions/);
  assert.match(contributions, /revalidate:\s*21_600/);
  assert.match(contributions, /snapshotActiveDays/);
  assert.match(practice, /https:\/\/leetcode\.com\/graphql/);
  assert.match(practice, /___ka__ran___/);
  assert.match(practice, /solved:\s*67/);
  assert.match(practice, /easy:\s*37/);
  assert.match(practice, /medium:\s*30/);
  assert.match(practice, /revalidate:\s*21_600/);
  assert.match(page, /experience-list/);
  assert.match(page, /skills-list/);
  assert.doesNotMatch(page, /"use client"|useState|type="search"|SkillFlowField|CursorTrails|useMotionTemplate|pointermove|prompt-section|project-card|research-shell/);
  assert.doesNotMatch(blog, /SkillFlowField|CursorTrails|pointermove/);
  assert.doesNotMatch(page, /AudioContext|Enter silently|Enter with sound/);
  assert.doesNotMatch(page, /neyveli|chennai|cinematic/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.name-thought-bubble\s*\{[^}]*right:\s*calc\(100% \+ 24px\)[^}]*transform:\s*translate\(4px, -50%\)/is);
  assert.match(css, /body\s*\{[^}]*height:\s*100%[^}]*overflow:\s*hidden[^}]*background:\s*#fff/is);
  assert.match(css, /\.academic-page\s*\{[^}]*width:\s*min\(1080px,\s*calc\(100%\s*-\s*28px\)\)[^}]*height:\s*calc\(100dvh\s*-\s*28px\)[^}]*overflow-y:\s*auto[^}]*scrollbar-width:\s*none[^}]*border:\s*1px solid #c8c8c8/is);
  assert.match(css, /\.academic-page::\-webkit-scrollbar\s*\{\s*display:\s*none;\s*\}/i);
  assert.match(css, /\.academic-page\s*>\s*main[\s\S]*?width:\s*100%/is);
  assert.match(css, /\.academic-page\s*>\s*\.academic-menu[\s\S]*?width:\s*100%/is);
  assert.match(css, /\.academic-menu\s*\{[^}]*display:\s*flex[^}]*width:\s*100%[^}]*margin-bottom:\s*30px/is);
  assert.doesNotMatch(css, /\.academic-menu\s*\{[^}]*position:\s*fixed/is);
  assert.match(css, /@media\s*\(max-width:\s*620px\)[\s\S]*?\.academic-page\s*\{[^}]*width:\s*100%[^}]*height:\s*auto[^}]*overflow:\s*visible[^}]*border:\s*0/is);
  assert.doesNotMatch(css, /body::before/);
  assert.match(css, /#c8102e/i);
  assert.match(css, /\.github-day\.level-4\s*\{[^}]*#c8102e/is);
  assert.match(css, /signature-arrow-cursor-small\.png/);
  assert.doesNotMatch(css, /cursor:\s*pointer/);
  assert.match(css, /\.profile-preview:hover\s+\.profile-preview-card/);
  assert.match(css, /\.profile-preview:focus-within\s+\.profile-preview-card/);
  assert.doesNotMatch(css, /\.github-heatmap-(?:scroll|layout)\s*\{[^}]*overflow-x/is);
  assert.match(css, /pointer:\s*fine/);
  assert.doesNotMatch(css, /skill-flow-field|--blue|violet|glow|box-shadow/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
