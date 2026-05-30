// Topic: Sliding window
// Difficulty: Easy / Medium
// Implement a function that returns the maximum sum of any contiguous subarray of size k.

function maxSubarraySumOfSizeK(nums: number[], k: number): number | null

// Rules:
// return null if k <= 0
// return null if k > nums.length

maxSubarraySumOfSizeK([1, 2, 3, 4, 5], 2)
// 9 — [4, 5]

maxSubarraySumOfSizeK([2, 1, 5, 1, 3, 2], 3)
// 9 — [5, 1, 3]

maxSubarraySumOfSizeK([-1, -2, -3], 2)
// -3 — [-1, -2]

maxSubarraySumOfSizeK([1, 2], 3)
// null

maxSubarraySumOfSizeK([1, 2], 0)
// null

// Expected complexity:
// Time: O(n)
// Space: O(1)
