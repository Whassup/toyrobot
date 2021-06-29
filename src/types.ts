export type Either<E, T> = E | T;
export interface AppError {
  typeName: "AppError";
  message: string;
}
export type AppErrorOr<T> = Either<AppError, T>;
export const isAppError = <T>(value: AppErrorOr<T>): value is AppError =>
  (value as AppError)?.typeName === "AppError";

export interface EncodeFromString<T> {
  (input: string): AppErrorOr<T>;
}
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
