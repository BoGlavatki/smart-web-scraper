import xlsx from 'xlsx'
import fs from 'fs'




// Pfade zu den JSON-Dateien
const filePaths = [
    '../data/campinghof-bartl.de/campinghof-bartl.de_Properties.json',
    '../data/neuseenland-camping.com/neuseenland-camping.com_Properties.json',
    '../data/www.campingplatz-bad-bibra.de/www.campingplatz-bad-bibra.de_Properties.json'
];

// Neues Workbook und Worksheet erstellen
const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.aoa_to_sheet([]);

// Startzellen für jede Datei
const startCells = ['A2', 'C2', 'E2'];

filePaths.forEach((filePath, index) => {
    // JSON-Daten aus Datei lesen
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const jsonDataObj = JSON.parse(jsonData);

    // Konvertieren der JSON-Daten in ein Array von [key, value]-Paaren
    const dataArray = Object.entries(jsonDataObj);

    // Daten zum Worksheet hinzufügen
    xlsx.utils.sheet_add_aoa(worksheet, dataArray, { origin: startCells[index] });
});

// Worksheet zum Workbook hinzufügen
xlsx.utils.book_append_sheet(workbook, worksheet, 'Daten');

// Workbook speichern
xlsx.writeFile(workbook, 'ft:gpt-3.5-turbo-0125:personal::9r1iAf6NPrompt.xlsx');




// let jsonDataArr = [{}];
// const jsonDataLeer = fs.readFileSync('../jsonLeer.json', 'utf-8');
// // jsonDataArr.push(JSON.parse(jsonData));
// // const jsonData1 = fs.readFileSync('../data/neuseenland-camping.com/neuseenland-camping.com_Properties.json', 'utf-8');
// // jsonDataArr.push(JSON.parse(jsonData1));
// // const jsonData2 = fs.readFileSync('../data/www.camping-kleinliebenau.de/www.camping-kleinliebenau.de_Properties.json', 'utf-8');
// // jsonDataArr.push(JSON.parse(jsonData2));

// const jsonDataOBJLeer = JSON.parse(jsonDataLeer);

// const dataArrayLeer = Object.entries(jsonDataOBJLeer);

// // Neues Workbook und Worksheet erstellen
// const workbookLeer = xlsx.utils.book_new();
// const worksheetLeer = xlsx.utils.aoa_to_sheet([['Key', 'Value']]);

// // // Daten zum Worksheet hinzufügen, beginnend bei A2
// xlsx.utils.sheet_add_aoa(worksheetLeer, dataArrayLeer, { origin: "A2" });

// // // Worksheet zum Workbook hinzufügen
// xlsx.utils.book_append_sheet(workbookLeer, worksheetLeer, 'Daten');

// // // Workbook speichern
// xlsx.writeFile(workbookLeer, 'jsonLeer.xlsx');
