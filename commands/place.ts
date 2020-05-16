import { OrientationEnum } from './../enums.ts';
import { TableTopDimensions } from '../settings.ts';
import { RobotState } from '../types.ts';

/**
 * PLACE will put the toy robot on the table in position X,Y and facing NORTH,
 * SOUTH, EAST or WEST.
 */
export function place(x?: string, y?: string, orientation?: string): (robotState: RobotState) => RobotState {
    return (robotState: RobotState ) => {
        const valid = validateArgs(x,y,orientation)
        return  valid ? _place(Number(x), Number(y), orientation as OrientationEnum, robotState) : robotState
    }
}

function validateArgs(x?: string, y?: string, orientation?: string): boolean {
    if(orientation === undefined) return false;
    if(x === undefined) return false;
    if(y === undefined) return false;
    if(! Number.isInteger(Number(x))) return false;
    if(! Number.isInteger(Number(y))) return false;
    if(!(orientation in OrientationEnum)) return false;
    const [maxX, maxY] = TableTopDimensions;
    const nX = Number(x);
    const nY = Number(y)
    if(nX >= maxX) return false;
    if(nX < 0) return false;
    if(nY >= maxX) return false;
    if(nY < 0) return false;
    return true;
}

function _place(x: number, y: number, orientation: OrientationEnum, robotState: RobotState): RobotState {
    return { position: [x, y], orientation }
}