function isPalindrome(str: string): boolean {
  const left = str.slice(0, Math.floor(str.length / 2))
  const right = str
    .slice(Math.ceil(str.length / 2))
    .split('')
    .reverse()
    .join('')

  return left === right
}

function isPalindromeTwo(str: string): boolean {
  let left = 0
  let right = str.length - 1

  while (left < right) {
    if (str[left] !== str[right]) return false
    left++
    right--
  }

  return true
}

// const s = str.toLowerCase().replace(/[^a-z0-9]/g, '')
function isPalindromeThree(str: string): boolean {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  let left = 0
  let right = normalized.length - 1

  while (left < right) {
    if (normalized[left] !== normalized[right]) {
      return false
    }

    left++
    right--
  }

  return true
}

console.log('isPalindrome level', isPalindrome('level'))
console.log('isPalindrome banana', isPalindrome('banana'))
