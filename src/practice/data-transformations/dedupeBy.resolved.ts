type User = {
  id: number
  email: string
  name: string
}

const users: User[] = [
  { id: 1, email: 'alice@mail.com', name: 'Alice' },
  { id: 2, email: 'bob@mail.com', name: 'Bob' },
  { id: 3, email: 'alice@mail.com', name: 'Alice Updated' },
  { id: 4, email: 'charlie@mail.com', name: 'Charlie' },
  { id: 5, email: 'bob@mail.com', name: 'Bob Updated' }
]

function dedupeBy<T, K extends PropertyKey>(
  items: T[],
  getKey: (item: T) => K
): T[] {
  const itemsByKey = new Map<K, T>()

  for (const item of items) {
    const key = getKey(item)
    const itemInMap = itemsByKey.get(key)

    if (!itemInMap) {
      itemsByKey.set(key, item)
    }
  }

  return [...itemsByKey.values()]
}

console.log(dedupeBy(users, (user) => user.email))

// Expected
//dedupeBy(users, user => user.email)
// [
//   { id: 1, email: 'alice@mail.com', name: 'Alice' },
//   { id: 2, email: 'bob@mail.com', name: 'Bob' },
//   { id: 4, email: 'charlie@mail.com', name: 'Charlie' }
// ]
// keep the first occurrence
// preserve original order
// do not mutate original array
// Target Big O(n)
