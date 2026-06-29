import { describe, expect, it } from 'vitest'

import { bubbleSort } from './bubbleSort'

describe('bubbleSort', () => {
  it('sorts numbers in ascending order', () => {
    expect(bubbleSort([4, 2, 7, 3])).toEqual([2, 3, 4, 7])
  })

  it('handles already sorted arrays', () => {
    expect(bubbleSort([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  })

  it('handles duplicate and negative values', () => {
    expect(bubbleSort([3, -1, 3, 0, -1])).toEqual([-1, -1, 0, 3, 3])
  })

  it('returns an empty array when given an empty array', () => {
    expect(bubbleSort([])).toEqual([])
  })

  it('sorts the array in place and returns the same array', () => {
    const numbers = [5, 1, 4, 2]
    const sorted = bubbleSort(numbers)

    expect(sorted).toBe(numbers)
    expect(numbers).toEqual([1, 2, 4, 5])
  })
})
