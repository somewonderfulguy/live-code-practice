// Tree traversal: find node by ID
// return the first matching node
// return null if not found
// do not mutate tree

type FileNode = {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

function findNodeById(tree: FileNode[], id: string): FileNode | null {
  // implement
}

// Bonus:
function findPathByIdBonus(tree: FileNode[], id: string): string[] | null {
  // e.g. ['root', 'src', 'components', 'Button.tsx']
}
