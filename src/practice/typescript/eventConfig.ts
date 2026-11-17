/**
 * Event-union mapping practice. Read the README first; keep the reference closed
 * for your first attempt. Replace `unknown` with a mapped type using `as`.
 */

/**
 * Map each event's kind to a required handler receiving that exact event and
 * returning void. Use a union with distinct string-literal kinds; never gives
 * an empty map. This type does not register or dispatch runtime events.
 */
export type EventConfig<Events extends { kind: string }> = unknown
