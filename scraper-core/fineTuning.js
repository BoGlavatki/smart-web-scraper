import OpenAI from "openai";
import fs from 'fs'


const openai = new OpenAI({
    apiKey: "sk-None-C2D5AiI8F2XD32eACscWT3BlbkFJeOODjCEzM7ZjSfYokrRI"
    // apiKey: "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"
})


var id = "file-KY2B9MrWZfUoubFcgnuhzyX7";
let jobId = "ftjob-uVZM26PDle5xf3OjFLk0WDwp"

async function upload(){
    const file = await openai.files.create({
        file: fs.createReadStream('./jsonFineTuning.jsonl'),
        purpose: 'fine-tune'
    })
    console.log(file)
}

async function getFineTuneStatus(jobId) {
    try {
        const jobStatus = await openai.fineTuning.jobs.retrieve(jobId);
        console.log('Fine-tune job status:', jobStatus);
    } catch (error) {
        console.error('Error retrieving fine-tune job status:', error);
    }
}
async function fineTune(trainingDatei){
    const finetune = openai.fineTuning.jobs.create({
training_file: trainingDatei,
 model: 'gpt-3.5-turbo-0125',
 hyperparameters: {
    n_epochs: 4,
    batch_size: 5,
    learning_rate_multiplier: 1.5
}
    });

    console.log("MODEL: ", (await finetune).model);
    console.log("JobID: ", (await finetune).id);
    console.log("fine_tuned_model: ", (await finetune).fine_tuned_model);
    console.log("trained_tokens: ", (await finetune).trained_tokens);
    console.log("hyperparameters: ", (await finetune).hyperparameters);
    console.log("organization_id: ", (await finetune).organization_id);
    console.log("log: ", (await finetune).log);
}


async function retrieveFile(fileId) {
    try {
        const response = await openai.files.retrieve(fileId);
        console.log('Datei-Informationen:', response.data);

        return response.data; // Gib die Datei-Informationen zurück
    } catch (error) {
        console.error('Fehler beim Abrufen der Datei:', error.response ? error.response.data : error.message);
    }
}

async function downloadFile(fileId) {
    try {
        // Schritt 1: Abrufen der Datei-Informationen
        const fileInfo = await retrieveFile(fileId);

        if (!fileInfo || !fileInfo.id) {
            console.error('Fehler: Keine Datei-URL gefunden.');
            return;
        }

        // Schritt 2: Herunterladen der Datei-Inhalte
        const fileContent = await openai.files.download(fileInfo.id);
        const writer = fs.createWriteStream(`./${fileInfo.filename}`);
        writer.write(fileContent.data);

        writer.on('finish', () => {
            console.log('Datei erfolgreich heruntergeladen und gespeichert.');
        });

        writer.on('error', (error) => {
            console.error('Fehler beim Speichern der Datei:', error);
        });

        writer.end();
    } catch (error) {
        console.error('Fehler beim Abrufen oder Herunterladen der Datei:', error);
    }
}

const fileId = 'file-7oB3z2ijZsHtHQIrfM5fQ1pj'; 
// downloadFile(fileId);



// fineTune(id)
// upload();
getFineTuneStatus('ftjob-JRkyUkKJj8d1l0R6Okb04wiD');
