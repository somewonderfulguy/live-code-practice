/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// All tasks todo:

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

// ReadOnlyObject
// DeepReadonly

// Type Guards, in
// custom enum (as const / unions)

// improve typing here:
// function getProperty(obj, key) { return obj[key] }
// function pluck(objArr, key) { return objArr.map((item) => item[key]) }

// switch/case + satisfies

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

// code here

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
