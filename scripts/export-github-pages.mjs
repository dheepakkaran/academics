import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDirectory = path.join(projectRoot, "dist", "client");
const outputDirectory = path.join(projectRoot, "pages-dist");
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "academics";
const basePath = `/${repositoryName}`;
const siteOrigin = "https://dheepakkaran.github.io";

const routes = [
  ["/", "index.html"],
  ["/projects", "projects/index.html"],
  ["/academics", "academics/index.html"],
  ["/blog", "blog/index.html"],
  ["/work", "work/index.html"],
  ["/coursework", "coursework/index.html"],
];

function prepareHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\s+rel="modulepreload"[^>]*\/?>/gi, "")
    .replaceAll(`${siteOrigin}/`, `${siteOrigin}${basePath}/`)
    .replace(/\b(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
}

async function renderRoute(worker, route) {
  const response = await worker.fetch(
    new Request(`${siteOrigin}${route}`, {
      headers: {
        accept: "text/html",
        host: "dheepakkaran.github.io",
        "x-forwarded-host": "dheepakkaran.github.io",
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

  if (!response.ok) throw new Error(`Could not render ${route}: ${response.status}`);
  return prepareHtml(await response.text());
}

await rm(outputDirectory, { recursive: true, force: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

for (const [route, destination] of routes) {
  const outputPath = path.join(outputDirectory, destination);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await renderRoute(worker, route), "utf8");
}

const assetDirectory = path.join(outputDirectory, "assets");
for (const entry of await readdir(assetDirectory)) {
  if (!entry.endsWith(".css")) continue;
  const cssPath = path.join(assetDirectory, entry);
  const css = await readFile(cssPath, "utf8");
  await writeFile(cssPath, css.replaceAll("url(/", `url(${basePath}/`), "utf8");
}

await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");
await writeFile(
  path.join(outputDirectory, "404.html"),
  await readFile(path.join(outputDirectory, "index.html"), "utf8"),
  "utf8",
);

console.log(`GitHub Pages export created at ${outputDirectory}`);
