import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function optimizeWebpInPlace(filePath, quality = 78) {
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (outputBuffer.length < inputBuffer.length) {
      fs.writeFileSync(filePath, outputBuffer);
      console.log(`Optimized ${path.basename(filePath)}: ${(inputBuffer.length/1024).toFixed(1)} KB -> ${(outputBuffer.length/1024).toFixed(1)} KB`);
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
  }
}

async function run() {
  const assetsDir = path.join(rootDir, 'src', 'assets');
  const files = [
    'container-cafe.webp',
    'container-interior.webp',
    'home-interior.webp',
    'office-interior.webp',
    'salon-interior.webp',
    'modular-kitchen.webp',
    'turnkey.webp',
    'wardrobe.webp',
    'container-homes.webp',
    'false-ceiling-work.webp',
    'ACP-elevation.webp',
    'aluminium-partition.webp',
    'slogo.webp'
  ];

  for (const f of files) {
    const p = path.join(assetsDir, f);
    if (fs.existsSync(p)) {
      await optimizeWebpInPlace(p, 75);
    }
  }
  console.log('In-place WebP optimization finished!');
}

run();
