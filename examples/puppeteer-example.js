import puppeteer from 'puppeteer';

(async (searchValue) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Search
  await page.goto('https://google.com');
  await page.locator('textarea').fill(searchValue);
  await page.$eval('form', form => form.submit());

  // Go to the first link
  await page.waitForNavigation();
  await page.click(`div[data-async-context^="query:"] a`);

  // Get a screnshot
  await page.waitForNavigation();
  await page.screenshot({path: './screenshot.png'});

  await browser.close();

})("HackerNoon");
