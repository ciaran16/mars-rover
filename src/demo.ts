/* eslint-disable no-console */
import { createInterface } from "node:readline/promises";
import { processInput } from "./processInput.js";

console.log("Input the grid size and robot states and commands.");
console.log("Insert a blank line to submit.\n");

const inputLines = await new Promise<string[]>((resolve) => {
  const lines: string[] = [];

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.on("line", (line) => {
    if (line === "") {
      readline.close();
    } else {
      lines.push(line);
    }
  });

  readline.on("close", () => {
    resolve(lines);
  });
});

const output = processInput(inputLines);
console.log("\nOutput:\n");
console.log(output.ok ? output.value.join("\n") : output.error);
