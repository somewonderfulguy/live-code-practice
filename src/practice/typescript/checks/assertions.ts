// A failed Expect produces a compiler error, without executing a test file.
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false

export type Expect<T extends true> = T
