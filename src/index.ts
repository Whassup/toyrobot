import readline from "readline";
import {
  commandEncoder as appCommandEncoder,
  CommandEncoder,
} from "./commands/commandEncoder";
import { placeCommandInterpreter } from "./commands/place";
import { CommandInterpreter } from "./commands/types";
import { isAppError } from "./types";

const commandInterpreters: CommandInterpreter[] = [placeCommandInterpreter];

const app = (
  input: string,
  { commandEncoder }: { commandEncoder: CommandEncoder }
) => {
  const commandOrAppError = commandEncoder(input, commandInterpreters);
  if (isAppError(commandOrAppError)) {
    console.error(commandOrAppError.message);
  } else {
    commandOrAppError();
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  console.log(`Received: ${input}`);

  app(input, { commandEncoder: appCommandEncoder });
});
