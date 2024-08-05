
  
export function getPropertiesFromLLMResponse(responsePromptObj){
    var responsePromptObject = JSON.parse(responsePromptObj);
    var missingPropertiesForUrl = {}
    var propertiesReceivedFromThisUrl = {};
    for (var key in responsePromptObject) {
        if (responsePromptObject[key] !== '') {
            propertiesReceivedFromThisUrl[key] = responsePromptObject[key];
            // console.log(key + ": " + newJsonPropertiesObject[key]);
        }
        if(responsePromptObject[key] === ''){
            missingPropertiesForUrl[key] = responsePromptObject[key];
        }
    }
    return {propertiesReceivedFromThisUrl, missingPropertiesForUrl};
}
