import { AppError, AppErrorOr } from "../types";
import { Command, CommandInterpreter } from "./types";

export interface CommandEncoder {
  (
    input: string,
    commandInterpreters: CommandInterpreter[]
  ): AppErrorOr<Command>;
}

const createInvalidCommand = (input: string): AppError => ({
  typeName: "AppError",
  message: `Invalid command for ${input}`,
});

export const commandEncoder: CommandEncoder = (input, commandInterpreters) => {
  return (
    commandInterpreters
      .find(({ validate }) => validate(input))
      ?.encodeFromString(input) || createInvalidCommand(input)
  );
};
