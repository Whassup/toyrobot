import { Command, CommandInterpreter } from "./types";

const commandMatcher = /REPORT/;

const report: Command = (state) => {
  return state;
};

export const reportCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return report;
  },
};
