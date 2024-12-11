import { Effect, Match, Ref } from "effect";

type Orientation = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface RobotState {
  x: number;
  y: number;
  orientation: Orientation;
}

export class Robot {
  place = (state: RobotState) => {
    Ref.update(this.state, () => state);
  };

  move = () => {
    Match.type<Orientation>().pipe(
      Match.when("NORTH", () => {
        Ref.update(this.state, (state) => ({ ...state, x: state.x + 1 }));
      }),
      Match.when("EAST", () => {
        Ref.update(this.state, (state) => ({ ...state, y: state.y + 1 }));
      }),
      Match.when("SOUTH", () => {
        Ref.update(this.state, (state) => ({ ...state, x: state.x - 1 }));
      }),
      Match.when("WEST", () => {
        Ref.update(this.state, (state) => ({ ...state, y: state.y - 1 }));
      }),
    );
  };

  left = () => {
    Match.type<Orientation>().pipe(
      Match.when("NORTH", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "WEST" as Orientation,
        }));
      }),
      Match.when("EAST", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "NORTH" as Orientation,
        }));
      }),
      Match.when("SOUTH", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "EAST" as Orientation,
        }));
      }),
      Match.when("WEST", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "SOUTH" as Orientation,
        }));
      }),
    );
  };

  right = () => {
    Match.type<Orientation>().pipe(
      Match.when("NORTH", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "EAST" as Orientation,
        }));
      }),
      Match.when("EAST", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "SOUTH" as Orientation,
        }));
      }),
      Match.when("SOUTH", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "WEST" as Orientation,
        }));
      }),
      Match.when("WEST", () => {
        Ref.update(this.state, (state) => ({
          ...state,
          orientation: "NORTH" as Orientation,
        }));
      }),
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
