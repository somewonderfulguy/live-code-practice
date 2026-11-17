import type { Getters } from '@exercise/keyRemapping'
import type { Equal, Expect } from './assertions'

declare const privateKey: unique symbol

type Person = {
  name: string
  age: number
  location: string
}

type MixedKeys = {
  readonly id: number
  email?: string
  status: 'idle' | 'loading'
  0: boolean
  '1': 'one'
  [privateKey]: Date
}

export type KeyRemappingCases = [
  Expect<Equal<Getters<Person>, {
    getName: () => string
    getAge: () => number
    getLocation: () => string
  }>>,
  Expect<Equal<Getters<MixedKeys>, {
    readonly getId: () => number
    getEmail?: () => string | undefined
    getStatus: () => 'idle' | 'loading'
    get1: () => 'one'
  }>>,
  Expect<Equal<Getters<{ readonly value?: 42 }>, {
    readonly getValue?: () => 42 | undefined
  }>>,
  Expect<Equal<Getters<{ 0: string; [privateKey]: boolean }>, {}>>,
  Expect<Equal<Getters<{}>, {}>>,
]

declare const person: Getters<Person>
const name: string = person.getName()
// @ts-expect-error Remapped getter names capitalize the original key.
person.getname()
// @ts-expect-error Original property names are not part of the getter map.
person.name
// @ts-expect-error Getters must retain the selected property's result type.
const wrongAge: string = person.getAge()
// @ts-expect-error Getters take no arguments.
person.getAge(1)

declare const mixed: Getters<MixedKeys>
// @ts-expect-error Source readonly modifiers survive key remapping.
mixed.getId = () => 2
// @ts-expect-error A numeric property key must not turn into a getter.
mixed.get0()
// @ts-expect-error An optional source property produces an optional getter.
mixed.getEmail()
const email: string | undefined = mixed.getEmail?.()
