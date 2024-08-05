import * as cheerio from 'cheerio';
import fs from 'fs';
import { analysing } from './logic/withSourceCode.js';
import {readUrlsFromFile, createFolderUrls} from './temp/readUrls.js'
import {getPropertiesFromLLMResponse} from './logic/cleanPropertiesFromLLM.js'
import {getCleanSource} from './logic/getCleanSource.js'
import {storePropertiesForDomain} from './logic/storePropertiesForDomain.js'
import { getAllUrls } from './logic/getAllUrls.js';
import { getNextUrl } from './logic/getNextUrl.js';

//Verzeichnis mit urls lesen
const startDomains = readUrlsFromFile('./startURLS/urls.txt');


startDomains.forEach(async domain => {
    
    console.log("Domain... wird gelesen ......" + domain)
    // createFolderUrls(domain);
    let missingProperties = JSON.parse(fs.readFileSync('./jsonRef.json'));
    let collectedProperties = {};
    let availableUrls = [];
    let visitedUrls = [];
    let url = domain;
    
    while(url) {
        
        visitedUrls.push(url);
        console.log("Visited Urls Count: "+visitedUrls.length);

        const cleanHtml = await  getCleanSource(url);


        // on first run: create a list of all links on this page
        if(visitedUrls.length === 1) {
            availableUrls = getAllUrls(cleanHtml);
        }
       
        //Get Screenshot from current url
        const screenschotFromCurrentUrl = await getScreenShotFromPlaywrightCrawlee(url); //ToDo
        // Store screenshot from current url to the folder  - ToDO
        
        // const response = await analysing(cleanHtml, JSON.stringify(missingProperties));
       

        const {propertiesReceivedFromThisUrl, missingPropertiesForUrl} = await getPropertiesFromLLMResponse(response); // todo (filter empty values) (return object) - erledigt 
        // console.log("Received Properties cleaned:  " + JSON.stringify(missingPropertiesForUrl));


        // merge properties collected in this run with properties filled in previous runs
        collectedProperties = Object.assign(collectedProperties, propertiesReceivedFromThisUrl);

        missingProperties = removeMatchingProperties(missingProperties, propertiesReceivedFromThisUrl);
        


        // // get next url / break loop
        url = await getNextUrl(availableUrls, visitedUrls, missingPropertiesForUrl, domain);

        // // for now, break after maximum of 3 visited urls per domain
        if(visitedUrls.length > 1) {
            break;
        }
    }
    


    // store info in json file per domain
    storePropertiesForDomain(domain, collectedProperties); //toDo - erledigt
    
   
});

function removeMatchingProperties(a, b) {
    for (let key in b) {
        if (a.hasOwnProperty(key)) {
            delete a[key];
        }
    }
    return a;
}




/**
 * Return the key-value JSON object where the values are the instructions sent to LLM. Keys that have already been filled will not be included. 
 * @returns object
 */
function getJsonPromptObject(collectedProperties) {
    let originalJsonPrompt = fs.readFileSync('./jsonRef.json');

    let promptData = removeCollectedPropertiesFromOriginalJson(originalJsonPrompt, collectedProperties);

    return promptData;
}