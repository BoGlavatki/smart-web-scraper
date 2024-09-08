import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';

const url = fs.readFileSync('./startURLS/url_1.txt', 'utf-8');
const response = await axios.get(url);
const html = response.data;

const $ = cheerio.load(html);
var hrefs = [];

$('a').each((i, link)=>{
    hrefs[i] = link.attribs.href;
});
hrefs.forEach((i,href)=>{
    console.log(i);
});