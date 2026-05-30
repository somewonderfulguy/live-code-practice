// [1,2,2,3,3,3]-> [1,2,3]
const dedupe = <T>(arr: T[]): T[] => [...new Set(arr)]

////////////////////////////////////////////////////////////////

// ['a','b','a','c','b','a']-> { a:3, b:2, c:1 }
const countOccurrences = (arr: string[]) => {
  return arr.reduce<Record<string, number>>((acc, curr) => {
    const value = (acc[curr] ?? 0) + 1
    acc[curr] = value
    return acc
  }, {})
}

////////////////////////////////////////////////////////////////

// [
//   { id:1, type:'fruit', name:'apple' },
//   { id:2, type:'fruit', name:'banana' },
//   { id:3, type:'tech', name:'iphone' }
// ]
// 👆 this into this 👇
// {
//   fruit: [...],
//   tech: [...]
// }

type WithType = { type: string; [key: string]: unknown }

const ungrouped = [
  { id: 1, type: 'fruit', name: 'apple' },
  { id: 2, type: 'fruit', name: 'banana' },
  { id: 3, type: 'tech', name: 'iphone' }
] satisfies WithType[]

const groupByForOf = <TType extends { type: string }>(
  arr: TType[]
): Record<string, TType[]> => {
  const grouped: Record<string, TType[]> = {}

  for (const item of arr) {
    const currentValue = grouped[item.type] ?? []
    currentValue.push(item)
    grouped[item.type] = currentValue
  }

  return grouped
}

const groupByReduce = <TType extends { type: string }>(
  arr: TType[]
): Record<string, TType[]> => {
  return arr.reduce<Record<string, TType[]>>((acc, curr) => {
    ;(acc[curr.type] ??= []).push(curr)
    return acc
  }, {})
}

////////////////////////////////////////////////////////////////

// chunk([1, 2, 3, 4, 5], 2)
// [[1, 2], [3, 4], [5]]

const chunk = <T>(arr: T[], size: number): T[][] => {
  if (size <= 0) throw new Error('size must be greater than 0')

  const chunked: T[][] = []

  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size))
  }

  return chunked
}

////////////////////////////////////////////////////////////////

// intersection([1, 2, 2, 3], [2, 2, 4, 3])
// [2, 3]

const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  const right = new Set(arr2)
  return [...new Set(arr1)].filter((item) => right.has(item))
}

////////////////////////////////////////////////////////////////

// flattenOneLevel([1, [2, 3], 4, [5]])
// [1, 2, 3, 4, 5]

const flattenOneLevel = <T>(arr: Array<T | T[]>): T[] => {
  const result: T[] = []

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item)
    } else {
      result.push(item)
    }
  }

  return result
}

////////////////////////////////////////////////////////////////

// keyBy(
//   [
//     { id: "a1", name: "apple" },
//     { id: "b2", name: "banana" }
//   ],
//   "id"
// )
// 👆 this into this 👇
// {
//   a1: { id: "a1", name: "apple" },
//   b2: { id: "b2", name: "banana" }
// }

const keyBy = <TObj extends Record<string, unknown>, TKey extends keyof TObj>(
  arr: TObj[],
  key: TKey
): Record<string, TObj> => {
  const obj: Record<string, TObj> = {}

  for (const elem of arr) {
    obj[String(elem[key])] = elem
  }

  return obj
}

////////////////////////////////////////////////////////////////

// invert({ a: "x", b: "y", c: "x" })
// { x: "c", y: "b" }
// якщо значення дублюються, останній ключ перезаписує попередній.

type Object = Record<string, string>

const invert = (obj: Object): Object => {
  const newObj: Object = {}

  for (const key of Object.keys(obj)) {
    newObj[obj[key]] = key
  }

  return newObj
}

////////////////////////////////////////////////////////////////

// difference([1, 2, 3, 4], [2, 4])
// [1, 3]

const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  const right = new Set(arr2)
  return [...new Set(arr1)].filter((item) => !right.has(item))
}

////////////////////////////////////////////////////////////////

// Якщо елемент є в масиві — прибрати його.
// Якщо нема — додати.

// toggleInArray([1, 2, 3], 2)
// [1, 3]

// toggleInArray([1, 2, 3], 4)
// [1, 2, 3, 4]

const toggleInArrayGPT = <T>(arr: T[], value: T): T[] => {
  return arr.includes(value)
    ? arr.filter((item) => item !== value)
    : [...arr, value]
}

const toggleInArray = <T>(arr: T[], value: T): T[] => {
  const set = new Set(arr)
  if (set.has(value)) {
    set.delete(value)
  } else {
    set.add(value)
  }
  return Array.from(set)
}

////////////////////////////////////////////////////////////////

// Розбий масив на два масиви:
// перший — елементи, що проходять predicate
// другий — що не проходять
// partition([1, 2, 3, 4, 5], (n) => n % 2 === 0)
// [[2, 4], [1, 3, 5]]

const partition = <T>(arr: T[], func: (elem: T) => boolean): [T[], T[]] => {
  const truthy: T[] = []
  const falsy: T[] = []

  arr.forEach((item) => {
    if (func(item)) {
      truthy.push(item)
    } else {
      falsy.push(item)
    }
  })

  return [truthy, falsy]
}

////////////////////////////////////////////////////////////////

// Схоже на keyBy, але тут треба повертати не сам об’єкт, а індекс елемента.

// indexBy(
//   [
//     { id: 'a', name: 'apple' },
//     { id: 'b', name: 'banana' },
//     { id: 'c', name: 'cherry' },
//   ],
//   'id'
// )
// 👆 this into this 👇
// { a: 0, b: 1, c: 2 }

const indexBy = <TObj extends Record<string, unknown>, TKey extends keyof TObj>(
  arr: TObj[],
  key: TKey
): Record<string, number> => {
  const indexes: Record<string, number> = {}

  arr.forEach((item, idx) => {
    indexes[String(item[key])] = idx
  })

  return indexes
}

////////////////////////////////////////////////////////////////

// Те саме групування, але не в об’єкт, а в Map.

// groupByToMap(
//   [
//     { id: 1, type: 'fruit' },
//     { id: 2, type: 'fruit' },
//     { id: 3, type: 'tech' },
//   ],
//   'type'
// )
// 👆 this into this 👇
// Map {
//   'fruit' => [{ id: 1, type: 'fruit' }, { id: 2, type: 'fruit' }],
//   'tech' => [{ id: 3, type: 'tech' }]
// }

const groupByToMap = <
  TObj extends Record<string, unknown>,
  TKey extends keyof TObj
>(
  arr: TObj[],
  key: TKey
): Map<TObj[TKey], TObj[]> => {
  const map = new Map<TObj[TKey], TObj[]>()

  for (const item of arr) {
    const groupKey = item[key]
    const existing = map.get(groupKey)

    if (existing) {
      existing.push(item)
    } else {
      map.set(groupKey, [item])
    }
  }

  return map
}
