import { Orientation } from "../constants";
import { RobotNotPlaced } from "../helpers/errors/robotNotPlaced";
import { AppAction } from "../types";
import { Command, CommandInterpreter } from "./types";

const commandMatcher = /MOVE/;

export const move: Command = ({ robot, ...rest }) => {
  if (robot === undefined) return RobotNotPlaced;
  if (robot?.orientation === Orientation.NORTH) {
    return {
      ...rest,
      action: AppAction.NoOperation,
      robot: {
        ...robot,
        coordinate: {
          x: robot?.coordinate.x + 1,
          y: robot?.coordinate.y,
        },
      },
    };
  }

  if (robot?.orientation === Orientation.EAST) {
    return {
      ...rest,
      action: AppAction.NoOperation,
      robot: {
        ...robot,
        coordinate: {
          x: robot?.coordinate.x,
          y: robot?.coordinate.y + 1,
        },
      },
    };
  }

  if (robot?.orientation === Orientation.SOUTH) {
    return {
      ...rest,
      action: AppAction.NoOperation,
      robot: {
        ...robot,
        coordinate: {
          x: robot?.coordinate.x - 1,
          y: robot?.coordinate.y,
        },
      },
    };
  }

  if (robot?.orientation === Orientation.WEST) {
    return {
      ...rest,
      action: AppAction.NoOperation,
      robot: {
        ...robot,
        coordinate: {
          x: robot?.coordinate.x,
          y: robot?.coordinate.y - 1,
        },
      },
    };
  }

  return { robot, ...rest, action: AppAction.NoOperation };
};

export const moveCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return move;
  },
};
