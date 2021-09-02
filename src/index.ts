import LocalDir from './fs/LocalDir';
import S3Client from './fs/s3';
import ProcessQueue from './ProcessQueue';

function main(){
    
    initQueue();
    if(!ProcessQueue.getInstance().isEmpty()){
        processQueue();
    } else {
        console.error('No files or directories have been specified!');
    }

}

function initQueue():void {
    const mainDirName = process.env.DROP_DRIVE_MAIN_FOLDER as string;
    const args = process.argv.splice(2);
    let loaded: boolean = false;

    if(mainDirName){
        ProcessQueue.getInstance().pushDirectory(mainDirName);
    }
    if(args.length > 0){
        args.forEach(element => {
            ProcessQueue.getInstance().pushDirectory(element);
        })
    }
}

function processQueue():void {
    let localFs = new LocalDir();
    let s3Client = new S3Client();

    while( !ProcessQueue.getInstance().isEmpty()){
        let dirName = ProcessQueue.getInstance().popDirectory() as string;

        //TODO: Validate if it is a file or a directory.

        localFs.readLocalDir(dirName)
        .then(files => {
            console.log('Directory has been read', files);
    
            for (const file of files) {
                localFs.readFile(`${dirName}/${file}`)
                .then((buffer) => {
                    s3Client.uploadObject(file, buffer);
                })
                .catch((err) => console.error('Error uploading to s3: ', err));            
            }
        })
        .catch(err => {
            if(err.errno === -4058){
                console.log(`Directory: ${dirName} does not exist. Creating directory ...`);
                localFs.createDir(dirName)
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
}

//Main entry point
main();
