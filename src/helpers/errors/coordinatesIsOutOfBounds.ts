import { AppError } from "../../types";

export const coordinatesIsOutOfBounds: AppError = {
  typeName: "AppError",
  message: "Coordinate out of bounds of board",
};
