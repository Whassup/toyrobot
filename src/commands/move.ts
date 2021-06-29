import { Command, CommandInterpreter } from "./types";

const commandMatcher = /MOVE/;

const move: Command = (state) => {
  console.log("move command");
  return state;
};

export const moveCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return move;
  },
};
