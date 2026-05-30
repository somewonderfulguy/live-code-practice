// Memoize
// cache result by arguments
// same args => return cached result
// different args => call original fn again

function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  // implement
}

// simple version is okay
// const key = JSON.stringify(args)

// Bonus version:
// function memoize<Args extends unknown[], Result>(
//   fn: (...args: Args) => Result,
//   resolver?: (...args: Args) => string
// ): (...args: Args) => Result
