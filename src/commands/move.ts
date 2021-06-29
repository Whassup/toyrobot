import { CommandInterpreter } from "./types";

const commandMatcher = /MOVE/;

const move = () => {
  console.log("move command");
};

export const moveCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return move;
  },
};
