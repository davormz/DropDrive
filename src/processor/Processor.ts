/**
 * This interface can be uused to encapsulate how to process different files on different clients.
 */
interface Processor{

    initQueue():void;
    processQueue():void;

}

export default Processor;