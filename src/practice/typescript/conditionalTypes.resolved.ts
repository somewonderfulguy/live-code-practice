/** Reference: union filtering, extraction with infer, and async return types. */

// A naked type parameter on the left of `extends` distributes over a union.
export type MyExclude<T, U> = T extends U ? never : T
export type MyExtract<T, U> = T extends U ? T : never

// In strict TypeScript, {} accepts all non-nullish values, including primitives.
// This matches the built-in NonNullable, including unknown -> {}. The naive
// `T extends null | undefined ? never : T` leaves unknown unchanged.
export type MyNonNullable<T> = T & {}

export type ArrayItem<T> = T extends readonly (infer Item)[] ? Item : never

// A general array might be empty; this contract requires a guaranteed head.
// This is deliberately different from the union of all array element types.
export type FirstArrayItem<T> = T extends readonly [
  infer First,
  ...unknown[],
]
  ? First
  : never

// never[] permits different function parameter lists in a constraint without
// claiming those functions can accept arbitrary unknown arguments.
type Callable = (...args: never[]) => unknown

export type MyReturnType<T extends Callable> = T extends (
  ...args: never[]
) => infer Result
  ? Result
  : never

export type FnParams<T extends Callable> = T extends (
  ...args: infer Args
) => unknown
  ? Args
  : never

// One level only: Promise<Promise<string>> becomes Promise<string>.
export type UnwrapPromise<T> = T extends Promise<infer Value> ? Value : T

// Awaited also handles nested PromiseLike values and return-type unions.
export type AsyncReturnType<T extends Callable> = Awaited<MyReturnType<T>>
