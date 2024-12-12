import { Effect, Console, pipe } from "effect";
import { parseCommands } from "./CommandParser";
import { makeRobot } from "./Robot";
import { runSimulation } from "./Simulator";

const program = Console.log("Hello, World!");

Effect.runSync(program);

// const commands = parseCommands([
//   "MOVE",
//   "LEFT",
//   "RIGHT",
//   "REPORT",
//   "BAD ONE!!",
//   "PLACE 1 2 WEST",
//   "PLACE 1 2 NAH",
//   "PLACE 1 2 ",
//   "MOVE",
//   "REPORT",
// ]);

// Effect.runSync(makeRobot.pipe(Effect.tap(runSimulation(commands))));

const exampleA = ["PLACE 0,0,NORTH", "MOVE", "REPORT"];
const expectedA = "0,1,NORTH";

const programA = pipe(
  makeRobot,
  Effect.andThen(runSimulation(parseCommands(exampleA))),
  Effect.andThen((a) => {
    return a.report;
  }),
  Effect.tap(({ x, y, orientation }) => {
    console.log("Assert example A");
    console.assert(`${x},${y},${orientation}` === expectedA, {
      x,
      y,
      orientation,
      expectedA,
    });
  }),
);
Effect.runSync(programA);

const exampleB = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];
const expectedB = "0,0,WEST";

const programB = pipe(
  makeRobot,
  Effect.andThen(runSimulation(parseCommands(exampleB))),
  Effect.andThen((a) => {
    return a.report;
  }),
  Effect.tap(({ x, y, orientation }) => {
    console.log("Assert example B");
    console.assert(`${x},${y},${orientation}` === expectedB, {
      x,
      y,
      orientation,
      expectedB,
    });
  }),
);
Effect.runSync(programB);

const exampleC = ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"];
const expectedC = "3,3,NORTH";

const programC = pipe(
  makeRobot,
  Effect.andThen(runSimulation(parseCommands(exampleC))),
  Effect.andThen((a) => {
    return a.report;
  }),
  Effect.tap(({ x, y, orientation }) => {
    console.log("Assert example C");
    console.assert(`${x},${y},${orientation}` === expectedC, {
      x,
      y,
      orientation,
      expectedC,
    });
  }),
);
Effect.runSync(programC);
