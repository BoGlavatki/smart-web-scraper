import fs from 'fs'
import {getCleanSource} from './logic/getCleanSource.js'

const cleanHtml = await  getCleanSource('https://campinghof-bartl.de/');
const jsonInstruction = fs.readFileSync('../llamJSON.json', 'utf-8');

const instructions = 'Read the source code of a website. The website is for a campground. Based on the content, you need to correctly fill in the following JSON object and return it. Please get back pure JSON string without any additional characters or explanations: like ```json ```. Please do not add ```json  vor dem { and ´´´after the}.';
const prompt = instructions + "\n " + jsonInstruction + "\n" + cleanHtml;

console.log(prompt);

async function Test() {
    let response = await fetch("http://127.0.0.1:8080/completion", {
        method: 'POST',
        body: JSON.stringify({
            prompt,
        })
    })
    console.log((await response.json()).content)
}

Test()