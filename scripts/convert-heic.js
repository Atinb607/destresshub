import fs from 'fs/promises';
import path from 'path';
import heicConvert from 'heic-convert';

const DIRECTORIES = [
  path.join(process.cwd(), 'public', 'Gallery', 'Photos'),
  path.join(process.cwd(), 'public', 'Gallery', 'Moments')
];

async function convertHeicFiles() {
  console.log('--- HEIC to JPG Conversion Script ---');
  let convertedCount = 0;
  let skippedCount = 0;

  for (const dir of DIRECTORIES) {
    try {
      const files = await fs.readdir(dir);
      
      for (const file of files) {
        if (file.toLowerCase().endsWith('.heic')) {
          const heicPath = path.join(dir, file);
          const jpgFileName = file.replace(/\.heic$/i, '.jpg');
          const jpgPath = path.join(dir, jpgFileName);

          try {
            // Check if JPG already exists
            await fs.access(jpgPath);
            console.log(`Skipping: ${jpgFileName} already exists.`);
            skippedCount++;
          } catch {
            // File does not exist, so convert
            console.log(`Converting: ${file} -> ${jpgFileName}...`);
            const inputBuffer = await fs.readFile(heicPath);
            const outputBuffer = await heicConvert({
              buffer: inputBuffer,
              format: 'JPEG',
              quality: 0.8
            });

            await fs.writeFile(jpgPath, outputBuffer);
            console.log(`Successfully converted ${file}`);
            convertedCount++;
          }
        }
      }
    } catch (err) {
      console.error(`Error processing directory ${dir}:`, err.message);
    }
  }

  console.log('-------------------------------------');
  console.log(`Done! Converted: ${convertedCount}, Skipped: ${skippedCount}`);
}

convertHeicFiles();
