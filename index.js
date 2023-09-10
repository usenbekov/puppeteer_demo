import http from 'http';
import * as scraper from './scraper.js';

(async () => {
  let scrapedHtml = 'Try again later...';
  http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.end(scrapedHtml);
  
  }).listen(8080);

  scrapedHtml = await scrapeAll();
  setInterval(async () => scrapedHtml = await scrapeAll(), 60*60*1000);
})();

async function scrapeAll() {
  const browser = await scraper.launchBrowser();
  const [stories, jobs] = await Promise.all([
    scraper.getTopStories(browser),
    scraper.getJobs('Software Engineer', browser)
  ]);
  await browser.close();
  return `
    <h2>Top Stories</h2>
    <ul>${stories.map(e => linkToHtml(e.title, e.url)).join('')}</ul>

    <h2>Jobs</h2>
    <ul>${jobs.map(e => linkToHtml(e.title, e.url)).join('')}</ul>
  `;
}

const linkToHtml = (title, url) => {
  return `<li>
    <a target="_blank" href="${url}">
      ${title}
    </a>
  </li>`;
}

