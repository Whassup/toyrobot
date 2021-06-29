import { CommandInterpreter } from "./types";

const commandMatcher = /RIGHT/;

const right = () => {
  console.log("right command");
};

export const rightCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return right;
  },
};
