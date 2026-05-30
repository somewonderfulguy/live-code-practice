// parentId === null => root node
// every node should have children: []
// original array must not be mutated
// order should be preserved
// Target Big O: O(n).

type FlatComment = {
  id: number
  parentId: number | null
  text: string
}

const comments: FlatComment[] = [
  { id: 1, parentId: null, text: 'Root 1' },
  { id: 2, parentId: 1, text: 'Child 1.1' },
  { id: 3, parentId: 1, text: 'Child 1.2' },
  { id: 4, parentId: 2, text: 'Child 1.1.1' },
  { id: 5, parentId: null, text: 'Root 2' }
]

type CommentNode = FlatComment & {
  children: CommentNode[]
}

function buildCommentTree(comments: FlatComment[]): CommentNode[] {
  // implement
}
