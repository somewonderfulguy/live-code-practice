# Queue

A queue gives items back in the same order they went in: **first in, first
out** (FIFO). It works like the line at a checkout. People join at the back,
get served from the front, and nobody cuts in or leaves from the middle.

```txt
dequeue <-  [ A ]  [ B ]  [ C ]  [ D ]  <- enqueue
            front                 back
```

A queue has four operations, and each one should be `O(1)`:

- `enqueue(item)`: add an item at the back.
- `dequeue()`: remove and return the item at the front, or `undefined` if the
  queue is empty.
- `peek()`: return the front item without removing it.
- `length`: how many items are waiting.

That's the whole interface. There's no reading by index, no searching, and no
inserting in the middle.

**Naming:** the operation is _dequeue_. A _deque_ (said "deck") is a different
structure: a double-ended queue, covered under Related Structures below.
ThePrimeagen's course names the method `deque()`. This repo uses `dequeue()` to
keep the two apart.

## Queue vs Linked List

They're different kinds of things, which is why they're easy to mix up.

A **linked list** is a _data structure_. It describes how values are stored:
nodes chained together by pointers. You can work anywhere in the chain: insert
in the middle, remove by value, read by index.

A **queue** is an _abstract data type_ (ADT). It describes behavior only: which
operations exist and in what order items come back out. It says nothing about
how the items are stored.

|            | Linked list                                                  | Queue                        |
| ---------- | ------------------------------------------------------------ | ---------------------------- |
| Defines    | How values are stored                                        | How values come back out     |
| Access     | Anywhere in the chain                                        | Front and back only          |
| Operations | `prepend`, `append`, `insertAt`, `get`, `remove`, `removeAt` | `enqueue`, `dequeue`, `peek` |
| Cost       | `O(1)` at the head, `O(n)` in the middle                     | `O(1)` for everything        |

A singly linked list with `head` and `tail` pointers is the classic way to
build a queue, and it's the one this exercise uses. If you've done the
[linked list](../linked-list/README.md) exercises, you've already written it:

| Queue           | `SinglyLinkedList` | Cost   |
| --------------- | ------------------ | ------ |
| `enqueue(item)` | `append(item)`     | `O(1)` |
| `dequeue()`     | `removeAt(0)`      | `O(1)` |
| `peek()`        | `get(0)`           | `O(1)` |
| `length`        | `length`           | `O(1)` |

A queue is that list with everything else taken away. The restriction is the
point:

- **The order can't be broken.** Without `insertAt` or `remove`, nothing can
  cut in line or disappear from the middle, so code that uses the queue can
  count on FIFO.
- **Everything is `O(1)`.** The operations that can cost `O(n)` (`insertAt`,
  `remove`, and `get` or `removeAt` at an arbitrary index) are exactly the ones
  a queue doesn't have.
- **The storage can change.** Callers only see `enqueue`, `dequeue` and
  `peek`, so you could swap the linked list for a ring buffer without touching
  any code that uses the queue.

So a singly linked list isn't a queue. It's the most common way to build one.

## Which End Is Which

In the linked list, the `next` pointers run from front to back: each node
points at the item that will be served after it. `head` is the front of the
queue and `tail` is the back.

```txt
head = front                           tail = back
(dequeue here)                         (enqueue here)
 |                                      |
 v                                      v
[ A | *-]--->[ B | *-]--->[ C | *-]--->[ D | null ]
```

Why this way round? Here's what each end of a singly linked list costs (see the
linked list README for the details):

| End                        | Add    | Remove |
| -------------------------- | ------ | ------ |
| Head                       | `O(1)` | `O(1)` |
| Tail (with `tail` pointer) | `O(1)` | `O(n)` |

Removing is only cheap at the head, so `dequeue` has to happen there. That
leaves the tail for `enqueue`, and adding at the tail is `O(1)` thanks to the
`tail` pointer.

Flip it (enqueue at the head, dequeue at the tail) and every `dequeue` has to
walk the whole list to find the node before the tail, because singly linked
nodes don't know their predecessor. Dequeue becomes `O(n)`.

## Enqueue

Attach the new node after the current tail, then move `tail` to it.

