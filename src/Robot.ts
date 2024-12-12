import { Effect, Match, Ref } from "effect";

type Orientation = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface RobotState {
  x: number;
  y: number;
  orientation: Orientation;
}

export class Robot {
  place = (state: RobotState) => {
    return Ref.update(this.state, () => {
      return state;
    });
  };

  move = () => {
    return Ref.update(this.state, (state) =>
      Match.value<Orientation>(state.orientation).pipe(
        Match.withReturnType<RobotState>(),
        Match.when("NORTH", () => ({ ...state, y: state.y + 1 })),
        Match.when("EAST", () => ({ ...state, x: state.x + 1 })),
        Match.when("SOUTH", () => ({ ...state, y: state.y - 1 })),
        Match.when("WEST", () => ({ ...state, x: state.x - 1 })),
        Match.exhaustive,
      ),
    );
  };

  left = () => {
    return Ref.update(this.state, (state) =>
      Match.value<Orientation>(state.orientation).pipe(
        Match.withReturnType<RobotState>(),
        Match.when("NORTH", () => ({
          ...state,
          orientation: "WEST" as Orientation,
        })),
        Match.when("EAST", () => ({
          ...state,
          orientation: "NORTH" as Orientation,
        })),
        Match.when("SOUTH", () => ({
          ...state,
          orientation: "EAST" as Orientation,
        })),
        Match.when("WEST", () => ({
          ...state,
          orientation: "SOUTH" as Orientation,
        })),
        Match.exhaustive,
      ),
    );
  };

  right = () => {
    return Ref.update(this.state, (state) =>
      Match.value<Orientation>(state.orientation).pipe(
        Match.withReturnType<RobotState>(),
        Match.when("NORTH", () => ({
          ...state,
          orientation: "EAST" as Orientation,
        })),
        Match.when("EAST", () => ({
          ...state,
          orientation: "SOUTH" as Orientation,
        })),
        Match.when("SOUTH", () => ({
          ...state,
          orientation: "WEST" as Orientation,
        })),
        Match.when("WEST", () => ({
          ...state,
          orientation: "NORTH" as Orientation,
        })),
        Match.exhaustive,
      ),
    );
  };

  report: Effect.Effect<RobotState>;

  constructor(private state: Ref.Ref<RobotState>) {
    this.report = Ref.get(this.state);
  }
}

export const makeRobot = Effect.andThen(
  Ref.make({ x: 0, y: 0, orientation: "NORTH" } as RobotState),
  (value) => new Robot(value),
);
