type Payment = {
  id: number
  userId: number
  amount: number
  status: 'paid' | 'failed'
}

// Дані
const payments: Payment[] = [
  { id: 101, userId: 1, amount: 100, status: 'paid' },
  { id: 102, userId: 1, amount: 50, status: 'failed' },
  { id: 103, userId: 2, amount: 70, status: 'paid' },
  { id: 104, userId: 1, amount: 30, status: 'paid' },
  { id: 105, userId: 3, amount: 200, status: 'failed' }
]
// Задача

// Напиши функцію:

type Result = Record<
  number,
  {
    paymentsCount: number
    totalPaid: number
  }
>

const buildUserPaymentsSummary = (payments: Payment[]): Result => {}
// Вимоги
// Повернути об’єкт, де ключ — це userId
// Для кожного userId треба порахувати:
// paymentsCount — загальна кількість усіх платежів користувача
// totalPaid — сума лише тих платежів, де status === 'paid'
// Shape результату:
// {
//   [userId: number]: {
//     paymentsCount: number,
//     totalPaid: number
//   }
// }
// Якщо у користувача немає paid платежів, totalPaid має бути 0
// Очікуваний результат
// {
//   1: { paymentsCount: 3, totalPaid: 130 },
//   2: { paymentsCount: 1, totalPaid: 70 },
//   3: { paymentsCount: 1, totalPaid: 0 }
// }
