// Topic: Sliding window
// Difficulty: Medium
// Implement a function that returns the length of the longest substring without repeating characters.

function longestSubstringWithoutRepeatingChars(input: string): number
longestSubstringWithoutRepeatingChars('abcabcbb')
// 3 — "abc"

longestSubstringWithoutRepeatingChars('bbbbb')
// 1 — "b"

longestSubstringWithoutRepeatingChars('pwwkew')
// 3 — "wke"

longestSubstringWithoutRepeatingChars('')
// 0

longestSubstringWithoutRepeatingChars('dvdf')
// 3 — "vdf"

// Expected complexity:
// Time: O(n)
// Space: O(min(n, alphabetSize))
