/** Reference: runtime validation and discriminated-union narrowing. */

export type User = {
  id: number
  name: string
  email?: string
}

export function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  if (
    !('id' in value) ||
    typeof value.id !== 'number' ||
    !Number.isFinite(value.id) ||
    !('name' in value) ||
    typeof value.name !== 'string'
  ) {
    return false
  }

  // Absence and a present-but-undefined property are different in this contract.
  return !('email' in value) || typeof value.email === 'string'
}

export function parseUser(value: unknown): User {
  if (!isUser(value)) {
    throw new Error('Invalid user')
  }

  // The predicate narrowed value; an assertion such as `as User` is unnecessary.
  return value
}

export type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function assertNever(_value: never): never {
  throw new Error('Unhandled request state')
}

export function describeRequest<T>(state: RequestState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Idle'
    case 'loading':
      return 'Loading'
    case 'success':
      return 'Success'
    case 'error':
      return `Error: ${state.error}`
    default:
      // Add a new union member without a case and this stops type-checking.
      return assertNever(state)
  }
}
