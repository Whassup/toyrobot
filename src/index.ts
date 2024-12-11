import { Effect, Console } from "effect";
import { parseCommands } from "./CommandParser";
import { makeRobot } from "./Robot";
import { runSimulation } from "./Simulator";

const program = Console.log("Hello, World!");

Effect.runSync(program);

const commands = parseCommands([
  "PLACE",
  "MOVE",
  "LEFT",
  "RIGHT",
  "REPORT",
  "BAD ONE!!",
  "PLACE 1 2 WEST",
  "PLACE 1 2 NAH",
  "PLACE 1 2 ",
]);

console.log(commands);

Effect.runSync(makeRobot.pipe(Effect.tap(runSimulation(commands))));
