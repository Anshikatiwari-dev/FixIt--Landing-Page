const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle0' });

  // Click on "Refrigerator" category card to open modal preselected
  const categoryCards = await page.$$('div.cursor-pointer');
  console.log('Found category cards:', categoryCards.length);

  // Click the scan button or a category card
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('h3'));
    const fridgeCard = cards.find(h => h.textContent.includes('Refrigerator'));
    if (fridgeCard) {
      fridgeCard.closest('div.cursor-pointer').click();
    }
  });

  await new Promise(r => setTimeout(r, 600));

  // Take screenshot of step 2 (Capture modal)
  await page.screenshot({
    path: path.join(__dirname, 'public', 'modal-step2.png')
  });
  console.log('Saved modal-step2.png');

  // Click "Next: Describe Problem"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('Next: Describe Problem'));
    if (nextBtn) nextBtn.click();
  });

  await new Promise(r => setTimeout(r, 600));

  // Take screenshot of step 3 (Describe modal)
  await page.screenshot({
    path: path.join(__dirname, 'public', 'modal-step3.png')
  });
  console.log('Saved modal-step3.png');

  // Click "Diagnose with AI"
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const diagBtn = btns.find(b => b.textContent.includes('Diagnose with AI'));
    if (diagBtn) diagBtn.click();
  });

  // Wait for 3.2s for simulated AI diagnosis
  await new Promise(r => setTimeout(r, 3400));

  // Take screenshot of step 5 (AI result)
  await page.screenshot({
    path: path.join(__dirname, 'public', 'modal-result.png')
  });
  console.log('Saved modal-result.png');

  await browser.close();
  console.log('MODAL FLOW TESTED SUCCESSFULLY!');
})();
