import { Effect, Console } from "effect";
import { parseCommands } from "./CommandParser";
import { makeRobot } from "./Robot";
import { runSimulation } from "./Simulator";

const program = Console.log("Hello, World!");

Effect.runSync(program);

const commands = parseCommands([
  "MOVE",
  "LEFT",
  "RIGHT",
  "REPORT",
  "BAD ONE!!",
  "PLACE 1 2 WEST",
  "PLACE 1 2 NAH",
  "PLACE 1 2 ",
  "MOVE",
]);

console.log(commands);

Effect.runSync(makeRobot.pipe(Effect.tap(runSimulation(commands))));

const exampleA = ["PLACE 0,0,NORTH", "MOVE", "REPORT"];

const expectedA = "0,1,NORTH";

const exampleB = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];

const expectedB = "0,0,WEST";

const exampleC = ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"];

const expectedC = "3,3,NORTH";
