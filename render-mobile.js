const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle0' });

  // Scroll down step by step to trigger animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);

  for (let y = 0; y <= totalHeight; y += 300) {
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await new Promise((r) => setTimeout(r, 80));
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));

  const outPath = path.join(__dirname, 'public', 'mobile-complete.png');
  await page.screenshot({
    path: outPath,
    fullPage: true
  });

  await browser.close();
  console.log('Saved mobile screenshot to:', outPath);
})();
