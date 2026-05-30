/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// MyPartial
// MyRequired
// ReadOnlyObject
// ReadOnlyBetter
// ArrayItemInfer
// ArrayItem
// FirstArrayItem
// String Template - OnTemplate<T>
// AsyncReturnType
// AsyncReturnTypeInfer
// MyReturnType
// FnParams (args)
// ValueOf (return union of object values)
// UnwrapPromise
// MyExtract
// MyExclude
// MyOmit
// MyPick
// MyNonNullable

// Type Guards, in

///////////////////////////////////////////////////////////////////////

type User = {
  name: string
  age: number
  email?: string
}

const user: User = {
  name: 'James',
  age: 30,
  email: 'bond@mi6.uk'
}

type Arr1 = string[]
type Arr2 = [number, string, boolean]

const syncFn = (a: string) => 5
const asyncFn = async (a: string) => 5

export type AnyFunction = (...args: any[]) => any

type TheUnion = 'test' | 'practice' | 'learn'

///////////////////////////////////////////////////////////////////////

type MyPartial<TObject> = {
  [Key in keyof TObject]?: TObject[Key]
}
type MyRequired<TObject> = {
  [Key in keyof TObject]-?: TObject[Key]
}
// ReadOnlyBetter
// ArrayItemInfer
type ArrayItem<TArray> = TArray extends (infer U)[] ? U : never
type FirstArrayItem<TArray extends any[]> = TArray[0]
type FirstArrayItemInfer<TArray> = TArray extends [
  item: infer U,
  ...items: unknown[]
]
  ? U
  : never
type OnTemplate<T> = `on${Capitalize<string & T>}`
type AsyncReturnType<TFunc extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<TFunc>
>
type AsyncReturnTypeInfer<TFunc extends AnyFunction> = TFunc extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : ReturnType<TFunc>
type MyReturnType<TFunc> = TFunc extends (...args: any[]) => infer U ? U : never
type FnParams<TFunc> = TFunc extends (...args: infer U) => any ? U : never
type ValueOf<TObject extends object> = TObject[keyof TObject]
// UnwrapPromise
// MyExtract
// MyExclude
// MyOmit
// MyPick
// MyNonNullable

///////////////////////////////////////////////////////////////////////

type A = ReadOnlyBetter<Arr1>
type B = ReadOnlyBetter<Arr2>
type C = ReadOnlyBetter<User>

type D = ArrayItemInfer<Arr2>

type acyncOne = AsyncReturnType<typeof asyncFn>
type acyncTwo = AsyncReturnTypeInfer<typeof asyncFn>
type acyncThree = AsyncReturnTypeInfer<typeof asyncFn>

type argsOne = FnParams<typeof syncFn>
type argsTwo = FnParams<typeof asyncFn>

type Values = ValueOf<User>

type Extracted = MyExtract<TheUnion, 'test' | 'learn'>
type Excluded = MyExclude<TheUnion, 'test' | 'learn'>

type Omitted = MyOmit<User, 'name' | 'age'>
