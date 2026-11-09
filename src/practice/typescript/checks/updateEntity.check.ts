import { updateEntity } from '@exercise/updateEntity'
import type { Equal, Expect } from './assertions'

type User = { id: number; name: string; email?: string; settings: { dark: boolean } }
const user: User = { id: 1, name: 'Ada', settings: { dark: false } }
const updated = updateEntity(user, { name: 'Lin' })
const unchanged = updateEntity(user, {})
type Result = Expect<Equal<typeof updated, User>>
type EmptyPatch = Expect<Equal<typeof unchanged, User>>

// @ts-expect-error fresh patches cannot add fields outside the entity shape
updateEntity(user, { age: 30 })
// @ts-expect-error an existing field must retain its value type
updateEntity(user, { name: 42 })
// @ts-expect-error a shallow patch cannot omit required nested fields
updateEntity(user, { settings: {} })
// @ts-expect-error with exactOptionalPropertyTypes, optional is not explicit undefined
updateEntity(user, { email: undefined })
// @ts-expect-error the entity must be an object
updateEntity(null, {})
