import { expect, it } from "vitest";
import { Robot } from "./Robot.js";

it("should move in the correct direction when facing north", () => {
  const robot = new Robot({ x: 5, y: 5 }, "N").execute("F");
  expect(robot).toEqual(new Robot({ x: 5, y: 6 }, "N"));
});

it("should move in the correct direction when facing east", () => {
  const robot = new Robot({ x: 5, y: 5 }, "E").execute("F");
  expect(robot).toEqual(new Robot({ x: 6, y: 5 }, "E"));
});

it("should move in the correct direction when facing south", () => {
  const robot = new Robot({ x: 5, y: 5 }, "S").execute("F");
  expect(robot).toEqual(new Robot({ x: 5, y: 4 }, "S"));
});

it("should move in the correct direction when facing west", () => {
  const robot = new Robot({ x: 5, y: 5 }, "W").execute("F");
  expect(robot).toEqual(new Robot({ x: 4, y: 5 }, "W"));
});

it("should rotate left", () => {
  const robot = new Robot({ x: 5, y: 5 }, "N").execute("L");
  expect(robot).toEqual(new Robot({ x: 5, y: 5 }, "W"));
});

it("should rotate right", () => {
  const robot = new Robot({ x: 5, y: 5 }, "N").execute("R");
  expect(robot).toEqual(new Robot({ x: 5, y: 5 }, "E"));
});

it("should not modify the original robot", () => {
  const robot = new Robot({ x: 5, y: 5 }, "N");
  robot.execute("F");
  expect(robot).toEqual(new Robot({ x: 5, y: 5 }, "N"));
});
