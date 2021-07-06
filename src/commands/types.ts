import { AppErrorOr, AppState, EncodeFromString } from "../types";

export interface CommandValidator {
  (input: string): boolean;
}

export interface Command {
  (state: AppState): AppErrorOr<AppState>;
}

export interface CommandInterpreter {
  validate: CommandValidator;
  encodeFromString: EncodeFromString<Command>;
}

export interface CommandEncoder {
  (
    input: string,
    commandInterpreters: CommandInterpreter[]
  ): AppErrorOr<Command>;
}
