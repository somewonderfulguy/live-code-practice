# Live Code Prep

Long-lived practice repo for algorithms, TypeScript, React, utility functions,
interview prompts, course work, and repeat attempts.

The Vite app is intentionally tiny. It is only a playground shell; the real value
of this repo lives in `src/practice`.

## Structure

```txt
src/
  app/                         Vite/React app shell
  assets/                      App assets
  practice/
    algorithms/                Searching, arrays, strings, recursion, trees
    async/                     Promises, retries, timeouts, concurrency
    attempts/                  Older learning passes and repeat sessions
    big-o/                     Complexity notes and drills
    courses/                   Course-specific practice tracks
    data-structures/           Caches, queues, stacks, linked structures
    data-transformations/      Map/filter/reduce/object joining tasks
    patterns/                  Observer, memoization, undo/redo, throttling
    react/                     Hooks and React-specific live coding
    typescript/                Type-level and TS language practice
    utilities/                 Reusable helpers and standalone utility tasks
```

## File Naming

Use this naming style for new exercises:

```txt
taskName.task.md       prompt, constraints, examples, Big O target
taskName.ts            your active implementation
taskName.attempt.ts    older attempt worth keeping
taskName.resolved.ts   reference solution or final version
```

For tiny drills, it is fine to keep only `taskName.ts`. When a task becomes worth
revisiting, add the `.task.md` and `.resolved.ts` files next to it.

## Course Track

The Primeagen course lives here:

```txt
src/practice/courses/the-primeagen-last-algorithms/
```

The first exercise is ready at:

```txt
src/practice/courses/the-primeagen-last-algorithms/01-linear-search/
```

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
```

`src/practice` is excluded from the app build and lint pass because unfinished
exercise stubs are expected there. When a practice file becomes production-grade,
move it into `src/app` or add a focused test/typecheck setup for that folder.
