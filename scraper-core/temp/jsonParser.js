
import fs from 'fs'
import { generateDirectoryName } from './readUrls.js';
var promptResponse;

export function filterJson(responsePromptObj, urlRef) {

    const nameDir = generateDirectoryName(urlRef);
    
    //Referenz JSON mit der Promptbefehele 
    const jsonPromptRef = fs.readFileSync(`./jsonRef.json`, 'utf-8');
    const jsonPromptRefObj = JSON.parse(jsonPromptRef);


    //Datei die wir erstellt und wahrscheinlich gespeichert haben.
    const jsonPromptOld = fs.readFileSync(`data/${nameDir}/${nameDir}Prompt.json`, 'utf8');
    const jsonPromptObjOld = JSON.parse(jsonPromptOld);

    //Erhaltene JSON von response ChatGPT
    var responsePromptObject = JSON.parse(responsePromptObj);
    
    //Neues leeres JSON Object um die fehlende key:value aufzufüllen
    var newPromptObject = {};

    //wenn das erste mal passiert muss der newJSONObject von reference JSon befüllt werden

    if (Object.keys(jsonPromptObjOld).length === 0 && Object.keys(responsePromptObject).length === 0) {

        newPromptObject = jsonPromptRefObj;

        return JSON.stringify(newPromptObject);
    }
    else if(responsePromptObject !== ''){
        for (key in responsePromptObject) {
            if(responsePromptObject != ''){
                jsonPromptObjOld[key] = responsePromptObject[key];
             }
             if(responsePromptObject === ''){
                newPromptObject[key] = jsonPromptRefObj[key];
             }
        }
        
        fs.writeFileSync(`./data/${nameDir}/${nameDir}_Prompt.json`, JSON.stringify(jsonPromptObjOld), 'utf-8' );
        return JSON.stringify(newPromptObject);
    }
    





}