import { CommandEnum } from './enums.ts';
import { readLine } from "./readLine.ts";
import { commandHandler } from "./commands/mod.ts";

export async function start() {
    
    console.log("Start");

    console.log("Please input your command:");
    let command;
    let valid;
    do {
        const input = (await readLine()).split(" ");;
        command = input[0] as CommandEnum;
        const args = input[1]?.split(",");
        valid = commandHandler(command, args);
        
    } while (!(command in CommandEnum) || !valid)

    console.log(`You input command ${command}`);
}

await start();