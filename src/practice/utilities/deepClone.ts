// Deep clone
// primitives
// arrays
// plain objects
// nested arrays/objects
// Date
// do not mutate original object

// Bonus
// handle circular references with WeakMap

function deepClone<T>(value: T): T {
  // implement
}

// example
const original = {
  user: {
    name: 'Alice',
    tags: ['admin', 'editor']
  },
  createdAt: new Date('2026-01-01')
}

const cloned = deepClone(original)

cloned.user.name = 'Bob'
cloned.user.tags.push('new')

// expected
// original.user.name // 'Alice'
// original.user.tags // ['admin', 'editor']
