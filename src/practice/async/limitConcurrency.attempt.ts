// Topic: Promises / queue / concurrency control
// Difficulty: Medium / Hard
// Реалізуй функцію, яка запускає async tasks з обмеженням по кількості одночасно виконуваних задач.

type Task<T> = () => Promise<T>

export async function limitConcurrency<T>(
  tasks: Task<T>[],
  limit: number
): Promise<T[]> {}

// Функція має:
// приймати масив async-функцій, а не вже запущених промісів;
// запускати не більше ніж limit задач одночасно;
// повертати результати у тому ж порядку, що й tasks;
// завершуватись, коли всі задачі виконались;
// якщо будь-яка задача падає — весь limitConcurrency має rejected;
// не запускати зайві задачі після rejection, якщо це легко підтримати;
// якщо tasks порожній — повертати [].

// Examples
const tasks = [
  () => Promise.resolve('A'),
  () => Promise.resolve('B'),
  () => Promise.resolve('C')
]

const result = await limitConcurrency(tasks, 2)

// ["A", "B", "C"]

// Timing example

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// const tasks = [
//   async () => {
//     await delay(100)
//     return 'A'
//   },
//   async () => {
//     await delay(100)
//     return 'B'
//   },
//   async () => {
//     await delay(100)
//     return 'C'
//   }
// ]

// const result = await limitConcurrency(tasks, 2)

// Approx behavior:
// Start A + B
// After ~100ms, A + B finish
// Start C
// After ~200ms total, all done
//
// result: ["A", "B", "C"]

// Edge cases
// await limitConcurrency([], 2)
// []

// await limitConcurrency(tasks, 1)
// runs sequentially

// await limitConcurrency(tasks, tasks.length)
// similar to Promise.all

// Expected complexity:
// Time: O(n)
// Space: O(n)

// Bonus variant
// Зроби версію, яка працює як allSettled, тобто не падає після першої помилки,
// а повертає результат кожної задачі:
export function limitConcurrencySettled<T>(
  tasks: Task<T>[],
  limit: number
): Promise<SettledResult<T>[]> {}
