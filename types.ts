import { OrientationEnum } from './enums.ts';

export interface RobotState {
    position: [number, number],
    orientation: OrientationEnum
}