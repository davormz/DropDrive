import Processor from './Processor';
import ProcessQueue from './ProcessQueue';
import LocalDir from '../fs/LocalDir';
import S3Client from '../fs/s3';
import Logger from './../logger/Logger';

class CliProcessor implements Processor{
    private localFs: LocalDir;
    private s3Client: S3Client;
    private argv: (string | number)[];

    constructor(argv: (string | number)[]){
        this.localFs = new LocalDir();
        this.s3Client = new S3Client();
        this.argv = argv;
    }

    initQueue(): void {        
        if(this.argv.length > 0){
            this.argv.forEach(element => {
                ProcessQueue.getInstance().pushDirectory(element as string);
            })
        } else {
            Logger.error('No files specified !');
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
            Logger.info('Directory has been created!');
        })
        .catch(err => Logger.error(`An Error has occured!, ${err.message}`));
    }

    processFile(path: string){
        this.localFs.readFile(path)
        .then((buffer) => {
            this.s3Client.uploadObject(path, buffer);
        })
        .catch((err) => Logger.error(`Error uploading to s3: ${err}`));
    }

    processFolder(dirName: string) {
        this.localFs.readLocalDir(dirName)
        .then(files => {
            Logger.info(`Starting process for folder ${dirName} ...`);    
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
                Logger.error(`Directory: ${dirName} does not exist.`);                    
            } else {
                Logger.error(`An Error has occured! ${err}`);
            }
        })
        .finally(() => {
            Logger.info(`Process for folder ${dirName} ended!`);
        });
    }
}

export default CliProcessor