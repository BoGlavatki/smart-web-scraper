import fs from 'fs';
import { startCrawler } from '../../my-crawler/src/main.js';
import { readUrlsFromFile } from '../../temp/readUrls.js';
import { getCleanSource } from '../../logic/getCleanSource.js';
import { analysing } from '../../my-crawler/src/logicScreenshots/analysingScreenshot.js';
import { getPropertiesFromLLMResponse } from '../../logic/cleanPropertiesFromLLM.js';
import { storePropertiesForDomain } from '../../my-crawler/src/logicScreenshots/storePropertiesForDomain.js';
import { getAllUrls } from '../../logic/getAllUrls.js';
import { getNextUrl } from '../../logic/getNextUrl.js';
import { cleanUrls } from '../../logic/cleanedUrls.js';

const startDomains = readUrlsFromFile('./config/startURLS/urls.txt');
const startTime = performance.now();

for (const domain of startDomains) {
  console.log('Domain... wird gelesen ......' + domain);
  let missingProperties = JSON.parse(fs.readFileSync('./config/jsonRefScreenshot.json', 'utf8'));
  let instructionsSystem = fs.readFileSync('./config/prompts/screenshot/instruct.txt', 'utf8');
  let collectedProperties = {};
  let availableUrls = [];
  let visitedUrls = [];
  let url = domain;

  while (url) {
    visitedUrls.push(url);
    console.log('Visited Urls Count: ' + visitedUrls.length);

    const cleanHtml = await getCleanSource(url);

    if (visitedUrls.length === 1) {
      const urlsFromQuellcode = getAllUrls(cleanHtml);
      availableUrls = await cleanUrls(urlsFromQuellcode, domain);
    }

    const imageBase64 = await startCrawler(url);
    const response = await analysing(imageBase64, JSON.stringify(missingProperties), instructionsSystem);
    const { propertiesReceivedFromThisUrl, missingPropertiesForUrl } = await getPropertiesFromLLMResponse(response);

    console.log('Received Properties cleaned:  ' + JSON.stringify(missingPropertiesForUrl));
    collectedProperties = Object.assign(collectedProperties, propertiesReceivedFromThisUrl);
    missingProperties = removeMatchingProperties(missingProperties, propertiesReceivedFromThisUrl);
    availableUrls = availableUrls.filter((nextUrl) => !visitedUrls.includes(nextUrl));

    url = await getNextUrl(availableUrls, visitedUrls, missingPropertiesForUrl, domain);

    if (visitedUrls.length > 4) {
      break;
    }
  }

  storePropertiesForDomain(domain, collectedProperties);
}

const endTime = performance.now();
console.log(`myMethod benötigte ${endTime - startTime} Millisekunden.`);
fs.appendFileSync('./data/token_usage_log.txt', `Dazu benötigte Zeit:  ${endTime - startTime}, Modell: gpt-4o`);

function removeMatchingProperties(a, b) {
  for (const key in b) {
    if (a.hasOwnProperty(key)) {
      delete a[key];
    }
  }
  return a;
}
