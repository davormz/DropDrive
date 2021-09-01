import { Dir } from 'fs';
import { opendir, readdir, mkdir, readFile } from 'fs/promises';

class LocalDir{
    
    constructor(){}

    async openLocalDir(dirName: string): Promise<Dir>{
        return await opendir(dirName);
    }
    
    async readLocalDir(dirName: string): Promise<string[]>{
        console.log('Reading local directory ...')
        return await readdir(dirName);
    }
    
    async createDir(dirName: string): Promise<void>{
        return await mkdir(dirName);
    }
    
    readFile(file: string): Promise<Buffer>{
        return readFile(file);
    }
}
export default LocalDir;
