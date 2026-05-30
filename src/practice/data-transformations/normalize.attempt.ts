import test from 'node:test'
import assert from 'node:assert'

const products = [
  { id: 1, name: 'iPhone' },
  { id: 2, name: 'MacBook' },
  { id: 3, name: 'Samsung' },
  { id: 7, name: 'Nokia' }
]

type Data = typeof products
type Entities = Record<number, Data[number]>
type Output = {
  entities: Entities
  byId: number[]
}

function normalize(data: Data): Output {}

function normalizeTwo(data: Data): Output {}

test('normalize', () => {
  const result = normalize(products)
  const expected = {
    entities: {
      1: { id: 1, name: 'iPhone' },
      2: { id: 2, name: 'MacBook' },
      3: { id: 3, name: 'Samsung' },
      7: { id: 7, name: 'Nokia' }
    },
    byId: [1, 2, 3, 7]
  }
  assert.deepStrictEqual(result, expected)
})
