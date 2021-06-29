import { Command, CommandInterpreter } from "./types";

const commandMatcher = /RIGHT/;

const right: Command = (state) => {
  console.log("right command");
  return state;
};

export const rightCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return right;
  },
};
