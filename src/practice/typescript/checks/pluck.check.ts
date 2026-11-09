import { pluck } from '@exercise/pluck'
import type { Equal, Expect } from './assertions'

type User = { id: number; name: string; email?: string }
const users: readonly User[] = [{ id: 1, name: 'Ada' }, { id: 2, name: 'Lin' }]
const names = pluck(users, 'name')
const emails = pluck(users, 'email')
type Names = Expect<Equal<typeof names, string[]>>
type Emails = Expect<Equal<typeof emails, (string | undefined)[]>>

const literals = pluck([{ id: 1 }, { id: 2 }] as const, 'id')
type LiteralValues = Expect<Equal<typeof literals, (1 | 2)[]>>
const empty: readonly User[] = []
const emptyResult = pluck(empty, 'id')
type Empty = Expect<Equal<typeof emptyResult, number[]>>

// @ts-expect-error invalid property on the array item type
pluck(users, 'missing')
// @ts-expect-error input must be an array of objects
pluck([1, 2, 3], 'id')
