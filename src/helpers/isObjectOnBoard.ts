import { hasCoordinate } from "../types";

export const isObjectOnBoard = (
  { coordinate }: hasCoordinate,
  boardSize: number
): boolean =>
  coordinate.x >= 0 &&
  coordinate.y >= 0 &&
  coordinate.x < boardSize &&
  coordinate.y < boardSize;
