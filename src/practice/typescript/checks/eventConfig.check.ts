import type { EventConfig } from '@exercise/eventConfig'
import type { Equal, Expect } from './assertions'

type SquareEvent = { kind: 'square'; x: number; y: number }
type CircleEvent = { kind: 'circle'; radius: number }
type ShapeEvent = SquareEvent | CircleEvent
type ShapeHandlers = EventConfig<ShapeEvent>

export type EventConfigCases = [
  Expect<Equal<ShapeHandlers, {
    square: (event: SquareEvent) => void
    circle: (event: CircleEvent) => void
  }>>,
  Expect<Equal<keyof ShapeHandlers, 'square' | 'circle'>>,
  Expect<Equal<Parameters<ShapeHandlers['square']>, [event: SquareEvent]>>,
  Expect<Equal<Parameters<ShapeHandlers['circle']>, [event: CircleEvent]>>,
  Expect<Equal<ReturnType<ShapeHandlers['circle']>, void>>,
  Expect<Equal<EventConfig<SquareEvent>, {
    square: (event: SquareEvent) => void
  }>>,
  Expect<Equal<EventConfig<never>, {}>>,
]

const handlers: ShapeHandlers = {
  square(event) {
    const square: SquareEvent = event
    const x: number = event.x
    // @ts-expect-error Each handler receives its own event, not a broad payload.
    event.radius
  },
  circle(event) {
    const circle: CircleEvent = event
    const radius: number = event.radius
    // @ts-expect-error A circle handler does not receive square coordinates.
    event.x
  },
}

handlers.square({ kind: 'square', x: 1, y: 2 })
handlers.circle({ kind: 'circle', radius: 3 })
// @ts-expect-error The circle handler rejects another event kind.
handlers.circle({ kind: 'square', x: 1, y: 2 })
// @ts-expect-error Required payload fields must be present.
handlers.circle({ kind: 'circle' })
// @ts-expect-error Unknown kinds must not appear as handlers.
handlers.triangle

// @ts-expect-error Every event kind requires a handler.
const missingCircle: ShapeHandlers = { square: () => {} }

const extraHandler: ShapeHandlers = {
  square: () => {},
  circle: () => {},
  // @ts-expect-error Fresh handler maps reject unrecognized event keys.
  triangle: () => {},
}

const wrongHandler: ShapeHandlers = {
  // @ts-expect-error A square handler cannot require a circle payload.
  square: (_event: CircleEvent) => {},
  circle: () => {},
}

// @ts-expect-error Event members must have a kind discriminator.
export type MissingKind = EventConfig<{ radius: number }>
// @ts-expect-error kind must be a string, rather than a numeric tag.
export type NumericKind = EventConfig<{ kind: 1; radius: number }>
// @ts-expect-error Every member of the event union must satisfy the constraint.
export type InvalidMember = EventConfig<SquareEvent | { radius: number }>
