import { Data, Effect } from "effect";

type Command = Data.TaggedEnum<{
  PLACE: {};
  MOVE: {};
  LEFT: {};
  RIGHT: {};
  REPORT: {};
}>;

// Create constructors for each case in the union
const { PLACE } = Data.taggedEnum<Command>();

export const parseCommands = (commands: string[]): Command[] => {
  return [PLACE()];
};
