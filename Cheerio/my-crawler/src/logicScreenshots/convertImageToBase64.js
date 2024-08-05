import fs from 'fs'


export function convertToBase64(file ){
    let fileData = fs.readFileSync(file);
    return new Buffer.from(fileData).toString('base64');
}