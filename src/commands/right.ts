import { Orientation } from "../constants";
import { enumPrevious } from "../helpers/enum";
import { RobotNotPlaced } from "../helpers/errors/robotNotPlaced";
import { AppAction } from "../types";
import { Command, CommandInterpreter } from "./types";

const commandMatcher = /RIGHT/;

const right: Command = ({ robot, ...rest }) => {
  if (robot === undefined) return RobotNotPlaced;
  return {
    ...rest,
    action: AppAction.NoOperation,
    robot: {
      ...robot,
      orientation: enumPrevious(robot?.orientation, Orientation),
    },
  };
};

export const rightCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return right;
  },
};
