import { expect, it } from "vitest";
import { Grid } from "./Grid.js";
import { Robot } from "./Robot.js";

it("gives the final position of a robot", () => {
  const robot = new Robot({ x: 2, y: 3 }, "E");
  const grid = new Grid(5, 9);
  const result = grid.simulate(robot, ["L", "F", "R", "F", "F"]);

  expect(result).toEqual({
    robot: new Robot({ x: 4, y: 4 }, "E"),
    isLost: false,
  });
});

it("marks a robot as lost if it moves north off the grid", () => {
  const robot = new Robot({ x: 5, y: 7 }, "N");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, ["F", "F", "F"]);

  expect(result).toEqual({
    robot: new Robot({ x: 5, y: 9 }, "N"),
    isLost: true,
  });
});

it("marks a robot as lost if it moves east off the grid", () => {
  const robot = new Robot({ x: 8, y: 5 }, "N");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, ["F", "R", "F", "F"]);

  expect(result).toEqual({
    robot: new Robot({ x: 9, y: 6 }, "E"),
    isLost: true,
  });
});

it("marks a robot as lost if it moves south off the grid", () => {
  const robot = new Robot({ x: 5, y: 0 }, "N");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, ["L", "L", "F"]);

  expect(result).toEqual({
    robot: new Robot({ x: 5, y: 0 }, "S"),
    isLost: true,
  });
});

it("marks a robot as lost if it moves west off the grid", () => {
  const robot = new Robot({ x: 0, y: 5 }, "W");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, ["F", "F", "F"]);

  expect(result).toEqual({
    robot: new Robot({ x: 0, y: 5 }, "W"),
    isLost: true,
  });
});

it("doesn't move a robot back on the grid if it's already lost", () => {
  const robot = new Robot({ x: 0, y: -1 }, "N");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, ["F", "F", "F"]);

  expect(result).toEqual({ robot, isLost: true });
});

it("doesn't allow a robot to move off the grid and back on", () => {
  const robot = new Robot({ x: 5, y: 0 }, "N");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, ["R", "R", "F", "L", "L", "F"]);

  expect(result).toEqual({
    robot: new Robot({ x: 5, y: 0 }, "S"),
    isLost: true,
  });
});

it("returns the same robot if there are no commands", () => {
  const robot = new Robot({ x: 5, y: 0 }, "N");
  const grid = new Grid(10, 10);
  const result = grid.simulate(robot, []);

  expect(result).toEqual({ robot, isLost: false });
});
