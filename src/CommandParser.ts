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
const { PLACE, MOVE, LEFT, RIGHT, REPORT, NOOP, $is } =
  Data.taggedEnum<Command>();

const isPlace = $is("PLACE");

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

function filterCommandsFromFirstPlace(commands: Command[]): Command[] {
  // Find the index of the first "PLACE" command
  const firstPlaceIndex = commands.findIndex((command) => isPlace(command));

  // If no "PLACE" command is found, return an empty array
  if (firstPlaceIndex === -1) {
    return [];
  }

  // Return the subarray starting from the index after the first "PLACE" command
  return commands.slice(firstPlaceIndex);
}

export const parseCommands = (commands: string[]): Command[] => {
  return filterCommandsFromFirstPlace(commands.map(matchCommand));
};
