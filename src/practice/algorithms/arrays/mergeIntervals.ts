// Topic: Sorting + intervals
// Difficulty: Medium
// Implement a function that merges overlapping intervals.

type Interval = {
  start: number
  end: number
}

function mergeIntervals(intervals: Interval[]): Interval[]

// Rules:
// intervals may be unsorted
// overlapping intervals should be merged
// touching intervals may be treated as overlapping

mergeIntervals([
  { start: 1, end: 3 },
  { start: 2, end: 6 },
  { start: 8, end: 10 },
  { start: 15, end: 18 }
])
// [
//   { start: 1, end: 6 },
//   { start: 8, end: 10 },
//   { start: 15, end: 18 },
// ]

mergeIntervals([
  { start: 1, end: 4 },
  { start: 4, end: 5 }
])
// [
//   { start: 1, end: 5 },
// ]

mergeIntervals([])
// []

mergeIntervals([
  { start: 5, end: 7 },
  { start: 1, end: 3 },
  { start: 2, end: 4 }
])
// [
//   { start: 1, end: 4 },
//   { start: 5, end: 7 },
// ]

// Expected complexity:
// Time: O(n log n)
// Space: O(n)
