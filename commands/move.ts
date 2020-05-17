import { TableTopDimensions } from './../settings.ts';
import { RobotState } from './../types.ts';
import { OrientationEnum } from '../enums.ts';

const [dX, dY] = TableTopDimensions;

export function move({ position, orientation}: RobotState): RobotState {
    const [x,y] = position;
    switch(orientation) {
        case OrientationEnum.SOUTH:
            if(y < 1) return { position, orientation};
            return { position: [x,y-1], orientation };
        case OrientationEnum.NORTH:
            if(y >= dY - 1) return { position, orientation};
            return { position: [x,y+1], orientation };
        case OrientationEnum.WEST:
            if(x < 1) return { position, orientation};
            return { position: [x-1,y], orientation };
        case OrientationEnum.EAST:
            if(x >= dX - 1) return { position, orientation};
            return { position: [x+1,y], orientation };
        default:
            return { position, orientation};
    }
}