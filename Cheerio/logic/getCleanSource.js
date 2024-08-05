import * as cheerio from 'cheerio';
import { cleanHtml } from './purifier.js';
import axios from 'axios';

export async function getCleanSource(url) {
    const response = await axios.get(url);
    const html = response.data;
    // console.log("Domain... wird gelesen ......" + url)
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
    const data = $('body').html();
    // console.log(data);
    //Der Quellcode von Webseite wird von unnotige Code bereinigt.
    const cleanedHtml = cleanHtml(data)
    // console.log(cleanedHtml);
    
    return cleanedHtml;
}