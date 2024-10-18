export const DIRECTIONS = ["N", "E", "S", "W"];
export const COMMANDS = ["F", "L", "R"];
/**
 * Since the number of possible directions is small, I think it's clearer to be explicit here.
 *
 * If more possible directions were needed, using a number to represent the direction would be more
 * scalable, and then e.g. turning right would be `(direction + 1) % numberOfDirections`.
 */
const ROTATE_LEFT_MAPPING = { N: "W", W: "S", S: "E", E: "N" };
const ROTATE_RIGHT_MAPPING = { N: "E", E: "S", S: "W", W: "N" };
const MOVE_FORWARD_MAPPING = {
    N: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: -1 },
    W: { x: -1, y: 0 },
};
/**
 * The current state of a robot.
 *
 * Robots are immutable objects, methods will return a new Robot instance with the updated state.
 */
export class Robot {
    constructor(position, direction) {
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: position
        });
        Object.defineProperty(this, "direction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: direction
        });
    }
    execute(command) {
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
    moveForward() {
        const delta = MOVE_FORWARD_MAPPING[this.direction];
        const { x, y } = this.position;
        return new Robot({ x: x + delta.x, y: y + delta.y }, this.direction);
    }
    rotate(mapping) {
        return new Robot(this.position, mapping[this.direction]);
    }
}
