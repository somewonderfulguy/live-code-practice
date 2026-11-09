/**
 * Reference: transformations of top-level object properties.
 * These are compile-time types; they do not copy, validate or freeze values.
 */

export type MyPartial<T> = {
  [Key in keyof T]?: T[Key]
}

export type MyRequired<T> = {
  [Key in keyof T]-?: T[Key]
}

export type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key]
}

// Iterating over K preserves the selected properties' original modifiers.
export type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key]
}

// Compose selection with a key filter. Unlike K extends keyof T, PropertyKey
// also accepts missing keys, which is the behavior of the built-in Omit.
export type MyOmit<T, K extends PropertyKey> = MyPick<
  T,
  Exclude<keyof T, K>
>

// keyof provides the key union; indexed access selects all corresponding types.
export type ValueOf<T> = T[keyof T]
