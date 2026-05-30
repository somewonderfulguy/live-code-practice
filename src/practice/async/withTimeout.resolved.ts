// Promise timeout
// resolve with original promise result if it finishes in time
// reject with Error('Timeout') if timeoutMs passes first
// clear timer when promise settles

export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {}

// const fetchUser = async () => {
// await new Promise((r) => setTimeout(r, 500))
// return 'user'
// }

// usage
// withTimeout(fetchUser(), 1000)
