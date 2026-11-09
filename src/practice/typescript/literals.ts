/**
 * Practice: literal inference, as const, satisfies and template-literal types.
 * Read README.md before opening literals.resolved.ts.
 * Replace the broad annotations/unknown aliases with precisely inferred types.
 */

// TODO: preserve the exact keys and make the values readonly string literals.
export const STATUS: Record<string, string> = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
}

// TODO: derive this union from STATUS rather than spelling it out again.
export type Status = unknown

export type Route = {
  path: `/${string}`
  method: 'GET' | 'POST'
  requiresAuth: boolean
}

// TODO: validate every route against Route while preserving the exact home and
// profile keys, path/method literals and readonly configuration values.
export const routes: Record<string, Route> = {
  home: { path: '/', method: 'GET', requiresAuth: false },
  profile: { path: '/profile', method: 'GET', requiresAuth: true },
}

// TODO: derive onIdle | onLoading | onSuccess | onError from Status.
export type EventName = unknown
