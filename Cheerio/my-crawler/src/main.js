// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from 'crawlee';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { convertToBase64 } from './logicScreenshots/convertImageToBase64.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let imageBase64;

const screenshotsDir = resolve(__dirname, '../../data/screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks, log, pushData }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);
        const screenshotPath = resolve(screenshotsDir, `${new Date().toISOString()}_screenshot.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true, width: 1024, height: 1024 });
        log.info(`Screenshot saved to ${screenshotPath}`);
        imageBase64 = convertToBase64(screenshotPath);

        await pushData({ title, url: request.loadedUrl });
        await enqueueLinks();
    },
    maxRequestsPerCrawl: 1,
});

export async function startCrawler(url){
    await crawler.run([url]);
    console.log('IN CRAWLER');
    return imageBase64;
}
