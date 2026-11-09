/** Reference: retain literal information while checking a configuration shape. */

export const STATUS = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
} as const

// typeof obtains the object type; indexed access obtains the union of values.
export type Status = (typeof STATUS)[keyof typeof STATUS]

export type Route = {
  path: `/${string}`
  method: 'GET' | 'POST'
  requiresAuth: boolean
}

// `as const` preserves literal values and readonly properties. `satisfies`
// checks the Route contract without replacing the inferred object type with
// Record<string, Route>, which would lose the exact key set.
export const routes = {
  home: { path: '/', method: 'GET', requiresAuth: false },
  profile: { path: '/profile', method: 'GET', requiresAuth: true },
} as const satisfies Record<string, Route>

export type EventName = `on${Capitalize<Status>}`
