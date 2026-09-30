const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle0' });

  // Scroll down step by step to trigger all whileInView animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total document height:', totalHeight);

  for (let y = 0; y <= totalHeight; y += 400) {
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await new Promise((r) => setTimeout(r, 120));
  }

  // Scroll back to top to let everything settle in view
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));

  const outPath = path.join(__dirname, 'public', 'fullpage-complete.png');
  await page.screenshot({
    path: outPath,
    fullPage: true
  });

  await browser.close();
  console.log('Saved screenshot to:', outPath);
})();
