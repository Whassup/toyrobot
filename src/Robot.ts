import { Effect, Ref } from "effect";

type Orientation = "NORTH" | "EAST" | "SOUTH" | "WEST";

interface RobotState {
  x: number;
  y: number;
  orientation: Orientation;
}

class Robot {
  place = (state: RobotState) => {
    return Ref.update(this.state, () => state);
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
