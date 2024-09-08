import fs from 'fs'



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
}// Funktion, um Verzeichnisnamen aus URLs zu generieren
export function generateDirectoryName(url) {
    // Entfernen des Protokolls (https:// oder http://)
    let dirName = url.replace(/^https?:\/\//, '');
    // Ersetzen aller nicht-Dateinamenszeichen durch Unterstriche
    dirName = dirName.replace(/[\/:?&=]/g, '_');
    // Entfernen von eventuell am Ende hinzugefügten Unterstrichen
    dirName = dirName.replace(/_+$/, '');
    return dirName;
}


export async function createFolderUrls(url) {
    const folderName = generateDirectoryName(url);
    if (!fs.existsSync(`./data/${folderName}`)) {
        try {
            fs.mkdirSync(`./data/${folderName}`,{ recursive: true });
            console.log(`Verzeichnis erstellt: /data/${url}`);
            fs.writeFileSync(`./data/${folderName}/${folderName}_Properties.json`, JSON.stringify( {}, 2), 'utf8');
            
        } catch (error) {
            console.error(`Fehler beim Erstellen des Verzeichnisses ./data/${url}:`, error);
        }
    }
}

