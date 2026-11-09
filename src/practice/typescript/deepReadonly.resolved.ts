/**
 * Reference for primitives, plain objects, arrays and tuples.
 * Date, Map, Set and other class instances are outside this exercise's contract.
 * This is a type transformation, not a runtime deep-freeze implementation.
 */
export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T // Preserve callable values; do not turn their call signature into {}.
  : T extends readonly unknown[]
    ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
    : T extends object
      ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
      : T

// The homomorphic array/tuple mapping preserves tuple positions, labels,
// optional elements and rest elements while making the container readonly.
