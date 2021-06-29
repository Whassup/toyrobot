import { RobotNotPlaced } from "../errors/robotNotPlaced";
import { Orientation } from "../types";
import { Command, CommandInterpreter } from "./types";

const commandMatcher = /MOVE/;

export const move: Command = ({ robot, ...rest }) => {
  if (robot === undefined) return RobotNotPlaced;
  if (robot?.orientation === Orientation.NORTH) {
    return {
      ...rest,
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
      robot: {
        ...robot,
        coordinate: {
          x: robot?.coordinate.x,
          y: robot?.coordinate.y - 1,
        },
      },
    };
  }

  return { robot, ...rest };
};

export const moveCommandInterpreter: CommandInterpreter = {
  validate: (input) => commandMatcher.test(input),
  encodeFromString: () => {
    return move;
  },
};
