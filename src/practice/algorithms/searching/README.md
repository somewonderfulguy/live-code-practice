# Searching Algorithms

Searching algorithms find a value or a transition point in a collection. The
main question is what structure the input gives us. More structure usually
means fewer checks.

## Linear Search

Linear search walks the collection from start to end and checks each item
against the target. It is the baseline when the input has no useful structure.

- Input requirement: none. The collection can be in any order.
- Idea: iterate over each item and return once a match is found. Return a
  not-found value if the end is reached without a match.
- Time complexity: `O(n)`.
- Space complexity: `O(1)`.
- Good fit: small collections, unsorted data, or one-off lookups where paying
  the cost to sort or build an index would not pay back.

Linear search is the fallback that always works. Whenever more structure is
available (sorted order, monotonicity, hashing), a faster search usually beats
it, but it stays useful when that structure is missing or too expensive to
maintain.

## Binary Search

Binary search finds a target in a sorted array by repeatedly checking the
middle item and discarding the half where the target cannot be.

- Input requirement: the array must be sorted according to the comparison being
  used.
- Idea: compare the target with the middle item. If the target is smaller,
  continue on the left half. If it is larger, continue on the right half.
- Time complexity: `O(log n)`.
- Space complexity: `O(1)` for the iterative version.
- Good fit: normal sorted data where checking an item is cheap and repeatable.

Binary search works because each comparison gives enough information to remove
half of the remaining search space without destroying anything or losing future
options.

## Two Crystal Balls

The two crystal balls problem finds the first floor where a ball breaks. The
input is a monotonic boolean array: `false` values come first, then `true`
values. The answer is the first `true` index, or `-1` when every floor is safe.

- Input requirement: the array must be monotonic, with all safe floors before
  all breaking floors.
- Idea: use the first ball to jump forward by `sqrt(n)` floors until it breaks
  or reaches the end. Then use the second ball to linearly scan the previous
  block.
- Time complexity: `O(sqrt(n))`.
- Space complexity: `O(1)`.
- Good fit: destructive searches where each failed high probe consumes one of a
  small number of available attempts.

This is not a normal binary search problem because a breaking drop destroys a
ball. Binary search assumes every probe is free to retry — the "wrong" half is
just discarded. Here a probe that breaks the ball also costs us a ball. With
only two balls, we cannot afford to keep halving: after the second break we
have no way to test any more floors, so we must always leave enough safety
margin to finish with a linear scan.

Concretely: a binary search would probe the middle first. If that break
happens, we have used one ball on a probe that leaves an uncertainty range of
`n/2` floors. Ball two must now walk that range one floor at a time, because a
second break ends the search. Worst case is about `n/2` drops, which is
`O(n)` — the halving bought us nothing.

So the real question is: how big a jump can the first ball take without
leaving too large a block for the second ball to scan? Let the jump size be
`k`. In the worst case the first ball takes up to `n/k` jumps before it
breaks (or reaches the end), and the second ball then scans up to `k - 1`
floors in the last block. Total worst-case drops:

```
f(k) = n/k + k
```

We want to pick the `k` that makes this smallest. The two terms pull in
opposite directions: bigger `k` means fewer jumps for ball one but a longer
linear scan for ball two, and smaller `k` is the opposite. The sum is
minimized when the two terms are equal, i.e. `n/k = k`, which gives
`k = sqrt(n)` and a total of `2 * sqrt(n)` drops. That is where the
`O(sqrt(n))` bound comes from.

The intuition to hold onto: with two balls, the second ball must always fall
back to a linear scan, so its cost is the size of the block ball one leaves
behind. Balancing the number of jumps against the size of that block is what
`sqrt(n)` does — it is the step size where "how far we can leap" and "how
much we might have to walk back" cost the same. The same reasoning generalizes:
with `m` balls, the balanced step size is `n^(1/m)`.
