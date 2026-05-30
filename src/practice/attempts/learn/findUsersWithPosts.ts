import test from 'node:test'
import assert from 'node:assert'

type User = { id: number; name: string }
type Post = { id: number; user_id: number; text: string }

const users: User[] = [
  { id: 1, name: 'Joe' },
  { id: 2, name: 'Bill' },
  { id: 3, name: 'Stephen' }
]

const posts: Post[] = [
  { id: 1, user_id: 1, text: '...' },
  { id: 2, user_id: 1, text: '...' },
  { id: 3, user_id: 2, text: '...' }
]

function findUsersWithPosts(): User[] {
  const usersWithPosts = new Set(posts.map((post) => post.user_id))
  return users.filter((user) => usersWithPosts.has(user.id))
}

test('Expected output', () => {
  const result = findUsersWithPosts()
  const expected = [
    { id: 1, name: 'Joe' },
    { id: 2, name: 'Bill' }
  ]
  assert.deepStrictEqual(result, expected)
})
