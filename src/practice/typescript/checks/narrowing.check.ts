import { describeRequest, isUser, parseUser } from '@exercise/narrowing'
import type { RequestState, User } from '@exercise/narrowing'
import type { Equal, Expect } from './assertions'

export type SignatureChecks = [
  Expect<Equal<typeof isUser, (value: unknown) => value is User>>,
  Expect<Equal<ReturnType<typeof parseUser>, User>>,
  Expect<Equal<Parameters<typeof parseUser>, [unknown]>>,
]

type ExpectedState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

export type StateChecks = [
  Expect<Equal<RequestState<number>, ExpectedState<number>>>,
  Expect<Equal<RequestState<User[]>, ExpectedState<User[]>>>,
]

declare const candidate: unknown

if (isUser(candidate)) {
  const user: User = candidate
  const id: number = candidate.id
  const name: string = candidate.name
  const email: string | undefined = candidate.email
  void [user, id, name, email]
}

export const idle: RequestState<number> = { status: 'idle' }
export const loading: RequestState<number> = { status: 'loading' }
export const success: RequestState<number> = { status: 'success', data: 42 }
export const failure: RequestState<number> = { status: 'error', error: 'Offline' }

// @ts-expect-error A successful number request must have number data.
export const wrongData: RequestState<number> = { status: 'success', data: '42' }

// @ts-expect-error Success requires data.
export const missingData: RequestState<number> = { status: 'success' }

// @ts-expect-error Error text belongs to the error branch.
export const wrongBranch: RequestState<number> = { status: 'idle', error: 'No' }

// @ts-expect-error An undeclared state must not silently enter the union.
export const wrongStatus: RequestState<number> = { status: 'cancelled' }

export const message: string = describeRequest<number>(success)

declare const state: RequestState<number>
if (state.status === 'success') {
  const data: number = state.data
  void data
  // @ts-expect-error Success does not expose error text.
  state.error
}

if (state.status === 'error') {
  const error: string = state.error
  void error
  // @ts-expect-error The error branch does not expose data.
  state.data
}
