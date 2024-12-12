import { Console, Effect, Match, Option } from "effect";
import { Command } from "./CommandParser";
import { Robot } from "./Robot";

const matchCommand = (robot: Robot) =>
  Match.type<Command>().pipe(
    Match.withReturnType<void>(),
    Match.tags({
      PLACE: ({ x, y, orientation }) => {
        Effect.runPromise(robot.place({ x, y, orientation }));
      },
      MOVE: () => {
        Effect.runPromise(robot.move());
      },
      LEFT: () => {
        Effect.runPromise(robot.left());
      },
      RIGHT: () => {
        Effect.runPromise(robot.right());
      },
      REPORT: () => {
        console.log("REPORT");
        Effect.runSync(robot.report.pipe(Effect.tap(Console.log)));
        return robot.report;
      },
      NOOP: () => {
        /** Do nothing */
      },
    }),
    Match.exhaustive,
  );

export const runSimulation =
  (commands: Command[]) =>
  (robot: Robot): Robot => {
    commands.forEach(matchCommand(robot));
    return robot;
  };
