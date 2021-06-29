import { AppError } from "../types";

export const RobotNotPlaced: AppError = {
  typeName: "AppError",
  message: "Robot is not place on board",
};
