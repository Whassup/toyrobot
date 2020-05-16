import { RobotState } from "./../types.ts";
import { CommandEnum, OrientationEnum } from "./../enums.ts";
import { place } from "./place.ts";
import { report } from "./report.ts";
import { move } from "./move.ts";
import { rotate } from "./rotate.ts";

export function commandHandler(
  command: CommandEnum,
  args: string[] = [],
  robotState?: RobotState,
): RobotState {
  if (robotState == undefined) {
    return place(...args)(
      { position: [0, 0], orientation: OrientationEnum.NORTH },
    );
  }

  let orientation;

  switch (command) {
    case CommandEnum.PLACE:
      return place(...args)(robotState);
    case CommandEnum.REPORT:
      report(robotState);
      return robotState;
    case CommandEnum.MOVE:
      return move(robotState);
    case CommandEnum.RIGHT:
      orientation = rotate(robotState.orientation, true);
      return { ...robotState, orientation };
    case CommandEnum.LEFT:
      orientation = rotate(robotState.orientation, false);
      return { ...robotState, orientation };
    default:
      return robotState;
  }
}
