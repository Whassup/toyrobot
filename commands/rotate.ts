import { OrientationEnum } from './../enums.ts';

export function rotate(orientation: OrientationEnum, clockwise: boolean): OrientationEnum {
    const o = Object.values(OrientationEnum);
    const index = o.findIndex(o => orientation === o) + (clockwise ? +1 : -1);
    if(index === -1) return o[3];
    if(index === o.length-1) return o[0];
    return o[index];
}