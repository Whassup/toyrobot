import { RobotState } from './../types.ts';

export function report({ position: [x,y], orientation }: RobotState) {
    console.log(`${x},${y},${orientation}`)
}