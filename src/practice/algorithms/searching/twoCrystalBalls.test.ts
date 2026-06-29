import { describe, expect, it } from 'vitest'

import { twoCrystalBalls } from './twoCrystalBalls'

function makeBreaks(length: number, firstBreakingFloor: number): boolean[] {
  return Array.from({ length }, (_, index) => index >= firstBreakingFloor)
}

function trackIndexedReads(breaks: boolean[]): {
  breaks: boolean[]
  getReadCount: () => number
} {
  let readCount = 0

  return {
    breaks: new Proxy(breaks, {
      get(target, property, receiver) {
        if (
          typeof property === 'string' &&
          Number.isInteger(Number(property)) &&
          Number(property) >= 0
        ) {
          readCount++
        }

        return Reflect.get(target, property, receiver)
      }
    }),
    getReadCount: () => readCount
  }
}

describe('twoCrystalBalls', () => {
  it('returns the first floor where the crystal ball breaks', () => {
    expect(twoCrystalBalls(makeBreaks(100, 73))).toBe(73)
  })

  it('handles the first and last floor as breaking points', () => {
    expect(twoCrystalBalls(makeBreaks(20, 0))).toBe(0)
    expect(twoCrystalBalls(makeBreaks(20, 19))).toBe(19)
  })

  it('handles a breaking point exactly on a jump boundary', () => {
    expect(twoCrystalBalls(makeBreaks(16, 4))).toBe(4)
  })

  it('returns -1 when no floor breaks the crystal ball', () => {
    expect(twoCrystalBalls(new Array<boolean>(20).fill(false))).toBe(-1)
  })

  it('returns -1 for an empty building', () => {
    expect(twoCrystalBalls([])).toBe(-1)
  })

  it('keeps the number of checked floors near sqrt(n)', () => {
    const tracked = trackIndexedReads(makeBreaks(10_000, 9_900))

    expect(twoCrystalBalls(tracked.breaks)).toBe(9_900)
    expect(tracked.getReadCount()).toBeLessThanOrEqual(250)
  })
})
