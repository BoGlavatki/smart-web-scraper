import fs from 'fs'
import {filterJson} from './jsonParser.js'



const jsonString = `{
"name":"Camping",
"age":"34",
"country":"1"
}`;
var newPromptObject = '{}';

var responseJson = filterJson(newPromptObject, 'https://campinghof-bartl.de');
console.log(responseJson);



// const jsonPromptRef = fs.readFileSync(`./jsonRef.json`, 'utf-8');
//     const jsonPromptRefObj = JSON.parse(jsonPromptRef);

// const jsonObj = JSON.parse(jsonString);



// for(const key in jsonPromptRefObj){
//     if(jsonObj[key] === ''){
//         newPromptObject[key] = jsonObj[key];
//     }
// }


    // console.log('JSON: ' + JSON.stringify(jsonPromptRefObj, null, 2));

    // const jsontString = JSON.stringify(jsonPromptRefObj);

    // console.log(jsontString);
