import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const generatedRoot =
  "/Users/dheepakkaran/.codex/generated_images/01a039e0-1e26-77e0-8150-f3b80fd50299";

const scenes = [
  ["neyveli", `${generatedRoot}/exec-acb1b78c-1b4f-40a2-a3c5-867748e45bc3.png`],
  ["chennai", `${generatedRoot}/exec-91db0350-058c-4289-857e-8882fb0bcdb7.png`],
  ["boston", `${generatedRoot}/exec-c4b1f80a-922d-47af-b963-c4f6406b0a47.png`],
  ["language", `${generatedRoot}/exec-bc003289-9f31-489d-bb31-d57e2aafa688.png`],
];

const socialCard = `${generatedRoot}/exec-e6308842-e282-4133-a93b-1dce3cedf50b.png`;

await mkdir("public/scenes", { recursive: true });

for (const [name, input] of scenes) {
  for (const width of [1280, 1920]) {
    const resized = sharp(input).resize({ width, withoutEnlargement: true });
    await Promise.all([
      resized.clone().webp({ quality: 82, smartSubsample: true }).toFile(`public/scenes/${name}-${width}.webp`),
      resized.clone().avif({ quality: 54, effort: 5 }).toFile(`public/scenes/${name}-${width}.avif`),
    ]);
  }
}

await sharp(socialCard)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile("public/og.png");

const icon = Buffer.from(`
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="96" fill="#090d14"/>
    <rect x="54" y="54" width="404" height="404" rx="72" fill="none" stroke="#273140" stroke-width="4"/>
    <text x="256" y="300" fill="#f4f2ec" font-family="Arial, Helvetica, sans-serif" font-size="176" font-weight="700" letter-spacing="-12" text-anchor="middle">DK</text>
    <rect x="156" y="344" width="200" height="10" rx="5" fill="#ff6b4a"/>
  </svg>
`);

await sharp(icon)
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile("public/icon.png");
