import { Orientation } from "./helpers/constants/Orientation";

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

export interface Coordinate {
  x: number;
  y: number;
}

export interface hasOrientation {
  orientation: Orientation;
}

export interface hasCoordinate {
  coordinate: Coordinate;
}

export enum AppAction {
  NoOperation = "NoOperation",
  Print = "Print",
}

export interface AppConfig {
  boardSize: number;
}

export interface AppState {
  robot?: hasOrientation & hasCoordinate;
  action: AppAction;
}
