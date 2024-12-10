import { Data, Effect, Match, Option } from "effect";

type Command = Data.TaggedEnum<{
  PLACE: {};
  MOVE: {};
  LEFT: {};
  RIGHT: {};
  REPORT: {};
}>;

// Create constructors for each case in the union
const { PLACE, MOVE, LEFT, RIGHT, REPORT } = Data.taggedEnum<Command>();

const matchCommand = Match.type<string>().pipe(
  Match.withReturnType<Command>(),
  Match.when("PLACE", () => PLACE()),
  Match.when("MOVE", () => MOVE()),
  Match.when("LEFT", () => LEFT()),
  Match.when("RIGHT", () => RIGHT()),
  Match.when("REPORT", () => REPORT()),
  Match.option,
);

export const parseCommands = (commands: string[]): Option.Option<Command>[] => {
  return commands.map(matchCommand);
};
