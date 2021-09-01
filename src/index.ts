import LocalDir from './fs/LocalDir';
import S3Client from './fs/s3';

const mainDirName = process.env.DROP_DRIVE_MAIN_FOLDER as string;

const dirQueue = [];

function main(){
    let localFs = new LocalDir();
    let s3Client = new S3Client();

    localFs.readLocalDir(mainDirName)
    .then(files => {
        console.log('Directory has been read', files);

        for (const file of files) {
            localFs.readFile(`${mainDirName}/${file}`)
            .then((buffer) => {
                s3Client.uploadObject(file, buffer);
            })
            .catch((err) => console.error('Error invoquing s3:', err));            
        }
    })
    .catch(err => {
        if(err.errno === -4058){
            console.log(`Directory: ${mainDirName} does not exist. Creating directory ...`);
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

function initQueue(){
    
}

//Main entry point
main();
