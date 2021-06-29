import readline from "readline";
import {
  commandEncoder as appCommandEncoder,
  CommandEncoder,
} from "./commandEncoder";
import { placeCommandInterpreter } from "./placeCommand";
import { CommandInterpreter, isAppError } from "./types";

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
