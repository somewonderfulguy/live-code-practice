function deepEqual(left, right) {}

function a() {}
function b() {}

console.log(
  'deepEqual',
  deepEqual([1, 2, 3, { a: 'c' }, ['n']], [1, 2, 3, { a: 'c' }, ['n']])
)

console.log('deepEqual', deepEqual(1, 2))
