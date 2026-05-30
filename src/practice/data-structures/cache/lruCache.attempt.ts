// LRU cache high-level
// when capacity is exceeded, remove least recently used item
// get(key) should mark item as recently used
// put(existingKey) should update value and mark as recently used
// capacity < 1 should throw
// Main trick: JS Map preserves insertion order. Delete + set = move to the end.

class LRUCache<K, V> {
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    // implement
  }

  put(key: K, value: V): void {
    // implement
  }
}

// example
const cache = new LRUCache<string, number>(2)

cache.put('a', 1)
cache.put('b', 2)
cache.get('a')
cache.put('c', 3)

cache.get('b') // undefined
cache.get('a') // 1
cache.get('c') // 3
