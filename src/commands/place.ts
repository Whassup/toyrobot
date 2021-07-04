import { Orientation } from "../constants";
import { AppAction } from "../types";
import { Command, CommandInterpreter } from "./types";

const placeCommandMatcher = /PLACE \d,\d,(WEST|EAST|NORT|SOUTH)/;

const place =
  (x: number, y: number, z: Orientation): Command =>
  (state) => {
    return {
      ...state,
      action: AppAction.NoOperation,
      robot: { coordinate: { x, y }, orientation: z },
    };
  };

export const placeCommandInterpreter: CommandInterpreter = {
  validate: (input) => placeCommandMatcher.test(input),
  encodeFromString: (input) => {
    const [x, y, z] = input.split(" ").pop()?.split(",") ?? ["0", "0", "NORTH"];
    return place(parseFloat(x), parseFloat(y), z as Orientation);
  },
};
