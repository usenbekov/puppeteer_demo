import puppeteer, {Browser} from 'puppeteer';

/**
 * 
 * @returns {Browser}
 */
export async function launchBrowser() {
  return await puppeteer.launch();
}

/**
 * 
 * @param {Browser} browser
 * @returns {[{title: String, url: String}]}
 */
export async function getTopStories(browser) {
  const page = await browser.newPage();
  await page.goto('https://hackernoon.com/tagged/hackernoon-top-story');

  // Wait for articles
  await page.waitForSelector('main .story-card');

  // Get articles
  const res = [];
  const articles = await page.$$('main .story-card h2 a');
  for (const article of articles) {
    res.push(
      await article.evaluate(el => ({
        "title": el.textContent,
        "url": el.href,
      }))
    );
  }
  return res;
}

/**
 * 
 * @param {String} keyword
 * @param {Browser} browser
 * @returns {[{title: String, url: String}]}
 */
export async function getJobs(keyword, browser) {
  const page = await browser.newPage();
  await page.goto('https://jobs.hackernoon.com');

  // Search
  await page.locator('#search-jobkeyword input').fill(keyword);
  await page.click('button[type=submit]');

  // Wait for result
  await page.waitForSelector('.job-list-item');

  // Get jobs
  const res = [];
  const items = await page.$$('.job-list-item');
  for (const item of items) {
    res.push(
      await item.evaluate(el => ({
        "title": [
          el.querySelector('.job-name'),
          ...el.querySelectorAll('.desktop-view span')
        ].map(e => e.textContent).join(', '),
        "url": el.href,
      }))
    );
  }
  return res;
}
