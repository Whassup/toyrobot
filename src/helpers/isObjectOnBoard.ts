import { Coordinate, hasCoordinate } from "../types";

export const isObjectOnBoard = (
  { coordinate }: hasCoordinate,
  boardSize: Coordinate
): boolean =>
  coordinate.x >= 0 &&
  coordinate.y >= 0 &&
  coordinate.x <= boardSize.x &&
  coordinate.y <= boardSize.y;
