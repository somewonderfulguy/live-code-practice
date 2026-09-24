type Node<T> = {
  value: T
  prev?: Node<T>
  next?: Node<T>
}

export class DoublyLinkedList<T> {
  public length = 0

  private head?: Node<T>
  private tail?: Node<T>

  prepend(item: T): void {
    const node: Node<T> = { value: item, next: this.head }
    if (this.head) this.head.prev = node
    this.head = node
    if (!this.tail) this.tail = node
    this.length++
  }

  append(item: T): void {
    const node: Node<T> = { value: item, prev: this.tail }
    if (this.tail) this.tail.next = node
    this.tail = node
    if (!this.head) this.head = node
    this.length++
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) return
    if (idx === 0) return this.prepend(item)
    if (idx === this.length) return this.append(item)

    const next = this.nodeAt(idx)!
    const prev = next.prev!
    const node: Node<T> = { value: item, prev, next }
    prev.next = node
    next.prev = node
    this.length++
  }

  get(idx: number): T | undefined {
    return this.nodeAt(idx)?.value
  }

  remove(item: T): T | undefined {
    let curr = this.head
    while (curr && curr.value !== item) curr = curr.next
    if (!curr) return undefined
    return this.detach(curr)
  }

  removeAt(idx: number): T | undefined {
    const node = this.nodeAt(idx)
    if (!node) return undefined
    return this.detach(node)
  }

  private detach(node: Node<T>): T {
    if (node.prev) node.prev.next = node.next
    else this.head = node.next

    if (node.next) node.next.prev = node.prev
    else this.tail = node.prev

    this.length--
    return node.value
  }

  private nodeAt(idx: number): Node<T> | undefined {
    if (idx < 0 || idx >= this.length) return undefined
    let curr = this.head
    for (let i = 0; i < idx && curr; i++) curr = curr.next
    return curr
  }
}
