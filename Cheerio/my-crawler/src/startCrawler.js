import { startCrawler } from './main.js';
import { readUrlsFromFile, createFolderUrls } from '../../temp/readUrls.js'
import { getCleanSource } from '../../logic/getCleanSource.js'
import { analysing } from './logicScreenshots/analysingScreenshot.js';
import {getPropertiesFromLLMResponse} from '../../logic/cleanPropertiesFromLLM.js'
import {storePropertiesForDomain} from './logicScreenshots/storePropertiesForDomain.js'
import { getAllUrls } from '../../logic/getAllUrls.js';
import { getNextUrl } from '../../logic/getNextUrl.js';
import fs from 'fs';
import { cleanUrls } from '../.././logic/cleanedUrls.js';


//Verzeichnis mit urls lesen
const startDomains = readUrlsFromFile('../../startURLS/urls.txt');
const startTime = performance.now();
for (const domain of startDomains) {

    console.log("Domain... wird gelesen ......" + domain)
    // createFolderUrls(domain);
    let missingProperties = JSON.parse(fs.readFileSync('../../jsonRefScreenshot.json'));
    let instructionsSystem = fs.readFileSync('./instruct.txt');
    let collectedProperties = {};
    let availableUrls = [];
    let visitedUrls = [];
    let url = domain;

    while (url) {

        visitedUrls.push(url);
        console.log("Visited Urls Count: " + visitedUrls.length);

        const cleanHtml = await  getCleanSource(url);

        // on first run: create a list of all links on this page
        if(visitedUrls.length === 1) {
            const urlsFromQuellcode = getAllUrls(cleanHtml); 
            availableUrls = await cleanUrls(urlsFromQuellcode, domain);
            
        }

        // //Get Screenshot from current url
        const imageBase64 = await startCrawler(url);

        const response = await analysing(imageBase64, JSON.stringify(missingProperties), instructionsSystem);


        const {propertiesReceivedFromThisUrl, missingPropertiesForUrl} = await getPropertiesFromLLMResponse(response); // todo (filter empty values) (return object) - erledigt 
        console.log("Received Properties cleaned:  " + JSON.stringify(missingPropertiesForUrl));


        // // merge properties collected in this run with properties filled in previous runs
        collectedProperties = Object.assign(collectedProperties, propertiesReceivedFromThisUrl);

        missingProperties = removeMatchingProperties(missingProperties, propertiesReceivedFromThisUrl);
        availableUrls = availableUrls.filter(url => !visitedUrls.includes(url));


        // // // get next url / break loop
        url = await getNextUrl(availableUrls, visitedUrls, missingPropertiesForUrl, domain);

        // // for now, break after maximum of 3 visited urls per domain
        if (visitedUrls.length > 4) {
            break;
        }

    }
    // store info in json file per domain
     storePropertiesForDomain(domain, collectedProperties); //toDo - erledigt
}
const endTime = performance.now();
console.log(`myMethod benötigte ${endTime - startTime} Millisekunden.`);
fs.appendFileSync("token_usage_log.txt", `Dazu benötigte Zeit:  ${endTime - startTime}, Modell: gpt-4o`);
function removeMatchingProperties(a, b) {
    for (let key in b) {
        if (a.hasOwnProperty(key)) {
            delete a[key];
        }
    }
    return a;
}