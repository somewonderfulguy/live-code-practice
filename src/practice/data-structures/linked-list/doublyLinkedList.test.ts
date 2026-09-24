import { describe, expect, it } from 'vitest'

import { DoublyLinkedList } from './doublyLinkedList'

describe.skip('DoublyLinkedList', () => {
  it('starts empty', () => {
    const list = new DoublyLinkedList<number>()

    expect(list.length).toBe(0)
    expect(list.get(0)).toBeUndefined()
  })

  it('prepends items so the newest ends up at the head', () => {
    const list = new DoublyLinkedList<number>()
    list.prepend(3)
    list.prepend(2)
    list.prepend(1)

    expect(list.length).toBe(3)
    expect(list.get(0)).toBe(1)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(3)
  })

  it('appends items so the newest ends up at the tail', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.length).toBe(3)
    expect(list.get(0)).toBe(1)
    expect(list.get(2)).toBe(3)
  })

  it('inserts in the middle at a given index', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)
    list.append(3)
    list.insertAt(2, 1)

    expect(list.length).toBe(3)
    expect(list.get(0)).toBe(1)
    expect(list.get(1)).toBe(2)
    expect(list.get(2)).toBe(3)
  })

  it('inserts at the head when idx is 0', () => {
    const list = new DoublyLinkedList<number>()
    list.append(2)
    list.insertAt(1, 0)

    expect(list.get(0)).toBe(1)
    expect(list.length).toBe(2)
  })

  it('inserts at the tail when idx equals length', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)
    list.insertAt(2, 1)

    expect(list.get(1)).toBe(2)
    expect(list.length).toBe(2)
  })

  it('removes an item by value and returns it', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.remove(2)).toBe(2)
    expect(list.length).toBe(2)
    expect(list.get(1)).toBe(3)
  })

  it('returns undefined when removing a value that is not in the list', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)

    expect(list.remove(99)).toBeUndefined()
    expect(list.length).toBe(1)
  })

  it('removes at a given index and returns the removed value', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.removeAt(1)).toBe(2)
    expect(list.length).toBe(2)
    expect(list.get(1)).toBe(3)
  })

  it('handles removing the only item so the list becomes empty again', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)

    expect(list.removeAt(0)).toBe(1)
    expect(list.length).toBe(0)
    expect(list.get(0)).toBeUndefined()
  })

  it('handles removing the tail without leaving a dangling reference', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)
    list.append(2)
    list.append(3)

    expect(list.removeAt(2)).toBe(3)
    list.append(4)
    expect(list.get(2)).toBe(4)
    expect(list.length).toBe(3)
  })

  it('returns undefined for out-of-range get and removeAt', () => {
    const list = new DoublyLinkedList<number>()
    list.append(1)

    expect(list.get(5)).toBeUndefined()
    expect(list.removeAt(5)).toBeUndefined()
  })
})
