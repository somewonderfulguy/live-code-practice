// Topic: Promises / async control flow
// Difficulty: Medium

// Реалізуй власну версію Promise.allSettled.

type SettledResult<T> =
  | {
      status: 'fulfilled'
      value: T
    }
  | {
      status: 'rejected'
      reason: unknown
    }

export function promiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<SettledResult<T>[]> {}

export function promiseAllSettledPromiseAll<T>(
  promises: Promise<T>[]
): Promise<SettledResult<T>[]> {}

// Функція має:
// приймати масив промісів;
// повертати проміс;
// чекати завершення всіх промісів;
// не падати, якщо один або кілька промісів rejected;
// зберігати порядок результатів відповідно до вхідного масиву;
// для fulfilled промісів повертати { status: "fulfilled", value };
// для rejected промісів повертати { status: "rejected", reason }.

// const result = await promiseAllSettled([
//   Promise.resolve(1),
//   Promise.reject('error'),
//   Promise.resolve(3)
// ])
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "error" },
//   { status: "fulfilled", value: 3 },
// ]

// const resultEmpty = await promiseAllSettled([])

// console.log(result)
// []

// Expected complexity:
// Time: O(n)
// Space: O(n)
