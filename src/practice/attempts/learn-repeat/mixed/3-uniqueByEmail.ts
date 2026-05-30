// 3. uniqueByEmail
// Дані

type User = {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Alice 2', email: 'alice@example.com' },
  { id: 3, name: 'Bob', email: 'bob@example.com' },
  { id: 4, name: 'Charlie', email: 'charlie@example.com' },
  { id: 5, name: 'Bobby', email: 'bob@example.com' }
]
// Задача

// Напиши функцію:

function uniqueByEmail(users: User[]): User[] {
  const collection = new Map<string, User>()

  for (const user of users) {
    const email = user.email
    if (!collection.has(email)) {
      collection.set(email, user)
    }
  }

  return Array.from(collection.values())
}

// Вимоги
// Повернути масив без дублікатів по email
// Залишати треба перший об’єкт з кожним email
// Порядок елементів має зберігатися
// Оригінальний масив не мутувати
// Очікуваний результат
// [
//   { id: 1, name: 'Alice', email: 'alice@example.com' },
//   { id: 3, name: 'Bob', email: 'bob@example.com' },
//   { id: 4, name: 'Charlie', email: 'charlie@example.com' },
// ]
// Додатково, якщо захочеш ускладнити

// Зроби універсальну версію:

const uniqueBy = <TObj, TKey extends keyof TObj>(
  array: TObj[],
  key: TKey
): TObj[] => {
  const collection = new Map<string, TObj>()

  for (const obj of array) {
    const uniqueValue = String(obj[key])
    if (!collection.has(uniqueValue)) {
      collection.set(uniqueValue, obj)
    }
  }

  return Array.from(collection.values())
}

// Приклад виклику:

// uniqueBy(users, 'email')
