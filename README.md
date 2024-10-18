# Mars rover

I have assumed that once a robot leaves the grid, it's lost forever, even if its commands would bring it back on to the grid later. I have also assumed that if a robot starts off the grid, it's already lost and can't move back on to the grid. The initial project setup (e.g. config files) is copied from another personal project to save time.

I've tried to keep state immutable as I think it usually leads to clearer, less buggy code. I don't think it necessarily turned out to be a great fit for this problem, but it's not too bad and means I can find the next robot state, check if it's in bounds, and then return the unmodified original state if it was lost. I also use a `Result` type in `processInput` so that errors are encoded in the return type and won't be missed.

## Running the demo

This project is written in TypeScript, but I've included the built files in case you have any issues getting things running. If you just want to run the demo, run the following with a recent version of Node:

```sh
node dist/demo.js
```

Paste in some input, and insert a blank line to submit it. For example:

```txt
Input the grid size and robot states and commands.
Insert a blank line to submit.

4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF


Output:

(4, 4, E)
(0, 4, W) LOST
```

To run tests or other scripts, use `pnpm`:

```sh
pnpm install # Install dependencies
pnpm build   # Compile the TypeScript code to JavaScript
pnpm demo    # Run the demo script (src/demo.ts)
pnpm test    # Run the automated tests
pnpm inspect # Run linting
```
