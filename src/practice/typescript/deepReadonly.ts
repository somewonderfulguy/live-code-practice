/**
 * Recursively make supported data readonly at compile time.
 *
 * Contract: primitives, plain objects, arrays and tuples (mutable or readonly).
 * Preserve optional properties, tuple shape and function call signatures.
 * Treat functions as atomic values. Date, Map, Set and other class instances
 * are outside this exercise's contract. This does not freeze runtime objects.
 */
export type DeepReadonly<T> = unknown
