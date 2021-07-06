import { AppError } from "../types";
import { CommandEncoder } from "./types";

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
