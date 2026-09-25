export class Queue<T> {
  public length = 0

  enqueue(item: T): void {}

  dequeue(): T | undefined {}

  peek(): T | undefined {}
}
