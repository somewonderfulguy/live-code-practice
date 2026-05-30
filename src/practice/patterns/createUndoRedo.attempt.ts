// Topic: Stack / frontend-style state history
// Difficulty: Medium
// Implement a simple undo/redo manager.

type UndoRedoManager<T> = {
  getCurrent(): T
  set(value: T): void
  undo(): T
  redo(): T
}

function createUndoRedo<T>(initialValue: T): UndoRedoManager<T>

const history = createUndoRedo('A')

history.getCurrent() // "A"

history.set('B')
history.set('C')

history.undo() // "B"
history.undo() // "A"
history.undo() // "A" — cannot go further back

history.redo() // "B"
history.redo() // "C"
history.redo() // "C" — cannot go further forward

history.set('D')
history.redo() // "D" — redo stack should be cleared after new set

// Expected complexity:
// set: O(1)
// undo: O(1)
// redo: O(1)
