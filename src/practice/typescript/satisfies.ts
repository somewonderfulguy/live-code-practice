type Union = 'a' | 'b' | 'c' | 'd'

const saySomething = (variant: Union) => {
  switch (variant) {
    case 'a':
      console.log('aloha')
      break
    case 'b':
      console.log('bye')
      break
    case 'c':
      console.log('ciao')
      break
    case 'd':
      console.log('darova')
      break
    default:
      throw new Error(`unhandled: ${variant satisfies never}`)
  }
}

type UnionTwo = 'a' | 'b' | 'c'

const casing = (variant: UnionTwo) => {
  switch (variant) {
    case 'a':
      //
      break
    case 'b':
      //
      break
    default:
      throw new Error(`unhandled: ${variant satisfies never}`)
  }
}

type Object = {
  string: string | number
  value: string[]
}

const myVar = {
  string: 'hey',
  value: ['']
} satisfies Object

myVar.string.toLowerCase()
