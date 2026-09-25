type Node<T> = {
  value: T
  next?: Node<T>
}

export class Queue<T> {
  public length = 0

  private head?: Node<T>
  private tail?: Node<T>

  enqueue(item: T): void {
    const node: Node<T> = { value: item }
    if (this.tail) {
      this.tail.next = node
    } else {
      this.head = node
    }
    this.tail = node
    this.length++
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined

    const value = this.head.value
    this.head = this.head.next
    if (!this.head) this.tail = undefined
    this.length--
    return value
  }

  peek(): T | undefined {
    return this.head?.value
  }
}
