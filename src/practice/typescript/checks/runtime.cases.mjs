import assert from 'node:assert/strict'

const suites = {
  getProperty: (m) => [
    () => assert.equal(m.getProperty({ name: 'Ada' }, 'name'), 'Ada'),
    () => assert.equal(m.getProperty({ age: 0 }, 'age'), 0),
    () => assert.equal(m.getProperty({ email: undefined }, 'email'), undefined),
    () => { const key = Symbol('id'); assert.equal(m.getProperty({ [key]: 7 }, key), 7) },
    () => assert.equal(m.getProperty({ 0: 'zero' }, 0), 'zero'),
  ],
  pluck: (m) => [
    () => assert.deepEqual(m.pluck([{ name: 'Ada' }, { name: 'Lin' }], 'name'), ['Ada', 'Lin']),
    () => assert.deepEqual(m.pluck([], 'id'), []),
    () => assert.deepEqual(m.pluck([{ email: 'a@b.test' }, {}], 'email'), ['a@b.test', undefined]),
    () => {
      const input = Object.freeze([Object.freeze({ id: 2 }), Object.freeze({ id: 1 })])
      assert.deepEqual(m.pluck(input, 'id'), [2, 1])
      assert.deepEqual(input.map((item) => item.id), [2, 1])
    },
    () => { const value = {}; assert.equal(m.pluck([{ value }], 'value')[0], value) },
  ],
  updateEntity: (m) => [
    () => assert.deepEqual(m.updateEntity({ id: 1, name: 'Ada' }, { name: 'Lin' }), { id: 1, name: 'Lin' }),
    () => {
      const original = Object.freeze({ id: 1, name: 'Ada' })
      const updated = m.updateEntity(original, { name: 'Lin' })
      assert.notEqual(updated, original)
      assert.equal(original.name, 'Ada')
    },
    () => { const original = { id: 1 }; assert.notEqual(m.updateEntity(original, {}), original) },
    () => { const nested = { dark: true }; assert.equal(m.updateEntity({ nested }, {}).nested, nested) },
    () => assert.deepEqual(m.updateEntity({ active: true, count: 3 }, { active: false, count: 0 }), { active: false, count: 0 }),
  ],
  narrowing: (m) => [
    () => assert.equal(m.isUser({ id: 1, name: 'Ada' }), true),
    () => assert.equal(m.isUser({ id: 1, name: 'Ada', email: 'a@b.test' }), true),
    () => {
      for (const value of [null, undefined, [], 1, 'Ada', {}, { id: '1', name: 'Ada' },
                           { id: NaN, name: 'Ada' }, { id: Infinity, name: 'Ada' },
                           { id: 1, name: null }, { id: 1, name: 'Ada', email: undefined },
                           { id: 1, name: 'Ada', email: 42 }]) {
        assert.equal(m.isUser(value), false, `Unexpected valid user: ${String(value)}`)
      }
    },
    () => { const user = { id: 1, name: 'Ada' }; assert.equal(m.parseUser(user), user) },
    () => assert.throws(() => m.parseUser({ id: 1 })),
    () => assert.equal(m.describeRequest({ status: 'idle' }), 'Idle'),
    () => assert.equal(m.describeRequest({ status: 'loading' }), 'Loading'),
    () => assert.equal(m.describeRequest({ status: 'success', data: 0 }), 'Success'),
    () => assert.equal(m.describeRequest({ status: 'error', error: 'Offline' }), 'Error: Offline'),
    () => assert.throws(() => m.describeRequest({ status: 'unexpected' })),
  ],
  literals: (m) => [
    () => assert.deepEqual(m.STATUS, { Idle: 'idle', Loading: 'loading', Success: 'success', Error: 'error' }),
    () => assert.deepEqual(m.routes.home, { path: '/', method: 'GET', requiresAuth: false }),
    () => assert.deepEqual(m.routes.profile, { path: '/profile', method: 'GET', requiresAuth: true }),
  ],
}

export function runRuntimeChecks(exercise, implementation) {
  const cases = suites[exercise]?.(implementation) ?? []
  for (const [index, run] of cases.entries()) {
    try { run() } catch (error) {
      throw new Error(`${exercise}: runtime case ${index + 1} failed: ${error.message}`, { cause: error })
    }
  }
  return cases.length
}
