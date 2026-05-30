// Search / filter / sort products
// query searches in title, case-insensitive
// all filters should work together
// sorting should not mutate the original array

// This is boring but practical. HR calls it “frontend task”,
// interviewer calls it “can you write code without accidentally mutating everything?”

type Product = {
  id: number
  title: string
  category: 'tech' | 'books' | 'clothes'
  price: number
  rating: number
  inStock: boolean
}

const products: Product[] = [
  {
    id: 1,
    title: 'React Handbook',
    category: 'books',
    price: 30,
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    title: 'Mechanical Keyboard',
    category: 'tech',
    price: 120,
    rating: 4.6,
    inStock: false
  },
  {
    id: 3,
    title: 'TypeScript Guide',
    category: 'books',
    price: 40,
    rating: 4.9,
    inStock: true
  },
  {
    id: 4,
    title: 'Wool Jacket',
    category: 'clothes',
    price: 200,
    rating: 4.4,
    inStock: true
  }
]

type ProductFilters = {
  query?: string
  category?: Product['category']
  minPrice?: number
  maxPrice?: number
  inStockOnly?: boolean
  sortBy?: 'price' | 'rating' | 'title'
  sortDirection?: 'asc' | 'desc'
}

function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  // implement
}
