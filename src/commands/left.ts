import { Command, CommandInterpreter } from "./types";

const commandMatcher = /LEFT/;

const left: Command = (state) => {
  console.log("left command");
  return state;
};

export const leftCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return left;
  },
};
