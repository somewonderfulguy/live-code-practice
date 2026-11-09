// The second type parameter connects the key to this particular object.
// Indexed access keeps the result precise, including optional undefined values.
export function getProperty<TObject extends object, TKey extends keyof TObject>(
  object: TObject,
  key: TKey,
): TObject[TKey] {
  return object[key]
}
