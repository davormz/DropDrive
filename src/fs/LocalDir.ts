import { Dir, Stats, statSync } from 'fs';
import { opendir, readdir, mkdir, readFile, stat } from 'fs/promises';
import Logger from './../logger/Logger';

class LocalDir{
    
    constructor(){}

    async openLocalDir(dirName: string): Promise<Dir>{
        return await opendir(dirName);
    }
    
    async readLocalDir(dirName: string): Promise<string[]>{
        Logger.info('Reading local directory ...')
        return await readdir(dirName);       
    }
    
    async createDir(dirName: string): Promise<void>{
        return await mkdir(dirName);
    }
    
    readFile(file: string): Promise<Buffer>{
        return readFile(file);
    }

    isFile(path: string): boolean{
        let statResponse:Stats = statSync(path); 
        return statResponse.isFile();
    }
}
export default LocalDir;
