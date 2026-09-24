type Node<T> = {
  value: T
  next?: Node<T>
}

export class SinglyLinkedList<T> {
  public length = 0

  private head?: Node<T>
  private tail?: Node<T>

  prepend(item: T): void {
    const node: Node<T> = { value: item, next: this.head }
    this.head = node
    if (!this.tail) this.tail = node
    this.length++
  }

  append(item: T): void {
    const node: Node<T> = { value: item }
    if (this.tail) {
      this.tail.next = node
    } else {
      this.head = node
    }
    this.tail = node
    this.length++
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) return
    if (idx === 0) return this.prepend(item)
    if (idx === this.length) return this.append(item)

    const prev = this.nodeAt(idx - 1)!
    prev.next = { value: item, next: prev.next }
    this.length++
  }

  get(idx: number): T | undefined {
    return this.nodeAt(idx)?.value
  }

  remove(item: T): T | undefined {
    if (!this.head) return undefined

    if (this.head.value === item) {
      const value = this.head.value
      this.head = this.head.next
      if (!this.head) this.tail = undefined
      this.length--
      return value
    }

    let prev = this.head
    while (prev.next && prev.next.value !== item) prev = prev.next
    if (!prev.next) return undefined

    const removed = prev.next
    prev.next = removed.next
    if (removed === this.tail) this.tail = prev
    this.length--
    return removed.value
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) return undefined

    if (idx === 0) {
      const value = this.head!.value
      this.head = this.head!.next
      if (!this.head) this.tail = undefined
      this.length--
      return value
    }

    const prev = this.nodeAt(idx - 1)!
    const removed = prev.next!
    prev.next = removed.next
    if (removed === this.tail) this.tail = prev
    this.length--
    return removed.value
  }

  private nodeAt(idx: number): Node<T> | undefined {
    if (idx < 0 || idx >= this.length) return undefined
    let curr = this.head
    for (let i = 0; i < idx && curr; i++) curr = curr.next
    return curr
  }
}
