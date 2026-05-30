// Promise retry
// call fn
// if fn resolves, return result
// if fn rejects, retry up to options.retries times
// if all attempts fail, reject with last error
// optional delay between attempts

type RetryOptions = {
  retries: number
  delayMs?: number
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {}

// example:
// let attempts = 0

// retry(
//   async () => {
//     attempts++

//     if (attempts < 3) {
//       throw new Error('Nope')
//     }

//     return 'ok'
//   },
//   { retries: 3, delayMs: 100 }
// )
//   .then(console.log)
//   .catch(console.log)
// expected:
// 'ok'
