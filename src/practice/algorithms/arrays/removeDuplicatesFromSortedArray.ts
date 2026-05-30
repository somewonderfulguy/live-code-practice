// Topic: Two pointers
// Difficulty: Easy / Medium
// Implement a function that removes duplicates from a sorted array.

// Version A — return a new array:
function removeDuplicatesFromSortedArray(nums: number[]): number[]

removeDuplicatesFromSortedArray([1, 1, 2])
// [1, 2]

removeDuplicatesFromSortedArray([1, 1, 2, 2, 3, 4, 4])
// [1, 2, 3, 4]

removeDuplicatesFromSortedArray([])
// []

// Expected complexity:
// Time: O(n)
// Space: O(n)

// Bonus version — mutate in place and return the new length:
function removeDuplicatesInPlace(nums: number[]): number

const nums = [1, 1, 2, 2, 3]

const length = removeDuplicatesInPlace(nums)
// length === 3
// first 3 items of nums should be [1, 2, 3]

// Expected complexity:
// Time: O(n)
// Space: O(1)