```txt
enqueue E into [A, B, C]:

before: head -> [A] -> [B] -> [C] -> null
                               ^ tail

steps:
  node = { value: E }
  tail.next = node
  tail = node
  length++

after:  head -> [A] -> [B] -> [C] -> [E] -> null
                                      ^ tail
```

If the queue is empty, there's no tail to attach to. The new node becomes both
the head and the tail:

```txt
enqueue A into an empty queue:

before: head -> null
        tail -> null

steps:
  node = { value: A }
  head = node
  tail = node
  length++

after:  head -> [A] -> null
                 ^ tail
```

## Dequeue

Save the head's value, then move `head` one node forward.

```txt
dequeue from [A, B, C]:

before: head -> [A] -> [B] -> [C] -> null
                               ^ tail

steps:
  value = head.value
  head = head.next
  length--
  return value              // A

after:  head -> [B] -> [C] -> null
                        ^ tail
```

The old front node is now unreachable, so the garbage collector frees it. You
don't need to clear its `next` pointer first: nothing points at the old node,
so it doesn't matter what it points at.

When the last item leaves, `head` becomes empty but `tail` still points at the
node that just left. Clear it too:

```txt
dequeue from [A]:

before: head -> [A] -> null
                 ^ tail

steps:
  value = head.value
  head = head.next          // null
  tail = null               // empty queue, so no tail either
  length--
  return value              // A

after:  head -> null
        tail -> null
```

Skip `tail = null` and `head` and `tail` disagree about whether the queue is
empty. If `enqueue` trusts `tail` (like `queue.resolved.ts` does), it attaches
the next item to the dead node and never sets `head`: `length` says 1, but
`peek()` returns `undefined`.

Dequeuing from an empty queue returns `undefined` and changes nothing. In
particular, `length` must not go below 0.

`peek` just reads `head.value`, or returns `undefined` when the queue is empty.
No pointers change.

## Big-O Summary

| Operation | Cost                                                          |
| --------- | ------------------------------------------------------------- |
| `enqueue` | `O(1)`                                                        |
| `dequeue` | `O(1)`                                                        |
| `peek`    | `O(1)`                                                        |
| `length`  | `O(1)`, a stored counter updated on every enqueue and dequeue |
| Space     | `O(n)`                                                        |

Search and access by index aren't listed because they aren't part of a queue.
If you need them, a queue is the wrong tool.

## Why Not Just Use An Array?

JavaScript has no built-in queue, but an array with `push` and `shift` acts like
one:

```ts
const queue: string[] = []
queue.push('A') // enqueue
queue.push('B')
queue[0] // peek -> 'A'
queue.shift() // dequeue -> 'A', then 'B' moves to slot 0
```

The catch is `shift`. An array keeps its items in numbered slots, and slot 0
always holds the first item. Removing the first item means moving every other
item down one slot:

```txt
shift() on [A, B, C, D]:

index:   0  1  2  3
before: [A][B][C][D]
after:  [B][C][D]       B, C and D each moved one slot left
```

That's `O(n)` per dequeue, so draining `n` items costs `O(n^2)` in total. JS
engines optimize `shift` in some cases, but you can't count on it, and the
answer an interviewer expects is `O(n)`. For a few hundred items it doesn't
matter. It matters when the queue gets large, or when someone asks about
complexity.

Stacks don't have this problem: `push` and `pop` both work at the end of the
array, so nothing moves. Arrays make great stacks and poor queues.

### Array With A Read Index

Keep the array, but never shift. Track where the front is instead:

```ts
const queue: string[] = []
let head = 0

queue.push('A') // enqueue
queue.push('B')
queue[head] // peek -> 'A'
queue[head++] // dequeue -> 'A', nothing moves
queue.length - head // size -> 1
```

Every operation is now `O(1)`. The catch: dequeued items stay in the array, in
the slots before `head`. That's fine for a single algorithm run like BFS, where
the array is thrown away at the end. In a queue that lives for the whole app,
the array only ever grows.

### Ring Buffer

A ring buffer (circular array) fixes that by reusing slots. It's a fixed-size
array with a `head` index and a `tail` index. When an index moves past the last
slot, it wraps back to 0: `index = (index + 1) % capacity`. Nothing shifts, and
freed slots get reused.

