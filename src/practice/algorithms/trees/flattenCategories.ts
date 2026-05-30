// Nested data → flat data

type Category = {
  id: string
  name: string
  children?: Category[]
}

const categories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    children: [
      {
        id: 'react',
        name: 'React',
        children: [{ id: 'nextjs', name: 'Next.js' }]
      },
      { id: 'vue', name: 'Vue' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    children: [{ id: 'node', name: 'Node.js' }]
  }
]

type FlatCategory = {
  id: string
  name: string
  parentId: string | null
  depth: number
  path: string[]
}

function flattenCategories(categories: Category[]): FlatCategory[] {
  // implement
}

/*
Target Big O: O(n).
expected:
[
  {
    id: 'frontend',
    name: 'Frontend',
    parentId: null,
    depth: 0,
    path: ['Frontend']
  },
  {
    id: 'react',
    name: 'React',
    parentId: 'frontend',
    depth: 1,
    path: ['Frontend', 'React']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    parentId: 'react',
    depth: 2,
    path: ['Frontend', 'React', 'Next.js']
  }
]
*/
