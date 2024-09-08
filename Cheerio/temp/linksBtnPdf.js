// import * as cheerio from 'cheerio';
// import axios from 'axios';


// const response = await axios.get("https://www.camping-kleinliebenau.de/");
// const html = response.data;

// const $ = cheerio.load(html);
// var hrefs = [];

// $('a').each((i, link)=>{
//     hrefs[i] = link.attribs.href;
// });
// hrefs.forEach((i,href)=>{
//     console.log(i);
// });

import * as cheerio from 'cheerio';
import axios from 'axios';

async function fetchSpecialLinks() {
    try {
        const response = await axios.get("https://www.camping-kleinliebenau.de/");
        const html = response.data;

        const $ = cheerio.load(html);
        const hrefs = [];
        const domain = "https://www.camping-kleinliebenau.de";

        $('a, span').each((i, element) => {
            let href = $(element).attr('href');
            const onclick = $(element).attr('onclick');
            const dataHref = $(element).attr('data-href');
            const dataUrl = $(element).attr('data-url');
            const innerText = $(element).text().toLowerCase();

            if (href) {
                if (!href.startsWith('http') && !href.startsWith('//')) {
                    href = domain + href;
                }
                hrefs.push(href);
            } else if (onclick) {
                const urlMatch = onclick.match(/https?:\/\/[^\s"]+/);
                if (urlMatch) {
                    hrefs.push(urlMatch[0]);
                }
            } else if (dataHref) {
                hrefs.push(dataHref);
            } else if (dataUrl) {
                hrefs.push(dataUrl);
            } else if (innerText.includes('download') || innerText.includes('preisliste')) {
                console.log("Potentieller Download-Link ohne href gefunden:", $(element).html());

                // Überprüfen des Eltern- oder Nachbarelements
                const parentOnClick = $(element).parent().attr('onclick');
                if (parentOnClick) {
                    const parentUrlMatch = parentOnClick.match(/https?:\/\/[^\s"]+/);
                    if (parentUrlMatch) {
                        hrefs.push(parentUrlMatch[0]);
                    }
                }
            }
        });

        hrefs.forEach(href => {
            console.log(href);
        });

    } catch (error) {
        console.error('Fehler beim Abrufen der Seite:', error);
    }
}

fetchSpecialLinks();
