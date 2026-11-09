function pluck<TItem, TKey extends keyof TItem>(
  items: TItem[],
  key: TKey
): TItem[TKey][] {
  return items.map((item) => item[key])
}

const dogs = [
  { name: 'Mimi', age: 12 },
  { name: 'LG', age: 13 }
]

pluck(dogs, 'age')
