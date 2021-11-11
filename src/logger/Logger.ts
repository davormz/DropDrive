import chalk from 'chalk';

class Logger{
    
    static info(msg: string): void{
        console.log(chalk.bgGreen.black(msg));
    }

    static error(msg: string): void{
        console.error(chalk.red(msg));
    }

    static warn(msg: string): void{
        console.log(chalk.bgYellow.black(msg));
    }
}

export default Logger;