import { AppError } from "../types";
import { CommandEncoder, CommandInterpreter } from "./types";

const createInvalidCommand = (input: string): AppError => ({
  typeName: "AppError",
  message: `Invalid command for ${input}`,
});

export const commandEncoder =
  (commandInterpreters: CommandInterpreter[]): CommandEncoder =>
  (input) => {
    return (
      commandInterpreters
        .find(({ validate }) => validate(input))
        ?.encodeFromString(input) || createInvalidCommand(input)
    );
  };
