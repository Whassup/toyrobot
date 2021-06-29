import { CommandInterpreter } from "./types";

const commandMatcher = /LEFT/;

const left = () => {
  console.log("left command");
};

export const leftCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return left;
  },
};
