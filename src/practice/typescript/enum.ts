enum StatusEnum {
  Idle = 'IDLE',
  Loading = 'LOADING'
}

const Status = {
  Idle: 'IDLE',
  Loading: 'LOADING'
} as const

type Status = (typeof Status)[keyof typeof Status]
type StatusKeys = keyof typeof Status

const statusArray = ['IDLE', 'LOADING'] as const
type StatusUnion = (typeof statusArray)[number]
