import { Command, Robot } from "./Robot.js";

export type GridPosition = { x: number; y: number };

/**
 * A grid with a width and height that a robot can move around in.
 *
 * NOTE: width and height are 1 bigger than the sizes given in the input/problem description. This
 * is because treating those values as the width and height causes the output to not match the
 * examples (a robot gets lost when it should not). So I've treated the input size as max x and y
 * values - see `parseGridSize` in `processInput.ts`.
 */
export class Grid {
  constructor(
    readonly width: number,
    readonly height: number,
  ) {}

  simulate(
    robot: Robot,
    commands: Command[],
  ): { robot: Robot; isLost: boolean } {
    if (!this.isInBounds(robot.position)) {
      return { robot, isLost: true };
    }

    // We could use reduce or something else more functional here, but then we wouldn't be able to
    // stop early for lost robots.
    for (const command of commands) {
      const nextRobot = robot.execute(command);
      // We could only check if we've gone out of bounds in the direction of movement (e.g. if we
      // move south, check y is still >= 0), but I don't think the the additional complexity is
      // worth the small performance improvement.
      if (!this.isInBounds(nextRobot.position)) {
        return { robot, isLost: true };
      }

      robot = nextRobot;
    }

    return { robot, isLost: false };
  }

  private isInBounds(position: GridPosition): boolean {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x < this.width &&
      position.y < this.height
    );
  }
}
