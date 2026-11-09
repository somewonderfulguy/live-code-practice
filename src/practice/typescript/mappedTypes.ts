/**
 * Mapped types practice. Read the README first; keep the reference closed for
 * your first attempt. Replace each `unknown` with your implementation.
 * Preserve existing optional and readonly modifiers unless the task changes it.
 */

/** Make every top-level property optional. */
export type MyPartial<T> = unknown

/** Make every top-level property required. */
export type MyRequired<T> = unknown

/** Make every top-level property readonly. */
export type MyReadonly<T> = unknown

/** Keep only keys K; invalid keys must fail compilation. */
export type MyPick<T, K extends keyof T> = unknown

/** Remove keys K; keys not present on T should be harmless. */
export type MyOmit<T, K extends PropertyKey> = unknown

/** Produce the union of the object's property value types. */
export type ValueOf<T> = unknown
