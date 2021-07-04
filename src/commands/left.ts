import { Orientation } from "../constants";
import { enumNext } from "../helpers/enum";
import { RobotNotPlaced } from "../helpers/errors/robotNotPlaced";
import { Command, CommandInterpreter } from "./types";

const commandMatcher = /LEFT/;

const left: Command = ({ robot, ...rest }) => {
  if (robot === undefined) return RobotNotPlaced;
  return {
    ...rest,
    robot: { ...robot, orientation: enumNext(robot?.orientation, Orientation) },
  };
};

export const leftCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return left;
  },
};
