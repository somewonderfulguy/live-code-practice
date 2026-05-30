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

function normalize(data: Data): Output {
  const byId: number[] = []
  const entities: Entities = {}

  for (const item of data) {
    entities[item.id] = item
    byId.push(item.id)
  }

  return {
    entities,
    byId
  }
}

function normalizeTwo(data: Data): Output {
  return data.reduce<Output>(
    (acc, curr) => {
      acc.entities[curr.id] = curr
      acc.byId.push(curr.id)
      return acc
    },
    {
      entities: {},
      byId: []
    }
  )
}

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
