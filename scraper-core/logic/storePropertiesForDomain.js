import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataRoot = resolve(__dirname, '../data');

export function storePropertiesForDomain(domain, collectedProperties){
    const folderName = generateDirectoryName(domain);

    try {
        const domainDir = resolve(dataRoot, folderName);
        fs.mkdirSync(domainDir, { recursive: true });
        console.log(`Verzeichnis erstellt: /data/${domain}`);
        fs.writeFileSync(resolve(domainDir, `${folderName}_Properties.json`), JSON.stringify(collectedProperties), 'utf8');
    } catch (error) {
        console.error(`Fehler beim Erstellen des Verzeichnisses ./data/${domain}:`, error);
    }
}

export function generateDirectoryName(domain) {
    let dirName = domain.replace(/^https?:\/\//, '');
    dirName = dirName.replace(/[\/:?&=]/g, '_');
    dirName = dirName.replace(/_+$/, '');
    return dirName;
}