```txt
capacity 5: enqueue A B C D, dequeue twice (A, B), then enqueue E F

index:    0     1     2     3     4
        [ F ] [ . ] [ C ] [ D ] [ E ]
                ^     ^
              tail  head

front to back: C, D, E, F
tail marks the slot where the next item will go
```

When the buffer is full, you either reject the new item or copy everything into
a bigger array (still `O(1)` amortized). Java's `ArrayDeque`, C#'s `Queue<T>`
and Rust's `VecDeque` all work this way. "Design a circular queue" is a common
interview follow-up.

### Comparison

| Implementation                      | enqueue  | dequeue | Notes                                     |
| ----------------------------------- | -------- | ------- | ----------------------------------------- |
| Singly linked list, `head` + `tail` | `O(1)`   | `O(1)`  | This exercise. One extra pointer per item |
| Array, `push` + `shift`             | `O(1)`\* | `O(n)`  | Shortest code. Fine for small queues      |
| Array + read index                  | `O(1)`\* | `O(1)`  | Good for BFS. Memory only grows           |
| Ring buffer                         | `O(1)`\* | `O(1)`  | Reuses slots. Memory stays compact        |

\* Amortized: once in a while the array runs out of room and gets copied into a
bigger one.

`peek` is `O(1)` in all four.

## Related Structures

- **Stack**: last in, first out (LIFO), the mirror image of a queue. With a
  singly linked list you push and pop at the head only, so you don't even need
  a `tail`. An array with `push` and `pop` works just as well.
- **Deque** (said "deck", short for double-ended queue): add and remove at
  both ends in `O(1)`. A singly linked list can't do this, because removing
  the tail costs `O(n)`. You need a doubly linked list or a ring buffer.
- **Priority queue**: despite the name, not FIFO. `dequeue` returns the most
  important item (for example, the smallest number), no matter when it
  arrived. It's usually built on a heap, which is its own topic.

## Where Queues Show Up

- **Breadth-first search (BFS)**: level-order traversal of a tree, shortest
  path in an unweighted graph or grid, flood fill. BFS processes things in the
  order it discovers them, which is FIFO. This is where you'll need a queue
  most often in live coding.
- **The JavaScript event loop**: promise callbacks wait in the microtask queue
  and run in the order they were queued. Timer and event callbacks wait in
  task queues.
- **Buffering work**: job queues, request throttling, message queues like
  RabbitMQ or SQS, and concurrency limiters like
  [`limitConcurrency`](../../async/limitConcurrency.ts), where tasks wait in
  line for a free slot.

## In Live Coding

You'll rarely be asked to write a queue class on its own. More often you need a
queue inside another problem, usually BFS. You have three options:

1. **`push` + `shift`**: the shortest. Fine for small inputs, but say out loud
   that `shift` is `O(n)`.
2. **Array + read index**: barely longer, and `O(1)`. A good default.
3. **Your own `Queue` class**: when the interviewer asks for one, or when the
   queue lives for a long time.

BFS over a tree with the read-index trick:

```ts
const queue = [root]

for (let head = 0; head < queue.length; head++) {
  const node = queue[head]
  // visit node here
  for (const child of node.children) queue.push(child)
}
```

The loop condition reads `queue.length` on every pass, so children pushed
during the loop still get visited. When `head` reaches the end of the array,
the queue is empty and the search is done.

## Common Bugs

- **Not setting `head` on the first enqueue.** In an empty queue, the new node
  has to become both `head` and `tail`.
- **Not clearing `tail` when the last item leaves.** See Dequeue above.
- **Changing `length` when dequeuing from an empty queue.** Return `undefined`
  before touching anything.
- **Using the wrong ends.** Enqueue at the head plus dequeue at the tail makes
  every dequeue `O(n)`.
- **Returning the node instead of its value.**

## The Exercise

Implement `Queue<T>` in `queue.ts`:

- `length`: how many items are in the queue.
- `enqueue(item)`: add an item at the back.
- `dequeue()`: remove and return the front item, or `undefined` if the queue is
  empty.
- `peek()`: return the front item without removing it, or `undefined` if the
  queue is empty.

Every operation must be `O(1)`. Don't use an array: build it from nodes with
`head` and `tail` pointers.

The tests are in `queue.test.ts`. They're skipped by default, so remove the
`.skip` and run `pnpm test queue`. The reference solution is in
`queue.resolved.ts`.
