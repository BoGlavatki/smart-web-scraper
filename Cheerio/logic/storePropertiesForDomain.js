import fs from 'fs'

export function storePropertiesForDomain(domain, collectedProperties){

    const folderName = generateDirectoryName(domain);
 
        try {
            fs.mkdirSync(`./data/${folderName}`,{ recursive: true });
            console.log(`Verzeichnis erstellt: /data/${domain}`);
            fs.writeFileSync(`./data/${folderName}/${folderName}_Properties.json`, JSON.stringify(collectedProperties), 'utf8');
            
        } catch (error) {
            console.error(`Fehler beim Erstellen des Verzeichnisses ./data/${domain}:`, error);
        }
    

}

// Funktion, um Verzeichnisnamen aus URLs zu generieren
export function generateDirectoryName(domain) {
    // Entfernen des Protokolls (https:// oder http://)
    let dirName = domain.replace(/^https?:\/\//, '');
    // Ersetzen aller nicht-Dateinamenszeichen durch Unterstriche
    dirName = dirName.replace(/[\/:?&=]/g, '_');
    // Entfernen von eventuell am Ende hinzugefügten Unterstrichen
    dirName = dirName.replace(/_+$/, '');
    return dirName;
}
