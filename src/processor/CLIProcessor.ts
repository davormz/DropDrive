import Processor from './Processor';
import ProcessQueue from './ProcessQueue';

import LocalDir from '../fs/LocalDir';
import S3Client from '../fs/s3';

class CliProcessor implements Processor{
    private localFs: LocalDir;
    private s3Client: S3Client;

    constructor(){
        this.localFs = new LocalDir();
        this.s3Client = new S3Client();
    }

    initQueue(): void {
        //TODO: Move this to another processor, like the Deamon processor.
        // const mainDirName = process.env.DROP_DRIVE_MAIN_FOLDER as string;
        // if(mainDirName){
        //     ProcessQueue.getInstance().pushDirectory(mainDirName);
        // }
        
        const args = process.argv.splice(2);

        if(args.length > 0){
            args.forEach(element => {
                ProcessQueue.getInstance().pushDirectory(element);
            })
        }
    }

    processQueue(): void {
        this.initQueue();

        while( !ProcessQueue.getInstance().isEmpty()){
            let path = ProcessQueue.getInstance().popDirectory() as string;

            if(this.localFs.isFile(path)){
               this.processFile(path);
            } else {
                this.processFolder(path);
            }                
        }
    }

    createDir(dirName: string) {
        this.localFs.createDir(dirName)
        .then(() => {
            console.log('Directory has been created!');
            //TODO: implement a callback ?
            //If it doesn't exist what it is going to process?
            // This call will be usefull for a main folder instalation.
            // main();
        })
        .catch(err => console.error('An Error has occured! ', err));
    }

    processFile(path: string){
        this.localFs.readFile(path)
        .then((buffer) => {
            this.s3Client.uploadObject(path, buffer);
        })
        .catch((err) => console.error('Error uploading to s3: ', err));
    }

    processFolder(dirName: string) {
        this.localFs.readLocalDir(dirName)
        .then(files => {
            console.log(`Starting process for folder ${dirName} ...`);    
            for (const file of files) {
                let path: string = `${dirName}/${file}`;
                if(this.localFs.isFile(path)){
                    this.processFile(path);
                } else {
                    ProcessQueue.getInstance().pushDirectory(path);
                }
            }
        })
        .catch(err => {
            if(err.code === 'ENOENT'){
                console.log(`Directory: ${dirName} does not exist.`);                    
            } else {
                console.error('An Error has occured! ', err);
            }
        })
        .finally(() => {
            console.log(`Process for folder ${dirName} ended!`);
        });
    }
}

export default CliProcessor