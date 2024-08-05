import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { cleanHtml } from './purifier.js';
import { analysing } from './withSourceCode.js';
import {readUrlsFromFile, createFolderUrls} from './readUrls.js'
import { filterJson } from './jsonParser.js';
var urls = [];

//Verzeichnis mit urls lesen
urls = readUrlsFromFile('./startURLS/urls.txt');

urls.forEach(async url => {
    createFolderUrls(url);
        
    const response = await axios.get(url);
    const html = response.data;

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
    const data = $('body').html();
    //Der Quellcode von Webseite wird von unnotige Code bereinigt.
    const cleanedHtml = cleanHtml(data)
    console.log(cleanedHtml);

    const jsonPrompt = filterJson()

    const res = await analysing(cleanedHtml, url);

    // console.log("Antwort von ChatGPT : ", res);
    // const x = String(res).charAt(0);

    // const startIndex = String(res).indexOf('{');

    // const extractedString = String(res).substring(startIndex);

   
});


