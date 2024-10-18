import { Grid } from "./Grid.js";
import { Command, COMMANDS, DIRECTIONS, Robot } from "./Robot.js";

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export function processInput(inputLines: string[]): Result<string[]> {
  const [size, ...robotInputs] = inputLines;
  const gridResult = parseGridSize(size ?? "");
  if (!gridResult.ok) {
    return gridResult;
  }

  const grid = gridResult.value;

  const robotsWithCommandsResult = flattenResults(
    robotInputs.map((robotInput) => parseRobotInput(robotInput)),
  );
  if (!robotsWithCommandsResult.ok) {
    return robotsWithCommandsResult;
  }

  const outputLines = robotsWithCommandsResult.value.map(
    ({ robot, commands }) => {
      const { robot: finalRobot, isLost } = grid.simulate(robot, commands);

      const { x, y } = finalRobot.position;
      const direction = finalRobot.direction;
      return `(${String(x)}, ${String(y)}, ${direction})${isLost ? " LOST" : ""}`;
    },
  );

  return { ok: true, value: outputLines };
}

function parseGridSize(input: string): Result<Grid> {
  const regex = /^(\d+)\s+(\d+)$/;
  const match = regex.exec(input);
  if (!match) {
    return { ok: false, error: `Invalid grid size '${input}'` };
  }

  // We add 1 because the input appears to give maximum x and y values rather than width and height.
  const width = Number(match[1]) + 1;
  const height = Number(match[2]) + 1;

  return { ok: true, value: new Grid(width, height) };
}

function parseRobotInput(robotInput: string): Result<{
  robot: Robot;
  commands: Command[];
}> {
  // This doesn't check the direction or commands are valid, that's done using the
  // COMMANDS/DIRECTIONS constants so valid directions and commands are defined in one place.
  const regex = /^\((\d+),\s*(\d+),\s*(.)\)\s*(.+)$/;
  const match = regex.exec(robotInput);
  if (!match) {
    return { ok: false, error: `Invalid robot input '${robotInput}'` };
  }

  const [_, x, y, rawDirection, rawCommands] = match;

  // Using find is linear but the number of directions/commands is tiny, so it's fine.
  // Using find also means `direction` is of type `Direction` rather than just a string.
  const direction = DIRECTIONS.find((d) => d === rawDirection);
  if (direction === undefined) {
    return { ok: false, error: `Invalid direction '${rawDirection ?? ""}'` };
  }

  const commands: Command[] = (rawCommands ?? "")
    .split("")
    .map((rawCommand) => COMMANDS.find((c) => c === rawCommand))
    .filter((c) => c !== undefined);

  if (commands.length !== (rawCommands?.length ?? 0)) {
    return { ok: false, error: `Invalid commands '${rawCommands ?? ""}'` };
  }

  const robot = new Robot({ x: Number(x), y: Number(y) }, direction);
  return { ok: true, value: { robot, commands } };
}

function flattenResults<T>(results: Result<T>[]): Result<T[]> {
  const error = results.find((result) => !result.ok)?.error;
  if (error !== undefined) {
    return { ok: false, error };
  }

  return {
    ok: true,
    value: results.filter((result) => result.ok).map((result) => result.value),
  };
}
