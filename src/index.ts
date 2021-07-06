import readline from "readline";
import { app } from "./app";
import { commandEncoder as appCommandEncoder } from "./commands/commandEncoder";
import { leftCommandInterpreter } from "./commands/left";
import { moveCommandInterpreter } from "./commands/move";
import { placeCommandInterpreter } from "./commands/place";
import { reportCommandInterpreter } from "./commands/report";
import { rightCommandInterpreter } from "./commands/right";
import { CommandInterpreter } from "./commands/types";
import { AppAction, AppActions, AppConfig, AppState } from "./types";

const commandInterpreters: CommandInterpreter[] = [
  placeCommandInterpreter,
  moveCommandInterpreter,
  leftCommandInterpreter,
  rightCommandInterpreter,
  reportCommandInterpreter,
];

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let appState: AppState = {
  action: AppAction.NoOperation,
};

const config: AppConfig = {
  boardSize: 5,
};

rl.on("line", (input) => {
  appState = app(
    input,
    {
      commandEncoder: appCommandEncoder(commandInterpreters),
      actions: appActions,
      config,
    },
    appState
  );
  console.log(appState);
});
