import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function processDirectory(dirPath, options = {}) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath, options);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const baseName = path.basename(entry.name, ext);
        const outWebpPath = path.join(dirPath, `${baseName}.webp`);

        // Skip if already webp and original file is keep or if special
        console.log(`Optimizing: ${entry.name}...`);
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          let pipeline = image;
          if (metadata.width && metadata.width > 1920) {
            pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
          }

          await pipeline
            .webp({ quality: options.quality || 80, effort: 6 })
            .toFile(outWebpPath);

          const origSize = (fs.statSync(fullPath).size / 1024).toFixed(1);
          const newSize = (fs.statSync(outWebpPath).size / 1024).toFixed(1);
          console.log(`  -> Created ${baseName}.webp: ${origSize} KB -> ${newSize} KB (${Math.round((1 - newSize/origSize)*100)}% reduction)`);
        } catch (err) {
          console.error(`  Error processing ${entry.name}:`, err.message);
        }
      } else if (ext === '.webp') {
        // Check if existing webp is overly large (> 200KB) and can be re-compressed
        const curSize = fs.statSync(fullPath).size / 1024;
        if (curSize > 180) {
          console.log(`Re-compressing large webp: ${entry.name} (${curSize.toFixed(1)} KB)...`);
          try {
            const tempOut = path.join(dirPath, `${entry.name}.tmp.webp`);
            await sharp(fullPath)
              .webp({ quality: 78, effort: 6 })
              .toFile(tempOut);
            fs.renameSync(tempOut, fullPath);
            const newSize = (fs.statSync(fullPath).size / 1024).toFixed(1);
            console.log(`  -> Re-compressed ${entry.name}: ${curSize.toFixed(1)} KB -> ${newSize} KB`);
          } catch (err) {
            console.error(`  Error re-compressing ${entry.name}:`, err.message);
          }
        }
      }
    }
  }
}

async function run() {
  console.log('Starting asset optimization...');
  
  // 1. Optimize public/images (Hero slides & service banners)
  await processDirectory(path.join(rootDir, 'public', 'images'), { quality: 82 });
  
  // 2. Optimize public root images
  await processDirectory(path.join(rootDir, 'public'), { quality: 80 });

  // 3. Optimize src/assets
  await processDirectory(path.join(rootDir, 'src', 'assets'), { quality: 80 });

  console.log('Asset optimization completed successfully!');
}

run();
