/* eslint-disable @typescript-eslint/no-explicit-any */

export type MyPartial<TData> = {
  [TKey in keyof TData]?: TData[TKey]
}

export type ReadOnlyObject<TObject> = {
  readonly [TKey in keyof TObject]: TObject[TKey] extends object
    ? ReadOnlyObject<TObject[TKey]>
    : TObject[TKey]
}

export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly any[]
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T

type ArrayItem<TArray extends readonly unknown[]> = TArray[number]
// type ArrayItemInfer<TArray> = TArray extends (infer U)[] ? U : never
type ArrayItemInfer<T> = T extends [infer F, ...unknown[]] ? F : never

type AsyncReturnType<TFunc extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<TFunc>
>

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never
type FnParams<T> = T extends (...args: infer P) => any ? P : never

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type AnyFunction = (...args: any[]) => any
type AsyncReturnTypeInfer<TFunc extends AnyFunction> = TFunc extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : ReturnType<TFunc>

export type ValueOf<T> = T[keyof T]

export type MyNonNullable<T> = T extends null | undefined ? never : T
export type MyExtract<T, U> = T extends U ? T : never
export type MyExclude<T, U> = T extends U ? never : T

export type MyPick<TObject, TPick extends keyof TObject> = {
  [Key in TPick]: TObject[Key]
}

export type MyOmit<TObject, TOmitted extends keyof TObject> = {
  [Key in Exclude<keyof TObject, TOmitted>]: TObject[Key]
}

type AnObject = {
  name: string
  age: number
  location: {
    lat: number
    lng: number
  }
}

// type A = Promise<string>

type UnionOfMine = 'harry' | 'james' | null | 'pottah'

type NewObject = MyOmit<AnObject, 'name'>

type MyStrings = [string, number]
type TheString = ArrayItemInfer<MyStrings>

const fn = async () => 123
const fnSync = async () => 123

type AsyncLoggerReturn = AsyncReturnType<typeof fnSync>

type MyPick2<TObject, TPick extends keyof TObject> = {
  [TKey in TPick]: TObject[TKey]
}

type MyOmit2<TObject, TOmit extends keyof TObject> = {
  [TKey in Exclude<keyof TObject, TOmit>]: TObject[TKey]
}

type NewObject2 = MyOmit2<AnObject, 'name'>

// const isAdmin = (user: User | Admin): user is Admin => {
//   return 'role' in user;
// }
