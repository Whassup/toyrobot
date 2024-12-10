import { Data, Effect, Match, Option } from "effect";

type Orientation = "NORTH" | "EAST" | "SOUTH" | "WEST";

type Command = Data.TaggedEnum<{
  PLACE: {
    x: number;
    y: number;
    orientation: Orientation;
  };
  MOVE: {};
  LEFT: {};
  RIGHT: {};
  REPORT: {};
}>;

// Create constructors for each case in the union
const { PLACE, MOVE, LEFT, RIGHT, REPORT } = Data.taggedEnum<Command>();

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
  Match.option,
);

export const parseCommands = (commands: string[]): Option.Option<Command>[] => {
  return commands.map(matchCommand);
};
