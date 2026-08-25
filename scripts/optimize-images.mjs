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

const socialCard = `${generatedRoot}/exec-97358baa-74fe-4e9c-8fbb-a9e67fac23c3.png`;

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

await sharp(socialCard)
  .resize(512, 512, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile("public/icon.png");
