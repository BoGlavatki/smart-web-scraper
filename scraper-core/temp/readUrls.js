import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataRoot = resolve(__dirname, '../data');

export function readUrlsFromFile(urlPath) {
    var urls = [];
    try {
        const data = fs.readFileSync(urlPath, 'utf-8');
        urls = data.split('\n');
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
    return urls;
}

export function generateDirectoryName(url) {
    let dirName = url.replace(/^https?:\/\//, '');
    dirName = dirName.replace(/[\/:?&=]/g, '_');
    dirName = dirName.replace(/_+$/, '');
    return dirName;
}

export async function createFolderUrls(url) {
    const folderName = generateDirectoryName(url);
    const folderPath = resolve(dataRoot, folderName);
    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Verzeichnis erstellt: /data/${url}`);
            fs.writeFileSync(resolve(folderPath, `${folderName}_Properties.json`), JSON.stringify({}, 2), 'utf8');
        } catch (error) {
            console.error(`Fehler beim Erstellen des Verzeichnisses ./data/${url}:`, error);
        }
    }
}
