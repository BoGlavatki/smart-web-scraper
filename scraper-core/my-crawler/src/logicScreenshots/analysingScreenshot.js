import { OpenAI } from 'openai'
import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { requireOpenAiApiKey } from '../../../config/env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokenLogPath = resolve(__dirname, '../../../data/token_usage_log.txt');
const apiKeyFromEnv = requireOpenAiApiKey();

export async function analysing(imageBase64, instructions, instructionsSystem) {

async function requestOpenAI(imageBase64, instructions, instructionsSystem) {
    const openai = new OpenAI({
        apiKey: apiKeyFromEnv
      });
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: "system",
                    content: `${instructionsSystem}`,
                    },
                {
                    role: 'user',
                    content: [
                         {type: 'text', text: instructions},
                         
                         {type: 'image_url', image_url:{ "url":`data:image/png;base64,${imageBase64}`,
                        }}
                    ]
                       
                }
            ]
        });

    if (response.usage) {
        const promptTokens = response.usage.prompt_tokens;
        const completionTokens = response.usage.completion_tokens;
        const totalTokens = response.usage.total_tokens;
  
        console.log(`Anzahl der Tokens im Input: ${promptTokens}`);
        console.log(`Anzahl der Tokens im Output: ${completionTokens}`);
        console.log(`Gesamtanzahl der Tokens: ${totalTokens}`);
  
        const logEntry = `Input Tokens: ${promptTokens}, Output Tokens: ${completionTokens}, Total Tokens: ${totalTokens}\n`;
        fs.appendFileSync(tokenLogPath, logEntry);
      } else {
        console.warn("Keine Token-Informationen in der Antwort enthalten.");
      }
        return response.choices[0].message.content;
    }

  try {
      const response = await requestOpenAI(imageBase64, instructions, instructionsSystem);
      return response;
  } catch (error) {
      console.error('Error calling requestOpenAI:', error);
      return null;
  }
}
