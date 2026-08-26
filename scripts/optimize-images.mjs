import sharp from "sharp";

const socialCard =
  "/Users/dheepakkaran/.codex/generated_images/01a039e0-1e26-77e0-8150-f3b80fd50299/exec-c94d4c69-3eee-4841-bafd-0f968ba78893.png";

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
