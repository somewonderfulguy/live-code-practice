const x = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

function getProperty<TObject, TKey extends keyof TObject>(
  obj: TObject,
  key: TKey
): TObject[TKey] {
  return obj[key]
}

getProperty(x, 'a')
getProperty(x, 'd')

interface User {
  id: number
  name: string
  email?: string
}

type MyPartial<TObject> = {
  [Key in keyof TObject]?: TObject[Key]
}

type MyRequired<TObject> = {
  [Key in keyof TObject]-?: TObject[Key]
}

type PartialUser = MyPartial<User>
type RequiredUser = MyRequired<User>

interface Post {
  id: number
  title: string
  content: string
  published: boolean
}

const updateEntity = <TObject extends object>(
  data: TObject,
  update: Partial<TObject>
) => {
  return { ...data, ...update }
}

const user: User = { id: 1, name: 'Alice', email: 'alice@example.com' }
const updatedUser = updateEntity(user, { name: 'Bob' }) // no errors

const post: Post = { id: 1, title: 'Hello', content: 'World', published: false }
const updatedPost = updateEntity(post, { published: true }) // no errors

updateEntity(user, { age: 30 }) // error (no such field `age`)

type Some<T, U extends keyof T> = { [key in U]: T[key] }

type UserPreview = Some<User, 'id' | 'name'>

enum NUMBERS {
  ONE,
  TWO,
  THREE
}

console.log(NUMBERS.ONE) // 0

type T = 'a' | 'b' | 'c'
type U = Extract<T, 'a' | 'b'>

type ObjectType = {
  a: string
}

type Status = 'new' | 'waiting_load' | 'in_work' | 'done' | 'cert_ready'
type StatusWithBrackets = `[${Status}]`
const val: StatusWithBrackets = '[done]'

type StatusWithBracketsTwo = {
  [Key in Status]: `${Key}`
}[Status]

const val2: StatusWithBracketsTwo = 'in_work'

type StatusWithOn = `on${Capitalize<string & Status>}`
