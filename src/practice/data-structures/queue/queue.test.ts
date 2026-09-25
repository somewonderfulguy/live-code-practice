import { describe, expect, it } from 'vitest'

import { Queue } from './queue'

describe.skip('Queue', () => {
  it('starts empty', () => {
    const queue = new Queue<number>()

    expect(queue.length).toBe(0)
    expect(queue.peek()).toBeUndefined()
  })

  it('enqueues items at the back so the first one stays at the front', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.length).toBe(3)
    expect(queue.peek()).toBe(1)
  })

  it('dequeues items in the order they were enqueued', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.length).toBe(0)
  })

  it('peeks without removing the front item', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.peek()).toBe(1)
    expect(queue.peek()).toBe(1)
    expect(queue.length).toBe(2)
  })

  it('moves the front forward after a dequeue', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.dequeue()

    expect(queue.peek()).toBe(2)
    expect(queue.length).toBe(1)
  })

  it('returns undefined when dequeuing from an empty queue and keeps length at 0', () => {
    const queue = new Queue<number>()

    expect(queue.dequeue()).toBeUndefined()
    expect(queue.length).toBe(0)
  })

  it('becomes empty again after the last item is dequeued', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)

    expect(queue.dequeue()).toBe(1)
    expect(queue.length).toBe(0)
    expect(queue.peek()).toBeUndefined()
    expect(queue.dequeue()).toBeUndefined()
  })

  it('can be reused after being emptied without a stale tail', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.dequeue()

    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.length).toBe(2)
    expect(queue.peek()).toBe(2)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
  })

  it('keeps FIFO order when enqueues and dequeues are interleaved', () => {
    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.dequeue()).toBe(1)

    queue.enqueue(3)
    expect(queue.dequeue()).toBe(2)

    queue.enqueue(4)
    queue.enqueue(5)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(4)
    expect(queue.dequeue()).toBe(5)
    expect(queue.length).toBe(0)
  })

  it('stores falsy values like 0 and empty strings', () => {
    const queue = new Queue<number | string>()
    queue.enqueue(0)
    queue.enqueue('')

    expect(queue.peek()).toBe(0)
    expect(queue.dequeue()).toBe(0)
    expect(queue.dequeue()).toBe('')
    expect(queue.length).toBe(0)
  })
})
