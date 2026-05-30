# Linear Search

Implement `linearSearch` for an array of values.

## Requirements

- Return `true` when the target exists in the array.
- Return `false` when the target does not exist.
- Scan from left to right.
- Do not use `Array.prototype.includes`, `find`, `findIndex`, or `some`.

## Examples

```ts
linearSearch([1, 2, 3], 2) // true
linearSearch([1, 2, 3], 4) // false
linearSearch([], 1) // false
```

## Big O

- Time: `O(n)`
- Space: `O(1)`
