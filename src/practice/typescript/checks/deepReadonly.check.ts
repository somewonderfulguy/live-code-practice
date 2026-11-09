import type { DeepReadonly } from '@exercise/deepReadonly'
import type { Equal, Expect } from './assertions'

type Data = {
  readonly id: number
  profile?: { name: string; labels: string[] }
  items: Array<{ enabled: boolean }>
  callback: (id: number) => { mutableResult: string }
}

type Expected = {
  readonly id: number
  readonly profile?: {
    readonly name: string
    readonly labels: readonly string[]
  }
  readonly items: ReadonlyArray<{ readonly enabled: boolean }>
  readonly callback: (id: number) => { mutableResult: string }
}

export type DeepReadonlyCases = [
  Expect<Equal<DeepReadonly<Data>, Expected>>,
  Expect<Equal<DeepReadonly<string | null | undefined>, string | null | undefined>>,
  Expect<Equal<DeepReadonly<() => number>, () => number>>,
  Expect<Equal<DeepReadonly<never>, never>>,
  Expect<Equal<DeepReadonly<unknown>, unknown>>,
  Expect<Equal<DeepReadonly<[]>, readonly []>>,
  Expect<Equal<DeepReadonly<readonly []>, readonly []>>,
  Expect<Equal<DeepReadonly<[name: string, details?: { active: boolean }]>, readonly [name: string, details?: { readonly active: boolean }]>>,
  Expect<Equal<DeepReadonly<readonly [{ value: string }]>, readonly [{ readonly value: string }]>>,
  Expect<Equal<DeepReadonly<[head: { id: number }, ...tail: string[]]>, readonly [head: { readonly id: number }, ...tail: string[]]>>,
]

declare const data: DeepReadonly<Data>
// @ts-expect-error Top-level properties become readonly.
data.id = 2
// @ts-expect-error Nested arrays become readonly.
data.items.push({ enabled: true })

if (data.profile) {
  // @ts-expect-error Optional nested objects retain readonly members.
  data.profile.name = 'Changed'
  // @ts-expect-error The nested array is readonly too.
  data.profile.labels.push('new')
}

// Function values remain callable, and their returned values are not recursively
// transformed: the function itself is treated as an atomic value.
const returned = data.callback(1)
returned.mutableResult = 'Allowed'
