// Topic: Prefix sum / cumulative data
// Difficulty: Easy
// Implement a function that converts a list of daily values into cumulative running totals.

type DailyValue = {
  date: string
  value: number
}

type DailyTotal = {
  date: string
  value: number
  total: number
}

function runningTotals(items: DailyValue[]): DailyTotal[]

runningTotals([
  { date: '2026-05-01', value: 10 },
  { date: '2026-05-02', value: 20 },
  { date: '2026-05-03', value: 5 }
])
// [
//   { date: "2026-05-01", value: 10, total: 10 },
//   { date: "2026-05-02", value: 20, total: 30 },
//   { date: "2026-05-03", value: 5, total: 35 },
// ]

// Expected complexity:
// Time: O(n)
// Space: O(n)

// Bonus version:
function prefixSums(nums: number[]): number[]

prefixSums([1, 2, 3, 4])
// [1, 3, 6, 10]

prefixSums([])
// []
