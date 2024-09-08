import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, arrayOfFiles = []) {
    fs.readdirSync(dirPath).forEach(file => {
        const filePath = path.join(dirPath, file);
        fs.statSync(filePath).isDirectory()
            ? getAllFiles(filePath, arrayOfFiles)
            : arrayOfFiles.push(filePath);
    });
    return arrayOfFiles;
}

// Beispielaufruf der Funktion
const dirPath = './data';
const files = getAllFiles(dirPath);
console.log(files);
