import OpenAI from "openai";
import fs from 'fs';

const apiKeyFromFile = fs.readFileSync('./apiKey.txt');
export async function analyseNextLinkWithLLM(urls, missingProperties){
  
    const instructionsNextUrl = `You will receive a list of URLs from a camping site and a list of missing key-value pairs as a JSON object. Based on the missing key-value pairs, you need to determine which of the following link is most likely to contain the missing information. Please return a string of just one link. Please provide only one suitable link where most of the missing information can be found. The link to the privacy policy should be avoided. 
For example if in json: 
{
 "Adresse": "",
   "E-Mail": "",
   "ausstattungFishing": ""
}
And you can see that the keys 'Adresse' and 'E-Mail' can be found in the category 'Contact Information,' while 'ausstattungFishing' is under 'Facilities and Amenities' available at the campsite. You get back a link for 'Contact Information' "https://campinghof-bartl.de/kontakt-impressum" because it has more information that we are now searching for.
Please return only the link without any additional comments or characters, just one link as a string. 
Example: https://campinghof-bartl.de/

If you receive links that are incomplete, such as: /index.php, /index.php/news, /index.php/preise, /index.php/campingplatz, /index.php/campingplatz/anfahrt, and the domain name provided is https://neuseenland-camping.com, then you need to construct the full link using this domain. For example, https://neuseenland-camping.com/index.php/preise, and return these complete links.

This list of URLs has not been visited yet, and we are only allowed to access these URLs. It is forbidden to return https://campinghof-bartl.de if it is not in the list, and deriving URLs is also forbidden, such as taking https://campinghof-bartl.de/preise, https://campinghof-bartl.de/ferienwohnung, https://campinghof-bartl.de/sanitaerraeume, https://campinghof-bartl.de/datenschutz, https://campinghof-bartl.de/ausflugsziele-und-leihfahrrad to create or return https://campinghof-bartl.de. We only analyze the URLs from the list.`

  async function requestOpenAI(urls, missingProperties) {
//Make from Json a string 
const missingPropertiesString = JSON.stringify(missingProperties);
const urlsString = urls.join(', ');

// console.log('Properties from REQUEST_OPEN_AI METHOD.....' + missingPropertiesString);
console.log('Urls from REQUEST_OPEN_AI METHOD.....' + urlsString);
    const openai = new OpenAI({
      apiKey: apiKeyFromFile
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          "role": "system",
          
          "content": instructionsNextUrl 
        },
        {
          "role": "user",
          "content":"Links: " + urlsString + "\nJSON: " + missingPropertiesString + "Please provide a link without any additional characters and no comments, just the plain link."
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
    });

    return response.choices[0].message.content;
  }


  try {
      const response = await requestOpenAI(urls, missingProperties);
      console.log("Next link for visiting: " + response);
      return response;
  } catch (error) {
      console.error('Error calling requestOpenAI:', error);
  }


  return response

}