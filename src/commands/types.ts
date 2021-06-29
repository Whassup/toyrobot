import { EncodeFromString } from "../types";

export interface CommandValidator {
  (input: string): boolean;
}

export interface Command {
  (): void;
}

export interface CommandInterpreter {
  validate: CommandValidator;
  encodeFromString: EncodeFromString<Command>;
}
