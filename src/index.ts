import readline from "readline";
import {
  commandEncoder as appCommandEncoder,
  CommandEncoder,
} from "./commands/commandEncoder";
import { leftCommandInterpreter } from "./commands/left";
import { moveCommandInterpreter } from "./commands/move";
import { placeCommandInterpreter } from "./commands/place";
import { reportCommandInterpreter } from "./commands/report";
import { rightCommandInterpreter } from "./commands/right";
import { CommandInterpreter } from "./commands/types";
import { coordinatesIsOutOfBounds } from "./helpers/errors/coordinatesIsOutOfBounds";
import { isObjectOnBoard } from "./helpers/isObjectOnBoard";
import { AppAction, AppState, isAppError } from "./types";

const commandInterpreters: CommandInterpreter[] = [
  placeCommandInterpreter,
  moveCommandInterpreter,
  leftCommandInterpreter,
  rightCommandInterpreter,
  reportCommandInterpreter,
];

type AppActions = Record<AppAction, (state: AppState) => void>;

const appActions: AppActions = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [AppAction.NoOperation]: () => {},
  [AppAction.Print]: ({ robot }) => {
    if (robot) {
      const {
        coordinate: { x, y },
        orientation,
      } = robot;
      console.log(x, y, orientation);
    }
  },
};

const app = (
  input: string,
  {
    commandEncoder,
    actions,
  }: { commandEncoder: CommandEncoder; actions: AppActions },

  appState: AppState
) => {
  const commandOrAppError = commandEncoder(input, commandInterpreters);
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
    !isObjectOnBoard(appStateOrError.robot, { x: 4, y: 4 })
  ) {
    console.log(coordinatesIsOutOfBounds.message);
    return appState;
  }

  actions[appStateOrError.action](appStateOrError);

  return appStateOrError;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let appState: AppState = {
  action: AppAction.NoOperation,
};

rl.on("line", (input) => {
  appState = app(
    input,
    { commandEncoder: appCommandEncoder, actions: appActions },
    appState
  );
  console.log(appState);
});
