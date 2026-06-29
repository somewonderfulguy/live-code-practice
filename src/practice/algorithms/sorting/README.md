# Sorting Algorithms

Sorting algorithms put values into an order. The main question is how much work
the algorithm has to do to move values into the right places.

## Bubble Sort

Bubble sort repeatedly walks through the array, compares neighboring values, and
swaps them when they are in the wrong order. After one full pass, the largest
unsorted value has bubbled to the end.

- Input requirement: values must be comparable with the ordering being used.
- Idea: compare `array[i]` with `array[i + 1]`. If the left value is bigger,
  swap them. Repeat until no unsorted neighbor pair remains.
- Time complexity: `O(n^2)` in the average and worst case.
- Best case: `O(n)` when the array is already sorted and the implementation
  stops after a pass with no swaps.
- Space complexity: `O(1)` when sorting in place.
- Good fit: learning sorting mechanics. It is usually not a good production
  choice for large arrays.

Bubble sort works because each pass guarantees one more value is finished. The
largest value in the unsorted section keeps losing comparisons to nothing: every
time it meets a smaller neighbor, it swaps right. By the end of the pass, it has
reached its final position.

Example:

```txt
[4, 2, 7, 3]

pass 1:
  4 > 2, swap -> [2, 4, 7, 3]
  4 < 7, keep -> [2, 4, 7, 3]
  7 > 3, swap -> [2, 4, 3, 7]
                           7 is now fixed

pass 2:
  2 < 4, keep -> [2, 4, 3, 7]
  4 > 3, swap -> [2, 3, 4, 7]
                        4 is now fixed

pass 3:
  2 < 3, keep -> [2, 3, 4, 7]
                     3 is now fixed
```

### Why The Complexity Becomes `O(n^2)`

The easy answer is "nested loops", but the better answer is the amount of work
the loops actually do.

For an array with `n` values:

- The first pass compares about `n - 1` neighbor pairs.
- The second pass compares about `n - 2` pairs, because the last value is done.
- The third pass compares about `n - 3` pairs.
- This continues down to `1` comparison.

So the total work is:

```txt
(n - 1) + (n - 2) + (n - 3) + ... + 1
```

That is the same kind of staircase sum as:

```txt
1 + 2 + 3 + ... + n
```

The Gauss trick is to pair the outside numbers:

```txt
1   + n     = n + 1
2   + n - 1 = n + 1
3   + n - 2 = n + 1
```

Every pair makes `n + 1`, and there are `n / 2` pairs, so:

```txt
1 + 2 + 3 + ... + n = n(n + 1) / 2
```

Bubble sort usually sums to `1 + 2 + ... + (n - 1)`, so the exact comparison
count is:

```txt
n(n - 1) / 2
```

For big-O, both formulas have the same important shape:

```txt
n(n + 1) / 2 = (n^2 + n) / 2
n(n - 1) / 2 = (n^2 - n) / 2
```

Drop constants and smaller terms, and the dominant part is `n^2`.

That is why bubble sort is `O(n^2)`: doubling the input does not merely double
the work. It makes the comparison staircase much wider and much taller.
