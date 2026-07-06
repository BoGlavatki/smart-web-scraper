
import * as cheerio from 'cheerio';

export function getAllUrls(cleanHtml) {
    const $ = cheerio.load(cleanHtml);
    var hrefs = [];

    $('a').each((i, link)=>{
        // todo: does it contain the host? if not add the host from the start url
        //   absolute: https://camping-leipzig.de/index.php/preise
        // camping-leipzig.de/campingplatz/
        // relativ:    /index.php/preise  -> camping-leipzig.de/index.php/preise
        // relativ2:  index.php/preise  -> camping-leipzig.de/campingplatz/index.php/preise
        
        //        -> tansform -> add host name
        hrefs[i] = link.attribs.href;
       
    });
    // console.log(hrefs);
    return hrefs;
}