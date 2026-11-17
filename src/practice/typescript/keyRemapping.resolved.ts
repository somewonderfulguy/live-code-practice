/**
 * Reference: remap object keys while retaining their corresponding value types.
 * These types describe getters; they do not create an object or any functions.
 */

export type Getters<T> = {
  // Intersecting with string drops numeric/symbol keys before capitalization.
  // Mapping over keyof T keeps each property's optional/readonly modifiers.
  [Key in keyof T as `get${Capitalize<string & Key>}`]: () => T[Key]
}
