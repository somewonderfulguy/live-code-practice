type User = {
  id: number
  name: string
  email: string
}

// Дані
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
] satisfies User[]

type Profile = {
  userId: number
  city: string
  isActive: boolean
}

const profiles = [
  { userId: 1, city: 'Kyiv', isActive: true },
  { userId: 3, city: 'Lviv', isActive: false }
] satisfies Profile[]

type ResultElem = User & {
  profile: {
    userId: number
    city: string
    isActive: boolean
  } | null
}

function mergeUsersWithProfiles(
  users: User[],
  profiles: Profile[]
): ResultElem[] {}

mergeUsersWithProfiles(users, profiles)

// Задача

// Напиши функцію:

// function mergeUsersWithProfiles(users, profiles) {}

// Вимоги
// Повернути новий масив.
// Для кожного user треба знайти профіль по зв’язку:
// profiles.userId === users.id
// Кожен елемент результату має мати shape:
// {
//   id: number,
//   name: string,
//   email: string,
//   profile: {
//     userId: number,
//     city: string,
//     isActive: boolean
//   } | null
// }
// Якщо профіль для юзера не знайдено — profile: null
// Порядок елементів у результаті має бути такий самий, як у users
// Оригінальні масиви не мутувати
// Очікуваний результат
// [
//   {
//     id: 1,
//     name: 'Alice',
//     email: 'alice@example.com',
//     profile: { userId: 1, city: 'Kyiv', isActive: true }
//   },
//   {
//     id: 2,
//     name: 'Bob',
//     email: 'bob@example.com',
//     profile: null
//   },
//   {
//     id: 3,
//     name: 'Charlie',
//     email: 'charlie@example.com',
//     profile: { userId: 3, city: 'Lviv', isActive: false }
//   }
// ]
