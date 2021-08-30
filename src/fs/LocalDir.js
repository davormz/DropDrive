const fs = require('fs/promises');

async function openLocalDir(dirName){
    return await fs.opendir(dirName);
}

async function readLocalDir(dirName){
    console.log('Reading local directory ...')
    // return await openLocalDir(dirName);
    return await fs.readdir(dirName);
}

async function createDir(dirName){
    return await fs.mkdir(dirName);
}

function readFile(file){
    return fs.readFile(file);
}

module.exports = {
    createDir,
    openLocalDir,
    readLocalDir,
    readFile
}