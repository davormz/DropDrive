const fs = require('fs/promises');

async function openLocalDir(dirName){
    return await fs.opendir(dirName);
}

async function readLocalDir(dirName){
    console.log('Reading local directory ...')
    return await openLocalDir(dirName);
}

async function createDir(dirName){
    return await fs.mkdir(dirName);
}

module.exports = {
    createDir,
    openLocalDir,
    readLocalDir
}