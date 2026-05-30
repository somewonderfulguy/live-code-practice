function binarySearch<TElem>(
  sortedArray: TElem[],
  target: TElem,
  compare: (a: TElem, b: TElem) => number
): number {}

function binarySearchSimple<TElem>(
  sortedArray: TElem[],
  target: TElem
): number {}

type User = {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' }
]

const target = { id: 5, name: 'Charlie' }

const result = binarySearch(users, target, (a, b) => a.id - b.id) // 1

const arr = [2, 4, 5, 8, 11]
const simpleResult = binarySearchSimple(arr, 8)

console.log(result, simpleResult)
