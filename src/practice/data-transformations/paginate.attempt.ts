// Real pagination

// page is 1-based
// page < 1 should behave as page 1
// pageSize < 1 should throw an error
// totalPages should be correct
// original array must not be mutated

type PaginatedResult<T> = {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> {
  // implement
}

// Example
paginate([1, 2, 3, 4, 5], 2, 2)
// Expected
// {
//   items: [3, 4],
//   page: 2,
//   pageSize: 2,
//   totalItems: 5,
//   totalPages: 3,
//   hasNextPage: true,
//   hasPrevPage: true
// }
