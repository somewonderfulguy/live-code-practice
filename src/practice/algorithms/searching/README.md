# Searching Algorithms

Searching algorithms find a value or a transition point in a collection. The
main question is what structure the input gives us. More structure usually
means fewer checks.

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
ball. If the first binary-search probe breaks at the middle, only one ball is
left, so the lower half must be scanned one floor at a time. That gives a worst
case close to `O(n)`, not `O(log n)`.

The `sqrt(n)` jump strategy balances the two costs: at most about `sqrt(n)`
jumps with the first ball, then at most about `sqrt(n)` linear checks with the
second ball.
