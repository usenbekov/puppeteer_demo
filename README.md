# Puppeteer Demo

Simple Puppeteer example.

```node examples/puppeteer-example.js```
* Navigates to Google.com.
* Executes a search for "HackerNoon"
* Clicks on the first search result.
* Takes a screenshot.

```node index.js```
* It collects data from HackerNoon Top Stories and HackerNoon Jobs every hour,
* generates simple HTML content from this data,
* serves this HTML content when we receive an HTTP request.
