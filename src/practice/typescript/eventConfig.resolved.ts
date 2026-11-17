/**
 * Reference: map over event objects rather than an object's property keys.
 * Each union member supplies both the handler's key and its parameter type.
 */

export type EventConfig<Events extends { kind: string }> = {
  [Event in Events as Event['kind']]: (event: Event) => void
}
