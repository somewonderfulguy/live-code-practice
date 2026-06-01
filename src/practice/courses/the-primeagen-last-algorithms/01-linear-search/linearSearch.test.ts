import { describe, expect, it } from 'vitest'

import { linearSearch } from './linearSearch'

describe('linearSearch', () => {
  it('returns true when the needle exists in the haystack', () => {
    expect(linearSearch([1, 3, 5, 7, 9], 1)).toBe(true)
    expect(linearSearch([1, 3, 5, 7, 9], 5)).toBe(true)
    expect(linearSearch([1, 3, 5, 7, 9], 9)).toBe(true)
  })

  it('returns false when the needle does not exist in the haystack', () => {
    expect(linearSearch([1, 3, 5, 7, 9], 4)).toBe(false)
  })

  it('returns false for an empty haystack', () => {
    expect(linearSearch([], 1)).toBe(false)
  })
})
