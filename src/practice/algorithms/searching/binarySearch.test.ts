import { describe, expect, it } from 'vitest'

import { binarySearch, binarySearchSimple } from './binarySearch'

const compareNumbers = (a: number, b: number) => a - b

describe('binarySearchSimple', () => {
  it('returns the index when the target is in the sorted array', () => {
    expect(binarySearchSimple([1, 3, 5, 7, 9], 1)).toBe(0)
    expect(binarySearchSimple([1, 3, 5, 7, 9], 5)).toBe(2)
    expect(binarySearchSimple([1, 3, 5, 7, 9], 9)).toBe(4)
  })

  it('returns -1 when the target is not in the sorted array', () => {
    expect(binarySearchSimple([1, 3, 5, 7, 9], 4)).toBe(-1)
  })

  it('returns -1 for an empty array', () => {
    expect(binarySearchSimple([], 1)).toBe(-1)
  })
})

describe('binarySearch', () => {
  it('returns the index when the target is in the sorted array', () => {
    expect(binarySearch([1, 3, 5, 7, 9], 1, compareNumbers)).toBe(0)
    expect(binarySearch([1, 3, 5, 7, 9], 5, compareNumbers)).toBe(2)
    expect(binarySearch([1, 3, 5, 7, 9], 9, compareNumbers)).toBe(4)
  })

  it('returns -1 when the target is not in the sorted array', () => {
    expect(binarySearch([1, 3, 5, 7, 9], 4, compareNumbers)).toBe(-1)
  })

  it('returns -1 for an empty array', () => {
    expect(binarySearch([], 1, compareNumbers)).toBe(-1)
  })

  it('uses the comparison function to search objects', () => {
    const users = [
      { id: 1, name: 'Ada' },
      { id: 3, name: 'Grace' },
      { id: 5, name: 'Katherine' }
    ]

    expect(
      binarySearch(users, { id: 3, name: 'Grace' }, (a, b) => a.id - b.id)
    ).toBe(1)
  })
})
