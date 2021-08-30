const localFs = require('./fs/LocalDir');
const s3 = require('./fs/s3');

const mainDirName = 'main-dir';

function main(){
    localFs.readLocalDir(mainDirName)
    .then(files => {
        console.log('Directory has been read', files);

        for (const file of files) {
            localFs.readFile(`${mainDirName}/${file}`)
            .then((buffer) => {
                s3.uploadObject(file, buffer);
            })
            .catch((err) => console.error('Error invoquing s3:', err));            
        }
    })
    .catch(err => {
        if(err.errno === -4058){
            console.log(`Directory: ${mainDirName} does not exist. 
            Creating directory ...`);
            localFs.createDir(mainDirName)
            .then(() => {
                console.log(`Directory has been created!`);
                main();
            })
            .catch(err => console.error('An Error has occured! ', err));
        } else {
            console.error('An Error has occured! ', err);
        }
    })
    .finally(() => {
        console.log('Process ended successfully!');
    });    
}

//Main entry point
main();
