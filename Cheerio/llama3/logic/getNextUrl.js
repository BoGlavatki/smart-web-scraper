import {analyseNextLinkWithLLM} from './analyseNextLinkWithLLM.js'
import {compareUrls} from './nextUrlValidation.js'


export async function getNextUrl(availableUrls, visitedUrls, missingProperties, domain) {
    const urls = availableUrls.filter(url => !visitedUrls.includes(url));
    // console.log("Urls in getNextUrl: " + urls);
    // console.log("Missing properties: " + missingProperties);
    var nextLink = await analyseNextLinkWithLLM(urls, missingProperties); // todo
    console.log("NextLink: " + nextLink);
    nextLink = compareUrls(nextLink, domain)
    return nextLink;
}