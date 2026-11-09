import type {
  MyOmit,
  MyPartial,
  MyPick,
  MyReadonly,
  MyRequired,
  ValueOf,
} from '@exercise/mappedTypes'
import type { Equal, Expect } from './assertions'

declare const privateKey: unique symbol

type User = {
  readonly id: number
  name: string
  email?: string
}

type NumericAndSymbolKeys = {
  readonly 0: string
  [privateKey]?: boolean
  name: string
}

export type MappedTypeCases = [
  Expect<Equal<MyPartial<User>, Partial<User>>>,
  Expect<Equal<MyPartial<{}>, {}>>,
  Expect<Equal<MyPartial<[string, number]>, Partial<[string, number]>>>,
  Expect<Equal<MyRequired<User>, Required<User>>>,
  Expect<Equal<MyRequired<{ value?: string | undefined }>, Required<{ value?: string | undefined }>>>,
  Expect<Equal<MyReadonly<User>, Readonly<User>>>,
  Expect<Equal<MyReadonly<number[]>, readonly number[]>>,
  Expect<Equal<MyPick<User, 'id' | 'email'>, { readonly id: number; email?: string }>>,
  Expect<Equal<MyPick<User, never>, {}>>,
  Expect<Equal<MyOmit<User, 'name'>, { readonly id: number; email?: string }>>,
  Expect<Equal<MyOmit<User, 'missing'>, User>>,
  Expect<Equal<MyOmit<User, keyof User>, {}>>,
  Expect<Equal<MyPick<NumericAndSymbolKeys, 0 | typeof privateKey>, Pick<NumericAndSymbolKeys, 0 | typeof privateKey>>>,
  Expect<Equal<MyOmit<NumericAndSymbolKeys, typeof privateKey>, Omit<NumericAndSymbolKeys, typeof privateKey>>>,
  Expect<Equal<ValueOf<{ first: 'a'; second: 2 }>, 'a' | 2>>,
  Expect<Equal<ValueOf<{ name: string; age?: number }>, string | number | undefined>>,
  Expect<Equal<ValueOf<{}>, never>>,
]

// @ts-expect-error Pick must reject a property not present on User.
export type InvalidPick = MyPick<User, 'missing'>

declare const partialUser: MyPartial<User>
// @ts-expect-error Making properties optional must not remove readonly.
partialUser.id = 2

declare const requiredUser: MyRequired<User>
// @ts-expect-error Required keeps the original readonly id.
requiredUser.id = 2

declare const readonlyUser: MyReadonly<User>
// @ts-expect-error name is readonly in the transformed type.
readonlyUser.name = 'Changed'

declare const pickedUser: MyPick<User, 'id' | 'email'>
// @ts-expect-error Pick preserves readonly.
pickedUser.id = 3

declare const omittedUser: MyOmit<User, 'name'>
// @ts-expect-error Omit preserves readonly.
omittedUser.id = 3
