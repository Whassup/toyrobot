import readline from "readline";
import {
  commandEncoder as appCommandEncoder,
  CommandEncoder,
} from "./commands/commandEncoder";
import { moveCommandInterpreter } from "./commands/move";
import { placeCommandInterpreter } from "./commands/place";
import { CommandInterpreter } from "./commands/types";
import { AppState, isAppError } from "./types";

const commandInterpreters: CommandInterpreter[] = [
  placeCommandInterpreter,
  moveCommandInterpreter,
];

const app = (
  input: string,
  { commandEncoder }: { commandEncoder: CommandEncoder },
  appState: AppState
) => {
  const commandOrAppError = commandEncoder(input, commandInterpreters);
  if (isAppError(commandOrAppError)) {
    console.error(commandOrAppError.message);
    return appState;
  }
  return commandOrAppError(appState);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let appState: AppState = {};

rl.on("line", (input) => {
  appState = app(input, { commandEncoder: appCommandEncoder }, appState);
  console.log(appState);
});
