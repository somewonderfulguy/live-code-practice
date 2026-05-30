type User = {
  id: number
  name: string
  score: number
  createdAt: string // e.g. 2026-01-10T10:00:00Z
}

// 4. sortUsers
// Дані
const users: User[] = [
  { id: 1, name: 'Charlie', score: 90, createdAt: '2026-01-10T10:00:00Z' },
  { id: 2, name: 'Alice', score: 100, createdAt: '2026-01-12T10:00:00Z' },
  { id: 3, name: 'Bob', score: 100, createdAt: '2026-01-11T10:00:00Z' },
  { id: 4, name: 'Diana', score: 70, createdAt: '2026-01-09T10:00:00Z' }
]
// Задача

// Напиши функцію:

const sortUsers = (users: User[]): User[] => {
  return users.toSorted((a, b) => {
    if (a.score === b.score) {
      return a.name.localeCompare(b.name)
    }

    return a.score > b.score ? -1 : 1
  })
}

const sortUsersByDate = (users: User[]): User[] => {
  return users.toSorted((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

console.log(sortUsers(users), sortUsersByDate(users))

// Вимоги

// Потрібно відсортувати масив за правилами:

// Спочатку за score — від більшого до меншого
// Якщо score однаковий — за name за алфавітом
// Оригінальний масив не мутувати
// Очікуваний результат
// [
//   { id: 2, name: 'Alice', score: 100, createdAt: '2026-01-12T10:00:00Z' },
//   { id: 3, name: 'Bob', score: 100, createdAt: '2026-01-11T10:00:00Z' },
//   { id: 1, name: 'Charlie', score: 90, createdAt: '2026-01-10T10:00:00Z' },
//   { id: 4, name: 'Diana', score: 70, createdAt: '2026-01-09T10:00:00Z' },
// ]
// Якщо захочеш другий варіант цієї ж задачі

// Окремо відсортуй по createdAt:

// новіші зверху
// старіші знизу
