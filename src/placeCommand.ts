import { CommandInterpreter } from "./types";

const placeCommandMatcher = /PLACE \d,\d,(WEST|EAST|NORT|SOUTH)/;

const place = (x: number, y: number, z: string) => {
  console.log("place command", x, y, z);
};

export const placeCommandInterpreter: CommandInterpreter = {
  validate: (input) => placeCommandMatcher.test(input),
  encodeFromString: (input) => {
    const [x, y, z] = input.split(" ").pop()?.split(",") ?? ["0", "0", "NORTH"];
    return () => place(parseFloat(x), parseFloat(y), z);
  },
};
