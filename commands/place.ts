import { OrientationEnum } from './../enums.ts';
/**
 * PLACE will put the toy robot on the table in position X,Y and facing NORTH,
 * SOUTH, EAST or WEST.
 */
export function place(x?: string, y?: string, orientation?: string): boolean {
    const valid = validateArgs(x,y,orientation)
    if(valid) _place(Number(x), Number(y), orientation as OrientationEnum);
    return valid;
}



function validateArgs(x?: string, y?: string, orientation?: string): boolean {
    if(orientation === undefined) return false;
    if(x === undefined) return false;
    if(y === undefined) return false;
    if(! Number.isInteger(Number(x))) return false;
    if(! Number.isInteger(Number(y))) return false;
    if(!(orientation in OrientationEnum)) return false;
    return true;
}

function _place(x: number, y: number, orientation: OrientationEnum) {
    console.log("placed to be implemented");
}