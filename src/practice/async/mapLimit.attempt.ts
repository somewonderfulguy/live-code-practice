// Concurrency limit / mapLimit
// run no more than `limit` promises at the same time
// preserve original order in result
// reject if one mapper call rejects
// limit < 1 should throw

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  // implement
}

// example
const result = await mapLimit([1, 2, 3, 4, 5], 2, async (n) => {
  await delay(100)
  return n * 2
})
// expected
// [2, 4, 6, 8, 10]
