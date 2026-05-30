// Merge three arrays with Map

type User = {
  id: number
  name: string
}

type Profile = {
  userId: number
  city: string
}

type Order = {
  id: number
  userId: number
  total: number
  status: 'paid' | 'failed'
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

const profiles: Profile[] = [
  { userId: 1, city: 'Kyiv' },
  { userId: 3, city: 'Lviv' }
]

const orders: Order[] = [
  { id: 101, userId: 1, total: 100, status: 'paid' },
  { id: 102, userId: 1, total: 50, status: 'failed' },
  { id: 103, userId: 2, total: 70, status: 'paid' }
]

type UserDetails = User & {
  profile: Profile | null
  orders: Order[]
  totalPaid: number
}

function buildUserDetails(
  users: User[],
  profiles: Profile[],
  orders: Order[]
): UserDetails[] {
  // implement
}

/*
// Target Big O: O(users + profiles + orders)
expected:
[
  {
    id: 1,
    name: 'Alice',
    profile: { userId: 1, city: 'Kyiv' },
    orders: [
      { id: 101, userId: 1, total: 100, status: 'paid' },
      { id: 102, userId: 1, total: 50, status: 'failed' }
    ],
    totalPaid: 100
  },
  {
    id: 2,
    name: 'Bob',
    profile: null,
    orders: [{ id: 103, userId: 2, total: 70, status: 'paid' }],
    totalPaid: 70
  },
  {
    id: 3,
    name: 'Charlie',
    profile: { userId: 3, city: 'Lviv' },
    orders: [],
    totalPaid: 0
  }
]
*/
