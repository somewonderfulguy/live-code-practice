/**
 * Practice: narrow untrusted input and model mutually exclusive request states.
 * Read README.md before opening narrowing.resolved.ts.
 *
 * Replace the broad starter types and TODO bodies. The type checks verify the
 * public signatures as well as the state model; the runtime checks verify data.
 */

export type User = {
  id: number
  name: string
  email?: string
}

// Accept a non-array object with a finite numeric id and a string name.
// Missing email is valid; a present email must be a string.
// TODO: change the boolean return annotation into a useful type predicate.
export function isUser(_value: unknown): boolean {
  throw new Error('TODO: implement isUser')
}

// TODO: return a validated User or throw Error. Preserve the original object.
export function parseUser(_value: unknown): unknown {
  throw new Error('TODO: implement parseUser')
}

// TODO: use status as a discriminant. Only success has data: T, and only error
// has error: string. The other states are idle and loading.
export type RequestState<T> = unknown

// Return 'Idle', 'Loading', 'Success', or `Error: ${state.error}`.
// The completed switch must become a compile error when a new state is added
// without a corresponding branch.
export function describeRequest<T>(_state: RequestState<T>): string {
  throw new Error('TODO: implement describeRequest')
}
