#!/usr/bin/env node
const yargs = require("yargs");

const usage = `\nDrop files and folders to my personal cloud.
Usage: dropd [FILE]... `;

const options = yargs.usage(usage)                                                                                                   
    .help(true)  
    .argv;

console.log('params: ', yargs.argv);