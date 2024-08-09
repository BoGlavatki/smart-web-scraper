import OpenAI from "openai";
import fs from 'fs';


export async function analysing(html, instructions, instructionsSystem) {
  const apiKeyFromFile = fs.readFileSync('./apiKey.txt');

console.log("Der Code wird analisiert....")
  let i = 0;
  while (i < 5) {
    console.log("*")
    i++;
  }



  async function requestOpenAI(html, instructions, instructionsSystem) {
    const openai = new OpenAI({
      apiKey: apiKeyFromFile
    });

    const response = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0125:personal::9r8F2vrT',
      messages: [
        {
          "role": "system",

          "content": instructionsSystem + " " + instructions
        },
        {
          "role": "user",
          "content": html
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
    });


    if (response.usage) {
      const promptTokens = response.usage.prompt_tokens;
      const completionTokens = response.usage.completion_tokens;
      const totalTokens = response.usage.total_tokens;

      console.log(`Anzahl der Tokens im Input: ${promptTokens}`);
      console.log(`Anzahl der Tokens im Output: ${completionTokens}`);
      console.log(`Gesamtanzahl der Tokens: ${totalTokens}`);

      // Tokenanzahl in Datei schreiben
      const logEntry = `Input Tokens: ${promptTokens}, Output Tokens: ${completionTokens}, Total Tokens: ${totalTokens}\n`;
      fs.appendFileSync("token_usage_log.txt", logEntry);
    } else {
      console.warn("Keine Token-Informationen in der Antwort enthalten.");
    }
    return response.choices[0].message.content;
  }


  try {
      const response = await requestOpenAI(html, instructions, instructionsSystem);
      console.log("Rsponse wird zurück gegeben....");
      return response;
  } catch (error) {
      console.error('Error calling requestOpenAI:', error);
  }


  return response

}
