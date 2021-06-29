import { Command, CommandInterpreter } from "./types";

const commandMatcher = /REPORT/;

const report: Command = (state) => {
  console.log("report command");
  return state;
};

export const reportCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return report;
  },
};
