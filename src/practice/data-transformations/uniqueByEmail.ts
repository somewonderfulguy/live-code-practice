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

// function uniqueByEmail(users: User[]): User[] {}

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

// const uniqueBy = (array, key) => {}

// Приклад виклику:

// uniqueBy(users, 'email')
