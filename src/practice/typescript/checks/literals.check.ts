import { routes, STATUS } from '@exercise/literals'
import type { EventName, Route, Status } from '@exercise/literals'
import type { Equal, Expect } from './assertions'

export type LiteralChecks = [
  Expect<Equal<keyof typeof STATUS, 'Idle' | 'Loading' | 'Success' | 'Error'>>,
  Expect<Equal<typeof STATUS.Idle, 'idle'>>,
  Expect<Equal<typeof STATUS.Success, 'success'>>,
  Expect<Equal<Status, 'idle' | 'loading' | 'success' | 'error'>>,
  Expect<Equal<EventName, 'onIdle' | 'onLoading' | 'onSuccess' | 'onError'>>,
  Expect<Equal<keyof typeof routes, 'home' | 'profile'>>,
  Expect<Equal<typeof routes.home.path, '/'>>,
  Expect<Equal<typeof routes.profile.path, '/profile'>>,
  Expect<Equal<typeof routes.home.method, 'GET'>>,
  Expect<Equal<typeof routes.profile.requiresAuth, true>>,
]

export const validRoute: Route = {
  path: '/users',
  method: 'POST',
  requiresAuth: true,
}

export const validStatus: Status = STATUS.Loading
export const validEvent: EventName = 'onSuccess'

// @ts-expect-error A status outside the derived value union is invalid.
export const invalidStatus: Status = 'pending'

// @ts-expect-error An event name must use the derived spelling.
export const invalidEvent: EventName = 'onsuccess'

// @ts-expect-error Route paths must start with a slash.
export const invalidPath: Route = { path: 'profile', method: 'GET', requiresAuth: true }

// @ts-expect-error This exercise supports GET and POST only.
export const invalidMethod: Route = { path: '/', method: 'DELETE', requiresAuth: false }

// @ts-expect-error The exact configuration has no settings route.
routes.settings

// @ts-expect-error STATUS is a readonly compile-time configuration.
STATUS.Idle = 'idle'

// @ts-expect-error The route configuration is readonly too.
routes.home.path = '/'
