# Linked List

A linked list stores a sequence of values as a chain of nodes. Each node holds
a value and one or more pointers to other nodes. Unlike an array, the values
are not laid out contiguously in memory — the pointers do the ordering.

There are two common variants:

- **Singly linked list**: each node points to the next one only.
- **Doubly linked list**: each node points to both the next and the previous
  one.

A minimal singly linked node looks like:

```txt
node: { value, next }
```

And a doubly linked one:

```txt
node: { value, next, prev }
```

The list itself keeps a `head` pointer (the first node), often a `tail`
pointer (the last node), and usually a `length` counter.

```txt
singly linked list:

head                                              tail
 |                                                  |
 v                                                  v
[ 4 | *-]--->[ 2 | *-]--->[ 9 | *-]--->[ 7 | null ]
```

## Why The Structure Is Interesting

The reason to reach for a linked list is that inserting or removing at a known
node costs nothing beyond a few pointer writes. There is no shifting. An array
gives you fast random access at the cost of paying `O(n)` to shift elements
whenever you insert or remove somewhere other than the end. A linked list
flips that trade: random access becomes `O(n)`, but rewiring at a known point
is `O(1)`.

## Big-O Summary

| Operation                              | Singly       | Doubly       |
| -------------------------------------- | ------------ | ------------ |
| Access by index                        | `O(n)`       | `O(n)`       |
| Search by value                        | `O(n)`       | `O(n)`       |
| Insert at head                         | `O(1)`       | `O(1)`       |
| Insert at tail (with tail pointer)     | `O(1)`       | `O(1)`       |
| Insert at tail (no tail pointer)       | `O(n)`       | `O(n)`       |
| Insert after a known node              | `O(1)`       | `O(1)`       |
| Delete at head                         | `O(1)`       | `O(1)`       |
| Delete at tail (singly, no prev ptr)   | `O(n)`       | `O(1)`       |
| Delete a known node (given the node)   | `O(n)` \*    | `O(1)`       |
| Space                                  | `O(n)`       | `O(n)`       |

\* Singly linked: even if you already hold the node, you still need to walk
from the head to find its predecessor so you can update `prev.next`. Doubly
linked lists avoid this because each node already knows its predecessor.

## Insertion At The Head

Inserting at the head is the canonical `O(1)` operation.

```txt
insert 1 at head of [4, 2, 9]:

before: head -> [4] -> [2] -> [9] -> null

steps:
  new = { value: 1, next: head }
  head = new

after:  head -> [1] -> [4] -> [2] -> [9] -> null
```

Two pointer writes, no traversal, no shifting. It does not matter whether the
list has three elements or three million — the work is the same.

## Insertion At The Tail

Insertion at the tail is `O(1)` **only if the list stores a `tail` pointer**.
Without one, you must walk from the head to the last node to attach the new
one, which costs `O(n)`.

```txt
insert 5 at tail of [4, 2, 9], with tail pointer:

before: head -> [4] -> [2] -> [9] -> null
                                ^ tail

steps:
  new = { value: 5, next: null }
  tail.next = new
  tail = new

after:  head -> [4] -> [2] -> [9] -> [5] -> null
                                      ^ tail
```

The `tail` pointer is a small piece of extra bookkeeping — one field on the
list object, updated on every push and pop — that turns an `O(n)` operation
into an `O(1)` one. This is why most practical linked lists keep it.

## Deletion At The Head

Symmetric to head insertion:

```txt
delete head of [4, 2, 9]:

before: head -> [4] -> [2] -> [9] -> null

steps:
  head = head.next

after:  head -> [2] -> [9] -> null
```

One pointer write. The old head node becomes unreachable and gets collected.

## Deletion At The Tail

This is where singly and doubly linked lists diverge sharply.

**Doubly linked list**: `O(1)`. Use `tail.prev` to find the new tail, then set
`tail.prev.next = null` and `tail = tail.prev`.

**Singly linked list**: `O(n)`, even with a `tail` pointer. To detach the old
tail, you need to set the new last node's `next` to `null` — but the only way
to reach that node is to walk from the head, because singly linked nodes have
no back-pointer. The `tail` pointer tells you where the end is, not what
comes before it.

This is the single biggest reason to prefer a doubly linked list when you
need a fast deque or an LRU cache.

## Insertion And Deletion In The Middle

Rewiring in the middle is `O(1)` **once you already hold a pointer to the
neighboring node**. The catch is that getting there usually takes `O(n)`.

```txt
insert 6 after the node holding 2:

before: ... -> [2] -> [9] -> ...

steps:
  new = { value: 6, next: node.next }
  node.next = new

after:  ... -> [2] -> [6] -> [9] -> ...
```

When people say linked lists have "cheap middle insertions", they mean this
step — the rewiring itself. If the caller has to search for the position
first, the search dominates and the whole operation is `O(n)`.

This is why linked lists shine in situations like LRU caches: the hash map
gives you an `O(1)` pointer straight to the node you want to move, so the
`O(1)` rewiring actually pays off.

## Why Head And Tail Operations Are So Fast

The short answer: **there is nothing to shift**.

In an array, values live next to each other in memory. Inserting at index `0`
means every existing value has to move one slot to the right; deleting at
index `0` means every value shifts one slot to the left. That is `n` moves.

In a linked list, values are just objects sitting wherever the allocator put
them. Position is defined by the `next` (and `prev`) pointers, not by memory
layout. Inserting at the head means pointing the new node's `next` at the
current head and calling that node the head. Two writes. Nothing else moves.

The tail is the same story when the list stores a `tail` pointer: you already
know where the end is, so appending is just one extra `next` write plus a
`tail` update.

## When To Use A Linked List

Reach for one when:

- The workload is dominated by inserts and removes at the ends (queue, stack,
  deque).
- You already have direct pointers to nodes and need to splice them out or
  move them around cheaply (LRU cache, intrusive lists inside kernels or
  allocators).
- You need a structure that grows one element at a time without ever
  reallocating and copying the whole buffer.

Avoid one when:

- You need random access by index.
- You iterate the whole list often and cache locality matters — arrays win
  hard here because their values are contiguous, so the CPU prefetcher can
  stream through them.
- Memory overhead per element matters. Each node carries at least one extra
  pointer (two for doubly linked), plus allocator bookkeeping.

In most day-to-day code an array (or a growable vector like JavaScript's
`Array`) is the better default. Linked lists earn their keep when the access
pattern specifically rewards `O(1)` splicing at known positions.
