function binarySearch<TElem>(
  sortedArray: TElem[],
  target: TElem,
  compare: (a: TElem, b: TElem) => number
): number {
  let left = 0
  let right = sortedArray.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const cmp = compare(sortedArray[mid], target)

    if (cmp === 0) return mid

    if (cmp < 0) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

function binarySearchSimple<TElem>(
  sortedArray: TElem[],
  target: TElem
): number {
  let left = 0
  let right = sortedArray.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const current = sortedArray[mid]

    if (current === target) return mid

    if (target > current) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}
