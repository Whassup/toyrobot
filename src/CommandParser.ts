import { Data, Match } from "effect";

type Orientation = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type Command = Data.TaggedEnum<{
  PLACE: {
    x: number;
    y: number;
    orientation: Orientation;
  };
  MOVE: {};
  LEFT: {};
  RIGHT: {};
  REPORT: {};
  NOOP: {};
}>;

// Create constructors for each case in the union
const { PLACE, MOVE, LEFT, RIGHT, REPORT, NOOP } = Data.taggedEnum<Command>();

const matchCommand = Match.type<string>().pipe(
  Match.withReturnType<Command>(),
  Match.when(
    (command) => /PLACE \d \d (NORTH|EAST|SOUTH|WEST)/.test(command),
    (command) => {
      const [_, x, y, orientation] = command.split(" ");
      return PLACE({
        x: Number(x),
        y: Number(y),
        orientation: orientation as Orientation,
      });
    },
  ),
  Match.when("MOVE", () => MOVE()),
  Match.when("LEFT", () => LEFT()),
  Match.when("RIGHT", () => RIGHT()),
  Match.when("REPORT", () => REPORT()),
  Match.orElse(() => NOOP()),
);

export const parseCommands = (commands: string[]): Command[] => {
  return commands.map(matchCommand);
};
