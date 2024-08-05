
import fs from 'fs'
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';



export function cleanHtml(html){


// const htmlContent = fs.readFileSync('html.txt', 'utf8');
const htmlContent = html;

const window = new JSDOM(htmlContent).window;
const DOMPurify = createDOMPurify(window);

const cleanHTML = DOMPurify.sanitize(htmlContent);

// Funktion zum Entfernen aller Klassen
function removeAllClasses(document) {
    const elements = document.querySelectorAll('[class], [style], [width], [height]');
    elements.forEach(element => {
        element.removeAttribute('class');
        element.removeAttribute('style');
        element.removeAttribute('width');
        element.removeAttribute('height');
    });
  }
  
  // Klassen aus dem bereinigten HTML-Inhalt entfernen
  const { document } = new JSDOM(cleanHTML).window;
  removeAllClasses(document);
// Ergebnis als String
const resultHTML = document.documentElement.outerHTML;
//console.log('clenaHtml: '+resultHTML);
return resultHTML;
}