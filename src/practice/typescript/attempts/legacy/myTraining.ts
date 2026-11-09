export type MyPartial<TObject> = {
  [TKey in keyof TObject]?: TObject[TKey]
}

export type MyDeepPartial<TObject> = {
  [TKey in keyof TObject]?: TObject[TKey] extends object
    ? MyDeepPartial<TObject[TKey]>
    : TObject[TKey]
}

export type MyRequired<TObject> = {
  [TKey in keyof TObject]-?: TObject[TKey]
}

export type MyDeepRequired<TObject> = {
  [TKey in keyof TObject]-?: TObject[TKey] extends object
    ? MyDeepRequired<TObject[TKey]>
    : TObject[TKey]
}

type A = {
  name: string
  age?: number
  location: {
    lat?: number
    lng: number
  }
}
