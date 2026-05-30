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

async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  // implement
}

// example:
let attempts = 0

const result = await retry(
  async () => {
    attempts++

    if (attempts < 3) {
      throw new Error('Nope')
    }

    return 'ok'
  },
  { retries: 3, delayMs: 100 }
)
// expected:
// 'ok'
