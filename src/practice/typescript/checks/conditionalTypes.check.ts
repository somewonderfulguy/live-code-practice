import type {
  ArrayItem,
  AsyncReturnType,
  FirstArrayItem,
  FnParams,
  MyExclude,
  MyExtract,
  MyNonNullable,
  MyReturnType,
  UnwrapPromise,
} from '@exercise/conditionalTypes'
import type { Equal, Expect } from './assertions'

type Action =
  | { type: 'create'; name: string }
  | { type: 'delete'; id: number }

type Handler = (id: number, options?: { force: boolean }) => 'ok'
type Overloaded = {
  (value: string): number
  (value: number): string
}

export type ConditionalTypeCases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'b'>, 'a' | 'c'>>,
  Expect<Equal<MyExclude<string | number, string>, number>>,
  Expect<Equal<MyExclude<never, string>, never>>,
  Expect<Equal<MyExtract<Action, { type: 'delete' }>, { type: 'delete'; id: number }>>,
  Expect<Equal<MyExtract<'a' | 'b', number>, never>>,
  Expect<Equal<MyNonNullable<string | null | undefined>, string>>,
  Expect<Equal<MyNonNullable<null | undefined>, never>>,
  Expect<Equal<MyNonNullable<unknown>, NonNullable<unknown>>>,
  Expect<Equal<MyNonNullable<never>, never>>,
  Expect<Equal<ArrayItem<string[]>, string>>,
  Expect<Equal<ArrayItem<readonly number[]>, number>>,
  Expect<Equal<ArrayItem<readonly ['first', 2]>, 'first' | 2>>,
  Expect<Equal<ArrayItem<readonly []>, never>>,
  Expect<Equal<ArrayItem<string>, never>>,
  Expect<Equal<FirstArrayItem<readonly ['first', 2]>, 'first'>>,
  Expect<Equal<FirstArrayItem<[string, ...number[]]>, string>>,
  Expect<Equal<FirstArrayItem<[]>, never>>,
  Expect<Equal<FirstArrayItem<readonly []>, never>>,
  Expect<Equal<FirstArrayItem<string[]>, never>>,
  Expect<Equal<FirstArrayItem<[name?: string]>, never>>,
  Expect<Equal<MyReturnType<Handler>, 'ok'>>,
  Expect<Equal<FnParams<Handler>, [id: number, options?: { force: boolean }]>>,
  Expect<Equal<FnParams<(...values: string[]) => void>, string[]>>,
  Expect<Equal<MyReturnType<Overloaded>, ReturnType<Overloaded>>>,
  Expect<Equal<FnParams<Overloaded>, Parameters<Overloaded>>>,
  Expect<Equal<MyReturnType<<T>(value: T) => T>, unknown>>,
  Expect<Equal<UnwrapPromise<Promise<string>>, string>>,
  Expect<Equal<UnwrapPromise<Promise<Promise<string>>>, Promise<string>>>,
  Expect<Equal<UnwrapPromise<number | Promise<string>>, number | string>>,
  Expect<Equal<UnwrapPromise<PromiseLike<string>>, PromiseLike<string>>>,
  Expect<Equal<AsyncReturnType<() => Promise<number>>, number>>,
  Expect<Equal<AsyncReturnType<() => Promise<Promise<string>>>, string>>,
  Expect<Equal<AsyncReturnType<() => PromiseLike<boolean>>, boolean>>,
  Expect<Equal<AsyncReturnType<() => 'sync'>, 'sync'>>,
  Expect<Equal<AsyncReturnType<() => Promise<number> | undefined>, number | undefined>>,
]

// @ts-expect-error A non-function cannot have extracted return/parameter types.
export type InvalidReturnType = MyReturnType<string>
// @ts-expect-error Keep the function constraint for parameter extraction.
export type InvalidParameters = FnParams<{ value: number }>
// @ts-expect-error AsyncReturnType accepts functions, not Promise values.
export type InvalidAsyncReturn = AsyncReturnType<Promise<number>>
