// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from 'crawlee';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Ermittelt den Pfad zur aktuellen Datei
const __filename = fileURLToPath(import.meta.url);
import {convertToBase64} from './logicScreenshots/convertImageToBase64.js'
const __dirname = dirname(__filename);
var imageBase64;

const screenshotsDir = resolve(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }
// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, enqueueLinks, log, pushData }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);
        const screenshotPath = resolve(screenshotsDir, `${new Date().toISOString()}_screenshot.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true, width: 1024, height: 1024});
        log.info(`Screenshot saved to ${screenshotPath}`);
        imageBase64 = convertToBase64(screenshotPath);

        // Save results as JSON to ./storage/datasets/default
        await pushData({ title, url: request.loadedUrl });

        // Extract links from the current page
        // and add them to the crawling queue.
        await enqueueLinks();
    },
    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 1,
    // Uncomment this option to see the browser window.
    // headless: false,
});

// Add first URL to the queue and start the crawl.
export async function startCrawler(url){

await crawler.run([url]);

console.log("IN CRAWLER");

return imageBase64;
}