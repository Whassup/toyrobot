import { CommandEnum } from './../enums.ts';
import { place } from "./place.ts";

export function commandHandler(command: CommandEnum, args: string[] = []): boolean {
    switch(command) {
        case CommandEnum.PLACE: 
            return place(...args);
        default:
            return false;
    }
}