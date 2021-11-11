#!/usr/bin/env node
import yargs from 'yargs/yargs';
import CliProcessor from './processor/CLIProcessor';

const usage = `\nDrop files and folders to my personal cloud.
Usage: dropd [FILE]... `;

function main(){
    const argv = yargs(process.argv.slice(2))
    .usage(usage)                                                                                                   
    .help(true)  
    .parseSync();

    const cliProcessor = new CliProcessor(argv._);
    cliProcessor.processQueue();
}

process.on('unhandledRejection', error => {
    //TODO
});
   
process.on('uncaughtException', error => {
    //TODO
})

//Main entry point
main();
