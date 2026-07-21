import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';
import path from 'path';

(async () => {
  // Try to find Edge or Chrome on Windows
  let executablePath;
  try {
    executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  } catch (e) {
    console.log('Edge not found.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: "new",
    defaultViewport: { width: 1280, height: 900 }
  });

  const page = await browser.newPage();
  
  console.log('Navigating to local dev server...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll down until logo section is in view
  console.log('Scrolling to logo section...');
  await page.evaluate(() => {
    const el = document.querySelector('.why-hr-section');
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  });
  
  // Wait for any animations to finish (reveal up)
  await new Promise(r => setTimeout(r, 2000));
  
  const shotPath = path.join(process.cwd(), 'public', 'why-hr-screenshot.png');
  await page.screenshot({ path: shotPath });
  console.log('Screenshot saved to', shotPath);

  await browser.close();
})();
