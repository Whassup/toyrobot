import { RobotState } from './types.ts';
import { CommandEnum } from './enums.ts';
import { readLine } from "./readLine.ts";
import { commandHandler } from "./commands/mod.ts";

async function readCommand(state?: RobotState) {
    const input = (await readLine()).split(" ");;
    const command = input[0] as CommandEnum;
    const args = input[1]?.split(",");
    const robotState = commandHandler(command, args, state);
    readCommand(robotState);
}

export function start() {
    console.log("Please input your command:");
    readCommand();
}

await start();