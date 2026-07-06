import {filterJson} from './jsonParser.js'
import {createFolderUrls} from './readUrls.js'

createFolderUrls('https://campinghof-bartl.de/')




var jsonbj1 = {}
var jsonObjRes; 
const urls = ['https://campinghof-bartl.de/preise', 'https://campinghof-bartl.de/ferienwohnung', 'https://campinghof-bartl.de/sanitaerraeume']

urls.forEach(elemnt => {

    function test(elemnt, jsonbj){
        if(jsonbj == null){
            jsonbj1 = filterJson(jsonbj,elemnt);
        }
        //.... Berabeitung
        
        jsonbj1 = analysePrompt(jsonbj1); 
        jsonbj1 = filterJson(jsonbj1,elemnt);
    
        if(jsonbj1 === ''){
            return console.log('Analyse der webseite ' + elemnt + ' fertig... ')
        }
        if(jsonbj1 !== ''){
            test(elemnt, jsonbj1);
        }

   }


})

const responsePromptObj = `
{
  "name": "Campinghof Bartl",
  "Kategorie-Campingplatz": true,
  "Kategorie-Wohnmobilstellplatz": "",
  "Adresse": "",
  "telefonNummer": "0171-174 98 58",
  "E-Mail": "kontakt@campinghof-bartl.de",
  "urlsBidler": "https://i0.wp.com/campinghof-bartl.de/wp-content/uploads/2023/07/cropped-Collage-Bartl1-2.png?w=1200&ssl=1,https://i0.wp.com/campinghof-bartl.de/wp-content/uploads/2023/07/cropped-Collage-Bartl1-2.png?resize=300%2C80&ssl=1,https://i0.wp.com/campinghof-bartl.de/wp-content/uploads/2023/07/cropped-Collage-Bartl1-2.png?resize=1024%2C273&ssl=1,https://i0.wp.com/campinghof-bartl.de/wp-content/uploads/2023/07/cropped-Collage-Bartl1-2.png?resize=768%2C205&ssl=1",
  "Beschreibungstext": "Campinghof Bartl is a small, tranquil campground located in the Leipzig Neuseenland area. It offers a peaceful setting for relaxation and easy access to the nearby Leipzig lake landscape.",
  "lageWasser": true,
  "lageInDerBergen": false,
  "lageInDerStadt": false,
  "ausstattungFishing": "",
  "ausstattungHiking": "",
  "ausstattungSightseeing": "",
  "ausstattungMountainbiking": "",
  "ausstattungWindsurfing": "",
  "ausstattungSwimming": "",
  "motorbiking": "",
  "vantage_point": "",
  "beachvolleyball": "",
  "diving": "",
  "kitesurfing": "",
  "skiing": "",
  "surfing": "",
  "boating": "",
  "golf": "",
  "minigolf": "",
  "tennis": "",
  "skateboarding": "",
  "table_tennis": "",
  "volleyball": "",
  "basketball": "",
  "canoeing": "",
  "climbing": "",
  "gesprochene_Sprachen": "",
  "Betriebszeiten": "",
  "Check-In": "",
  "Check-Out": "",
  "UnterkunftsmöglichkeitenPKW": "",
  "UnterkunftsmöglichkeitenWohnmobil": "",
  "UnterkunftsmöglichkeitenWohnwagen": "",
  "UnterkunftsmöglichkeitenLKW": "",
  "UnterkunftsmöglichkeitenZelt": "",
  "UnterkunftsmöglichkeitenMiet-Unterkunft": "",
  "Anzahl_der_Stellplätze": ""
}`;

function getPropertiesFromLLMResponse(responsePromptObj){
    var responsePromptObject = JSON.parse(responsePromptObj);
    var missingPropertiesForUrl = {}
    var newJsonPropertiesObject = {};
    for (var key in responsePromptObject) {
        if (responsePromptObject[key] !== '') {
            newJsonPropertiesObject[key] = responsePromptObject[key];
            // console.log(key + ": " + newJsonPropertiesObject[key]);
        }
        if(responsePromptObject[key] === ''){
            missingPropertiesForUrl[key] = responsePromptObject[key];
        }
    } return { newJsonPropertiesObject, missingPropertiesForUrl };
}

const { newJsonPropertiesObject, missingPropertiesForUrl } = getPropertiesFromLLMResponse(responsePromptObj);
console.log("JSON WITH PROPERTIES: ", JSON.stringify(newJsonPropertiesObject));
console.log("JSON MISSING PROPERTIES: ", JSON.stringify(missingPropertiesForUrl));
