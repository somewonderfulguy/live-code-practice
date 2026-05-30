// Promise timeout
// resolve with original promise result if it finishes in time
// reject with Error('Timeout') if timeoutMs passes first
// clear timer when promise settles

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  // implement
}

// usage
await withTimeout(fetchUser(), 1000)
