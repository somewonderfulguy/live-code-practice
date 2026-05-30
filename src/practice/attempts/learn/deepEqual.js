function deepEqual(left, right) {
  if (left === right) return true

  if (left == null || right == null) return false

  if (Number.isNaN(left) && Number.isNaN(right)) return true

  if (Array.isArray(left) !== Array.isArray(right)) return false

  if (typeof left !== typeof right) return false

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() === right.getTime()
  }

  if (left instanceof RegExp && right instanceof RegExp) {
    return left.source === right.source && left.flags === right.flags
  }

  if (typeof left !== 'object') return false

  const keysLeft = Object.keys(left)
  const keysRight = Object.keys(right)

  if (keysLeft.length !== keysRight.length) return false

  return keysLeft.every((key) => {
    // Object.hasOwn(obj, "a") <-- try it
    if (!Object.hasOwn(right, key)) return false
    // if (!Object.prototype.hasOwnProperty.call(right, key)) return false
    return deepEqual(left[key], right[key])
  })

  throw new Error('unhandled deepEqual check')
}

function a() {}
function b() {}

console.log(
  'deepEqual',
  deepEqual([1, 2, 3, { a: 'c' }, ['n']], [1, 2, 3, { a: 'c' }, ['n']])
)

console.log('deepEqual', deepEqual(1, 2))
