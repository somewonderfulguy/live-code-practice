// 13 TASKS HERE

////////////////////////////////////////////////////////////////

// [1,2,2,3,3,3]-> [1,2,3]
// const arr = [1, 2, 2, 3, 3, 3]
// const dedupe =

////////////////////////////////////////////////////////////////

// ['a','b','a','c','b','a']-> { a:3, b:2, c:1 }
// const countOccurrences = (arr: string[]) =>

////////////////////////////////////////////////////////////////

// [
//   { id: 1, type: 'fruit', name: 'apple' },
//   { id: 2, type: 'fruit', name: 'banana' },
//   { id: 3, type: 'tech', name: 'iphone' }
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

type FnTransform = <TType extends { type: string }>(
  arr: TType[]
) => Record<string, TType[]>

// const groupByForOf: FnTransform = (arr) => {}

// const groupByReduce: FnTransform = (arr) => {}

////////////////////////////////////////////////////////////////

// chunk([1, 2, 3, 4, 5], 2)
// [[1, 2], [3, 4], [5]]

// const chunk = <T>(arr: T[], step: number): T[][] => {}

////////////////////////////////////////////////////////////////

// intersection([1, 2, 2, 3], [2, 2, 4, 3])
// items that repeats in both arrays -> [2, 3]

// const intersection =

////////////////////////////////////////////////////////////////

// flattenOneLevel([1, [2, 3], 4, [5]])
// [1, 2, 3, 4, 5]

// const flattenOneLevel

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

// const keyBy =

////////////////////////////////////////////////////////////////

// invert({ a: "x", b: "y", c: "x" })
// { x: "c", y: "b" }
// якщо значення дублюються, останній ключ перезаписує попередній.

type Object = Record<string, string>

// const invert =

////////////////////////////////////////////////////////////////

// difference([1, 2, 3, 4], [2, 4])
// [1, 3]

// const difference =

////////////////////////////////////////////////////////////////

// Якщо елемент є в масиві — прибрати його.
// Якщо нема — додати.

// toggleInArray([1, 2, 3], 2)
// [1, 3]

// toggleInArray([1, 2, 3], 4)
// [1, 2, 3, 4]

// const toggleInArray =

////////////////////////////////////////////////////////////////

// Розбий масив на два масиви:
// перший — елементи, що проходять predicate
// другий — що не проходять
// partition([1, 2, 3, 4, 5], (n) => n % 2 === 0)
// [[2, 4], [1, 3, 5]]

// const partition =

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

// const indexBy

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

// const groupByToMap
