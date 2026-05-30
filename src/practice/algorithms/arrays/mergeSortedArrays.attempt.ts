// Topic: Two pointers
// Difficulty: Easy / Medium
// Implement a function that merges two sorted arrays into one sorted array.

function mergeSortedArrays(a: number[], b: number[]): number[]

// Examples:
mergeSortedArrays([1, 3, 5], [2, 4, 6])
// [1, 2, 3, 4, 5, 6]

mergeSortedArrays([1, 2, 3], [])
// [1, 2, 3]

mergeSortedArrays([], [4, 5])
// [4, 5]

mergeSortedArrays([1, 1, 3], [1, 2, 2])
// [1, 1, 1, 2, 2, 3]

// Expected complexity:
// Time: O(n + m)
// Space: O(n + m)
