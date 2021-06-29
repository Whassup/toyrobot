import { AppState, EncodeFromString } from "../types";

export interface CommandValidator {
  (input: string): boolean;
}

export interface Command {
  (state: AppState): AppState;
}

export interface CommandInterpreter {
  validate: CommandValidator;
  encodeFromString: EncodeFromString<Command>;
}
