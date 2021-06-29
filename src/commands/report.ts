import { CommandInterpreter } from "./types";

const commandMatcher = /REPORT/;

const report = () => {
  console.log("report command");
};

export const reportCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return report;
  },
};
