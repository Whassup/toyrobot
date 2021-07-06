import { CommandEncoder } from "./commands/types";
import { coordinatesIsOutOfBounds } from "./helpers/errors/coordinatesIsOutOfBounds";
import { isObjectOnBoard } from "./helpers/isObjectOnBoard";
import { AppActions, AppConfig, AppState, isAppError } from "./types";

export const app = (
  input: string,
  {
    commandEncoder,
    actions,
    config: { boardSize },
  }: { commandEncoder: CommandEncoder; actions: AppActions; config: AppConfig },

  appState: AppState
) => {
  const commandOrAppError = commandEncoder(input);
  if (isAppError(commandOrAppError)) {
    console.error(commandOrAppError.message);
    return appState;
  }
  const appStateOrError = commandOrAppError(appState);

  if (isAppError(appStateOrError)) {
    console.error(appStateOrError.message);
    return appState;
  }

  if (
    appStateOrError.robot &&
    !isObjectOnBoard(appStateOrError.robot, boardSize)
  ) {
    console.log(coordinatesIsOutOfBounds.message);
    return appState;
  }

  actions[appStateOrError.action](appStateOrError);

  return appStateOrError;
};
