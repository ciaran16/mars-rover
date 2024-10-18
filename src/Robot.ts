import { GridPosition } from "./Grid.js";

export const DIRECTIONS = ["N", "E", "S", "W"] as const;
export const COMMANDS = ["F", "L", "R"] as const;

export type Direction = (typeof DIRECTIONS)[number];
export type Command = (typeof COMMANDS)[number];

/**
 * Since the number of possible directions is small, I think it's clearer to be explicit here.
 *
 * If more possible directions were needed, using a number to represent the direction would be more
 * scalable, and then e.g. turning right would be `(direction + 1) % numberOfDirections`.
 */
const ROTATE_LEFT_MAPPING = { N: "W", W: "S", S: "E", E: "N" } as const;
const ROTATE_RIGHT_MAPPING = { N: "E", E: "S", S: "W", W: "N" } as const;

const MOVE_FORWARD_MAPPING = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
} as const satisfies Record<Direction, GridPosition>;

/**
 * The current state of a robot.
 *
 * Robots are immutable objects, methods will return a new Robot instance with the updated state.
 */
export class Robot {
  constructor(
    readonly position: GridPosition,
    readonly direction: Direction,
  ) {}

  execute(command: Command): Robot {
    // TypeScript statically checks all cases are handled, since command has type `"F" | "L" | "R"`.
    switch (command) {
      case "F":
        return this.moveForward();
      case "L":
        return this.rotate(ROTATE_LEFT_MAPPING);
      case "R":
        return this.rotate(ROTATE_RIGHT_MAPPING);
    }
  }

  private moveForward(): Robot {
    const delta = MOVE_FORWARD_MAPPING[this.direction];
    const { x, y } = this.position;
    return new Robot({ x: x + delta.x, y: y + delta.y }, this.direction);
  }

  private rotate(mapping: Record<Direction, Direction>): Robot {
    return new Robot(this.position, mapping[this.direction]);
  }
}
