import { Effect, Console } from "effect";
import { parseCommands } from "./CommandParser";

const program = Console.log("Hello, World!");

Effect.runSync(program);

const commands = parseCommands([
  "PLACE",
  "MOVE",
  "LEFT",
  "RIGHT",
  "REPORT",
  "BAD ONE!!",
  "PLACE",
]);

console.log(commands);
