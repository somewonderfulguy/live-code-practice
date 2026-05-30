function isPalindrome(str: string): boolean {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '')

  let left = 0
  let right = normalized.length - 1

  while (left < right) {
    if (normalized[left] !== normalized[right]) return false
    left++
    right--
  }

  return true
}

console.log('isPalindrome level', isPalindrome('level!'))
console.log('isPalindrome banana', isPalindrome('banana9'))
