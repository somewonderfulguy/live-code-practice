type User = {
  id: number
  name: string
}

type Order = {
  id: number
  userId: number
  total: number
}

// 5. findUsersWithoutOrders
// Дані
const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' }
]

const orders = [
  { id: 1001, userId: 1, total: 120 },
  { id: 1002, userId: 1, total: 80 },
  { id: 1003, userId: 3, total: 200 }
]
// Задача

// Напиши функцію:

const findUsersWithoutOrders = (users: User[], orders: Order[]): User[] => {}
// Вимоги
// Повернути масив користувачів, у яких немає жодного замовлення
// Зв’язок:
// orders.userId === users.id
// Порядок у результаті має бути як у users
// Оригінальні масиви не мутувати
// Очікуваний результат
// [
//   { id: 2, name: 'Bob' },
//   { id: 4, name: 'Diana' },
// ]
// Що тренує

// Це по суті anti-join у JS.
