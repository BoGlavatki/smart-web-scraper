import * as cheerio from 'cheerio';
import fs from 'fs';
import { analysing } from './logic/withSourceCode.js';
import {readUrlsFromFile, createFolderUrls} from './temp/readUrls.js'
import {getPropertiesFromLLMResponse} from './logic/cleanPropertiesFromLLM.js'
import {getCleanSource} from './logic/getCleanSource.js'
import {storePropertiesForDomain} from './logic/storePropertiesForDomain.js'
import { getAllUrls } from './logic/getAllUrls.js';
import { getNextUrl } from './logic/getNextUrl.js';
import { cleanUrls } from './logic/cleanedUrls.js';

const startDomains = readUrlsFromFile('./startURLS/urls.txt');
const instructionsSystem = fs.readFileSync('./instructions/withSourceCode/instructionsPropmt.txt', 'utf8');
const startTime = performance.now();
for (const domain of startDomains) {
    
    console.log("Domain... wird gelesen ......" + domain)
    let missingProperties = JSON.parse(fs.readFileSync('./jsonRef.json', 'utf8'));
    let collectedProperties = {};
    let availableUrls = [];
    let visitedUrls = [];
    let url = domain;
    
    while(url) {
        
        visitedUrls.push(url);
        console.log("Visited Urls Count: " + visitedUrls.length);

        const cleanHtml = await  getCleanSource(url);
        console.log(cleanHtml);

        if(visitedUrls.length === 1) {
            const urlsFromQuellcode = getAllUrls(cleanHtml); 
            availableUrls = await cleanUrls(urlsFromQuellcode, domain);
            
        }
       
    
        const response = await analysing(cleanHtml, JSON.stringify(missingProperties), instructionsSystem);
        
        const {propertiesReceivedFromThisUrl, missingPropertiesForUrl} = await getPropertiesFromLLMResponse(response);

        collectedProperties = Object.assign(collectedProperties, propertiesReceivedFromThisUrl);

        missingProperties = removeMatchingProperties(missingProperties, propertiesReceivedFromThisUrl);
        availableUrls = availableUrls.filter(url => !visitedUrls.includes(url));

        url = await getNextUrl(availableUrls, visitedUrls, missingPropertiesForUrl, domain);

        if(visitedUrls.length > 3) {
            break;
        }
    }
    
    storePropertiesForDomain(domain, collectedProperties);
    
   
};
const endTime = performance.now();
console.log(`myMethod benötigte ${endTime - startTime} Millisekunden.`);
fs.appendFileSync("token_usage_log.txt", `Dazu benötigte Zeit:  ${endTime - startTime}, Modell: gpt-3.5-turbo-0125`);
function removeMatchingProperties(a, b) {
    for (let key in b) {
        if (a.hasOwnProperty(key)) {
            delete a[key];
        }
    }
    return a;
}