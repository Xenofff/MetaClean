import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const publicDir = join(import.meta.dirname, "..", "public");
const svgBuffer = readFileSync(join(publicDir, "favicon.svg"));

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function generate() {
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name));
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // Generate favicon.ico (16x16 and 32x32)
  const ico16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  // Write ICO file manually (simple 2-image ICO)
  const ico = createICO([
    { size: 16, data: ico16 },
    { size: 32, data: ico32 },
  ]);
  writeFileSync(join(publicDir, "favicon.ico"), ico);
  console.log("Generated favicon.ico (16x16 + 32x32)");

  console.log("\nAll favicons generated successfully!");
}

function createICO(images: { size: number; data: Buffer }[]) {
  const numImages = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + numImages * dirEntrySize;

  let dataOffset = dirSize;
  const imageDataBuffers: Buffer[] = [];

  for (const img of images) {
    const pngData = img.data;
    // ICO stores PNG data directly for modern icons
    imageDataBuffers.push(pngData);
    dataOffset += pngData.length;
  }

  const totalSize = dirSize + imageDataBuffers.reduce((a, b) => a + b.length, 0);
  const ico = Buffer.alloc(totalSize);

  // ICO header
  ico.writeUInt16LE(0, 0); // Reserved
  ico.writeUInt16LE(1, 2); // Type: ICO
  ico.writeUInt16LE(numImages, 4); // Number of images

  // Directory entries
  let imageOffset = dirSize;
  for (let i = 0; i < numImages; i++) {
    const entryOffset = headerSize + i * dirEntrySize;
    const img = images[i];
    const pngData = imageDataBuffers[i];

    ico.writeUInt8(img.size === 256 ? 0 : img.size, entryOffset); // Width
    ico.writeUInt8(img.size === 256 ? 0 : img.size, entryOffset + 1); // Height
    ico.writeUInt8(0, entryOffset + 2); // Color palette
    ico.writeUInt8(0, entryOffset + 3); // Reserved
    ico.writeUInt16LE(1, entryOffset + 4); // Color planes
    ico.writeUInt16LE(32, entryOffset + 6); // Bits per pixel
    ico.writeUInt32LE(pngData.length, entryOffset + 8); // Data size
    ico.writeUInt32LE(imageOffset, entryOffset + 12); // Data offset

    imageOffset += pngData.length;
  }

  // Image data
  let imgDataOffset = dirSize;
  for (const buf of imageDataBuffers) {
    buf.copy(ico, imgDataOffset);
    imgDataOffset += buf.length;
  }

  return ico;
}

generate().catch(console.error);
