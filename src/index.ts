import { Effect, Console } from "effect";
import { parseCommands } from "./CommandParser";

const program = Console.log("Hello, World!");

Effect.runSync(program);

const commands = parseCommands([]);

console.log(commands);
