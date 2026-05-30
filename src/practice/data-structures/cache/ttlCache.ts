// Simple TTL cache
// value expires after ttlMs
// get expired value => undefined
// has expired value => false
// expired values should be removed lazily

class TTLCache<K, V> {
  constructor(private ttlMs: number) {}

  set(key: K, value: V): void {
    // implement
  }

  get(key: K): V | undefined {
    // implement
  }

  has(key: K): boolean {
    // implement
  }

  delete(key: K): boolean {
    // implement
  }

  clear(): void {
    // implement
  }
}

// Usage:
const cache = new TTLCache<string, number>(1000)

cache.set('a', 123)
cache.get('a') // 123

// after 1s+
cache.get('a') // undefined
