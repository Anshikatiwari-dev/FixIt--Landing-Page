const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Landing Page
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1280, height: 900 });
  await page1.goto('http://localhost:3005', { waitUntil: 'networkidle0' });

  const totalHeight1 = await page1.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= totalHeight1; y += 400) {
    await page1.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await new Promise((r) => setTimeout(r, 100));
  }
  await page1.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));

  const landingPath = path.join(__dirname, 'public', 'landing-updated.png');
  await page1.screenshot({ path: landingPath, fullPage: true });
  console.log('Saved landing-updated.png');
  await page1.close();

  // 2. Bookings Page
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1280, height: 900 });
  await page2.goto('http://localhost:3005/bookings', { waitUntil: 'networkidle0' });

  const totalHeight2 = await page2.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= totalHeight2; y += 400) {
    await page2.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await new Promise((r) => setTimeout(r, 100));
  }
  await page2.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));

  const bookingsPath = path.join(__dirname, 'public', 'bookings-dark.png');
  await page2.screenshot({ path: bookingsPath, fullPage: true });
  console.log('Saved bookings-dark.png');
  await page2.close();

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
})();
