// Tree traversal: collect IDs

type TreeNode = {
  id: string
  children?: TreeNode[]
}

const tree: TreeNode[] = [
  {
    id: 'a',
    children: [
      { id: 'a1' },
      {
        id: 'a2',
        children: [{ id: 'a2-1' }]
      }
    ]
  },
  {
    id: 'b',
    children: [{ id: 'b1' }]
  }
]

function collectIdsDFS(tree: TreeNode[]): string[] {
  // implement recursive DFS
}

function collectIdsBFS(tree: TreeNode[]): string[] {
  // implement iterative BFS with queue
}

/*
Expected DFS:
['a', 'a1', 'a2', 'a2-1', 'b', 'b1']
Expected BFS:
['a', 'b', 'a1', 'a2', 'b1', 'a2-1']
Target Big O: O(n).
*/
