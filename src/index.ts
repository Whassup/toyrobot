import readline from "readline";
import {
  commandEncoder as appCommandEncoder,
  CommandEncoder,
} from "./commandEncoder";

const app = (
  input: string,
  { commandEncoder }: { commandEncoder: CommandEncoder }
) => {
  const command = commandEncoder(input, []);
  command.run();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  console.log(`Received: ${input}`);

  app(input, { commandEncoder: appCommandEncoder });
});
