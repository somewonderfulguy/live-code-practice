export function binarySearch<TElem>(
  sortedArray: TElem[],
  target: TElem,
  compare: (a: TElem, b: TElem) => number
): number {}

export function binarySearchSimple<TElem>(
  sortedArray: TElem[],
  target: TElem
): number {}
