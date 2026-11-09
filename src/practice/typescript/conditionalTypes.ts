/**
 * Conditional and inferred types practice. Replace each `unknown` TODO.
 * The README specifies the difference between an array element, a guaranteed
 * tuple head, one-level Promise unwrapping and recursive awaited return types.
 */

export type MyExclude<T, U> = unknown
export type MyExtract<T, U> = unknown
export type MyNonNullable<T> = unknown

/** Accept arrays/readonly tuples; non-array input produces never. */
export type ArrayItem<T> = unknown

/** Extract a guaranteed nonempty tuple's first type; otherwise never. */
export type FirstArrayItem<T> = unknown

type Callable = (...args: never[]) => unknown

/** Invalid non-function input must fail the generic constraint. */
export type MyReturnType<T extends Callable> = unknown
export type FnParams<T extends Callable> = unknown

/** Unwrap one Promise layer; preserve non-Promise input. */
export type UnwrapPromise<T> = unknown

/** Match Awaited<ReturnType<T>>, including synchronous return values. */
export type AsyncReturnType<T extends Callable> = unknown
