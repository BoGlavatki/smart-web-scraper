import {compareUrls} from './nextUrlValidation.js'

// Funktion zum Überprüfen und Bereinigen von URLs
export function cleanUrls(urls, domain) {
    // Regex zur Überprüfung, ob die URL zur angegebenen Domain gehört
    const domainPattern = new RegExp(`^(https?:\\/\\/)?(www\\.)?${domain.replace('.', '\\.')}`);

    // Bereinigen der URLs
    const cleanedUrls = Array.from(new Set(
        urls.filter(url => {
            // Entfernen von Leerzeichen und leeren Einträgen
            if (typeof url !== 'string' || url.trim() === "" || url.trim() === "#") {
                return false;
            }

            // Beibehalten von relativen URLs (nicht Protokoll-relative)
            if (url.startsWith('/') && !url.startsWith('//')) {
                return true;
            }

            // Beibehalten von URLs, die zur angegebenen Domain gehören
            if (domainPattern.test(url)) {
                return true;
            }

            return false;
        })
    ));

    // Rückgabe der absolutierten und bereinigten URLs
    return compareUrls(cleanedUrls, domain);
}
