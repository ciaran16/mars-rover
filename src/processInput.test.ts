import { expect, it } from "vitest";
import { processInput } from "./processInput.js";

it("handles example input 1 correctly", () => {
  const input = ["4 8", "(2, 3, E) LFRFF", "(0, 2, N) FFLFRFF"];
  const result = processInput(input);

  expect(result).toEqual({
    ok: true,
    value: ["(4, 4, E)", "(0, 4, W) LOST"],
  });
});

it("handles example input 2 correctly", () => {
  const input = ["4 8", "(2, 3, N) FLLFR", "(1, 0, S) FFRLF"];
  const result = processInput(input);

  expect(result).toEqual({
    ok: true,
    value: ["(2, 3, W)", "(1, 0, S) LOST"],
  });
});

it("returns errors for invalid grid size", () => {
  const input = ["48", "(2, 3, E) LFRFF", "(0, 2, N) FFLFRFF"];
  const result = processInput(input);

  expect(result).toEqual({
    ok: false,
    error: "Invalid grid size '48'",
  });
});

it("returns errors for invalid robot input", () => {
  const input = ["4 8", "(2, 3, E LFRFF", "(0, 2, N) FFLFRFF"];
  const result = processInput(input);

  expect(result).toEqual({
    ok: false,
    error: "Invalid robot input '(2, 3, E LFRFF'",
  });
});

it("returns errors for invalid direction", () => {
  const input = ["4 8", "(2, 3, H) LFRFF", "(0, 2, N) FFLFRFF"];
  const result = processInput(input);

  expect(result).toEqual({
    ok: false,
    error: "Invalid direction 'H'",
  });
});

it("returns errors for invalid commands", () => {
  const input = ["4 8", "(2, 3, E) LFHFF", "(0, 2, N) FFLFRFF"];
  const result = processInput(input);

  expect(result).toEqual({
    ok: false,
    error: "Invalid commands 'LFHFF'",
  });
});

it("returns empty output if there are no robots", () => {
  const result = processInput(["4 8"]);

  expect(result).toEqual({ ok: true, value: [] });
});

it("returns an error if there is no input", () => {
  const result = processInput([]);

  expect(result).toEqual({ ok: false, error: "Invalid grid size ''" });
});
