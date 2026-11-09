import { getProperty } from '@exercise/getProperty'
import type { Equal, Expect } from './assertions'

type User = { id: number; name: string; email?: string }
const user: User = { id: 1, name: 'Ada' }
const name = getProperty(user, 'name')
const email = getProperty(user, 'email')
type Name = Expect<Equal<typeof name, string>>
type Email = Expect<Equal<typeof email, string | undefined>>

const readonlyUser = { name: 'Ada', active: true } as const
const active = getProperty(readonlyUser, 'active')
type Literal = Expect<Equal<typeof active, true>>

const symbol = Symbol('id')
const symbolic = getProperty({ [symbol]: 42 as const }, symbol)
const numeric = getProperty({ 0: 'zero' as const }, 0)
type SymbolKey = Expect<Equal<typeof symbolic, 42>>
type NumericKey = Expect<Equal<typeof numeric, 'zero'>>

// @ts-expect-error keys must belong to the supplied object
getProperty(user, 'missing')
// @ts-expect-error null is not an object
getProperty(null, 'name')
