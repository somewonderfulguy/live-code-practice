// 6. countOrdersByStatus
// Дані

const orderStatuses = ['paid', 'pending', 'failed'] as const
type status = (typeof orderStatuses)[number]

type Order = {
  id: number
  status: 'paid' | 'pending' | 'failed'
}

const orders: Order[] = [
  { id: 1, status: 'paid' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'paid' },
  { id: 4, status: 'failed' },
  { id: 5, status: 'pending' },
  { id: 6, status: 'paid' }
]
// Задача

// Напиши функцію:

// const countOrdersByStatus = (orders: Order[]): Record<string, number> => {}

// const countBy = (array, key) => {}

// Вимоги
// Повернути об’єкт, де:
// ключ — це status
// значення — кількість замовлень з таким статусом
// Shape:
// {
//   [status: string]: number
// }
// Очікуваний результат
// {
//   paid: 3,
//   pending: 2,
//   failed: 1
// }
// Додатково, якщо хочеш ускладнити

// Зроби універсальну функцію:

// function countBy(array, key) {}

// Приклад:

// countBy(orders, 'status')
