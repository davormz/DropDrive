class ProcessQueue{
    private static instance: ProcessQueue;
    private queue: Array<string>;
    
    private constructor(){
        this.queue  = [];
    }

    static getInstance(){
        if(!ProcessQueue.instance){
            ProcessQueue.instance = new ProcessQueue();
        }

        return ProcessQueue.instance;
    }

    pushDirectory(dir: string){
        this.queue.push(dir);
    }

    popDirectory(){
       return this.queue.pop();
    }

    isEmpty(): boolean{
        return this.queue.length === 0;
    }


}

export default ProcessQueue;