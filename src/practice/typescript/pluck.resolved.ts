export function pluck<TItem extends object, TKey extends keyof TItem>(
  items: readonly TItem[],
  key: TKey,
): TItem[TKey][] {
  // map creates a new array and leaves the input untouched.
  return items.map((item) => item[key])
}
